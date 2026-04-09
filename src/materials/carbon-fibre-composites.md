---
layout: layouts/article.njk
title: Carbon-fibre composites
seoTitle: "Carbon-Fibre Composite 3D Printing Material Guide"
category: FDM
summary: "Stiffer, more dimensionally stable parts for tooling, fixtures and functional components — with a premium matte finish."
description: "Carbon-fibre composite 3D printing for stiff trays, tooling, fixtures and matte-finish functional parts where rigidity matters."
image: "/assets/images/og/carbon-fibre-asa-tray.jpg"
ogImageAlt: "Matte black carbon-fibre ASA tray printed with a clean layered finish."
intro: "Carbon‑fibre reinforced filaments are chosen when stiffness and stability matter more than flexibility — ideal for jigs, fixtures and rigid brackets."
order: 7
---

## Carbon-fibre composites in plain English

In 3D printing, “carbon‑fibre” usually means a **carbon‑fibre reinforced filament** — a base plastic (often PLA, PETG, or Nylon) mixed with short carbon fibres. The fibre reinforcement typically increases **stiffness** and can improve **dimensional stability**, especially in larger parts.

It’s important to set expectations correctly: carbon‑fibre composites don’t automatically make a part “stronger in every way”. They often become stiffer and more stable, but can also be **more brittle** depending on the base polymer and geometry.

---

## At a glance

| Topic | What to expect |
| --- | --- |
| Best for | Jigs, fixtures, rigid brackets, tooling, functional parts where stiffness matters |
| Surface look | Often a premium matte texture; hides layer lines well |
| Stiffness | Typically higher than the base polymer |
| Dimensional stability | Often improved (especially for larger, rigid geometries) |
| Impact behaviour | Can be more brittle than non‑reinforced plastics (geometry dependent) |
| Printing considerations | Composite filaments are abrasive; model suitability confirmed per job |
| Alternatives | **[PETG]({{ '/materials/petg/' | url }})** for tough general parts · **[Nylon]({{ '/materials/nylon/' | url }})** for fatigue/wear |

---

## When composites are worth it

Carbon-fibre composites make sense when:

- you need a part to feel **rigid and “tool-like”**
- you care about **dimensional stability** in a larger part
- you’re building **fixtures** that must hold alignment
- you want a premium matte surface for a functional component
- you’re replacing a metal part where stiffness is the primary goal (within realistic limits)

Common examples:
- drill guides, jigs, and workholding fixtures
- camera/rig brackets that must not flex
- alignment tools and templates
- rigid mounts and adapters

---

## What composites don’t solve

### Layer direction still matters
Carbon fibre does not remove the basic rule of FDM printing: strength depends on orientation. A part can still break along layers if loaded the wrong way. We’ll orient prints to support the real load direction.

### Not always ideal for snap-fits
Some composite filaments are less forgiving in flexing features. If a design relies on bending clips, a tough material like PETG or Nylon can be a better choice.

### Not always the best value
Composite filaments are more expensive and can require special handling. We recommend them when their benefits are meaningful for your use case.

---

## Design tips for carbon-fibre composites

### 1) Design for stiffness (not flex)
Composites are excellent for stiff geometries: ribs, thicker sections, brackets, fixtures. If you need something to flex repeatedly, consider TPU or a tougher non‑reinforced plastic.

### 2) Avoid razor-thin edges
Thin edges can chip. Use fillets and avoid sharp transitions.

### 3) Use inserts and hardware where appropriate
For durable assembly points, we can design for inserts and fasteners so the part behaves like a real tool component.

---

## What we can supply

We commonly work with **carbon‑fibre reinforced PLA** for rigid, clean-looking parts. Other composite grades (e.g., PETG‑CF or Nylon‑CF) can be sourced on request when the project benefits from them. Availability and lead time are confirmed upfront.

If you’re not sure whether a composite is worth it, send the use case and we’ll recommend a sensible option (sometimes PETG is the smarter answer).

---

## FAQ

### Will carbon-fibre filament make my part “as strong as metal”?
No — it can make parts stiffer and more stable, but the final performance depends on geometry, orientation, and load type. We’ll help set realistic expectations.

### Is the surface finish better?
Often yes. Many composite filaments have a matte texture that hides layer lines nicely.

### Can you print small detailed parts in composites?
It depends. Composites can be less friendly for tiny fine features. We’ll confirm suitability based on your model.

