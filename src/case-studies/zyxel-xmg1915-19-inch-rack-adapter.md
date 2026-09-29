---
layout: layouts/article.njk
title: "Zyxel XMG1915-10E: from a two-part rack adapter to a one-piece print"
description: "A 19-inch rack adapter for the Zyxel XMG1915-10E, developed from a customer's chosen model into a one-piece PLA or PETG print for repeat orders."
seoTitle: "Zyxel XMG1915-10E 19-inch Rack Adapter"
tech: FDM
material: PLA / PETG
summary: "An individual rack-mount request became a repeat product: first printed and joined in two halves, then adapted for one-piece production on a larger printer."
coverImage: /assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/cover.webp
coverAlt: "Finished black one-piece rack adapter with an open basket and slotted front panel, viewed at an angle."
listingImage: /assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/card-fullbleed-1200.webp
listingAlt: "One-piece black rack adapter for a Zyxel XMG1915-10E switch."
image: /assets/images/og/zyxel-xmg1915-19-inch-rack-adapter.jpg
ogImageAlt: "Finished 19-inch rack adapter for the Zyxel XMG1915-10E."
note: "PLA £22 / PETG £28 · delivery extra"
eyebrow: "Projects"
intro: "A customer needed to put a compact network switch into a 19-inch rack. The first order solved that immediate problem; repeat demand led to a simpler, one-piece production version."
order: 16
published: "2026-09-15"
lastmod: "2026-09-15"
eleventyComputed:
  lastmod: "2026-09-15"
---

<style>
.page-media { aspect-ratio:auto; }
.page-media img { height:auto; object-fit:contain; }

.rack-video { position:relative; aspect-ratio:16/9; background:#111; border-radius:12px; overflow:hidden; }
.rack-video video { display:block; width:100%; height:100%; }
.rack-video button { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); padding:14px 22px; border:2px solid white; border-radius:8px; background:#141414; color:white; font:inherit; cursor:pointer; }
.rack-video button[hidden] { display:none; }
.rack-video button:focus-visible { outline:3px solid #ffbf47; outline-offset:4px; }
</style>

## Project snapshot

| Item | Details |
| --- | --- |
| Application | 19-inch rack adapter for a Zyxel XMG1915-10E switch |
| Starting point | Existing model selected by the first customer |
| Development | Two joined halves, followed by a one-piece adaptation |
| Process | FDM, 0.4 mm nozzle, 0.2 mm layers, 100% infill |
| Materials | PLA or PETG |
| Printing time | Approximately 14 hours |
| Usual dispatch | 1–2 working days |
| Price at the time of this case study | £22 in PLA or £28 in PETG; delivery extra |

## A practical solution without a full design bill

The enquiry came from an eBay customer who had seen our smaller, 10-inch rack adapters. This time, the requirement was to mount a **Zyxel XMG1915-10E** in a **19-inch rack**, with a fitted holder rather than a generic shelf.

Before charging for measurements and a new CAD design, we suggested looking for an existing printable model. We helped with the search, and the customer selected a design they considered suitable for their switch and rack. Our first task was to assess and produce that model, rather than create the original geometry from scratch.

The order stayed on the customer's original platform, with the listing setting out exactly what would be supplied.

## The first version: two parts, joined after printing

The selected model was split into two interlocking parts so it could be produced on a printer with a build volume of roughly 256 mm. We printed the first adapter in **PLA**, removed the supports and glued the mating sections together.

PLA kept the initial order affordable and worked well for the supported geometry and the fit of the joining features.

<figure class="rack-figure photo-portrait">
  <img src="{{ '/assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/two-part-print.webp' | url }}" width="1500" height="2000" alt="Two black sections of the original adapter on a white table, with branching supports still attached to the basket." loading="lazy" decoding="async">
  <figcaption>The early version was printed in separate sections. Here, supports remain inside the basket before cleanup and joining.</figcaption>
</figure>

<figure class="rack-figure photo-landscape">
  <img src="{{ '/assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/joint-detail.webp' | url }}" width="2000" height="1500" alt="Close view of the joining area between the front panel sections and the open basket." loading="lazy" decoding="async">
  <figcaption>The first design included mating features for alignment before the two sections were glued together.</figcaption>
</figure>

<figure>
  <div class="rack-video">
    <video id="rack-print-video" width="1280" height="720" preload="none" playsinline muted poster="{{ '/assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/video-poster.webp' | url }}" aria-label="Eight-second silent clip of the early two-part adapter being printed"></video>
    <button type="button" id="rack-play" data-video-src="{{ '/assets/videos/zyxel-xmg1915-19-inch-rack-adapter/early-print.mp4' | url }}">▶ Play printing clip</button>
  </div>
  <figcaption>Eight seconds from the early two-part print, showing the basket and its supports. Silent clip.</figcaption>
  <noscript><p><a href="{{ '/assets/videos/zyxel-xmg1915-19-inch-rack-adapter/early-print.mp4' | url }}">Open the silent printing clip (1.6 MB)</a></p></noscript>
</figure>

## Repeat demand made a one-piece version worthwhile

Further orders followed the first listing. For repeat production, we adapted the model by joining the geometry into a **single printable part**.

The larger **Creality Ender 5 Max**, with its 400 × 400 × 400 mm build volume, made this possible: the long adapter is placed **diagonally across the bed**. The current version removes the glued joint and the separate joining step, giving the front panel a continuous appearance.

<figure class="rack-figure photo-landscape">
  <img src="{{ '/assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/one-piece-print.webp' | url }}" width="2000" height="1500" alt="Long rack adapter positioned diagonally on the Creality printer bed, with supports beneath the basket openings." loading="lazy" decoding="async">
  <figcaption>The larger printer accommodates the complete adapter diagonally, allowing the body to be printed as one part.</figcaption>
</figure>

<figure class="rack-figure photo-landscape">
  <img src="{{ '/assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/before-support-removal.webp' | url }}" width="2000" height="840" alt="One-piece black adapter on a white table with branching support material still filling its basket." loading="lazy" decoding="async">
  <figcaption>The one-piece print still needs finishing: these temporary supports are removed to open up the basket.</figcaption>
</figure>

## A close-fitting basket with access for cables

The front panel mounts to the rack, while the basket behind it locates the switch. The device slides in from the front and is retained by the close fit, side structure and rear stops.

The front remains open for access to the ports. Small rear retaining edges leave room for connections at the back, and the slots in the wider faceplate provide routes for cables between the front and rear of the rack.

<figure class="rack-figure photo-landscape">
  <img src="{{ '/assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/front-cable-slots.webp' | url }}" width="1840" height="660" alt="Front view of the finished black adapter showing the switch opening and long cable-routing slots." loading="lazy" decoding="async">
  <figcaption>After support removal, the device opening and cable-routing slots are clear. The basket sits behind the front panel.</figcaption>
</figure>

<figure class="rack-figure photo-landscape">
  <img src="{{ '/assets/images/projects/zyxel-xmg1915-19-inch-rack-adapter/installation-illustration.webp' | url }}" width="1600" height="1199" alt="Illustrative view of a Zyxel switch positioned inside the rack adapter." loading="lazy" decoding="async">
  <figcaption>AI-assisted illustration showing the intended device position. This is not a photograph of a customer installation.</figcaption>
</figure>

## Materials, finish and ordering

The adapter is available in **PLA or PETG**, printed with a **0.4 mm nozzle, 0.2 mm layers and 100% infill**. Printing takes approximately **14 hours**, followed by support removal and cleanup.

PLA is the lower-cost option used for the original order. PETG was added as an alternative for customers whose installation requirements favour that material. Tell us about the installation environment when choosing between the two materials.

At the time of writing, the price is **£22 in PLA** or **£28 in PETG**, with the same price across the offered colours: **black, grey, white, red, blue, green, yellow and orange**. Delivery is charged separately according to the selected service. Orders are usually dispatched within **1–2 working days**.

## From one enquiry to eight orders

By the time of this case study, the adapter had received **eight orders**. Buyer feedback included positive comments about the item, print quality, communication and speed of service.

The useful change was in the production process: an affordable first order established demand, and a larger printer then made it practical to produce the adapter without an assembly joint.

Need a holder for different network equipment? Send the **exact device model, rack size and any clearance requirements**. We can assess an existing file or discuss a custom adaptation.

Related: **[10-inch rack adapters]({{ '/case-studies/custom-10-inch-rack-mount-adapters/' | url }})**, **[PLA]({{ '/materials/pla/' | url }})**, **[PETG]({{ '/materials/petg/' | url }})**.

<script>
(function () {
  const button = document.getElementById('rack-play');
  const video = document.getElementById('rack-print-video');
  button.addEventListener('click', function () {
    if (!video.getAttribute('src')) video.src = button.dataset.videoSrc;
    video.controls = true;
    button.hidden = true;
    video.focus();
    video.play().catch(function () { button.hidden = false; });
  });
})();
</script>
