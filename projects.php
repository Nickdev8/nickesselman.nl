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
        'title' => 'Monkey Swing',
        'description' => 'A game i made to learn C# and unity',
        'image' => 'monkeyswing.gif',
        'link' => 'monkeyswing',
        'basiclayout' => 'true',
        'blocks' => [
            [
                'image' => [
                    'images/projectsimages/monkeyswing.gif',
                ]
            ],
            [
                'title' => 'Overview',
                'content' => '
                <p>
                    The first time I sat down at my desk with a nice warm cup of thee, 
                    Unity’s interface glowing on my screen, I knew MonkeySwing would be more than 
                    “just another 2D rage game.” I typed my first line of C# and felt my heart race:
                </p>
                <pre><code class="language-csharp">
                    public class MonkeyController : MonoBehaviour {<br>
                        // …here be bananas (and probably a few bugs)…<br>
                    }
                </code></pre>
                <p>
                    Each swing of the monkey’s arm became a tiny victory; each unexpected face-plant, 
                    a lesson learned. When my simple prototype—swinging vines
                    and one very impatient monkey—finally came together, 
                    Wrote a cheeky description, and hit “Publish” on <a href="https://nikkcc.itch.io/ms">itch.io</a>.
                </p>
                <p>
                    Although it began as a simple prototype, MonkeySwing opened 
                    the door to countless new ideas, and it’s still the project I 
                    point to when people ask where my game-making journey started.
                </p>',

                'split' => '
                <iframe frameborder="2"
                        src="https://itch.io/embed/2254225?border_width=2"
                        width="550" height="165">
                <a href="https://nikkcc.itch.io/ms">MonkeySwing by Nick</a>
                </iframe>
                <p>
                    I love showing MonkeySwing as my very first project. It still looks polished, and its simple style shows exactly what I set out to learn.
                </p>',
            ],
            [
                'image' => [
                    'images/innerprojects/monkeyswing/gamepllay.png',
                ]
            ],
        ],

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
                    'images/innerprojects/hackpad/pcbfront.jpg',
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
                    'images/innerprojects/hackpad/fusion.png',
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
                    'images/innerprojects/hackpad/schematic.png',
                ]
            ],
            [
                'image' => [
                    'images/innerprojects/hackpad/pcbback.jpg',
                ]
            ],

        ],
    ],
    [
        'title' => '3D Printing Journey',
        'description' => 'From an off-brand clearance printer to a fully upgraded Ender 3 V2',
        'image' => '3dprinter.jpg',
        'link' => '3dprinting',
        'basiclayout' => 'true',
        'blocks' => [
            [
                'image' => [
                    'images/projectsimages/3dprinter.jpg',
                ],
            ],
            [
                'title' => 'Humble Beginnings',
                'content' => '
                <p>
                    I started with a mystery clearance printer whose specs were laughable, the rails rattled, and the hotend jammed more often than it extruded. I spent hours scraping failed prints from the bed and tweaking questionable firmware—every successful print felt like a major victory.
                </p>
            ',
            ],
            [
                'title' => 'Upgrading to Ender 3 V2',
                'content' => '
                <p>
                    Tired of filament waste, I invested in a Creality Ender 3 V2. Its rigid frame, smooth motion, and surprisingly reliable default prints made it clear this was a significant upgrade.
                </p>
                <ul>
                    <li>Installed <strong>OctoPrint</strong> for remote slicing and live webcam monitoring.</li>
                    <li>Added a <strong>BLTouch</strong> sensor to automate bed leveling and eliminate manual adjustments.</li>
                    <li>Mounted a <strong>Pi Camera</strong> to catch print failures in real time.</li>
                    <li>Replaced the stock nozzle with a high-precision <strong>0.4 mm brass nozzle</strong> for finer detail.</li>
                    <li>Upgraded springs, dampers, and feet to reduce vibration and noise.</li>
                </ul>
                <p>
                    These modifications transformed the printer into a dependable workhorse, delivering first-layer adhesion and consistent results.
                </p>
            ',
            ],
            [
                'title' => 'Print Projects',
                'content' => '
                <p>
                    With my Ender 3 V2 tuned to perfection, I tackled ambitious builds:
                </p>
                <ul>
                    <li><strong>Hadley Telescope:</strong> I designed, printed, and assembled a fully functional refractor telescope, complete with focus adjustment and lens housing.</li>
                    <li><strong>Functional Jigs & Fixtures:</strong> Custom brackets and tool holders to optimize my workshop setup.</li>
                    <li><strong>Miniature Sculptures:</strong> Detailed busts and topographical models using custom slicer profiles.</li>
                    <li><strong>Enclosure Mods:</strong> A custom, clip-together enclosure with built-in dust filter and LED strip mounts.</li>
                </ul>
                <div class="split">
                    <img src="images/innerprojects/3dprint/old.jpg" class="img-cropped" alt="">
                    <img src="images/innerprojects/3dprint/camera.jpg" class="img-cropped" alt="">
                </div>',

                'split' => '
                <div class="split">
                <img src="images/innerprojects/3dprint/germo.jpg" class="img-cropped-small"alt="">
                <img src="images/innerprojects/3dprint/telesoo.jpg" class="img-cropped-small"alt="">
                <img src="images/innerprojects/3dprint/camera2.jpg" class="img-cropped-small"alt="">
                </div>
                <p>
                    Every print pushed my skills further and turned this Ender 3 V2 into a versatile fabrication station. 
                    I still have a long mod list and small projects I want to make.
                </p>',
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
                <p>Github Stanly tumblr<br><img src="images/innerprojects/highseas/stanly.jpg" class="img-cropped"></p>
                <p>Logitech MX Master 3S mouse<br><img src="images/innerprojects/highseas/mouse.jpg" class="img-cropped"></p>
                <p>Raspberry pi zero<br><img src="images/innerprojects/highseas/rasp.jpg" class="img-cropped"></p>
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
                <img src="images/innerprojects/highseas/group2.jpg" class="img">
                <img src="images/innerprojects/highseas/group1.jpg" class="img">'
            ]
        ]
    ],
    [

        'title' => 'EcoNest',
        'description' => 'Ardiono project for a School assintment',
        'image' => 'econest.jpg',
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
                'image' => 'images/innerprojects/econest/image.png',
            ],
        ]
    ],
    [
        'title' => 'My tree',
        'description' => 'This is an idea i had for visualising the prjects i made',
        'image' => 'mytree.jpg',
        'link' => 'mytree',
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
                'image' => 'images/innerprojects/project2-1.jpg',
            ],
        ],
    ],
];