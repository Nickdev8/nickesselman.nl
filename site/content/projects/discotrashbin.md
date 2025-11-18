---
slug: "discotrashbin"
title: "Disco Trashbin"
subtitle: "Turning a full-height trash bin into a synced disco show"
summary: "Nick and Nasi built an interactive trash bin with sensors, motor control, audio, LEDs, and a stage-worthy cabinet."
description: "A 150 cm tall bin that throws a six-second disco show every time someone tosses trash: dual ultrasonic sensors, Arduino + ESP32 handshake, relay-driven motor, Adafruit Audio Shield, and custom LED choreography."
year: 2025
location: "Almere, NL"
status: "Shipped"
cover: "images/projectsimages/discotrashbin-cover.jpg"
hero: "images/innerprojects/discotrashbin/final-mount-2.jpg"
featured: true
categories:
  - "hardware"
  - "installation"
  - "collaboration"
links:
  -
    label: "Arduino show code"
    url: "https://github.com/Nickdev8/trashbin/blob/main/trashbin.ino"
stats:
  -
    label: "Build logs"
    value: "16 entries"
  -
    label: "Team"
    value: "Nick + Nasi"
  -
    label: "Core tech"
    value: "Arduino, ESP32, addressable LEDs"
gallery:
  -
    src: "images/innerprojects/discotrashbin/planning-2.jpg"
    alt: "Audio shield planning session"
  -
    src: "images/innerprojects/discotrashbin/frame-assembly-1.jpg"
    alt: "Cabinet frame clamped square"
  -
    src: "images/innerprojects/discotrashbin/window-wiring.jpg"
    alt: "LED wiring with acrylic window"
  -
    src: "images/innerprojects/discotrashbin/blue-coat.jpg"
    alt: "Painted exterior drying"
---

## Exterior design + layout

<p>Nasi kicked things off in Illustrator, dialing in panel sizes, slot placement, acrylic window framing, and LED post spacing before any wood was cut.</p>
<ul>
    <li>150 × 50 × 50 cm footprint keeps the bin tall and stable beside the disco hardware.</li>
    <li>Narrow horizontal slot improves sensor coverage while centering the disco ball visually.</li>
    <li>Cable paths, LED posts, and access windows were dimensioned so every connector has room.</li>
</ul>

![Illustrator layout for the Disco Trashbin panels](images/innerprojects/discotrashbin/design-illustrator.jpg)

## Planning sensors, audio, and messaging

<p>Nick mapped the control system: two ultrasonic sensors fan out across the slot, a relay drives the disco ball motor, the Adafruit Audio Shield handles playback, and serial messages sync everything with Nasi’s ESP32 listener.</p>
<ul>
    <li>Dual sensors widen the detection zone while a shared ground keeps the Arduino, ESP32, and audio shield in sync.</li>
    <li>PWM ramps soften motor spin-up, and START_SHOW / END_SHOW packets keep LEDs and smoke on beat.</li>
    <li>The SD card initially failed to mount, so it was reformatted to FAT32 and wired to the correct CS pin.</li>
</ul>

![System diagram sketches for the Disco Trashbin](images/innerprojects/discotrashbin/planning-1.jpg)

![Adafruit Audio Shield test on the breadboard](images/innerprojects/discotrashbin/planning-2.jpg)

## Framing the body

<p>The duo milled beams, predrilled everything, and assembled the tall cabinet with diagonal bracing so the disco ball mount has zero wobble.</p>
<ul>
    <li>Corner blocks and a brace near the top plate keep the motor deck rigid.</li>
    <li>Slight racking showed up on the first glue-up, so they clamped it square and added a diagonal brace.</li>
</ul>

![Freshly assembled Disco Trashbin frame](images/innerprojects/discotrashbin/frame-assembly-1.jpg)

![Checking squareness on the cabinet](images/innerprojects/discotrashbin/frame-assembly-2.jpg)

## Shelves, chute, and mounting real estate

<p>Internal shelves split low-voltage electronics from the motor zone, a slanted chute sits behind the slot, and every cable pass-through was drilled before wiring began.</p>
<ul>
    <li>Mounting points for the Arduino stack, speakers, and power blocks were plotted before anything was screwed down.</li>
    <li>Cable tie anchors every ~15 cm keep LED and sensor wiring hugged to the wall.</li>
    <li>A shelf interference with the blue crate lip was solved by trimming 5 mm off the edge.</li>
</ul>

![Shelves and chute mocked up inside the bin](images/innerprojects/discotrashbin/shelves-1.jpg)

![Front rails positioned for the slot and acrylic window](images/innerprojects/discotrashbin/front-layout-1.jpg)

![Checking clearances for the blue crate and electronics shelf](images/innerprojects/discotrashbin/front-layout-2.jpg)

## Arduino sensors, audio, and motor control

<p>The Arduino sketch filters ultrasonic data with a median window, detects entries, ramps the relay-driven motor, plays show audio, and relays START_SHOW / END_SHOW events back to the ESP32.</p>
<ul>
    <li>Entry thresholds were tuned to ignore curious hands, and a cooldown prevents spam triggers.</li>
    <li>A 250 ms boot-ignore window stops sensor spikes from firing the show at startup.</li>
</ul>

![Arduino, relay, and audio shield stack](images/innerprojects/discotrashbin/arduino-stack.jpg)

## Power distribution and soldering marathon

<p>Nick soldered sensor harnesses to JSTs, crimped spade connectors for the motor, and built fused 5 V / 12 V rails with a labeled ground bus.</p>
<ul>
    <li>Inline blade fuses make swaps quick mid-show.</li>
    <li>A nicked audio ground caused a short, so the run was re-terminated before final loom-up.</li>
</ul>

![Power distribution and labeled wiring inside the bin](images/innerprojects/discotrashbin/power-distribution.jpg)

## Paint and exterior finish

<p>Two matte blue coats wrap the cabinet while a black top plate frames the disco ball. Drips near the slot were wet-sanded and repainted until clean.</p>
<ul>
    <li>Edge touch-ups and sealed screw heads keep the stage look intact.</li>
    <li>Nasi masked the slot to keep lines sharp after repainting.</li>
</ul>

![Fresh paint on the Disco Trashbin body](images/innerprojects/discotrashbin/paint-finish.jpg)

![Matte blue coat drying with the black top plate](images/innerprojects/discotrashbin/blue-coat.jpg)

## Final assembly, window, and mounts

<p>Speakers, the Arduino stack, relay, and power distribution all landed on their mounts. The disco ball motor got rubber washers plus shims to cancel wobble, and the acrylic window + trash slot plate were locked in.</p>
<ul>
    <li>Velcro keeps the audio shield serviceable.</li>
    <li>LED cables are labeled, routed through tie points, and drop behind a curtain so you can still peek at the internals.</li>
</ul>

![LED wiring and acrylic window installed](images/innerprojects/discotrashbin/window-wiring.jpg)

![Fully assembled Disco Trashbin interior](images/projectsimages/discotrashbin-cover.jpg)

## LED choreography + full-system tests

<p>Nasi’s ESP32 listens for START_SHOW / END_SHOW messages and runs indoor-friendly brightness profiles, sparkle outros, and idle glows. Together we capped the show at six seconds, tuned cooldown windows, and synced LEDs with audio and smoke cues.</p>
<p>Videos from the final runs:</p>
<div class="project-video-grid">
    <video class="journal-video" controls playsinline style="aspect-ratio: 390/848;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/9b8a4719610281b391557538d4913e0102d56557_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3Ac2061d1ff6119ea6"></video>
    <video class="journal-video" controls playsinline style="aspect-ratio: 848/390;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/8584a01e76710bc87a8fb53d56194626dee00ec8_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3Aa3edd433144af89e"></video>
    <video class="journal-video" controls playsinline style="aspect-ratio: 2160/3840;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/cc011139dd6296c27912b7d7d9b3e75693dc8d07_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3Adb80fe575ddba916"></video>
    <video class="journal-video" controls playsinline style="aspect-ratio: 2160/3840;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/378a4e8e3ee834eae5dc67edbf6bcdab10e5cb80_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3A7c3b90f674708059"></video>
</div>
