function getMaterialLink(material = "") {
  const value = String(material).toLowerCase();

  if (value.includes("resin")) return { label: "Resin (MSLA)", url: "/materials/resin/", text: "Material notes, finish expectations and practical trade-offs." };
  if (value.includes("asa")) return { label: "ASA", url: "/materials/asa/", text: "Outdoor-ready material guidance and use cases." };
  if (value.includes("abs")) return { label: "ABS", url: "/materials/abs/", text: "Engineering material guidance for stronger functional parts." };
  if (value.includes("petg")) return { label: "PETG", url: "/materials/petg/", text: "Tougher functional material guidance and common use cases." };
  if (value.includes("nylon")) return { label: "Nylon", url: "/materials/nylon/", text: "Higher-performance material guidance for demanding parts." };
  if (value.includes("tpu")) return { label: "TPU", url: "/materials/tpu/", text: "Flexible material guidance for soft or impact-resistant parts." };
  if (value.includes("carbon")) return { label: "Carbon-fibre composites", url: "/materials/carbon-fibre-composites/", text: "Composite material options for stiffer functional prints." };
  if (value.includes("pla")) return { label: "PLA", url: "/materials/pla/", text: "A clear guide to one of the most common FDM materials." };

  return null;
}

module.exports = {
  eleventyComputed: {
    lastmod: (data) => ((data.order || 999) <= 5 ? "2026-03-13" : "2026-03-14"),
    relatedLinks: (data) => {
      const links = [];
      const techValue = String(data.tech || "").toLowerCase();

      if (techValue.includes("resin")) {
        links.push({
          label: "Resin 3D Printing",
          url: "/services/resin/",
          text: "See resin capabilities, typical layer heights and turnaround."
        });
      } else {
        links.push({
          label: "FDM 3D Printing",
          url: "/services/fdm/",
          text: "See build size, material choices and common functional use cases."
        });
      }

      const materialLink = getMaterialLink(data.material);
      if (materialLink) links.push(materialLink);

      links.push({
        label: "Projects & examples",
        url: "/case-studies/",
        text: "Browse more real-world projects across FDM, resin and batch production."
      });

      links.push({
        label: "Get a Quote",
        url: "/quote/",
        text: "Send your file or brief for an exact price and lead time."
      });

      return links.filter((item, index, arr) => arr.findIndex((x) => x.url === item.url) === index).slice(0, 4);
    }
  }
};
