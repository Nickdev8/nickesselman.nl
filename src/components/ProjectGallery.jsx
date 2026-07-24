import { useEffect, useRef, useState } from "react";

const SHOW_PROJECT_DETAILS = false;

const projects = [
  {
    title: "PartyVR",
    type: "VR party platform",
    year: "active",
    description: "Room-scale multiplayer games with a server-authoritative LAN setup and a spectator screen for everyone outside the headset.",
    media: [
      {
        type: "image",
        src: "/projects/partyvr/development.webp",
        alt: "PartyVR rendering and device logs during development",
      },
      {
        type: "image",
        src: "/projects/partyvr/host-panel.webp",
        alt: "PartyVR host panel for rounds, players, and hardware",
      },
      {
        type: "image",
        src: "/projects/partyvr/multiplayer-debug.webp",
        alt: "PartyVR multi-client avatar and synchronization test",
      },
      {
        type: "image",
        src: "/projects/partyvr/avatar-workshop.webp",
        alt: "PartyVR avatars and cosmetics being developed in Blender",
      },
    ],
    href: "https://github.com/Nickdev8/PartyVR",
    action: "open repo",
  },
  {
    title: "LAMP",
    type: "LED hardware",
    year: "PCB ready",
    description: "A custom RP2040 board for driving chains of LED panels and large xLights-style installations.",
    media: [
      {
        type: "image",
        src: "/projects/lamp/bench-prototype.webp",
        alt: "LAMP LED panel and controller prototype on a workbench",
      },
      {
        type: "image",
        src: "/projects/lamp/floor-test.webp",
        alt: "Multiple LAMP LED panels connected for a floor test",
      },
      {
        type: "image",
        src: "/projects/lamp/installed-display.webp",
        alt: "LAMP display running behind a development laptop",
      },
      {
        type: "image",
        src: "/projects/lamp/assembled-panel.webp",
        alt: "Assembled LAMP panel showing multicolored LEDs",
      },
    ],
    href: "https://github.com/Nickdev8/LedScreen",
    action: "open repo",
  },
  {
    title: "MYMacropad",
    type: "custom input device",
    year: "built",
    description: "A 4×4 macropad designed from PCB to case, including firmware, switches and soldering.",
    media: [
      {
        type: "image",
        src: "/projects/mymacropad/finished-case.webp",
        alt: "Finished MYMacropad with coral keycaps and blue enclosure",
      },
      {
        type: "image",
        src: "/projects/mymacropad/pcb-back.webp",
        alt: "Back of the MYMacropad PCB with custom artwork",
      },
      {
        type: "image",
        src: "/projects/mymacropad/assembled-board.webp",
        alt: "Assembled MYMacropad circuit board held in one hand",
      },
    ],
    href: "https://github.com/Nickdev8/macropad",
    action: "open repo",
  },
  {
    title: "Shelly Control Board",
    type: "local event system",
    year: "active",
    description: "Kennemer is a local-first control surface for running a room full of Shelly-powered devices without relying on the cloud.",
    media: [
      {
        type: "image",
        src: "/projects/kennemer/control-interface.webp",
        alt: "Shelly Control Board interface running on a portable display",
      },
      {
        type: "image",
        src: "/projects/kennemer/shelly-hardware.webp",
        alt: "Hand-wired Shelly relay and button control board",
      },
    ],
    href: "https://github.com/Nickdev8/kennemer",
    action: "open repo",
  },
  {
    title: "Monkey Swing",
    type: "2D game",
    year: "shipped",
    description: "My first finished Unity game: repeated faceplants, one swinging monkey, and a lesson in shipping small things.",
    media: [
      {
        type: "image",
        src: "/projects/monkey-swing/gameplay.webp",
        alt: "Monkey Swing gameplay in a pixel-art forest",
      },
      {
        type: "video",
        src: "/projects/monkey-swing/gameplay.mp4",
        poster: "/projects/monkey-swing/gameplay.webp",
        label: "Monkey Swing gameplay video",
      },
    ],
    href: "https://nikkcc.itch.io/ms",
    action: "play game",
  },
  {
    title: "Blipstorm",
    type: "island defence game",
    year: "playable",
    description: "A Godot island-defence prototype where small bots do the fighting and birds remain deeply annoying.",
    media: [
      {
        type: "image",
        src: "/projects/blipstorm/gameplay-close.webp",
        alt: "Blipstorm bots defending the island from chickens",
      },
      {
        type: "image",
        src: "/projects/blipstorm/island-overview.webp",
        alt: "Overview of the Blipstorm island and its defenders",
      },
    ],
    href: "https://nickdev8.github.io/",
    action: "play game",
  },
];

function VideoSlide({ media, active }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [active]);

  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster}
      aria-label={media.label}
      autoPlay={active}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
    />
  );
}

function ProjectCarousel({ project, index }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = project.media ?? [1, 2, 3].map((number) => ({
    type: "image",
    src: project.image,
    alt: `${project.title} placeholder ${number}`,
    placeholder: true,
  }));

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let intervalId;
    const startDelay = 1400 + index * 713;
    const interval = 4200 + ((index * 977) % 2100);
    const startId = window.setTimeout(() => {
      setSlide((current) => (current + 1) % slides.length);
      intervalId = window.setInterval(() => {
        setSlide((current) => (current + 1) % slides.length);
      }, interval);
    }, startDelay);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [index, paused, slides.length]);

  function move(direction) {
    setSlide((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <article
      className="project-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="carousel-viewport">
        <div className="carousel-media">
          <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {slides.map((media, mediaIndex) => (
              <div
                className={`carousel-slide carousel-slide-${mediaIndex + 1}${media.placeholder ? " carousel-slide-placeholder" : ""}`}
                key={media.src + mediaIndex}
                aria-hidden={slide !== mediaIndex}
              >
                {media.type === "video" ? (
                  <VideoSlide media={media} active={slide === mediaIndex} />
                ) : (
                  <img src={media.src} alt={media.alt} />
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="button" className="carousel-arrow carousel-arrow-left" onClick={() => move(-1)} aria-label={`Previous ${project.title} image`}>←</button>
        <button type="button" className="carousel-arrow carousel-arrow-right" onClick={() => move(1)} aria-label={`Next ${project.title} image`}>→</button>
        <span className="carousel-counter">{slide + 1} / {slides.length}</span>

        {SHOW_PROJECT_DETAILS && (
          <div className="carousel-details">
            <div>
              <p>{project.type} — {project.year}</p>
              <h2>{project.title}</h2>
            </div>
            <p>{project.description}</p>
            <span className="project-action">{project.action} ↗</span>
          </div>
        )}
      </div>
      <div className="project-caption">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{project.title}</span>
        <span>{project.year}</span>
      </div>
      <a
        className="project-card-link"
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.action}: ${project.title}`}
      />
    </article>
  );
}

export default function ProjectGallery() {
  return (
    <section className="projects-section" id="work">
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCarousel project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}
