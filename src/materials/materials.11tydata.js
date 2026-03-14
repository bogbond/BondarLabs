module.exports = {
  eleventyComputed: {
    relatedLinks: (data) => {
      const category = String(data.category || "").toLowerCase();
      const links = [];

      if (category.includes("msla") || category.includes("resin")) {
        links.push({
          label: "Resin 3D Printing",
          url: "/services/resin/",
          text: "See when resin is the best process for fine detail and smooth surfaces."
        });
      } else {
        links.push({
          label: "FDM 3D Printing",
          url: "/services/fdm/",
          text: "See typical FDM capabilities, build sizes and finishing options."
        });
      }

      links.push({
        label: "Projects & examples",
        url: "/case-studies/",
        text: "See real projects made in similar materials and processes."
      });

      links.push({
        label: "Get a Quote",
        url: "/quote/",
        text: "Tell us what the part needs to do and we will recommend the best material."
      });

      return links;
    }
  }
};
