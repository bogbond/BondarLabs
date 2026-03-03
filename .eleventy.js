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
