<?php

declare(strict_types=1);

return [
    [
        'slug' => 'juice',
        'title' => 'Hack Club: Juice',
        'subtitle' => '100 teenage builders, 12 days in Shanghai, one VR party game',
        'summary' => 'Hack Club flew me to Shanghai where I prototyped PartyVR - a chaotic multiplayer party built in just 100 hours.',
        'description' => 'Juice was Hack Club’s residency-style hackathon hosted in Shanghai. We clocked 100 hours of focused building and ended the week with an open café where locals could try whatever we shipped.',
        'year' => 2024,
        'location' => 'Shanghai, CN',
        'status' => 'Shipped',
        'cover' => 'images/projectsimages/juice.png',
        'hero' => 'images/innerprojects/juice/group.png',
        'categories' => ['hackclub', 'event', 'vr', 'game'],
        'featured' => true,
        'links' => [
            [
                'label' => 'PartyVR on Meta',
                'url' => 'https://www.meta.com/en-gb/experiences/partyvr/9355384034552901/?require_login=true',
            ],
            [
                'label' => 'Open café recap',
                'url' => 'https://news.hackclub.com/',
            ],
        ],
        'stats' => [
            ['label' => '100-hour sprint', 'value' => '✔︎'],
            ['label' => 'Team', 'value' => 'Solo dev'],
            ['label' => 'Platform', 'value' => 'Meta Quest'],
        ],
        'sections' => [
            [
                'heading' => 'Shipping PartyVR in 100 hours',
                'body' => <<<'HTML'
<p>I landed in Shanghai with a Quest headset, a sketchbook full of chaotic party ideas, and a promise to demo something fun at the end of the trip. I built PartyVR - a living-room-sized playground filled with throwable cakes, physics-based mini games, and a soundtrack that gets louder the more players join.</p>
<p>The hardest part was networking. Every avatar needed to stay in sync, but late-night builds kept desyncing unless I rewrote entire systems. By day three I had authoritative movement, synced props, and a cheeky lobby that doubled as a tutorial.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/juice/partyvr.png',
                        'alt' => 'PartyVR prototype inside Unity',
                    ],
                ],
            ],
            [
                'heading' => 'Open café energy',
                'body' => <<<'HTML'
<p>Hack Club rented a storefront, filled it with extension cords, and invited the neighborhood to try our projects. My favourite moment was watching a group of students queue for the headset while the rest of us turned fruit from the market into actual juice.</p>
<p>The event also meant documenting everything: screenshots, stand-ups, and five-minute lightning talks. That habit of narrating progress followed me home.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/juice/group.png',
                        'alt' => 'Hack Club builders hanging out during Juice',
                    ],
                ],
            ],
            [
                'heading' => 'What stuck with me',
                'body' => <<<'HTML'
<ul>
    <li>Scoping ruthlessly so a multiplayer idea actually ships.</li>
    <li>Designing onboarding for people who have never tried VR.</li>
    <li>Documenting progress in public - every day mattered.</li>
</ul>
HTML,
            ],
        ],
        'gallery' => [
            ['src' => 'images/innerprojects/juice/whiteboard.png', 'alt' => 'Planning notes'],
            ['src' => 'images/innerprojects/juice/firstmeal.png', 'alt' => 'First dinner in Shanghai'],
            ['src' => 'images/innerprojects/juice/juiceinprogress.png', 'alt' => 'Making literal juice'],
            ['src' => 'images/innerprojects/juice/stanger.png', 'alt' => 'Locals taking pictures with us'],
        ],
    ],
    [
        'slug' => 'partyvr',
        'title' => 'PartyVR',
        'subtitle' => 'A living-room-sized VR party built with Unity + Meta XR',
        'summary' => 'The multiplayer game I prototyped at Juice kept evolving into a polished VR playground.',
        'description' => 'PartyVR is a networked party room with throwable props, rhythm-based minigames, and a goofy vibe that makes demos fun - even for first-time VR players.',
        'year' => 2024,
        'location' => 'Remote',
        'status' => 'In progress',
        'cover' => 'images/innerprojects/juice/storepage.png',
        'categories' => ['game', 'vr'],
        'links' => [
            [
                'label' => 'Watch on Meta',
                'url' => 'https://www.meta.com/en-gb/experiences/partyvr/9355384034552901/?require_login=true',
            ],
        ],
        'stats' => [
            ['label' => 'Engine', 'value' => 'Unity'],
            ['label' => 'Netcode', 'value' => 'Photon'],
        ],
        'sections' => [
            [
                'heading' => 'Keeping chaos multiplayer-friendly',
                'body' => <<<'HTML'
<p>PartyVR looks silly, but the underlying system keeps every cake, speaker, and avatar in sync. I leaned on Photon for transport, wrote custom interpolation for props, and built a debugging overlay so I could see packet loss inside the headset.</p>
HTML,
            ],
            [
                'heading' => 'Comfort-first interactions',
                'body' => <<<'HTML'
<p>The main goal was to create something that passes the “grandma test.” Every prop has a visible hand-hold, UI floats inside the scene, and locomotion gently eases players along predefined rails.</p>
HTML,
            ],
            [
                'heading' => 'Next steps',
                'body' => <<<'HTML'
<p>I am rebuilding the minigame system so content packs can load from JSON, opening the door for seasonal themes and community-built rooms.</p>
HTML,
            ],
        ],
    ],
    [
        'slug' => 'monkeyswing',
        'title' => 'Monkey Swing',
        'subtitle' => 'My first Unity rage platformer',
        'summary' => 'A 2D swing-physics platformer that taught me how to ship a complete Unity game.',
        'description' => 'Monkey Swing started as a “what if?” moment and turned into a polished rage game with tight swing mechanics, punchy audio, and lots of banana puns.',
        'year' => 2023,
        'location' => 'Amsterdam',
        'status' => 'Shipped',
        'cover' => 'images/projectsimages/monkeyswing.gif',
        'categories' => ['game', 'unity'],
        'featured' => true,
        'links' => [
            [
                'label' => 'Play on itch.io',
                'url' => 'https://nikkcc.itch.io/ms',
            ],
        ],
        'sections' => [
            [
                'heading' => 'Designing movement that feels sticky',
                'body' => <<<'HTML'
<p>The core mechanic is a physics-based rope that clamps onto anchors. I wrote a custom spring solver so I could tweak gravity curves and boost the player mid-swing without the motion exploding.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/monkeyswing/gamepllay.png',
                        'alt' => 'Monkey Swing gameplay',
                    ],
                ],
            ],
            [
                'heading' => 'Shipping polish quickly',
                'body' => <<<'HTML'
<ul>
    <li>Hand-drawn VFX that stretch when you miss a hook.</li>
    <li>Haptics and crunchy sound design to reward perfect swings.</li>
    <li>Ghost runs so I could race myself during testing.</li>
</ul>
HTML,
            ],
        ],
    ],
    [
        'slug' => 'hackpad',
        'title' => 'HackPad',
        'subtitle' => 'Custom macropad built during a Hack Club PCB sprint',
        'summary' => 'Designed a 16-key macropad PCB, modeled a snap-fit case, and soldered everything with my grandpa in a weekend.',
        'description' => 'HackPad is a fully custom macropad powered by a Seeed XIAO RP2040. I routed the PCB in KiCad, milled the case, and flashed QMK-style firmware so each layer controls a different creative tool.',
        'year' => 2024,
        'location' => 'Almere, NL',
        'status' => 'Shipped',
        'cover' => 'images/projectsimages/hackpad.png',
        'categories' => ['hardware', 'hackclub'],
        'featured' => true,
        'links' => [
            [
                'label' => 'View PCB on GitHub',
                'url' => 'https://github.com/Nickdev8/macropad',
            ],
        ],
        'sections' => [
            [
                'heading' => 'Routing a clean PCB',
                'body' => <<<'HTML'
<p>I laid out a 4×4 matrix with hot-swappable sockets, per-key diodes, and two SK6812 Mini-E LEDs for accent lighting. The copper pours double as a heatsink for the LEDs, keeping the board tiny.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/hackpad/pcbfront.png',
                        'alt' => 'HackPad PCB render',
                    ],
                ],
            ],
            [
                'heading' => 'Hardware weekend with grandpa',
                'body' => <<<'HTML'
<p>We soldered everything together in an afternoon - he taught me the “heat the pad, feed the solder” trick that made the joints look factory clean. Firmware was written in CircuitPython so I could iterate keys without reflashing.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/hackpad/schematic.png',
                        'alt' => 'Macropad schematic',
                    ],
                ],
            ],
        ],
    ],
    [
        'slug' => 'discotrashbin',
        'title' => 'Disco Trashbin',
        'subtitle' => 'Turning a full-height trash bin into a synced disco show',
        'summary' => 'Nick and Nasi built an interactive trash bin with sensors, motor control, audio, LEDs, and a stage-worthy cabinet.',
        'description' => 'A 150 cm tall bin that throws a six-second disco show every time someone tosses trash: dual ultrasonic sensors, Arduino + ESP32 handshake, relay-driven motor, Adafruit Audio Shield, and custom LED choreography.',
        'year' => 2025,
        'location' => 'Almere, NL',
        'status' => 'Shipped',
        'cover' => 'images/projectsimages/discotrashbin-cover.jpg',
        'hero' => 'images/innerprojects/discotrashbin/final-mount-2.jpg',
        'categories' => ['hardware', 'installation', 'collaboration'],
        'featured' => true,
        'links' => [
            [
                'label' => 'Arduino show code',
                'url' => 'https://github.com/Nickdev8/trashbin/blob/main/trashbin.ino',
            ],
        ],
        'stats' => [
            ['label' => 'Build logs', 'value' => '16 entries'],
            ['label' => 'Team', 'value' => 'Nick + Nasi'],
            ['label' => 'Core tech', 'value' => 'Arduino, ESP32, addressable LEDs'],
        ],
        'sections' => [
            [
                'heading' => 'Exterior design + layout',
                'body' => <<<'HTML'
<p>Nasi kicked things off in Illustrator, dialing in panel sizes, slot placement, acrylic window framing, and LED post spacing before any wood was cut.</p>
<ul>
    <li>150 × 50 × 50 cm footprint keeps the bin tall and stable beside the disco hardware.</li>
    <li>Narrow horizontal slot improves sensor coverage while centering the disco ball visually.</li>
    <li>Cable paths, LED posts, and access windows were dimensioned so every connector has room.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/design-illustrator.jpg',
                        'alt' => 'Illustrator layout for the Disco Trashbin panels',
                    ],
                ],
            ],
            [
                'heading' => 'Planning sensors, audio, and messaging',
                'body' => <<<'HTML'
<p>Nick mapped the control system: two ultrasonic sensors fan out across the slot, a relay drives the disco ball motor, the Adafruit Audio Shield handles playback, and serial messages sync everything with Nasi’s ESP32 listener.</p>
<ul>
    <li>Dual sensors widen the detection zone while a shared ground keeps the Arduino, ESP32, and audio shield in sync.</li>
    <li>PWM ramps soften motor spin-up, and START_SHOW / END_SHOW packets keep LEDs and smoke on beat.</li>
    <li>The SD card initially failed to mount, so it was reformatted to FAT32 and wired to the correct CS pin.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/planning-1.jpg',
                        'alt' => 'System diagram sketches for the Disco Trashbin',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/planning-2.jpg',
                        'alt' => 'Adafruit Audio Shield test on the breadboard',
                    ],
                ],
            ],
            [
                'heading' => 'Framing the body',
                'body' => <<<'HTML'
<p>The duo milled beams, predrilled everything, and assembled the tall cabinet with diagonal bracing so the disco ball mount has zero wobble.</p>
<ul>
    <li>Corner blocks and a brace near the top plate keep the motor deck rigid.</li>
    <li>Slight racking showed up on the first glue-up, so they clamped it square and added a diagonal brace.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/frame-assembly-1.jpg',
                        'alt' => 'Freshly assembled Disco Trashbin frame',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/frame-assembly-2.jpg',
                        'alt' => 'Checking squareness on the cabinet',
                    ],
                ],
            ],
            [
                'heading' => 'Shelves, chute, and mounting real estate',
                'body' => <<<'HTML'
<p>Internal shelves split low-voltage electronics from the motor zone, a slanted chute sits behind the slot, and every cable pass-through was drilled before wiring began.</p>
<ul>
    <li>Mounting points for the Arduino stack, speakers, and power blocks were plotted before anything was screwed down.</li>
    <li>Cable tie anchors every ~15 cm keep LED and sensor wiring hugged to the wall.</li>
    <li>A shelf interference with the blue crate lip was solved by trimming 5 mm off the edge.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/shelves-1.jpg',
                        'alt' => 'Shelves and chute mocked up inside the bin',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/front-layout-1.jpg',
                        'alt' => 'Front rails positioned for the slot and acrylic window',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/front-layout-2.jpg',
                        'alt' => 'Checking clearances for the blue crate and electronics shelf',
                    ],
                ],
            ],
            [
                'heading' => 'Arduino sensors, audio, and motor control',
                'body' => <<<'HTML'
<p>The Arduino sketch filters ultrasonic data with a median window, detects entries, ramps the relay-driven motor, plays show audio, and relays START_SHOW / END_SHOW events back to the ESP32.</p>
<ul>
    <li>Entry thresholds were tuned to ignore curious hands, and a cooldown prevents spam triggers.</li>
    <li>A 250 ms boot-ignore window stops sensor spikes from firing the show at startup.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/arduino-stack.jpg',
                        'alt' => 'Arduino, relay, and audio shield stack',
                    ],
                ],
            ],
            [
                'heading' => 'Power distribution and soldering marathon',
                'body' => <<<'HTML'
<p>Nick soldered sensor harnesses to JSTs, crimped spade connectors for the motor, and built fused 5 V / 12 V rails with a labeled ground bus.</p>
<ul>
    <li>Inline blade fuses make swaps quick mid-show.</li>
    <li>A nicked audio ground caused a short, so the run was re-terminated before final loom-up.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/power-distribution.jpg',
                        'alt' => 'Power distribution and labeled wiring inside the bin',
                    ],
                ],
            ],
            [
                'heading' => 'Paint and exterior finish',
                'body' => <<<'HTML'
<p>Two matte blue coats wrap the cabinet while a black top plate frames the disco ball. Drips near the slot were wet-sanded and repainted until clean.</p>
<ul>
    <li>Edge touch-ups and sealed screw heads keep the stage look intact.</li>
    <li>Nasi masked the slot to keep lines sharp after repainting.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/paint-finish.jpg',
                        'alt' => 'Fresh paint on the Disco Trashbin body',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/blue-coat.jpg',
                        'alt' => 'Matte blue coat drying with the black top plate',
                    ],
                ],
            ],
            [
                'heading' => 'Final assembly, window, and mounts',
                'body' => <<<'HTML'
<p>Speakers, the Arduino stack, relay, and power distribution all landed on their mounts. The disco ball motor got rubber washers plus shims to cancel wobble, and the acrylic window + trash slot plate were locked in.</p>
<ul>
    <li>Velcro keeps the audio shield serviceable.</li>
    <li>LED cables are labeled, routed through tie points, and drop behind a curtain so you can still peek at the internals.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/discotrashbin/window-wiring.jpg',
                        'alt' => 'LED wiring and acrylic window installed',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/projectsimages/discotrashbin-cover.jpg',
                        'alt' => 'Fully assembled Disco Trashbin interior',
                    ],
                ],
            ],
            [
                'heading' => 'LED choreography + full-system tests',
                'body' => <<<'HTML'
<p>Nasi’s ESP32 listens for START_SHOW / END_SHOW messages and runs indoor-friendly brightness profiles, sparkle outros, and idle glows. Together we capped the show at six seconds, tuned cooldown windows, and synced LEDs with audio and smoke cues.</p>
<p>Videos from the final runs:</p>
<div class="project-video-grid">
    <video class="journal-video" controls playsinline style="aspect-ratio: 390/848;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/9b8a4719610281b391557538d4913e0102d56557_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3Ac2061d1ff6119ea6"></video>
    <video class="journal-video" controls playsinline style="aspect-ratio: 848/390;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/8584a01e76710bc87a8fb53d56194626dee00ec8_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3Aa3edd433144af89e"></video>
    <video class="journal-video" controls playsinline style="aspect-ratio: 2160/3840;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/cc011139dd6296c27912b7d7d9b3e75693dc8d07_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3Adb80fe575ddba916"></video>
    <video class="journal-video" controls playsinline style="aspect-ratio: 2160/3840;" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/378a4e8e3ee834eae5dc67edbf6bcdab10e5cb80_tmp_3Achat_3A2025-11-02_3Acmh69pxsq00cop401dxr6jvx8_3A7c3b90f674708059"></video>
</div>
HTML,
            ],
        ],
        'gallery' => [
            ['src' => 'images/innerprojects/discotrashbin/planning-2.jpg', 'alt' => 'Audio shield planning session'],
            ['src' => 'images/innerprojects/discotrashbin/frame-assembly-1.jpg', 'alt' => 'Cabinet frame clamped square'],
            ['src' => 'images/innerprojects/discotrashbin/window-wiring.jpg', 'alt' => 'LED wiring with acrylic window'],
            ['src' => 'images/innerprojects/discotrashbin/blue-coat.jpg', 'alt' => 'Painted exterior drying'],
        ],
    ],
    [
        'slug' => 'neighborhood',
        'title' => 'Hack Club: Neighborhood',
        'subtitle' => 'Two dozen days living, building, and journaling in San Francisco',
        'summary' => 'A long-form diary about the Hack Club Neighborhood residency: shipping projects, crashing events, and figuring out community life on the fly.',
        'description' => 'I spent almost a month in San Francisco with Hack Club. Between burrito meetups, 40-hour programming challenges, and spontaneous hardware quests, I logged every win, wobble, and late-night build session.',
        'year' => 2025,
        'location' => 'San Francisco, CA',
        'status' => 'Complete',
        'cover' => 'images/projectsimages/neighborhood-cover.webp',
        'hero' => 'images/innerprojects/neighborhood/salesforcepark.webp',
        'categories' => ['hackclub', 'travel', 'journal'],
        'featured' => true,
        'links' => [
            [
                'label' => 'Read the full diary',
                'url' => 'https://blog.nickesselman.nl/neighberhood',
            ],
        ],
        'stats' => [
            ['label' => 'Days logged', 'value' => '24'],
            ['label' => 'Hours goal', 'value' => '40 / week'],
            ['label' => 'Residency', 'value' => 'Neighborhood'],
        ],
        'sections' => [
            [
                'heading' => 'Pre-flight sprint + anticipation',
                'body' => <<<'HTML'
<p>I started this diary racing the clock: finish 100 hours on my personal site with twenty minutes to spare, then pack for San Francisco. A national rail strike turned school into Zoom, but it also gave me time to sketch goals and channel the jitters into writing.</p>
<p>The plan was simple: land in SF with momentum, keep sharing honest updates, and show up ready to build with Hack Clubbers I’d mostly met online.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/projectsimages/neighborhood-cover.webp',
                        'alt' => 'Pre-trip panorama shot from the Neighborhood diary',
                    ],
                ],
            ],
            [
                'heading' => 'Arrival, pizza, and zero sleep',
                'body' => <<<'HTML'
<p>Day 1 was a blur: solo flight, unexpected border interview (“I’m here to build stuff with internet nerds”), hauling gear uphill, then getting whisked straight to a midnight pizza party. Housemates had full setups; I had a couch pillow and an airplane blanket.</p>
<p>I still wrote it all down—sleep deprivation, culture shock, and the promise that tomorrow would feel less overwhelming.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/neighborhood/planeride.webp',
                        'alt' => 'View from the plane while flying to San Francisco',
                    ],
                ],
            ],
            [
                'heading' => 'Finding routine in the chaos',
                'body' => <<<'HTML'
<p>Day 2 hit hard: doubts, a foggy brain, and Paolo asking what I wanted to build. I found structure by wandering—cafés at sunrise, Target runs for towels, accidental detours to LinkedIn HQ (yes, I asked for stickers), and grocery missions with five cultures worth of breakfast preferences.</p>
<p>Documenting each beat made the house feel less overwhelming and turned strangers into collaborators.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/neighborhood/linkedin.webp',
                        'alt' => 'Inside LinkedIn HQ during a spontaneous work session',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/neighborhood/morningwalk.webp',
                        'alt' => 'Morning walk through San Francisco hills',
                    ],
                ],
            ],
            [
                'heading' => 'City adventures + Apple Vision Pro',
                'body' => <<<'HTML'
<p>Week one became a montage: sunrise walks, Salesforce Park co-working, UNO in Chinatown, and a surprise Apple Vision Pro demo where we all tried Excel mid-air. Nights meant burritos in Dolores Park, impromptu disco ball repairs, and logging programming hours anywhere with Wi-Fi.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/neighborhood/salesforcepark.webp',
                        'alt' => 'Coding session at Salesforce Park',
                    ],
                ],
            ],
            [
                'heading' => 'GitHub HQ + ComfyUI hack night',
                'body' => <<<'HTML'
<p>The highlight of week two: a ComfyUI mini-hackathon inside GitHub HQ. Security vests labeled “SSH,” RTX 5090 giveaways we didn’t win, and a depth-map workflow that actually shipped. Those entries captured the feeling of working next to 30 builders who all showed up purely to make things.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/neighborhood/githubhq.webp',
                        'alt' => 'Outside GitHub HQ on hack night',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/neighborhood/comfyui.webp',
                        'alt' => 'Team hacking on ComfyUI workflow inside GitHub',
                    ],
                ],
            ],
            [
                'heading' => 'House experiments, Pao, and Freedom Week',
                'body' => <<<'HTML'
<p>Halfway through the residency we pushed for “Freedom Week”—a break from the 40-hour tracker to ship something new and tell the story on video. That spawned <em>Pao</em>, a real-world stealth selfie game inspired by Among Us paranoia, plus countless midnight coding sessions, guitar breaks, and stairwell skate tricks.</p>
<div class="project-video-grid">
    <video class="journal-video" controls playsinline muted src="https://blog.nickesselman.nl/blogimages/neighborhood/paolokikflip.mp4"></video>
    <video class="journal-video" controls playsinline muted src="https://blog.nickesselman.nl/blogimages/neighborhood/paolobeingsmart.mp4"></video>
    <video class="journal-video" controls playsinline muted src="https://blog.nickesselman.nl/blogimages/neighborhood/pao.mp4"></video>
</div>
HTML,
            ],
            [
                'heading' => 'The ending nobody expected',
                'body' => <<<'HTML'
<p>As quickly as Neighborhood started, it ended—calls to the house, a program shutdown, then a slim chance to stay. I helped clean plumbing disasters, packed chairs across town, and watched Thomas deliver the final announcement before heading home to document what the month meant.</p>
<p>The last entry asks for a DM if you make it through all 739 lines. People actually wrote back.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/neighborhood/lastpic.webp',
                        'alt' => 'Final photo from Hack Club Neighborhood',
                    ],
                ],
            ],
        ],
        'gallery' => [
            ['src' => 'images/innerprojects/neighborhood/planeride.webp', 'alt' => 'Flight into San Francisco'],
            ['src' => 'images/innerprojects/neighborhood/linkedin.webp', 'alt' => 'LinkedIn HQ sticker run'],
            ['src' => 'images/innerprojects/neighborhood/githubhq.webp', 'alt' => 'GitHub HQ meetup'],
            ['src' => 'images/innerprojects/neighborhood/lastpic.webp', 'alt' => 'Wrapping up Neighborhood'],
        ],
    ],
    [
        'slug' => 'gamejams',
        'title' => 'Game Jam Run',
        'subtitle' => 'Three jams, dozens of teammates, and lots of late nights',
        'summary' => 'A collection of jam entries ranging from glitchy racers to atmospheric boss fights.',
        'description' => 'I jump into jams whenever I can - it keeps my art, audio, and communication muscles fresh. These are my favourite stories.',
        'year' => 2024,
        'location' => 'Remote',
        'status' => 'Shipped',
        'cover' => 'images/projectsimages/gamejams.png',
        'categories' => ['game', 'collaboration'],
        'sections' => [
            [
                'heading' => 'GMTK Jam - Car Sizer',
                'body' => <<<'HTML'
<p>The theme was <em>Built to Scale</em>. I built a racer where you constantly resize your car to squeeze through gates. Shader graph handled the squash-and-stretch effect while a single script orchestrated collisions.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/gamejams/gmtk2024.png',
                        'alt' => 'Car Sizer screenshot',
                    ],
                ],
            ],
            [
                'heading' => 'Brackeys Jam - Zeus Wrath',
                'body' => <<<'HTML'
<p>I teamed up via Discord, took on UI + pixel art, and helped tune the second phase of the boss battle. Even when the jam demo build broke on stream, the collab energy was unmatched.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/gamejams/brackeys2024_2.png',
                        'alt' => 'Zeus Wrath screenshot',
                    ],
                ],
            ],
            [
                'heading' => 'Boss Rush Jam - Witchlight Woods',
                'body' => <<<'HTML'
<p>The team ghosted halfway through, so I focused on building atmospheric tile sets and a reusable dialogue system. Not every jam ships, but every jam leaves tools behind.</p>
HTML,
            ],
        ],
    ],
    [
        'slug' => '3d-printing',
        'title' => '3D Printing Journey',
        'subtitle' => 'From sketchy clearance printer to dialled-in Ender 3 V2',
        'summary' => 'Documenting the upgrades, prints, and lessons that turned my printer into a reliable workshop tool.',
        'description' => 'I started with a random clearance printer that jammed every other hour. Upgrades, OctoPrint tooling, and a BLTouch later, the machine finally behaves.',
        'year' => 2022,
        'location' => 'Home lab',
        'status' => 'Always iterating',
        'cover' => 'images/projectsimages/3dprinter.png',
        'categories' => ['hardware', 'fabrication'],
        'sections' => [
            [
                'heading' => 'Upgrades that mattered',
                'body' => <<<'HTML'
<ul>
    <li>OctoPrint + Pi Cam for remote monitoring.</li>
    <li>BLTouch so first layers stop being a gamble.</li>
    <li>Custom enclosure panels with press-fit filters.</li>
</ul>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/3dprint/old.png',
                        'alt' => 'Before upgrades',
                    ],
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/3dprint/camera.png',
                        'alt' => 'Pi cam mount',
                    ],
                ],
            ],
            [
                'heading' => 'Favourite prints',
                'body' => <<<'HTML'
<p>The Hadley telescope clone, workshop jigs, and tiny architectural studies all came off this machine. Every project starts in Fusion 360 and ends up in a little catalog I keep for future tweaks.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/3dprint/germo.png',
                        'alt' => 'Hadley telescope parts',
                    ],
                ],
            ],
        ],
    ],
    [
        'slug' => 'stickers',
        'title' => 'Sticker Wall',
        'subtitle' => 'Hack Club envelopes, laptop stickers, and patches',
        'summary' => 'I keep every sticker Hack Club mails me - here’s the archive.',
        'description' => 'Between HighSeas, Juice, and random mail drops I have a drawer full of Hack Club art. My laptop lid holds 28 stickers (one duplicate, oops).',
        'year' => 2024,
        'location' => 'Laptop lid',
        'status' => 'Still growing',
        'cover' => 'images/projectsimages/stickers.png',
        'categories' => ['collecting', 'hackclub'],
        'sections' => [
            [
                'heading' => 'Mail days are the best days',
                'body' => <<<'HTML'
<p>Everything from holographic penguins to embroidered patches shows up in my mailbox. I scan each drop before it ends up on my laptop so I can keep a digital set too.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/stickers/main.png',
                        'alt' => 'Sticker grid on desk',
                    ],
                ],
            ],
        ],
        'gallery' => [
            ['src' => 'images/innerprojects/stickers/sticker1.png', 'alt' => 'Sticker sheet 1'],
            ['src' => 'images/innerprojects/stickers/sticker2.png', 'alt' => 'Sticker sheet 2'],
            ['src' => 'images/innerprojects/stickers/sticker3.png', 'alt' => 'Sticker sheet 3'],
            ['src' => 'images/innerprojects/stickers/sticker4.png', 'alt' => 'Sticker sheet 4'],
            ['src' => 'images/innerprojects/stickers/sticker5.png', 'alt' => 'Sticker sheet 5'],
            ['src' => 'images/innerprojects/stickers/sticker6.png', 'alt' => 'Sticker sheet 6'],
            ['src' => 'images/innerprojects/stickers/sticker7.png', 'alt' => 'Sticker sheet 7'],
            ['src' => 'images/innerprojects/stickers/sticker8.png', 'alt' => 'Sticker sheet 8'],
            ['src' => 'images/innerprojects/stickers/sticker9.png', 'alt' => 'Sticker sheet 9'],
            ['src' => 'images/innerprojects/stickers/sticker10.png', 'alt' => 'Sticker sheet 10'],
            ['src' => 'images/innerprojects/stickers/sticker11.png', 'alt' => 'Sticker sheet 11'],
            ['src' => 'images/innerprojects/stickers/sticker12.png', 'alt' => 'Sticker sheet 12'],
        ],
    ],
    [
        'slug' => 'dcmcbot',
        'title' => 'Minecraft Discord Bot',
        'subtitle' => 'Slash commands for a self-hosted SMP server',
        'summary' => 'A Discord bot that lets friends boot, reboot, or check the Minecraft server without touching SSH.',
        'description' => 'Built with discord.js and a few lightweight cloud functions. The bot also pings me if the server is lagging or if the log tail matches certain error signatures.',
        'year' => 2024,
        'location' => 'Online',
        'status' => 'Maintained',
        'cover' => 'images/projectsimages/discord.png',
        'categories' => ['automation', 'bot'],
        'links' => [
            [
                'label' => 'Source on GitHub',
                'url' => 'https://github.com/Nickdev8/minercaftbot',
            ],
        ],
        'sections' => [
            [
                'heading' => 'Control panel in Discord',
                'body' => <<<'HTML'
<p>Slash commands map to short-lived API calls that hit my home server. Anyone on the allow list can start the SMP, check TPS, or request a backup.</p>
HTML,
            ],
            [
                'heading' => 'Fail-safe logging',
                'body' => <<<'HTML'
<p>If the watchdog catches repeated crashes it locks new boot requests and DMs me a log bundle. It has saved the world folder more than once.</p>
HTML,
            ],
        ],
    ],
    [
        'slug' => 'highseas',
        'title' => 'Hack Club: HighSeas',
        'subtitle' => 'A winter-long shipping challenge with doubloons',
        'summary' => 'Logged 40+ hours a week on personal projects, earned hardware, and met Hack Clubbers IRL.',
        'description' => 'HighSeas rewarded consistent shipping: record your hours, share demos, earn doubloons, trade them for gear. I claimed a Stanley tumbler, MX Master 3S, Pi Zero, and far too many stickers.',
        'year' => 2024,
        'location' => 'Global',
        'status' => 'Complete',
        'cover' => 'images/projectsimages/highseas.png',
        'categories' => ['hackclub', 'event'],
        'sections' => [
            [
                'heading' => 'Logging the grind',
                'body' => <<<'HTML'
<p>Hackatime tracked my hours, but the real accountability came from weekly show-and-tells. Sharing unfinished work in front of a hundred peers makes you fearless.</p>
HTML,
            ],
            [
                'heading' => 'Mystic Tavern meetups',
                'body' => <<<'HTML'
<p>After the event we hosted mini meetups. I rode a train to Utrecht to hang with local Hack Clubbers - we swapped stickers, ate stroopwafels, and planned future builds.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/highseas/group1.png',
                        'alt' => 'HighSeas meetup photo',
                    ],
                ],
            ],
        ],
    ],
    [
        'slug' => 'jazzdesign',
        'title' => 'JazzDesign',
        'subtitle' => 'Portfolio site for my sister’s fashion studio',
        'summary' => 'Designed and built a calm, editorial web experience for custom clothing commissions.',
        'description' => 'I worked closely with my sister Jessie to translate her sketchbook into a digital brand. The site runs on PHP includes so she can edit copy without touching frameworks.',
        'year' => 2024,
        'location' => 'Amsterdam',
        'status' => 'Live',
        'cover' => 'images/projectsimages/jazzdesign.png',
        'categories' => ['web', 'client'],
        'sections' => [
            [
                'heading' => 'Tone and typography',
                'body' => <<<'HTML'
<p>We landed on a minimal palette and generous whitespace so her photography shines. I paired Spectral for headlines with Inter for body text, keeping it editorial but accessible.</p>
HTML,
            ],
            [
                'heading' => 'Low-maintenance CMS',
                'body' => <<<'HTML'
<p>Projects, rates, and availability live in structured includes. Updating the site means editing a single PHP array - no dashboards, no waiting on me.</p>
HTML,
            ],
        ],
    ],
    [
        'slug' => 'weirdchess',
        'title' => 'Weird Chess',
        'subtitle' => 'Chess, but every piece is a mini-game',
        'summary' => 'A chaotic chess variant where pieces have special moves and the board keeps mutating.',
        'description' => 'Built with React + Vite as a playground for rapid prototyping. The knight might teleport, the bishop fires lasers, and victory animations trigger matter.js confetti.',
        'year' => 2023,
        'location' => 'Online',
        'status' => 'Playable prototype',
        'cover' => 'images/projectsimages/weirdchess.png',
        'categories' => ['game', 'web'],
        'sections' => [
            [
                'heading' => 'Custom rule engine',
                'body' => <<<'HTML'
<p>The board is stored as a plain array so wild rules (portals, fog-of-war, timed events) can be hot-loaded from JSON. Friends fork it and drop in new mechanics.</p>
HTML,
            ],
            [
                'heading' => 'Button-mashing joy',
                'body' => <<<'HTML'
<p>I leaned into goofy UI: neon sliders, punchy sounds, and plenty of screen shake. It’s a reminder that side projects can be unserious on purpose.</p>
HTML,
            ],
        ],
    ],
    [
        'slug' => 'econest',
        'title' => 'EcoNest',
        'subtitle' => 'Arduino-powered smart home demo for school',
        'summary' => 'Built a sensor-packed breadboard and a single-page PHP site to explain it.',
        'description' => 'EcoNest combined DHT11 sensors, LDRs, and LEDs into a tiny smart-home model. I handled the wiring, code, and the explanatory website while classmates focused on documentation.',
        'year' => 2023,
        'location' => 'Mediacollege Amsterdam',
        'status' => 'Delivered',
        'cover' => 'images/projectsimages/econest.png',
        'categories' => ['hardware', 'school'],
        'links' => [
            [
                'label' => 'See the demo site',
                'url' => 'https://38406.hosts2.ma-cloud.nl/EcoNest/index.php',
            ],
        ],
        'sections' => [
            [
                'heading' => 'Breadboard city',
                'body' => <<<'HTML'
<p>Sensors controlled window LEDs, heating indicators, and a miniature clamp fan. The Arduino sketch exposes serial logs so each action can be graphed in the companion site.</p>
HTML,
                'media' => [
                    [
                        'type' => 'image',
                        'src' => 'images/innerprojects/econest/image.png',
                        'alt' => 'EcoNest breadboard',
                    ],
                ],
            ],
        ],
    ],
];
