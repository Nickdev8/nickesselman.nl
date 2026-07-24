export const site = {
  name: "Nick Esselman",
  url: "https://nickesselman.nl",
  title: "Nick Esselman — Full-Stack Developer & Maker",
  description:
    "Portfolio of Nick Esselman, a Netherlands-based full-stack developer and maker building software, VR games, hardware, LED systems and custom PCBs.",
  image: "/og/nick-esselman.jpg",
  portrait: "/images/nick-esselman.webp",
  sameAs: [
    "https://github.com/nickdev8/",
    "https://www.linkedin.com/in/nick-esselman/",
    "https://www.instagram.com/nick.esselman/",
    "https://blog.nickesselman.nl",
    "https://spacehey.com/profile?id=4533565",
  ],
};

export const projects = [
  {
    slug: "partyvr",
    title: "PartyVR",
    category: "VR party platform",
    status: "Active",
    summary:
      "Room-scale multiplayer games with a server-authoritative LAN setup and a spectator screen for everyone outside the headset.",
    role: "Design, development and hardware integration",
    technologies: ["VR", "LAN multiplayer", "Blender", "3D avatars"],
    links: [{ label: "Source repository", href: "https://github.com/Nickdev8/PartyVR" }],
    challenge:
      "A room-scale party game has to work for more people than the player wearing the headset. The game session, host controls and spectator view all need to stay understandable while several devices exchange state over a local network.",
    approach:
      "I built PartyVR as a connected system rather than a single headset experience. A host panel manages players, rounds and hardware; the spectator display keeps the room involved; and multiplayer debugging tools make avatar and state synchronization visible during development. The visual pipeline also includes custom avatars and cosmetics made in Blender.",
    outcome:
      "PartyVR is an active platform for experimenting with social VR, local networking and the practical work around running a shared physical game space. The current project media shows the host panel, multi-client synchronization, device logs and avatar production instead of a staged marketing render.",
    media: [
      { type: "image", src: "/projects/partyvr/development.webp", alt: "PartyVR rendering and device logs during development" },
      { type: "image", src: "/projects/partyvr/host-panel.webp", alt: "PartyVR host panel for rounds, players, and hardware" },
      { type: "image", src: "/projects/partyvr/multiplayer-debug.webp", alt: "PartyVR multi-client avatar and synchronization test" },
      { type: "image", src: "/projects/partyvr/avatar-workshop.webp", alt: "PartyVR avatars and cosmetics being developed in Blender" },
    ],
  },
  {
    slug: "lamp",
    title: "LAMP",
    category: "LED hardware",
    status: "PCB ready",
    summary:
      "A custom RP2040 board for driving chains of LED panels and large xLights-style installations.",
    role: "Electronics, PCB design and firmware",
    technologies: ["RP2040", "PCB design", "Addressable LEDs", "xLights"],
    links: [{ label: "Source repository", href: "https://github.com/Nickdev8/LedScreen" }],
    challenge:
      "Large LED installations quickly turn into a wiring, power and repeatability problem. A useful controller has to move beyond a one-off breadboard and make it practical to connect, test and reproduce panel chains.",
    approach:
      "LAMP grew through physical prototypes. I tested individual matrices on the bench, connected multiple panels on the floor, and then moved the controller toward a custom RP2040 board. That process puts electrical layout, connectors, firmware and the behavior of the finished installation in the same feedback loop.",
    outcome:
      "The project has reached a PCB-ready stage and has already driven assembled displays. The photographs document the real build sequence: hand-wired prototype, multi-panel floor test, development setup and an illuminated assembled panel.",
    media: [
      { type: "image", src: "/projects/lamp/bench-prototype.webp", alt: "LAMP LED panel and controller prototype on a workbench" },
      { type: "image", src: "/projects/lamp/floor-test.webp", alt: "Multiple LAMP LED panels connected for a floor test" },
      { type: "image", src: "/projects/lamp/installed-display.webp", alt: "LAMP display running behind a development laptop" },
      { type: "image", src: "/projects/lamp/assembled-panel.webp", alt: "Assembled LAMP panel showing multicolored LEDs" },
    ],
  },
  {
    slug: "mymacropad",
    title: "MYMacropad",
    category: "Custom input device",
    status: "Built",
    summary:
      "A 4×4 macropad designed from PCB to case, including firmware, switches and soldering.",
    role: "Product design, electronics and firmware",
    technologies: ["Custom PCB", "Firmware", "Mechanical switches", "3D enclosure"],
    links: [{ label: "Source repository", href: "https://github.com/Nickdev8/macropad" }],
    challenge:
      "The goal was to make a compact input device as a complete object, not just wire switches to a development board. The electrical layout, firmware, case and physical switch spacing all had to agree.",
    approach:
      "I designed the 4×4 layout, produced a custom PCB with its own back artwork, assembled and soldered the electronics, and fitted the result into a purpose-built enclosure. Working across the whole stack made small mechanical and electrical decisions immediately visible in the final feel of the device.",
    outcome:
      "MYMacropad is a finished, working piece of hardware. The build shows the complete progression from bare custom board to assembled electronics and the final blue enclosure with coral keycaps.",
    media: [
      { type: "image", src: "/projects/mymacropad/finished-case.webp", alt: "Finished MYMacropad with coral keycaps and blue enclosure" },
      { type: "image", src: "/projects/mymacropad/pcb-back.webp", alt: "Back of the MYMacropad PCB with custom artwork" },
      { type: "image", src: "/projects/mymacropad/assembled-board.webp", alt: "Assembled MYMacropad circuit board held in one hand" },
    ],
  },
  {
    slug: "kennemer",
    title: "Shelly Control Board",
    category: "Local event system",
    status: "Active",
    summary:
      "Kennemer is a local-first control surface for running a room full of Shelly-powered devices without relying on the cloud.",
    role: "Interface, local networking and hardware integration",
    technologies: ["Shelly", "Local network", "Touch interface", "Relay control"],
    links: [{ label: "Source repository", href: "https://github.com/Nickdev8/kennemer" }],
    challenge:
      "Event controls need to remain quick and dependable even when internet access is poor. Managing many connected relays through separate apps or a remote cloud service adds unnecessary delay and uncertainty.",
    approach:
      "I brought the room controls together in a local-first interface designed for a portable touch display. The software communicates with Shelly-powered devices on the local network, while a hand-wired relay and button board provides the physical side of the system.",
    outcome:
      "Kennemer provides one focused surface for operating the room without making the cloud part of the critical path. The project pairs a working control interface with the real relay hardware it operates.",
    media: [
      { type: "image", src: "/projects/kennemer/control-interface.webp", alt: "Shelly Control Board interface running on a portable display" },
      { type: "image", src: "/projects/kennemer/shelly-hardware.webp", alt: "Hand-wired Shelly relay and button control board" },
    ],
  },
  {
    slug: "monkey-swing",
    title: "Monkey Swing",
    category: "2D game",
    status: "Shipped",
    summary:
      "My first finished Unity game: repeated faceplants, one swinging monkey, and a lesson in shipping small things.",
    role: "Solo game development",
    technologies: ["Unity", "2D physics", "Pixel art", "Web game"],
    links: [{ label: "Play on itch.io", href: "https://nikkcc.itch.io/ms" }],
    challenge:
      "Small game ideas can accumulate systems without ever becoming a finished game. Monkey Swing was deliberately scoped around one physical action so I could take the complete loop from prototype to something other people could play.",
    approach:
      "I built the swinging movement in Unity, tuned the repeated attempts around fast failure and restart, and wrapped the mechanic in a compact pixel-art forest. The narrow scope made polish, feedback and release part of the project instead of work postponed until later.",
    outcome:
      "Monkey Swing became my first finished and published Unity game. More importantly, it established a practical lesson I still use: a small shipped project teaches more than an endlessly expanding prototype.",
    media: [
      { type: "image", src: "/projects/monkey-swing/gameplay.webp", alt: "Monkey Swing gameplay in a pixel-art forest" },
      { type: "video", src: "/projects/monkey-swing/gameplay.mp4", poster: "/projects/monkey-swing/gameplay.webp", label: "Monkey Swing gameplay video" },
    ],
  },
  {
    slug: "blipstorm",
    title: "Blipstorm",
    category: "Island defence game",
    status: "Playable",
    summary:
      "A Godot island-defence prototype where small bots do the fighting and birds remain deeply annoying.",
    role: "Solo game development",
    technologies: ["Godot", "Game AI", "3D gameplay", "Browser build"],
    links: [{ label: "Play the game", href: "https://nickdev8.github.io/" }],
    challenge:
      "The game needed to make a small island feel busy and readable while autonomous units defend it. The player should understand what the bots are doing without controlling every individual action.",
    approach:
      "I used Godot to prototype the island, defenders and attacking birds, then focused the view and scale around watching the small agents act. The project explores how simple autonomous behavior can produce a game that is legible, playful and slightly chaotic.",
    outcome:
      "Blipstorm is available as a playable browser build. Its current screenshots show both the close-range combat and the wider island state so the relationship between individual bots and the whole defence is clear.",
    media: [
      { type: "image", src: "/projects/blipstorm/gameplay-close.webp", alt: "Blipstorm bots defending the island from chickens" },
      { type: "image", src: "/projects/blipstorm/island-overview.webp", alt: "Overview of the Blipstorm island and its defenders" },
    ],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));

export function projectPath(project) {
  return `/projects/${project.slug}/`;
}
