module.exports = function (eleventyConfig) {
  // Static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");  eleventyConfig.addFilter("json", (value, spaces = 2) => JSON.stringify(value, null, spaces));

  // Filter: add a simple ISO date formatter if needed later
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
      .getFilteredByGlob("src/services/*.njk")
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
    markdownTemplateEngine: "njk"
  };
};
