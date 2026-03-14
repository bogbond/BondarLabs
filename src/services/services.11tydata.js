module.exports = {
  eleventyComputed: {
    relatedLinks: (data) => {
      const title = String(data.title || "").toLowerCase();
      const links = [];

      if (title.includes("resin")) {
        links.push({
          label: "Resin (MSLA)",
          url: "/materials/resin/",
          text: "See resin material options, finish expectations and common trade-offs."
        });
      } else if (title.includes("fdm")) {
        links.push({
          label: "Materials",
          url: "/materials/",
          text: "Compare PLA, PETG, ABS, ASA, TPU, Nylon and resin options."
        });
      } else {
        links.push({
          label: "Projects & examples",
          url: "/case-studies/",
          text: "See real client examples across one-offs, redesigns and batches."
        });
      }

      links.push({
        label: "Projects & examples",
        url: "/case-studies/",
        text: "See how these services translate into real finished parts and batches."
      });

      links.push({
        label: "Get a Quote",
        url: "/quote/",
        text: "Send a file or short brief and get a practical recommendation fast."
      });

      return links.filter((item, index, arr) => arr.findIndex((x) => x.url === item.url) === index).slice(0, 3);
    }
  }
};
