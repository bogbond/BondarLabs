const faqItems = [
  {
    "question": "How do I get a quote?",
    "answer": "Use the quote form and upload your file. If you do not have a file yet, you can still request a quote with a short brief, photos or sketches, and key dimensions."
  },
  {
    "question": "What file formats do you accept?",
    "answer": "We accept STL, STEP, 3MF and OBJ. Native CAD formats such as STEP are usually faster and more accurate to work from than STL."
  },
  {
    "question": "I don\u2019t know which material to choose \u2014 can you help?",
    "answer": "Yes. Explain how the part will be used, including strength, heat, flexibility, surface finish and whether it will be used indoors or outdoors, and we will recommend the best option."
  },
  {
    "question": "Can you review my file before printing?",
    "answer": "Yes. We can check printability and flag common issues such as fragile walls, tight clearances and support-sensitive geometry before production."
  },
  {
    "question": "What is FDM best for?",
    "answer": "FDM is ideal for functional parts, enclosures, brackets, mounts, jigs, fixtures, prototypes and small-batch production."
  },
  {
    "question": "What\u2019s the maximum size you can print?",
    "answer": "Single-piece FDM prints can be produced up to 420 \u00d7 420 \u00d7 480 mm depending on geometry and orientation. Larger parts can be split into sections for assembly."
  },
  {
    "question": "What materials do you offer for FDM?",
    "answer": "Common FDM options include PLA, PETG, ABS, ASA, Nylon, TPU and carbon-filled PLA."
  },
  {
    "question": "How accurate are FDM parts?",
    "answer": "Accuracy depends on geometry, material and orientation, but well-designed parts can achieve high dimensional consistency of up to \u00b10.2%."
  },
  {
    "question": "When should I choose resin over FDM?",
    "answer": "Choose resin when you need very fine detail, smoother surfaces and crisp small features, such as miniatures, figurines, master models, stamps and small precision components."
  },
  {
    "question": "What resin print quality do you offer?",
    "answer": "Typical resin layer heights are 0.05 mm as standard, 0.03 mm for fine detail and 0.10 mm for draft work."
  },
  {
    "question": "Are resin parts shipped ready to use?",
    "answer": "Yes. Resin orders include support removal, thorough washing and cleaning, controlled drying, final UV curing, quality checks and safe packaging."
  },
  {
    "question": "How long does a typical order take?",
    "answer": "Small orders are typically completed in 2\u20133 business days. Urgent jobs can sometimes ship the same day if timing allows."
  },
  {
    "question": "What about larger batches?",
    "answer": "For batches of around 50 to 500 parts or more, lead times are often 3\u20137 days depending on complexity, settings and finishing requirements."
  },
  {
    "question": "Do you ship across the UK?",
    "answer": "Yes. UK shipping is standard and sent with tracking."
  },
  {
    "question": "Which couriers do you use?",
    "answer": "Typical courier options are Royal Mail, Evri and DPD, with UPS or Yodel available in some cases."
  },
  {
    "question": "Can I collect locally?",
    "answer": "Yes. Collection is available by appointment in Brampton, Huntingdon."
  },
  {
    "question": "What if my parcel is lost or damaged?",
    "answer": "If a tracked parcel has not arrived within 10 working days after dispatch, we can offer either a full refund including shipping or a reprint and reship. For damaged deliveries, contact us with photos so we can agree a fair solution."
  },
  {
    "question": "Can you provide measurement reports?",
    "answer": "Yes. By agreement, we can provide measurement points, annotated photos, a dimension table and, where relevant, a comparison against CAD."
  },
  {
    "question": "Do you support commercial orders?",
    "answer": "Yes. We support small and mid-size business orders, repeat reorders with revision tracking and first-article samples where needed."
  },
  {
    "question": "Can you sign an NDA?",
    "answer": "Yes. Confidentiality can be agreed upfront, and customer-provided NDAs can be signed where required."
  },
  {
    "question": "Can you help if I don\u2019t have a perfect file?",
    "answer": "Yes. We can help with practical file preparation and CAD-based adjustments so parts print reliably and fit as intended."
  }
];

module.exports = {
  relatedLinks: [
    {
      label: "Get a Quote",
      url: "/quote/",
      text: "Send files, dimensions or a short brief for a fast quote."
    },
    {
      label: "Services",
      url: "/services/",
      text: "See the main printing, design and batch-production options."
    },
    {
      label: "Materials",
      url: "/materials/",
      text: "Compare PLA, PETG, ASA, resin and other common material choices."
    }
  ],
  faqItems
};
