---
layout: layouts/article.njk
title: "Replacement buttons for an Aston Martin ‘crystal key’ fob (CAD + FDM)"
description: "A repair-focused micro-part project: measured from the original key frame, iterated through prototypes, and printed with a 0.2 mm nozzle for clean fit and readable icons."
tech: FDM
material: PLA
summary: "Custom replacement key buttons designed from measurements, prototyped in iterations, then produced as a small repeat series with crisp icon detail."
coverImage: /assets/images/projects/aston-martin-crystal-key-buttons/cover.webp
coverAlt: "Close-up of replacement key buttons installed in a key fob." 
image: /assets/images/og/aston-martin-crystal-key-buttons.jpg
ogImageAlt: "Replacement key fob buttons printed in PLA with a 0.2 mm nozzle." 
note: "Prototype → small series (20+ orders)"
eyebrow: "Projects"
intro: "From one damaged key to a repeat product: CAD, tolerance tuning, and fine-detail printing for a clean fit and readable icons."
order: 5
---

## Project snapshot

| Item | Details |
| --- | --- |
| Process | FDM (fine detail printing) |
| Material | PLA (black + white for icons) |
| Printer | Bambu Lab A1 Mini |
| Nozzle | 0.2 mm |
| Iterations | ~5 prototype rounds |
| Turnaround | ~2–3 days |
| Quantity | 20+ shipped orders (after the initial repair) |

## The problem

A customer had a damaged Aston Martin “crystal key” style fob: the outer frame remained, but the **buttons were missing**. The goal was to produce replacement buttons that fit correctly, press smoothly, and look close to the original.

## What mattered

Small parts like this are all about tolerances:

- Too tight → buttons bind and don’t return cleanly
- Too loose → buttons rattle or fall out
- Icons must stay readable at very small scale

## Workflow

### 1) Measure the original frame (design from real geometry)

The client sent the remaining outer frame, which allowed accurate measurement of the openings and seating geometry. CAD was built around real fit constraints rather than “guessing by photo”.

### 2) Iterative prototyping (fit and button feel)

Several variants were tested: different surface textures, different clearances, and multiple internal approaches depending on the key design (with or without a rubber membrane behind the buttons).

<figure>
  <img src="{{ '/assets/images/projects/aston-martin-crystal-key-buttons/04-test-fit-white-buttons.webp' | url }}" alt="Test-fit white prototype buttons installed in the key frame." loading="lazy" decoding="async">
  <figcaption>Prototype rounds were used to tune clearances and ensure smooth movement.</figcaption>
</figure>

### 3) Final design: four independent buttons with crisp icons

The best solution was four separate buttons printed in **black PLA** with **white icons**. Printing was done with a **0.2 mm nozzle** so edges and symbols stayed crisp.

<figure>
  <img src="{{ '/assets/images/projects/aston-martin-crystal-key-buttons/01-buttons-on-printer-bed.webp' | url }}" alt="Four small replacement buttons on the printer bed during production." loading="lazy" decoding="async">
  <figcaption>Fine-detail FDM with a 0.2 mm nozzle helps keep small icons sharp.</figcaption>
</figure>

Depending on the version, rear features (plungers) were tested to match different internal key constructions.

<figure>
  <img src="{{ '/assets/images/projects/aston-martin-crystal-key-buttons/07-rear-view-with-plungers.webp' | url }}" alt="Rear view of the replacement buttons showing the integrated plungers." loading="lazy" decoding="async">
  <figcaption>Rear plungers were explored for keys that require that internal geometry.</figcaption>
</figure>

## Result

The customer confirmed a good fit, clean button feel, and readable icons. After the successful repair, the design became a small repeat product with **20+ orders shipped worldwide**. The original repair job was priced at **£20**.

<figure>
  <img src="{{ '/assets/images/projects/aston-martin-crystal-key-buttons/05-installed-buttons-in-hand.webp' | url }}" alt="Replacement buttons installed in the key fob, shown in hand." loading="lazy" decoding="async">
  <figcaption>Final installed buttons: consistent fit, clean edges, and readable icons.</figcaption>
</figure>

## Notes

This is an aftermarket replacement/repair project and is not affiliated with the vehicle manufacturer. Brand names are used only to describe compatibility.

Related: **[FDM 3D Printing]({{ '/services/fdm/' | url }})**, **[PLA]({{ '/materials/pla/' | url }})**, **[3D Design & File Support]({{ '/services/design-support/' | url }})**, **[Get a Quote]({{ '/quote/' | url }})**.
