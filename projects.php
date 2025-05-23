<?php

$projects = [
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
                <p>And many, MANY stickers. See the Stickers Projects for more info
                <a href="/?project=stickers">My Stickers</a></p>
                </div>'
            ],
            [
                'title' => 'Mystic Tavern',
                'content' => '
                <p>Afer HighSeas was over, they orginized an event for everyone that took part in highseas to meet up with other hackclubbers in your area.<br>
                So i went to Utecht to meet with 13 hackclubber were 6 showed up, (inc me). We went there and just walked arount the city, talking about the projects we made and the things we do.
                <br><br>
                Here i met: jsw08, Tuna, Emma, Verduijn, whacky, Fela and ArtyH</p>
                <img src="images/highseas/group2.jpg" class="img">
                <img src="images/highseas/group1.jpg" class="img">'
            ]
        ]
    ],
    [

        'title' => 'EcoNest',
        'description' => 'Ardiono project for a School assintment',
        'image' => 'econest.png',
        'link' => 'econest',
        'basiclayout' => 'true',
        'blocks' => [
            [
                'title' => 'Overview',
                'content' => '<p>For school, I got the assintmend named "Duurzaam huis".<br>
                It was about making a breadboard with led, ldr`s and th11 sensors. <br>
                I did this together with Bram & Jesper. and we came up with <a href="https://38406.hosts2.ma-cloud.nl/EcoNest/index.php">Econest.com</a>
                <br><br>
                And altho I did almost everything with ardeono and the website. I had a blast doing it.<br>
                I make a single page website with mutlible include statments in php.
                </p>',
                'image' => 'images/econest/image.png',
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