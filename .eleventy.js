const { URL } = require("url");
const site = require("./src/_data/site.json");
const imageDimensions = require("./src/_data/image-dimensions.json");

function normalizeImageSrc(src = "") {
  if (!src) return null;

  try {
    let clean = String(src).trim();
    if (!clean || clean.startsWith("data:")) return null;

    if (/^https?:\/\//i.test(clean)) {
      clean = new URL(clean).pathname;
    }

    clean = clean.split("?")[0].split("#")[0];
    if (!clean.startsWith("/")) clean = `/${clean}`;

    if (imageDimensions[clean]) return clean;

    const assetsIndex = clean.indexOf("/assets/");
    if (assetsIndex !== -1) {
      const assetPath = clean.slice(assetsIndex);
      if (imageDimensions[assetPath]) return assetPath;
    }

    return null;
  } catch (err) {
    return null;
  }
}

function getImageMeta(src = "") {
  const normalized = normalizeImageSrc(src);
  return normalized ? imageDimensions[normalized] : null;
}

function prettifySegment(segment = "") {
  return String(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

module.exports = function (eleventyConfig) {
  // GitHub Pages project sites are served from a sub-path (e.g. /BondarLabs/).
  // Keep it configurable so local dev + custom domain deployments (/) still work.
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";

  // Safety: if you ever unpack this project over an older build, you might still
  // have legacy service pages in Nunjucks format alongside the new Markdown pages.
  // That can cause a duplicate permalink output conflict. We ignore the legacy
  // filenames to keep the build stable.
  eleventyConfig.ignores.add("src/services/fdm.njk");
  eleventyConfig.ignores.add("src/services/resin.njk");
  eleventyConfig.ignores.add("src/services/design-support.njk");
  eleventyConfig.ignores.add("src/services/batch-production.njk");

  // Static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Filters
  eleventyConfig.addFilter("json", (value, spaces = 2) => JSON.stringify(value, null, spaces));

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("breadcrumbs", (pageUrl, currentTitle) => {
    const home = { name: "Home", url: `${site.baseUrl}/` };
    if (!pageUrl || pageUrl === "/") return [home];

    const segments = String(pageUrl).split("/").filter(Boolean);
    if (!segments.length) return [home];

    const labels = {
      services: "Services",
      materials: "Materials",
      "case-studies": "Projects & Examples",
      pricing: "Pricing",
      business: "For Business",
      delivery: "Delivery",
      faq: "FAQ",
      contact: "Contact",
      quote: "Get a Quote",
      privacy: "Privacy policy",
      terms: "Terms"
    };

    const items = [home];
    const currentUrl = `${site.baseUrl}${pageUrl.endsWith("/") ? pageUrl : `${pageUrl}/`}`;

    if (segments.length === 1) {
      items.push({
        name: currentTitle || labels[segments[0]] || prettifySegment(segments[0]),
        url: currentUrl
      });
      return items;
    }

    const section = segments[0];
    items.push({
      name: labels[section] || prettifySegment(section),
      url: `${site.baseUrl}/${section}/`
    });

    items.push({
      name: currentTitle || prettifySegment(segments[segments.length - 1]),
      url: currentUrl
    });

    return items;
  });

  eleventyConfig.addTransform("injectImageDimensions", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    return content.replace(/<img\b([^>]*?)\bsrc=(['"])(.*?)\2([^>]*)>/gi, (match, before, quote, src, after) => {
      const attrs = `${before}${after}`;
      const meta = getImageMeta(src);
      let updated = match;

      if (meta) {
        if (!/\bwidth\s*=/.test(attrs)) {
          updated = updated.replace(/<img\b/i, `<img width="${meta.width}"`);
        }
        if (!/\bheight\s*=/.test(attrs)) {
          updated = updated.replace(/<img\b/i, `<img height="${meta.height}"`);
        }
      }

      if (!/\bdecoding\s*=/.test(attrs)) {
        updated = updated.replace(/<img\b/i, `<img decoding="async"`);
      }

      return updated;
    });
  });

  // Collections
  eleventyConfig.addCollection("caseStudies", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/case-studies/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

  eleventyConfig.addCollection("materials", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/materials/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

  eleventyConfig.addCollection("services", (collectionApi) => {
    return collectionApi
      // Service pages are authored in Markdown (with Nunjucks enabled via markdownTemplateEngine).
      // Keep *.njk support for any future template-based service pages.
      .getFilteredByGlob(["src/services/*.md", "src/services/*.njk"])
      .filter((item) => item.data && item.data.serviceNav)
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html", "xml", "txt"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix
  };
};
