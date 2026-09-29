---
layout: layouts/article.njk
title: "Samus Aran statue: a cleaner FDM print in three parts"
seoTitle: "Samus Aran PLA Statue | Three-Part FDM Printing Case Study"
description: "A customer-supplied character STL printed in white PLA+: how a failed one-piece attempt led to a cleaner three-part statue, assembled and supplied unpainted."
tech: FDM
material: PLA+
summary: "A customer-supplied statue split into three components after a failed one-piece print, then printed at 0.12 mm layers and assembled for delivery."
coverImage: /assets/images/projects/samus-aran-pla-statue-three-part-print/cover.webp
coverAlt: "Completed white PLA+ armoured character statue with an arm cannon on a sculpted display base."
listingImage: /assets/images/projects/samus-aran-pla-statue-three-part-print/preview.webp
listingAlt: "Assembled white character statue and scenic base."
image: /assets/images/og/samus-aran-pla-statue-three-part-print.jpg
ogImageAlt: "White PLA+ character statue assembled on its display base."
note: "Customer STL · 0.12 mm layers · Three-part assembly"
eyebrow: "3D printing case study"
intro: "A large character statue started as a customer-supplied STL. After an unsuccessful attempt to print it in one piece, we separated the design into three components, improved the support strategy and assembled the finished print for delivery."
order: 19
published: "2026-09-28"
lastmod: "2026-09-28"
eleventyComputed:
  lastmod: "2026-09-28"
---

<style>
.page-media { aspect-ratio:auto; max-width:640px; margin-left:auto; margin-right:auto; border:0; }
.page-media img { width:100%; height:auto; object-fit:contain; }
.statue-gallery { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; margin:28px 0 38px; }
.statue-gallery a { display:block; }
.statue-single { grid-template-columns:minmax(0,1fr); max-width:520px; margin-left:auto; margin-right:auto; }
.statue-gallery a:focus-visible { outline:3px solid #ffbf47; outline-offset:4px; }
@media(max-width:640px) { .statue-gallery { grid-template-columns:1fr; } }
</style>

The finished statue appears to depict **Samus Aran from Metroid**, identified visually from the armour and arm cannon. The customer supplied the STL; our work covered print preparation, production, cleanup and assembly.

## Project snapshot

| Item | Details |
| --- | --- |
| Starting point | Customer-supplied STL model |
| Approximate size | Around 18 cm tall including the base; roughly 18 cm across |
| Material | White SUNLU PLA+ |
| Printer | Bambu Lab P2S |
| Print settings | 0.4 mm nozzle, 0.12 mm layer height |
| Revised construction | Main base, raised scenic section and character printed separately |
| Printing time | Approximately 14 hours for the successful set of components |
| Finishing | Minor string cleanup and superglue assembly; supplied unpainted |

## Choosing FDM for the requested size

The client initially considered resin printing. For the requested size, that route would have been considerably more expensive and would have required a large resin printer. We proposed fine-layer FDM printing as a more practical option for this commission.

White PLA+ was used with a 0.4 mm nozzle and 0.12 mm layers. The aim was a detailed physical model that the client could finish themselves, with particular attention to the armour, posed limbs and decorative base.

## The first attempt: too much to support in one piece

The initial attempt printed the statue as a single object and was unsuccessful. The difficult areas were the inclined surfaces and small features within the pose, including parts of the arms, legs and the area beneath the head. These created awkward support requirements between different parts of the model.

The failed print shows loose filament and poor supported areas. It made clear that the preparation needed to change before another attempt.


<div class="statue-gallery photo-gallery statue-single">
<figure><a href="/assets/images/projects/samus-aran-pla-statue-three-part-print/failed-print.webp" target="_blank" rel="noopener" aria-label="Open larger image: Failed one-piece statue print with loose filament around the lower body and base."><img src="/assets/images/projects/samus-aran-pla-statue-three-part-print/failed-print-960.webp" srcset="/assets/images/projects/samus-aran-pla-statue-three-part-print/failed-print-960.webp 782w, /assets/images/projects/samus-aran-pla-statue-three-part-print/failed-print.webp 1565w" sizes="(max-width:640px) calc(100vw - 40px), 520px" width="1565" height="1920" alt="Failed one-piece statue print with loose filament around the lower body and base." loading="lazy" decoding="async"></a><figcaption>The unsuccessful one-piece attempt: loose strands and rough supported areas are visible around the figure and scenery.</figcaption></figure>
</div>


## Separating the model into three components

We split the supplied model into the main base, a raised scenic section and the character itself. Separating the decorative relief from the base made its overhangs easier to manage, while printing the figure independently reduced the need for supports running from one visible part of the model to another.


<div class="statue-gallery photo-gallery">
<figure><a href="/assets/images/projects/samus-aran-pla-statue-three-part-print/base.webp" target="_blank" rel="noopener" aria-label="Open larger image: White printed display base with an open centre and sculpted edge details."><img src="/assets/images/projects/samus-aran-pla-statue-three-part-print/base-960.webp" srcset="/assets/images/projects/samus-aran-pla-statue-three-part-print/base-960.webp 849w, /assets/images/projects/samus-aran-pla-statue-three-part-print/base.webp 1698w" sizes="(max-width:640px) calc(100vw - 40px), 520px" width="1698" height="1920" alt="White printed display base with an open centre and sculpted edge details." loading="lazy" decoding="async"></a><figcaption>The main base printed separately, before assembly.</figcaption></figure>
<figure><a href="/assets/images/projects/samus-aran-pla-statue-three-part-print/scenery.webp" target="_blank" rel="noopener" aria-label="Open larger image: Separate white printed relief section of the statue base."><img src="/assets/images/projects/samus-aran-pla-statue-three-part-print/scenery-960.webp" srcset="/assets/images/projects/samus-aran-pla-statue-three-part-print/scenery-960.webp 812w, /assets/images/projects/samus-aran-pla-statue-three-part-print/scenery.webp 1625w" sizes="(max-width:640px) calc(100vw - 40px), 520px" width="1625" height="1920" alt="Separate white printed relief section of the statue base." loading="lazy" decoding="async"></a><figcaption>The second component carries the raised scenic detail, separated to make the overhangs easier to manage.</figcaption></figure>
</div>


This change improved the overall print quality on the second attempt. It also allowed the successful components to be cleaned up individually before the model was brought together as a single display piece.


<div class="statue-gallery photo-gallery statue-single">
<figure><a href="/assets/images/projects/samus-aran-pla-statue-three-part-print/character.webp" target="_blank" rel="noopener" aria-label="Open larger image: White armoured character with rounded shoulder armour and an arm cannon, without its display base."><img src="/assets/images/projects/samus-aran-pla-statue-three-part-print/character-960.webp" srcset="/assets/images/projects/samus-aran-pla-statue-three-part-print/character-960.webp 735w, /assets/images/projects/samus-aran-pla-statue-three-part-print/character.webp 1471w" sizes="(max-width:640px) calc(100vw - 40px), 520px" width="1471" height="1920" alt="White armoured character with rounded shoulder armour and an arm cannon, without its display base." loading="lazy" decoding="async"></a><figcaption>The character from the second attempt, before being glued to the base components.</figcaption></figure>
</div>


## Light cleanup, assembly and delivery

The successful components took approximately 14 hours to print in total. Post-processing was limited: a brief heat cleanup removed fine PLA hairs, and the three components were bonded with superglue.

There was no painting or extensive surface finishing on our side. The assembled white model was supplied for the client to finish; we do not have photographs of any later paintwork. The close views show the actual FDM surface and detail at handover.


<div class="statue-gallery photo-gallery">
<figure><a href="/assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-angle.webp" target="_blank" rel="noopener" aria-label="Open larger image: Angled view of the completed white statue and multi-level base."><img src="/assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-angle-960.webp" srcset="/assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-angle-960.webp 960w, /assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-angle.webp 1920w" sizes="(max-width:640px) calc(100vw - 40px), 520px" width="1920" height="1357" alt="Angled view of the completed white statue and multi-level base." loading="lazy" decoding="async"></a><figcaption>An angled view of the glued assembly. The surface was supplied unpainted for the client to finish.</figcaption></figure>
<figure><a href="/assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-detail.webp" target="_blank" rel="noopener" aria-label="Open larger image: Close view of the assembled statue showing armour details, arm cannon and sculpted base."><img src="/assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-detail-960.webp" srcset="/assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-detail-960.webp 960w, /assets/images/projects/samus-aran-pla-statue-three-part-print/assembled-detail.webp 1920w" sizes="(max-width:640px) calc(100vw - 40px), 520px" width="1920" height="1471" alt="Close view of the assembled statue showing armour details, arm cannon and sculpted base." loading="lazy" decoding="async"></a><figcaption>A closer view of the armour, pose and scenic base in the completed FDM print.</figcaption></figure>
</div>


The completed statue was packed securely in a box with protective padding and dispatched to the customer. The key improvement came from changing how the model was divided for printing: three manageable components produced a better result than the original one-piece attempt.

## Have a model you would like printed?

Send the STL, the intended finished size and whether you need separate components or an assembled model. Knowing how you plan to finish the piece helps us discuss print preparation and the appropriate process.

Explore our [FDM printing service](/services/fdm/), compare [resin printing](/services/resin/), or [request a quote](/quote/) for your model.
