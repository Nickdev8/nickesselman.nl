import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

import Portrait from "./Portrait";

const iconClasses = [
  "devicon-android-plain",
  "devicon-apache-plain",
  "devicon-archlinux-plain",
  "devicon-arduino-plain",
  "devicon-bash-plain",
  "devicon-blender-original",
  "devicon-cloudflare-plain",
  "devicon-cplusplus-plain",
  "devicon-csharp-plain",
  "devicon-css3-plain",
  "devicon-dart-plain",
  "devicon-datadog-plain",
  "devicon-docker-plain",
  "devicon-figma-plain",
  "devicon-filezilla-plain",
  "devicon-firebase-plain",
  "devicon-fusion-original",
  "devicon-google-plain",
  "devicon-googlecloud-plain",
  "devicon-html5-plain",
  "devicon-ifttt-plain",
  "devicon-illustrator-plain",
  "devicon-homebrew-plain",
  "devicon-intellij-plain",
  "devicon-javascript-plain",
  "devicon-java-plain",
  "devicon-kalilinux-plain",
  "devicon-linux-plain",
  "devicon-linuxmint-plain",
  "devicon-lua-plain",
  "devicon-markdown-original",
  "devicon-mysql-plain",
  "devicon-nano-plain",
  "devicon-mariadb-plain",
  "devicon-ngrok-plain",
  "devicon-nginx-original",
  "devicon-nextjs-plain",
  "devicon-nim-plain",
  "devicon-npm-original-wordmark",
  "devicon-npx-plain",
  "devicon-opengl-plain",
  "devicon-photoshop-plain",
  "devicon-php-plain",
  "devicon-powershell-plain",
  "devicon-python-plain",
  "devicon-putty-plain",
  "devicon-reactnative-original",
  "devicon-reactbootstrap-original",
  "devicon-react-original",
  "devicon-nodejs-plain",
  "devicon-raspberrypi-line",
  "devicon-reactrouter-plain",
  "devicon-salesforce-plain",
  "devicon-slack-plain",
  "devicon-sourceengine-original",
  "devicon-stackoverflow-plain",
  "devicon-ssh-original",
  "devicon-svelte-plain",
  "devicon-tailwindcss-plain",
  "devicon-tmux-plain",
  "devicon-tortoisegit-plain",
  "devicon-trello-plain",
  "devicon-typescript-plain",
  "devicon-ubuntu-plain",
  "devicon-unrealengine-original",
  "devicon-unity-original",
  "devicon-vercel-original",
  "devicon-visualstudio-plain",
  "devicon-vite-plain",
  "devicon-vitejs-plain",
  "devicon-vscode-plain",
  "devicon-vulkan-plain",
  "devicon-web3js-plain",
  "devicon-windows11-original",
  "devicon-windows8-original",
  "devicon-xml-plain",
  "devicon-yaml-plain",
  "devicon-zsh-plain",
  "devicon-xcode-plain",
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
    const burst = iconClasses.map((iconClass) => ({
      id: nextIdRef.current++,
      iconClass,
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
        {icons.map(({ id, iconClass }) => (
          <i
            className={`${iconClass} colored about-tech-burst-icon`}
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
