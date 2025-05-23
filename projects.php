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
        'description' => 'This is the game i made for juice',
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