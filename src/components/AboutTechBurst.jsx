import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

import Portrait from "./Portrait";

const iconNames = [
  "android-plain",
  "apache-plain",
  "archlinux-plain",
  "arduino-plain",
  "bash-plain",
  "blender-original",
  "cloudflare-plain",
  "cplusplus-plain",
  "csharp-plain",
  "css3-plain",
  "dart-plain",
  "datadog-plain",
  "docker-plain",
  "figma-plain",
  "filezilla-plain",
  "firebase-plain",
  "fusion-original",
  "google-plain",
  "googlecloud-plain",
  "html5-plain",
  "ifttt-plain",
  "illustrator-plain",
  "homebrew-plain",
  "intellij-plain",
  "javascript-plain",
  "java-plain",
  "kalilinux-plain",
  "linux-plain",
  "linuxmint-plain",
  "lua-plain",
  "markdown-original",
  "mysql-plain",
  "nano-plain",
  "mariadb-plain",
  "ngrok-plain",
  "nginx-original",
  "nextjs-plain",
  "nim-plain",
  "npm-original-wordmark",
  "opengl-plain",
  "photoshop-plain",
  "php-plain",
  "powershell-plain",
  "python-plain",
  "putty-plain",
  "reactnative-original",
  "reactbootstrap-original",
  "react-original",
  "nodejs-plain",
  "raspberrypi-line",
  "reactrouter-plain",
  "salesforce-plain",
  "slack-plain",
  "sourceengine-original",
  "stackoverflow-plain",
  "ssh-original",
  "svelte-plain",
  "tailwindcss-plain",
  "tmux-plain",
  "tortoisegit-plain",
  "trello-plain",
  "typescript-plain",
  "ubuntu-plain",
  "unrealengine-original",
  "unity-original",
  "vercel-original",
  "visualstudio-plain",
  "vite-plain",
  "vitejs-plain",
  "vscode-plain",
  "vulkan-plain",
  "web3js-plain",
  "windows11-original",
  "windows8-original",
  "xml-plain",
  "yaml-plain",
  "zsh-plain",
  "xcode-plain",
];

const ICON_SIZE = 42;

export default function AboutTechBurst() {
  const triggerRef = useRef(null);
  const iconRefs = useRef(new Map());
  const engineRef = useRef(null);
  const bodiesRef = useRef(new Map());
  const nextIdRef = useRef(0);
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const { Bodies, Composite, Engine, Events, Runner } = Matter;
    const engine = Engine.create({ gravity: { y: 0.85 } });
    const runner = Runner.create();
    let walls = [];

    const updateWalls = () => {
      if (walls.length) Composite.remove(engine.world, walls);
      const options = { isStatic: true, restitution: 0.48, friction: 0.7 };
      walls = [
        Bodies.rectangle(window.innerWidth / 2, -30, window.innerWidth + 60, 60, options),
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth + 60, 60, options),
        Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight + 60, options),
        Bodies.rectangle(window.innerWidth + 30, window.innerHeight / 2, 60, window.innerHeight + 60, options),
      ];
      Composite.add(engine.world, walls);
    };

    updateWalls();
    window.addEventListener("resize", updateWalls);
    Events.on(engine, "afterUpdate", () => {
      bodiesRef.current.forEach((body, id) => {
        const icon = iconRefs.current.get(id);
        if (!icon) return;
        icon.style.transform = `translate(${body.position.x - ICON_SIZE / 2}px, ${body.position.y - ICON_SIZE / 2}px) rotate(${body.angle}rad)`;
      });
    });

    engineRef.current = engine;
    Runner.run(runner, engine);

    return () => {
      window.removeEventListener("resize", updateWalls);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  const launch = () => {
    const trigger = triggerRef.current;
    const engine = engineRef.current;
    if (!trigger || !engine) return;

    const { Bodies, Body, Composite } = Matter;
    const rect = trigger.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.bottom + 10 };
    const burst = iconNames.map((iconName) => ({
      id: nextIdRef.current++,
      iconName,
    }));

    setIcons((current) => [...current, ...burst]);
    window.requestAnimationFrame(() => {
      burst.forEach(({ id }) => {
        const direction = Math.random() * Math.PI * 2;
        const speed = 9 + Math.random() * 12;
        const body = Bodies.rectangle(origin.x, origin.y, ICON_SIZE, ICON_SIZE, {
          restitution: 0.52,
          friction: 0.2,
          frictionAir: 0.012,
        });
        Body.setVelocity(body, {
          x: Math.cos(direction) * speed,
          y: Math.sin(direction) * speed - 4,
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);
        bodiesRef.current.set(id, body);
        Composite.add(engine.world, body);
      });
    });

  };

  return (
    <>
      <button
        className="about-portrait-trigger"
        type="button"
        ref={triggerRef}
        onClick={launch}
        aria-label="Launch programming tools"
      >
        <Portrait priority variant="film" />
      </button>
      <div className="about-tech-burst" aria-hidden="true">
        {icons.map(({ id, iconName }) => (
          <img
            className="about-tech-burst-icon"
            src={`/icons/devicon/${iconName}.svg`}
            alt=""
            draggable="false"
            ref={(element) => {
              if (element) iconRefs.current.set(id, element);
            }}
            key={id}
          />
        ))}
      </div>
    </>
  );
}
