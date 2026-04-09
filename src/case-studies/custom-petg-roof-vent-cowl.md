---
layout: layouts/article.njk
title: "Custom PETG roof vent cowl designed from a hand sketch"
description: "A one-off outdoor roof vent cowl designed in Fusion 360 from a client sketch, printed in PETG, strength-tested, refined and installed."
tech: FDM
material: PETG
summary: "From hand sketch to installed outdoor part: bespoke CAD, PETG printing, failure analysis and a successful second version."
coverImage: /assets/images/projects/custom-petg-roof-vent-cowl/cover.webp
coverAlt: "Installed and painted outdoor roof vent cowl photographed on the client’s building."
listingImage: /assets/images/projects/custom-petg-roof-vent-cowl/preview.webp
listingAlt: "Preview card image for the custom PETG roof vent cowl project."
image: /assets/images/og/custom-petg-roof-vent-cowl.jpg
ogImageAlt: "Custom PETG roof vent cowl installed outdoors after painting."
note: "Custom CAD + production (£40)"
eyebrow: "Projects"
intro: "A full custom job that started with a sketch and ended with an installed, painted outdoor vent part — but only after proper testing and a print-strategy rethink."
order: 13
published: "2026-04-08"
lastmod: "2026-04-08"
---

## Project snapshot

| Item | Details |
| --- | --- |
| Process | FDM |
| Material | Black PETG |
| CAD | Designed from scratch in Fusion 360 |
| Source material | Client hand sketch + reference photo |
| Application | Outdoor roof / wall vent cowl |
| Print strategy | PETG model with PLA support interface layers |
| Post-processing | Light cleanup only |
| Price | £40 for design and production |

## The brief

A client approached me with a **hand-drawn sketch**, the key dimensions and a reference image showing the style of outdoor part he wanted. The job was to design and produce a custom vent cap / vent cowl for installation on an exterior pipe, with the finished part later painted by the client after delivery.

This kind of project is a good example of how many real-world jobs start: not with a ready-made file, but with a simple idea communicated through measurements, reference pictures and a short discussion about how the part will be used.

## Turning a sketch into a printable model

After clarifying the use case and dimensions in messages, I built the part from scratch in **Fusion 360**. During the design phase, I sent the client rendered previews so he could confirm that the proportions and overall form matched his expectation before material was committed to a full print.

<figure>
  <img src="{{ '/assets/images/projects/custom-petg-roof-vent-cowl/06-cad-render.webp' | url }}" alt="Rendered CAD view of the custom roof vent cowl before printing." loading="lazy" decoding="async">
  <figcaption>The CAD stage made it possible to confirm the overall shape and proportions with the client before production started.</figcaption>
</figure>

## Why PETG was chosen

Because the part was intended for **outdoor use**, material choice mattered. Sunlight, moisture and temperature changes all had to be considered. The client planned to paint the part, which helps protect the exterior, but the inside of the geometry could still be exposed over time.

For that reason, **PETG** was the safest budget-conscious choice. It offered better environmental durability than PLA while staying more affordable than moving into a higher-cost ABS or ASA workflow for a one-off custom job.

## First print, testing and failure analysis

The first print looked good, but appearance alone was not enough. Because the part would be installed on a pipe outdoors, I ran a controlled manual stress test to check how it behaved under realistic handling force.

That test exposed a structural weakness. The lower section separated from the upper cowl, even though the print had visually looked successful.

<figure>
  <img src="{{ '/assets/images/projects/custom-petg-roof-vent-cowl/02-print-progress-near-completion.webp' | url }}" alt="Custom PETG roof vent cowl near the end of the print on the printer bed." loading="lazy" decoding="async">
  <figcaption>The part was large enough, and the overhang demanding enough, that print strategy mattered just as much as the geometry itself.</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/images/projects/custom-petg-roof-vent-cowl/07-failed-first-print-after-crash-test.webp' | url }}" alt="Failed first version of the roof vent cowl after a manual strength test." loading="lazy" decoding="async">
  <figcaption>The first version failed a manual strength test, which made it possible to fix the problem before the client ever tried to install it.</figcaption>
</figure>

After investigating the result, the issue pointed to **poor interlayer strength caused by contamination during material switching**. To make support removal cleaner on the decorative overhangs, I had used PLA interface layers against the PETG print. The deeper cause of the failure turned out to be insufficient purging during those PLA-to-PETG transitions on the printer.

## Refinement, second print and successful outcome

The solution involved both design and process changes. I increased the thickness of the critical wall section, raised the purge volume significantly and added a **prime tower** so the nozzle and hotend were cleaned much more thoroughly when switching between materials.

The second version passed the checks and only needed light finishing to remove minor stringing.

<figure>
  <img src="{{ '/assets/images/projects/custom-petg-roof-vent-cowl/04-part-in-hand-with-support-interface.webp' | url }}" alt="Inside of the custom vent cowl showing the support-contact area in hand." loading="lazy" decoding="async">
  <figcaption>The support strategy was chosen to protect the visible outer finish, but it also demanded careful purge settings to keep the PETG structure clean and strong.</figcaption>
</figure>

I also sent the client both the successful part and the failed sample. That turned out to be useful rather than wasteful: the spare sample let the client test paint adhesion and fit without risking the final decorative piece.

## Result

The client later painted the finished cowl, installed it on the building and shared a positive review together with a real-world photo of the installed part.

<figure>
  <img src="{{ '/assets/images/projects/custom-petg-roof-vent-cowl/08-installed-and-painted-by-client.webp' | url }}" alt="Painted custom roof vent cowl installed on the outside of a brick building." loading="lazy" decoding="async">
  <figcaption>The finished part in real use: painted by the client and installed outdoors on the building.</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/images/projects/custom-petg-roof-vent-cowl/05-client-review-screenshot.webp' | url }}" alt="Screenshot of the client’s positive review for the custom vent cowl project." loading="lazy" decoding="async">
  <figcaption>Positive client feedback completed the project and confirmed that the extra testing and redesign work had paid off.</figcaption>
</figure>

This is one of the strongest examples on the site because it shows the full workflow honestly: idea, sketch, CAD, printing, testing, failure analysis, redesign and final installation.

Related: **[FDM 3D Printing]({{ '/services/fdm/' | url }})**, **[PETG]({{ '/materials/petg/' | url }})**, **[3D Design & File Support]({{ '/services/design-support/' | url }})**, **[Get a Quote]({{ '/quote/' | url }})**.
