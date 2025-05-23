<?php

$projects = [
    [
        'title' => 'Juice • Hack Club Shanghai',
        'description' => 'A 100-hour game-jam event in Shanghai, plus an Open Cafe and cultural deep-dive.',
        'image' => 'images/juice/group.jpg',
        'link' => 'juice',
        'basiclayout' => 'true',
        'blocks' => [

            [
                'title' => 'In Short',
                'content' => '
                <p>
                    Juice was an event hosted by Hack Club in Shanghai, China.<br>
                    We had to make a game in 100 hours,<br>
                    and then fly to China to host an <a href="#OpenCafe">Open Cafe</a>.<br>
                    In total, almost 100 people completed their 100-hour builds.
                </p>
',
                'image' => 'images/juice/group.jpg',
                'block_class' => 'narrow',
                'image_class' => 'img-cropped-wide',
            ],

            [
                'title' => 'The Game I Made',
                'content' => '
                <p>
                I created a game called <a
                    href="https://www.meta.com/en-gb/experiences/partyvr/9355384034552901/?require_login=true"
                    target="_blank">PartyVR</a>.<br>
                Imagine a wild VR party—dodge flying cakes, dance with friends, and compete in mini-games!<br>
                Built in Unity + Meta XR SDK, with many late-night bug hunts.
                </p>
                ',
                'image' => 'images/juice/partyvr.jpg',
                'block_class' => 'copy',
                'image_class' => 'img-cropped-small',
            ],

            [
                'title' => 'My Struggle',
                'content' => '
                <p>
                    The hardest part? Networking—herding avatars felt like herding virtual cats.<br>
                    Cakes would fly only on my screen, objects got stuck, and most of the time nothing moved for others.<br>
                    After tons of trial & error (and questionable dance moves), I got it mostly working… eventually.
                </p>
'
            ],

            [
                'title' => 'Not Quite Finished',
                'content' => '
                <p>
                    A few bugs lingered and some features didn’t make the cut by the deadline.<br>
                    Still, it was an amazing learning ride—and I’m excited to keep polishing PartyVR!
                </p>
                ',
                'image' => 'images/juice/storepage.jpg',
                'image_class' => 'img-cropped',
            ],

            [
                'title' => 'In China',
                'subtitle' => 'Cultural Experiences',
                'content' => '
                <p>
                Traveling solo for the first time, I brought my brother along—together we dove into Shanghai’s streets:<br>
                exotic fruits turned into fresh juice, strangers snapped photos, and QR codes ruled every menu.<br>
                We even demoed games at an Open Cafe—though my multiplayer build wasn’t quite demo-ready!
                </p>
            ',
                'image' => [
                    'images/mainpagegrid/IMG-20250414-WA0309.jpg',
                    'images/juice/firstmeal.jpg',
                    'images/juice/stanger.jpg',
                ],
                'image_class' => 'img-cropped-wide',
            ],

            [
                'content' => '<h2 class="lead">
                Local encounters and vibrant street scenes made every moment unforgettable.
                </h2>
                <p>
                From fruit-juice stands to neon-lit old buildings with exposed cables—every corner was a surprise.<br>
                QR-based apps like Alipay and Didi became our lifelines for food, bikes, and rideshares.
                </p>
                ',
                'image' => 'images/juice/subwaywithmeinback.jpg',
                'image_class' => 'img-cropped-small',
            ],

            [
                'title' => 'More Images',
                'content' => '    
                <div class="grid" id="imageGrid">
                <?php
                // Only load the first batch
                $dir = "images/juice"; // All images in all subfolders of images/
                $_GET["limit"] = 10;
                include "./load_images.php";
                ?>
                </div>
                <button id="loadMoreBtn" class="btn" style="display:block;margin:1em auto;">Load More</button>
                <div id="sentinel" style="height: 1px;"></div>
                <!-- Modal for image preview -->
                <div id="imageModal" class="modal" style="display:none;">
                    <span class="modal-close" id="modalClose">&times;</span>
                    <img class="modal-content" id="modalImg" src="" alt="Preview">
                </div>',
            ],
        ]
    ],

    [
        'title' => 'Juice',
        'description' => 'This was a 12 day long hackathon in shanghai, with Hackclub',
        'image' => 'juice.jpg',
        'link' => 'juice',
        'basiclayout' => 'false',
    ],
    [
        'title' => 'Party VR',
        'description' => 'This is the game i made for Juice',
        'image' => 'partyvr.jpg',
        'link' => 'partyvr',
        'basiclayout' => 'false',
    ],
    [
        'title' => 'My tree',
        'description' => 'This is an idea i had for visualising the prjects i made',
        'image' => 'mytree.jpg',
        'link' => 'mytree',
        'basiclayout' => 'false',
    ],
    [
        'title' => 'HackPad',
        'description' => 'I Designed, Solderd and Programmed a Micropad',
        'image' => 'hackpad.jpg',
        'link' => 'hackpad',
        'basiclayout' => 'true',
        'blocks' => [
            [
                'image' => [
                    'images/hackpad/pcbfront.jpg',
                ]
            ],
            [
                'title' => 'Overview',
                'content' => '
                <p>
                    This was a project i made with HackClub. <br>
                    The event was: "Design a pcb for a micropad, and recieve the parts for it"<br>
                    I made a pcb with a 4x4 matrics of Cherry MX Switches.<br>
                    Find more information in my github repo <a href="https://github.com/Nickdev8/macropad">here</a><br>
                    <br>
                    I also made a Case for it in fusion 360, <br>
                    this all took me only 1 days of work. <br>
                    <br>
                    I solderd this together with my grandpa, he teatched me how to solder.<br>
                    and after only an hour or 2, I had a finished board.<br>
                    Then came the programming. <br>and with support from chatGPT i had it working on notime.
                </p>
                ',
                'image' => [
                    'images/hackpad/fusion.png',
                ]
            ],
            [
                'title' => 'BOM',
                'content' => '
                <ul>
                    <li>2x SK6812 MINI Leds</li>
                    <li>1x XIAO RP2040</li>
                    <li>16x Blank DSA Keycaps</li>
                    <li>4x M3x16mm Bolt</li>
                    <li>4x M3 Heatset</li>
                    <li>16x 1N4148 Diodes</li>
                </ul>
                <p>feel free to copy the files, modify it and make your own.',
                'image' => [
                    'images/hackpad/schematic.png',
                ]
            ],
            [
                'image' => [
                    'images/hackpad/pcbback.jpg',
                ]
            ],

        ],
    ],

    [
        'title' => 'HighSeas',
        'description' => 'I Designed, Solderd and Programmed a Micropad',
        'image' => 'highseas.jpg',
        'link' => 'highseas',
        'basiclayout' => 'true',
        'blocks' => [
            // [
            //     'image' => [
            //         '',
            //     ]
            // ],
            [
                'title' => 'Overview',
                'content' => '<p>
                    <a href="https://highseas.hackclub.com/">HighSeas</a> was a winter long HackClub event, <br>
                    where we had to count our hours making projects, set sail to those projects (publish) <br>
                    We would recieve doubloons (points), calculated from the amount of votes from other hackclubbers. <br>
                    And with these doubloons you could redeem prices. For example, you could claim:<br>
                    raspberry pi 5, 3d printer, solder kit, Blahåj, System76 Keeb, and so many more! <br>
                    <br>
                    You sould defently take a look at <a href="https://highseas.hackclub.com/">highseas.hackclub.com</a>
                    <br>
                    but unfortunatly its over now.
                </p>'
            ],
            [
                'title' => 'What i Claimed',
                'content' => '<div style="display:grid; grid-template-columns: repeat(3, 1fr);">
                <p>Github Stanly tumblr<br><img src="images/highseas/stanly.jpg" class="img-cropped"></p>
                <p>Logitech MX Master 3S mouse<br><img src="images/highseas/mouse.jpg" class="img-cropped"></p>
                <p>Raspberry pi zero<br><img src="images/highseas/rasp.jpg" class="img-cropped"></p>
                </div>'
            ],
        ]
    ],
    [
        'title' => 'template',
        'description' => 'Description of template',
        'image' => 'template.jpg',
        'link' => 'template',
        'basiclayout' => 'true',
        'blocks' => [
            [
                'title' => 'Overview',
                'content' => '<p>This is a simple overview of Project 2.</p>',
            ],
            [
                'title' => 'Features',
                'content' => '<ul><li>Feature 1</li><li>Feature 2</li></ul>',
            ],
            [
                'title' => 'Gallery',
                'content' => '<p>Here is a screenshot from Project 2.</p>',
                'image' => 'images/project2-1.jpg',
            ],
        ],
    ],
];