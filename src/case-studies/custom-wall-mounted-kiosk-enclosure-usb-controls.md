---
layout: layouts/article.njk
title: "Custom wall-mounted kiosk: enclosure, USB controls and electronics integration"
seoTitle: "Custom Kiosk Enclosure & USB Controls Case Study"
description: "A real kiosk build combining large-format 3D printing, enclosure redesign, Arduino USB buttons, labelled wiring and tablet integration for a private client."
tech: FDM + electronics
material: PLA
summary: "A six-part print request developed into a four-section kiosk enclosure with eight illuminated buttons, custom USB keyboard firmware and an integrated wiring harness."
coverImage: /assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/cover-v2.webp
coverAlt: "AI-assisted cover of the assembled grey kiosk with its tablet, illuminated buttons, keypad and authentication-device holder."
listingImage: /assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/preview-v2.webp
listingAlt: "Assembled kiosk with a fitted tablet, illuminated green buttons and a metal keypad."
image: /assets/images/og/custom-wall-mounted-kiosk-enclosure-usb-controls-v2.jpg
ogImageAlt: "Assembled kiosk with a fitted tablet and integrated illuminated controls; AI-assisted cover."
note: "Redesign, firmware, wiring and assembly · £1,000+ labour"
eyebrow: "Engineering case study"
intro: "What began as a six-part enclosure print grew into a working hardware assembly: a redesigned body, eight illuminated controls, custom USB firmware, a metal keypad and a carefully routed wiring harness."
order: 17
published: "2026-09-15"
lastmod: "2026-09-15"
eleventyComputed:
  lastmod: "2026-09-15"
---

<style>
.page-media { aspect-ratio:auto; }
.page-media img { display:block; height:auto; object-fit:contain; }
.kiosk-gallery { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; margin:28px 0 38px; }
.kiosk-gallery figure { min-width:0; margin:0; }
.kiosk-gallery a { display:block; }

.kiosk-gallery figcaption { margin-top:10px; font-size:.9rem; line-height:1.55; }
.kiosk-toc { padding:20px 24px; border:1px solid #7776; border-radius:14px; margin:28px 0; }
.kiosk-toc ol { columns:2; padding-left:22px; margin:10px 0 0; }
.kiosk-toc li { break-inside:avoid; margin-bottom:8px; }
.kiosk-toc a { text-decoration:underline; text-underline-offset:3px; }
.kiosk-caption { font-size:.9rem; opacity:.8; margin-top:0; }
h2[id] { scroll-margin-top:110px; }
.kiosk-video { position:relative; aspect-ratio:16/9; background:#111; border-radius:12px; overflow:hidden; }
.kiosk-video video { display:block; width:100%; height:100%; }
.kiosk-video button { position:absolute; inset:0; margin:auto; width:max-content; max-width:90%; height:max-content; padding:14px 22px; border:2px solid white; border-radius:8px; background:#141414; color:white; font:inherit; cursor:pointer; }
.kiosk-video button[hidden] { display:none; }
.kiosk-video button:focus-visible,.kiosk-gallery a:focus-visible { outline:3px solid #ffbf47; outline-offset:4px; }
.kiosk-flow { display:flex; flex-wrap:wrap; gap:10px; align-items:center; padding:18px; border:1px solid #7776; border-radius:12px; margin:24px 0; }
.kiosk-flow span { flex:1 1 170px; padding:12px; border:1px solid #7776; border-radius:8px; text-align:center; }
@media(max-width:640px) { .kiosk-gallery { grid-template-columns:1fr; gap:26px; } .kiosk-toc ol { columns:1; } }
</style>

<p class="kiosk-caption">The assembled terminal with its tablet and controls fitted. AI-assisted cover treatment; original workshop photographs of the front and rear appear in the handover section below.</p>

## The project at a glance

Bondar Labs modified a customer-supplied enclosure design into a **wall-mounted tablet kiosk**, combining mechanical changes with physical controls and electronics. The intended application was access to online banking for people without a personal computer or smartphone. The client’s separate software developer handled the tablet application; our work covered the enclosure, button-controller firmware, wiring and hardware integration.

The project progressed through **two main physical versions**, with small fit-test parts between them. During the second phase we met the client in London, measured the supplied hardware, developed the assembly and tested it together at handover.

| Item | Project details |
| --- | --- |
| Starting point | Customer-supplied six-part enclosure model |
| Revised structure | Four main body sections, plus small mounts and retainers |
| Printing | Grey PLA; 0.4 mm nozzle; 0.2 mm layers; 100% infill for the final body |
| Assembly | M5 bolts, nuts and washers at revised fixing locations |
| Controls | Eight illuminated buttons, metal keypad and authentication-device holder |
| Controller | Arduino Pro Micro, ATmega32U4, 5 V / 16 MHz |
| Interface | USB keyboard events for the tablet application |
| Finish | Sanding, local automotive filler, primer and aerosol paint |
| Second-stage duration | Approximately two months of active collaboration |
| Second-stage labour | £1,000+, excluding components and the initial print stage |
| Handover | Tablet fitted and operation checked with the client |

<nav class="kiosk-toc" aria-label="Case study contents">
<strong>Explore the build</strong>
<ol>
<li><a href="#brief">From printing to integration</a></li>
<li><a href="#fit">Measuring and testing the fit</a></li>
<li><a href="#structure">Reworking the body and fixings</a></li>
<li><a href="#printing">Large-format printing and finishing</a></li>
<li><a href="#controls">Physical buttons and USB firmware</a></li>
<li><a href="#wiring">Wiring, labels and bench tests</a></li>
<li><a href="#integration">Tablet retention and power</a></li>
<li><a href="#handover">Checks, documentation and handover</a></li>
<li><a href="#next-project">Planning a similar enclosure</a></li>
</ol>
</nav>

<h2 id="brief">From a print request to a complete hardware assembly</h2>

The first request was straightforward: print six supplied parts in grey PLA. At that stage, the customer already had a model and needed a physical enclosure to evaluate. That initial printing stage took approximately a week.

Around six months later, the client returned with a broader set of changes. An in-person meeting at their London office let us review the body alongside the equipment it needed to accommodate. The work expanded beyond reproducing the original files: component access, section joints, screen visibility, button operation and wiring all needed attention.

Some changes came directly from the client. Others were proposals from Bondar Labs, including a more secure mechanical pocket for the authentication device, revised fixings and real illuminated controls in place of imitation buttons and labels.

<div class="kiosk-gallery photo-gallery">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/first-six-part-body.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Initial grey enclosure assembled from six main printed sections."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/first-six-part-body-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/first-six-part-body-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/first-six-part-body.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Initial grey enclosure assembled from six main printed sections." loading="lazy" decoding="async"></a><figcaption>The first body established the overall form using the customer’s six-part model.</figcaption></figure>
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/tablet-clearance-measurement.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Calipers measuring clearance beside the tablet at the rear of the enclosure."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/tablet-clearance-measurement-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/tablet-clearance-measurement-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/tablet-clearance-measurement.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Calipers measuring clearance beside the tablet at the rear of the enclosure." loading="lazy" decoding="async"></a><figcaption>Measurements taken with the client’s tablet helped locate the power-button access opening.</figcaption></figure>
</div>


<h2 id="fit">Measuring the hardware and testing the difficult fits</h2>

The enclosure had to accommodate a Microsoft Surface tablet, a metal keypad and a separate bank authentication device. The client supplied these principal devices; we sourced the buttons, controller, connectors, wiring and USB hub needed to integrate them.

Because the tablet remained with the client during development, measurements were recorded during the office visit and photographed for reference. These informed a small access opening for its power button and clearance around the camera and microphones. The screen recess was also opened out to improve the viewing angle from above.

### A small keypad prototype before a large reprint

Rather than reprint the entire body to test the keypad, we isolated the relevant area of the model and made a small PLA test section. This gave access to both the visible opening and the underside of the keypad.

The trial exposed where mounting holes and clearances needed adjustment. Checking the cable route and fixing positions on a small part made those corrections much easier to evaluate before committing to the main enclosure sections.

<div class="kiosk-gallery photo-gallery photo-gallery--mixed">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-front.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Metal keypad seated in a small white 3D-printed test section."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-front-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-front-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-front.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Metal keypad seated in a small white 3D-printed test section." loading="lazy" decoding="async"></a><figcaption>A small test section checked the keypad opening before committing to another full enclosure print.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-rear.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Rear of the keypad fit prototype showing its metal backplate, bolts and cable."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-rear-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-rear-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/keypad-fit-rear.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Rear of the keypad fit prototype showing its metal backplate, bolts and cable." loading="lazy" decoding="async"></a><figcaption>The rear view exposed the fixing positions and cable clearance that needed adjustment.</figcaption></figure>
</div>

### A sliding pocket with a removable keeper

The client initially considered attaching the authentication device with double-sided tape. We instead designed a fitted pocket: the device slides down from the top, and a bolted retaining strip closes the exit above it.

That gives the device a defined position and a mechanical means of retention while leaving its display and buttons accessible. It also provides a deliberate way to remove the unit for replacement by undoing the retaining strip.

<div class="kiosk-gallery photo-gallery">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/authentication-device-retainer.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Authentication device held in a printed pocket with a bolted retaining strip above it; its display is blank."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/authentication-device-retainer-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/authentication-device-retainer-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/authentication-device-retainer.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Authentication device held in a printed pocket with a bolted retaining strip above it; its display is blank." loading="lazy" decoding="async"></a><figcaption>The device slides into a fitted pocket and is retained by the top strip secured with two bolts.</figcaption></figure>
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-controls-closeup.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Close view of the completed front controls and tablet fitted in the kiosk."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-controls-closeup-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-controls-closeup-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-controls-closeup.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Close view of the completed front controls and tablet fitted in the kiosk." loading="lazy" decoding="async"></a><figcaption>Closer view of the tablet opening, illuminated buttons, keypad and retained authentication device in the assembled unit.</figcaption></figure>
</div>


<h2 id="structure">Reducing the main body from six sections to four</h2>

The next version merged adjacent geometry to reduce the body from **six main printed sections to four**. Fewer section boundaries meant fewer joints to align and finish, while the overall assembly remained practical to print and handle.

The original model used M3 fixing holes. We revised the connections for **M5 bolts, washers and nuts**, and moved fixing positions to support the important joints. This was a change to the joint layout as well as the bolt size: internal flanges and access for assembly had to work together.

The rear remained open. The intended mounting arrangement places it against a wall, with maintenance access obtained by taking the enclosure down. This also left the wiring and internal fixings accessible during construction.

<div class="kiosk-gallery photo-gallery photo-gallery--mixed">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/four-main-sections.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Four grey enclosure sections laid out before final assembly."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/four-main-sections-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/four-main-sections-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/four-main-sections.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Four grey enclosure sections laid out before final assembly." loading="lazy" decoding="async"></a><figcaption>The revised body uses four main sections, with additional small fittings made separately.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/m5-joint-detail.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Close-up of bolts, nuts and washers joining internal enclosure flanges."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/m5-joint-detail-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/m5-joint-detail-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/m5-joint-detail.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Close-up of bolts, nuts and washers joining internal enclosure flanges." loading="lazy" decoding="async"></a><figcaption>Repositioned M5 fasteners join the sections through internal flanges.</figcaption></figure>
</div>


<h2 id="printing">Large-format 3D printing and a practical painted finish</h2>

Large-format printing allowed substantial enclosure sections to be made in one piece. The project used large Elegoo and Creality machines across its development; the final-body specification was **grey PLA, a 0.4 mm nozzle, 0.2 mm layers and 100% infill**.

Recesses and overhanging details required support material, so printing was followed by removal and cleanup before the sections could be assembled. The production photographs show how much of the work sits behind the front surface: return walls, component recesses, support structures and internal joining features.

<div class="kiosk-gallery photo-gallery">
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/large-format-print.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Large grey enclosure section on an open-frame printer with support structures around the screen recess."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/large-format-print-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/large-format-print-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/large-format-print.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Large grey enclosure section on an open-frame printer with support structures around the screen recess." loading="lazy" decoding="async"></a><figcaption>A large enclosure section on the printer, with temporary supports beneath recessed features.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/empty-assembled-rear.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Rear of the assembled empty enclosure showing internal divisions and fasteners."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/empty-assembled-rear-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/empty-assembled-rear-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/empty-assembled-rear.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Rear of the assembled empty enclosure showing internal divisions and fasteners." loading="lazy" decoding="async"></a><figcaption>The open rear provides access to the joints and leaves room for component installation.</figcaption></figure>
</div>

<figure>
<div class="kiosk-video">
<video id="kiosk-video" width="1280" height="720" preload="none" muted playsinline poster="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/video-poster.webp' | url }}" aria-label="Ten-second silent video of a kiosk enclosure section being printed"></video>
<button id="kiosk-play" type="button" data-video-src="{{ '/assets/videos/custom-wall-mounted-kiosk-enclosure-usb-controls/enclosure-printing.mp4' | url }}">▶ Watch the enclosure print</button>
</div>
<figcaption>A ten-second view of an enclosure section during printing. Silent clip.</figcaption>
<noscript><p><a href="{{ '/assets/videos/custom-wall-mounted-kiosk-enclosure-usb-controls/enclosure-printing.mp4' | url }}">Open the printing clip (1.6 MB)</a></p></noscript>
</figure>

Once the parts were joined, we sanded the surfaces and used automotive filler locally around seams and difficult edges. Further sanding, primer and aerosol paint brought the body to the agreed finish.

The client’s priority was a usable, presentable assembly. We concentrated the finishing work where it mattered to the fit and visible edges, with some original print texture remaining on the broader surfaces. The photographs show the actual finish delivered.

<div class="kiosk-gallery photo-gallery photo-gallery--mixed">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/surface-preparation.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Partly finished grey enclosure section on a work surface with filled and sanded areas."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/surface-preparation-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/surface-preparation-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/surface-preparation.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Partly finished grey enclosure section on a work surface with filled and sanded areas." loading="lazy" decoding="async"></a><figcaption>Sanding and local filler treatment addressed seams and difficult edges before painting.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/painted-assembly.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Painted enclosure body assembled on a work table before the controls were installed."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/painted-assembly-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/painted-assembly-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/painted-assembly.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Painted enclosure body assembled on a work table before the controls were installed." loading="lazy" decoding="async"></a><figcaption>The finish was developed for a practical working enclosure, with some print texture still visible.</figcaption></figure>
</div>


<h2 id="controls">Eight physical buttons with a standard USB interface</h2>

The original concept included imitation keys and labels. We proposed replacing these with **eight illuminated physical buttons**, arranged as four controls on each side of the screen. Button size and illumination were agreed with the client before the components were ordered.

The controller is an **Arduino Pro Micro based on the ATmega32U4**, in the 5 V / 16 MHz configuration. We wrote its firmware so the tablet recognises it as a USB keyboard. Each button sends a distinct extended function-key event, allowing the application developer to associate that input with a software action.

For this project, the intended action was selecting the relevant banking web application. Our controller supplied the input events; the separate developer implemented the behaviour on the tablet.

<div class="kiosk-flow" role="group" aria-label="Button signal path">
<span>Physical button press</span><span>Pro Micro firmware</span><span>USB keyboard event</span><span>Tablet application action</span>
</div>

### Handling repeated presses and allowing for maintenance

The firmware included timing logic to limit unwanted repeated events from rapid presses or a held button. This helped define how the physical controls behaved when used by the application.

We also provided spare buttons and additional prewired controller connections. These made provision for replacement or later changes without requiring every connection to be soldered again inside the finished body.

<div class="kiosk-gallery photo-gallery">
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-soldering.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Arduino Pro Micro board with wires soldered along one side."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-soldering-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-soldering-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-soldering.webp' | url }} 1574w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1574" height="1008" alt="Arduino Pro Micro board with wires soldered along one side." loading="lazy" decoding="async"></a><figcaption>The USB controller connects the physical buttons to the tablet’s keyboard-input interface.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/labelled-button-leads.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Illuminated metal button with two labelled wire connections."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/labelled-button-leads-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/labelled-button-leads-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/labelled-button-leads.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Illuminated metal button with two labelled wire connections." loading="lazy" decoding="async"></a><figcaption>Separate labelled connectors carry the button signal and LED power.</figcaption></figure>
</div>


<h2 id="wiring">Building and testing a labelled wiring harness</h2>

The button circuit and the button illumination use separate connections. Keeping those leads identifiable was important both during assembly and for future maintenance.

We cut and soldered the wiring, insulated connections with heat-shrink and added printed labels. The controller harness carries the button signals, while a separate USB power harness feeds the illuminated rings. The parts were prepared on the bench before being routed through the enclosure.

<div class="kiosk-gallery photo-gallery photo-gallery--mixed">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/complete-button-harness.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Bundle of wired metal buttons with individual connectors and printed labels."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/complete-button-harness-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/complete-button-harness-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/complete-button-harness.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Bundle of wired metal buttons with individual connectors and printed labels." loading="lazy" decoding="async"></a><figcaption>The button assemblies were soldered, insulated with heat-shrink and labelled before installation.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-harness.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Controller wiring harness spread on a white table with labelled connectors."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-harness-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-harness-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/controller-harness.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Controller wiring harness spread on a white table with labelled connectors." loading="lazy" decoding="async"></a><figcaption>Labelled leads identify the controller connections during assembly and later maintenance.</figcaption></figure>
</div>

The complete set was connected and powered before installation. This allowed us to check the illumination, controller response and keypad operation while the connections were still accessible.

Only after these checks did the wiring move into the body. The controls were secured around the screen recess, with labelled connections arranged behind the front panel.

<div class="kiosk-gallery photo-gallery photo-gallery--mixed">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/lighting-power-harness.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: USB cable branching into labelled power connectors for button LEDs."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/lighting-power-harness-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/lighting-power-harness-960.webp' | url }} 927w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/lighting-power-harness.webp' | url }} 1354w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1354" height="1402" alt="USB cable branching into labelled power connectors for button LEDs." loading="lazy" decoding="async"></a><figcaption>A separate USB power harness supplies the button illumination.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/illuminated-bench-test.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Green illuminated button rings during a bench wiring test."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/illuminated-bench-test-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/illuminated-bench-test-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/illuminated-bench-test.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Green illuminated button rings during a bench wiring test." loading="lazy" decoding="async"></a><figcaption>The controls were powered and checked on the bench before they went into the enclosure.</figcaption></figure>
</div>


<div class="kiosk-gallery photo-gallery">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/installing-buttons.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Metal buttons being installed down one side of the screen opening."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/installing-buttons-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/installing-buttons-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/installing-buttons.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Metal buttons being installed down one side of the screen opening." loading="lazy" decoding="async"></a><figcaption>The physical buttons are mounted around the screen opening, four on each side in the completed assembly.</figcaption></figure>
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/internal-wire-routing.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Rear of several mounted buttons with labelled wires routed around the screen opening."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/internal-wire-routing-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/internal-wire-routing-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/internal-wire-routing.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Rear of several mounted buttons with labelled wires routed around the screen opening." loading="lazy" decoding="async"></a><figcaption>Connections were arranged around the screen opening as the harness was installed.</figcaption></figure>
</div>


<h2 id="integration">Retaining the tablet and sharing its USB connection</h2>

The tablet fits from the rear, sliding behind the front panel and into plastic retaining clips. These locate it in the screen opening. In the intended wall-mounted arrangement, the wall closes off access from behind; service work requires the enclosure to be removed.

The tablet had a single available USB Type-A port, while the assembly needed connections for the keypad, button controller and illumination. We therefore added a **USB hub** and positioned the connections within the enclosure.

The power arrangement has two paths: the tablet uses its own charger, and its USB connection powers the hub and attached accessories. There is no separate power supply for the button electronics or lighting. We checked the connected hardware using this arrangement during integration.

<div class="kiosk-gallery photo-gallery photo-gallery--mixed">
<figure class="photo-portrait"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/wired-enclosure.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Open rear of the enclosure with button wiring installed and no tablet fitted."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/wired-enclosure-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/wired-enclosure-960.webp' | url }} 720w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/wired-enclosure.webp' | url }} 1440w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1440" height="1920" alt="Open rear of the enclosure with button wiring installed and no tablet fitted." loading="lazy" decoding="async"></a><figcaption>The wired enclosure before tablet installation shows the keypad cable, button harness and internal retainers.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-integration-detail.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Closer rear view of the tablet, routed wiring and small controller housing in the finished assembly."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-integration-detail-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-integration-detail-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-integration-detail.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Closer rear view of the tablet, routed wiring and small controller housing in the finished assembly." loading="lazy" decoding="async"></a><figcaption>The controller, USB connections and labelled wiring sit behind the tablet and front controls.</figcaption></figure>
</div>


<h2 id="handover">Documentation, final checks and client handover</h2>

Documentation supplied with the controller explained its input signals and operating logic so the application developer could use the buttons. The firmware source itself was not part of the handover.

At the final meeting, we fitted the tablet together with the client. They connected it to Wi-Fi and checked the operation of the assembly, confirming that they were happy with the result. This case study concludes at that handover; it does not document a subsequent shop installation.

The second stage involved approximately **two months of active collaboration**, including design changes, sourcing components, printing, finishing, firmware, wiring and assembly. The disclosed cost is **£1,000+ for second-stage labour**, excluding components and the earlier print-only stage.

<div class="kiosk-gallery photo-gallery">
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-front.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Front of the assembled kiosk with a fitted tablet, eight green illuminated buttons and metal keypad."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-front-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-front-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-front.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Front of the assembled kiosk with a fitted tablet, eight green illuminated buttons and metal keypad." loading="lazy" decoding="async"></a><figcaption>The fully assembled enclosure with the tablet fitted, eight illuminated controls and the keypad. This workshop photograph shows the physical integration; the browser is displaying a connection error.</figcaption></figure>
<figure class="photo-landscape"><a href="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-rear.webp' | url }}" target="_blank" rel="noopener" aria-label="Open larger image: Rear of the finished enclosure with tablet, hub, controller housing and keypad installed."><img src="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-rear-960.webp' | url }}" srcset="{{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-rear-960.webp' | url }} 960w, {{ '/assets/images/projects/custom-wall-mounted-kiosk-enclosure-usb-controls/final-rear.webp' | url }} 1920w" sizes="(max-width: 640px) calc(100vw - 40px), 700px" width="1920" height="1440" alt="Rear of the finished enclosure with tablet, hub, controller housing and keypad installed." loading="lazy" decoding="async"></a><figcaption>With the tablet fitted, the rear view shows the complete hardware layout and accessible service area.</figcaption></figure>
</div>

The main outcome was a complete hardware assembly developed around the client’s devices and requirements. Small fit prototypes, revised mechanical joints and bench-tested wiring helped bring the separate pieces together before the final tablet integration.

<h2 id="next-project">Planning a similar kiosk or electronics enclosure</h2>

This project shows the value of considering the enclosure and its contents together. A housing may need changes to its openings, mounting features, wiring routes and service access as the real components are fitted.

For a similar enquiry, useful starting information includes:

- The equipment models and the files or drawings already available.
- How the enclosure will mount, and how it should be opened for maintenance.
- The required buttons, connectors and viewing or access clearances.
- Which parts of the electronics and software are already covered by your team.
- The quantity, finish expectations, budget and delivery requirements.

Explore our **[3D design and file support]({{ '/services/design-support/' | url }})**, **[FDM printing]({{ '/services/fdm/' | url }})** and **[work for business customers]({{ '/business/' | url }})**, or **[send a project brief]({{ '/quote/' | url }})** to discuss the work needed for your assembly.

<script>
(function () {
  const button = document.getElementById('kiosk-play');
  const video = document.getElementById('kiosk-video');
  button.addEventListener('click', function () {
    if (!video.getAttribute('src')) video.src = button.dataset.videoSrc;
    video.controls = true;
    button.hidden = true;
    video.play().catch(function () { button.hidden = false; });
  });
})();
</script>
