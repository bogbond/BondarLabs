---
layout: layouts/article.njk
title: "Multi-layer 3D printed hanging sign for ArmMed Designs"
description: "Custom three-layer PLA logo sign with a carbon-textured base, embedded metal rings and floating elements — designed in Fusion 360 and printed on a Bambu Lab P1S."
tech: FDM
material: PLA
summary: "A three-layer brand sign with a carbon-textured face, embedded mounting rings, and floating red/white elements."
coverImage: /assets/images/projects/armmed-designs-hanging-sign/cover.webp
coverAlt: "ArmMed Designs 3D printed hanging sign in red, white and black."
image: /assets/images/og/armmed-designs-hanging-sign.jpg
ogImageAlt: "ArmMed Designs multi-layer 3D printed hanging sign."
note: "Collaboration test piece (one-off)"
eyebrow: "Projects"
intro: "A textured black base, floating brand layers, and hidden hardware — built as a first prototype and finished with minimal post-processing."
order: 1
---

## Project snapshot

| Item | Details |
| --- | --- |
| Process | FDM (multi-part assembly, multi-colour PLA) |
| Material | PLA (black / red / white) |
| Printer | Bambu Lab P1S |
| Size | ~25 × 12.5 × 1.5 cm |
| Quantity | 1 piece |
| Time | ~2 hours CAD + ~6 hours printing |
| Finish | Light internal sanding + quick flame pass to remove PLA micro-strings |

## The brief

Create a **branded hanging sign** in the ArmMed Designs style: bold contrast, crisp lettering, and a premium look without paint. This was a first-time build from scratch, so the goal was to validate the full workflow — logo preparation, CAD, printing, and assembly.

## What mattered

- A clean front face (no visible fasteners)
- Accurate colour match (red/white on black)
- “Floating” stacked layers that align perfectly
- A solid, durable base with a quality texture

## Design and print approach

### 1) Textured black base (printed face-down)

The base is a rounded rectangle printed in **black PLA** at **100% infill** for a solid feel. It was printed **face-down** on a carbon-texture build plate, so the visible front surface picked up the pattern automatically.

<figure>
  <img src="{{ '/assets/images/projects/armmed-designs-hanging-sign/03-angled-carbon-texture.webp' | url }}" alt="Angled view of the ArmMed Designs sign showing the carbon-textured front surface." loading="lazy" decoding="async">
  <figcaption>Printing face-down on a textured plate gives a premium finish without paint or vinyl.</figcaption>
</figure>

### 2) Embedded metal rings for a clean hanging mount

Instead of adding hooks after the fact, the mounting hardware is built into the print. Two upper rear standoffs were designed with holes for metal rings. During printing, the job was paused, the rings were inserted, and printing resumed — capturing them inside the part.

A ~40 cm steel chain was then attached to the rings.

<figure>
  <img src="{{ '/assets/images/projects/armmed-designs-hanging-sign/04-closeup-hidden-mounts.webp' | url }}" alt="Close-up of the raised lettering and hidden mounting features on the ArmMed Designs sign." loading="lazy" decoding="async">
  <figcaption>Hidden mounting points keep the front clean while still giving a strong hanging solution.</figcaption>
</figure>

### 3) Floating red background + floating white lettering

The design uses three physical layers:

- **Black base** (full sign)
- **Red panel** behind “ARMED” (appears to float above the base)
- **White “ARMED” lettering** (appears to float above the red panel)

To make assembly repeatable, each layer includes positioning features: shallow pockets on one side and matching tabs/standoffs on the other, with a tight clearance (a few millimetres). Parts were joined with a small amount of **cyanoacrylate (super glue)**.

<figure>
  <img src="{{ '/assets/images/projects/armmed-designs-hanging-sign/05-closeup-designs-lettering.webp' | url }}" alt="Close-up of the white 'DESIGNS' lettering on the ArmMed Designs sign." loading="lazy" decoding="async">
  <figcaption>Layered lettering adds depth and makes the sign readable from a distance.</figcaption>
</figure>

### 4) Logo workflow: JPEG → vector → Fusion 360

The logo started as a raster image. It was vectorised, imported into **Fusion 360**, and cleaned up so the typography would print reliably. Hidden rear supports were shaped to follow the lettering while staying visually discreet.

### 5) Print settings and minimal cleanup

The sign was printed at **0.16 mm layer height** at around **220°C** (PLA). Post-processing was intentionally light: sanding inside letter faces where needed and a quick flame pass to remove micro-hairs.

## Result

A durable, high-contrast brand sign with a textured base and clean floating layers — a good template for future branded signage projects (different sizes, fonts, logos, colours, and background textures).

<figure>
  <img src="{{ '/assets/images/projects/armmed-designs-hanging-sign/02-front-hanging-light-wood.webp' | url }}" alt="Front view of the ArmMed Designs hanging sign on a light wooden background." loading="lazy" decoding="async">
  <figcaption>The same design works well in different lighting/backgrounds — useful for storefronts, studios, or events.</figcaption>
</figure>

Related: **[FDM 3D Printing]({{ '/services/fdm/' | url }})**, **[PLA]({{ '/materials/pla/' | url }})**, **[3D Design & File Support]({{ '/services/design-support/' | url }})**, **[Get a Quote]({{ '/quote/' | url }})**.
