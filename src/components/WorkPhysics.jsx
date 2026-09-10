import { useEffect, useRef } from "react";
import Matter from "matter-js";

const words = [
  "Websites.",
  "Software.",
  "Hardware.",
  "Games."
];

const LETTER_COLLISION_BASELINE_OFFSET = 4;
const SHOW_COLLIDERS = false;
const LETTER_COLLISION_HEIGHTS = {
  "Websites.": [0.85, 0.65, 0.8, 0.65, 0.9, 0.8, 0.65, 0.7, 0.2],
  "Software.": [0.87, 0.65, 0.9, 0.8, 0.65, 0.65, 0.65, 0.65, 0.2],
  "Hardware.": [0.88, 0.65, 0.65, 0.8, 0.65, 0.65, 0.65, 0.65, 0.2],
  "Games.": [0.86, 0.65, 0.7, 0.65, 0.65, 0.2],
};
const characters = words.flatMap((word, wordIndex) =>
  [...word].map((character, index) => ({
    character,
    isWordStart: index === 0,
    wordIndex,
    collisionHeightScale: LETTER_COLLISION_HEIGHTS[word][index],
  })),
);

export default function WorkPhysics() {
  const sceneRef = useRef(null);
  const characterRefs = useRef([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const letters = characterRefs.current.filter(Boolean);
    if (!scene || !letters.length) return undefined;

    const {
      Bodies,
      Body,
      Composite,
      Constraint,
      Engine,
      Events,
      Mouse,
      MouseConstraint,
      Query,
      Runner,
    } = Matter;
    const engine = Engine.create({ enableSleeping: true });
    const runner = Runner.create();
    let boundaries = [];
    let letterBodies = [];
    const randomBetween = (minimum, maximum) =>
      minimum + Math.random() * Math.max(maximum - minimum, 0);

    const createBoundaries = (width, height) => {
      const wallOptions = { isStatic: true, friction: 1, frictionStatic: 1 };
      return [
        Bodies.rectangle(width / 2, height + 24, width + 48, 48, wallOptions),
        Bodies.rectangle(-24, height / 2, 48, height, wallOptions),
        Bodies.rectangle(width + 24, height / 2, 48, height, wallOptions),
        Bodies.rectangle(width / 2, -24, width + 48, 48, wallOptions),
      ];
    };

    const setBounds = () => {
      const { width, height } = scene.getBoundingClientRect();
      if (!width || !height) return;

      if (boundaries.length) Composite.remove(engine.world, boundaries);
      boundaries = createBoundaries(width, height);
      Composite.add(engine.world, boundaries);

      letterBodies.forEach(
        ({ body, width: letterWidth, height: letterHeight }) => {
          Body.setPosition(body, {
            x: Math.min(
              Math.max(body.position.x, letterWidth / 2),
              width - letterWidth / 2,
            ),
            y: Math.min(
              Math.max(body.position.y, letterHeight / 2),
              height - letterHeight / 2,
            ),
          });
        },
      );
    };

    const sceneRect = scene.getBoundingClientRect();
    const measurements = letters.map((element, index) => {
      const { width, height } = element.getBoundingClientRect();
      const collisionHeight = height * characters[index].collisionHeightScale;
      return {
        width,
        height,
        collisionWidth: width,
        collisionHeight,
        collisionOffsetY:
          (height - collisionHeight) / 2 - LETTER_COLLISION_BASELINE_OFFSET,
        element,
        ...characters[index],
      };
    });
    const wordMeasurements = words.map((_, wordIndex) =>
      measurements.filter((measurement) => measurement.wordIndex === wordIndex),
    );
    const createWordGroup = (groupLetters, verticalBand) => {
      const gap = 2;
      const wordWidth =
        groupLetters.reduce((total, letter) => total + letter.width, 0) -
        gap * (groupLetters.length - 1);
      const wordHeight = Math.max(
        ...groupLetters.map((letter) => letter.height),
      );
      const x = randomBetween(wordWidth / 2, sceneRect.width - wordWidth / 2);
      const y = verticalBand
        ? randomBetween(
            Math.max(wordHeight / 2, verticalBand.start),
            Math.min(sceneRect.height - wordHeight / 2, verticalBand.end),
          )
        : randomBetween(wordHeight / 2, sceneRect.height - wordHeight / 2);
      const angle = randomBetween(-0.08, 0.08);
      const velocity = {
        x: randomBetween(-1.2, 1.2),
        y: randomBetween(-0.7, 0.7),
      };
      const angularVelocity = randomBetween(-0.035, 0.035);
      const collisionGroup = Body.nextGroup(true);
      let offset = -wordWidth / 2;

      return groupLetters.map((letter) => {
        const center = offset + letter.width / 2;
        const body = Bodies.rectangle(
          x +
            center * Math.cos(angle) -
            letter.collisionOffsetY * Math.sin(angle),
          y +
            center * Math.sin(angle) +
            letter.collisionOffsetY * Math.cos(angle),
          letter.collisionWidth,
          letter.collisionHeight,
          {
            restitution: 0.2,
            friction: 0.9,
            frictionStatic: 1,
            frictionAir: 0.03,
            collisionFilter: { group: collisionGroup },
          },
        );
        Body.setAngle(body, angle);
        Body.setVelocity(body, velocity);
        Body.setAngularVelocity(body, angularVelocity);
        offset += letter.width - gap;
        return {
          body,
          element: letter.element,
          width: letter.width,
          height: letter.height,
          collisionWidth: letter.collisionWidth,
          collisionHeight: letter.collisionHeight,
          collisionOffsetY: letter.collisionOffsetY,
        };
      });
    };
    const overlapsPlacedLetters = (candidate, placed) =>
      candidate.some(
        ({ body }) =>
          Query.collides(
            body,
            placed.flatMap((group) =>
              group.map(({ body: placedBody }) => placedBody),
            ),
          ).length,
      );

    let wordGroups = [];
    let fullLayoutAttempts = 0;
    while (wordGroups.length !== words.length && fullLayoutAttempts < 30) {
      const placedGroups = [];
      let placementFailed = false;

      for (const groupLetters of wordMeasurements) {
        let candidate;
        for (let attempt = 0; attempt < 5; attempt += 1) {
          const nextCandidate = createWordGroup(groupLetters);
          if (!overlapsPlacedLetters(nextCandidate, placedGroups)) {
            candidate = nextCandidate;
            break;
          }
        }
        if (!candidate) {
          placementFailed = true;
          break;
        }
        placedGroups.push(candidate);
      }

      wordGroups = placementFailed ? [] : placedGroups;
      fullLayoutAttempts += 1;
    }

    if (!wordGroups.length) {
      wordGroups = wordMeasurements.map((groupLetters, index) =>
        createWordGroup(groupLetters, {
          start: (sceneRect.height * index) / words.length,
          end: (sceneRect.height * (index + 1)) / words.length,
        }),
      );
    }
    letterBodies = wordGroups.flat();
    const letterConstraints = wordGroups.flatMap((group) =>
      group.slice(1).flatMap((letter, index) => {
        const previous = group[index];
        const sharedHeight = Math.min(
          previous.collisionHeight,
          letter.collisionHeight,
        );
        const createJoint = (distanceFromBottom) =>
          Constraint.create({
            bodyA: previous.body,
            pointA: {
              x: previous.collisionWidth / 2,
              y: previous.collisionHeight / 2 - distanceFromBottom,
            },
            bodyB: letter.body,
            pointB: {
              x: -letter.collisionWidth / 2,
              y: letter.collisionHeight / 2 - distanceFromBottom,
            },
            length: 2,
            stiffness: 0.99,
            damping: 0.22,
          });

        return [
          createJoint(sharedHeight * 0.18),
          createJoint(sharedHeight * 0.72),
        ];
      }),
    );
    const mouse = Mouse.create(scene);
    scene.removeEventListener("wheel", mouse.mousewheel);

    const keepBackgroundScrollable = (event) => {
      const touchedLetter =
        event.target instanceof Element &&
        event.target.closest(".physics-test-letter");
      if (!touchedLetter) {
        event.stopImmediatePropagation();
      }
    };
    scene.addEventListener("touchstart", keepBackgroundScrollable, true);
    scene.addEventListener("touchmove", keepBackgroundScrollable, true);
    scene.addEventListener("touchend", keepBackgroundScrollable, true);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.18, damping: 0.08, angularStiffness: 0 },
    });

    Composite.add(engine.world, [
      ...letterBodies.map(({ body }) => body),
      ...letterConstraints,
      mouseConstraint,
    ]);
    setBounds();

    const syncLetters = () => {
      letterBodies.forEach(
        ({ body, element, width, height, collisionOffsetY }) => {
          const { x, y } = body.position;
          const renderCenterX = x + collisionOffsetY * Math.sin(body.angle);
          const renderCenterY = y - collisionOffsetY * Math.cos(body.angle);
          element.style.transform = `translate(${renderCenterX - width / 2}px, ${renderCenterY - height / 2}px) rotate(${body.angle}rad)`;
        },
      );
    };

    Events.on(engine, "afterUpdate", syncLetters);
    syncLetters();
    letters.forEach((letter) => letter.classList.add("is-ready"));

    const resizeObserver = new ResizeObserver(setBounds);
    resizeObserver.observe(scene);
    Runner.run(runner, engine);

    return () => {
      resizeObserver.disconnect();
      Runner.stop(runner);
      scene.removeEventListener("mousemove", mouse.mousemove);
      scene.removeEventListener("mousedown", mouse.mousedown);
      scene.removeEventListener("mouseup", mouse.mouseup);
      scene.removeEventListener("touchmove", mouse.mousemove);
      scene.removeEventListener("touchstart", mouse.mousedown);
      scene.removeEventListener("touchend", mouse.mouseup);
      scene.removeEventListener("touchstart", keepBackgroundScrollable, true);
      scene.removeEventListener("touchmove", keepBackgroundScrollable, true);
      scene.removeEventListener("touchend", keepBackgroundScrollable, true);
      Mouse.clearSourceEvents(mouse);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="physics-test" ref={sceneRef}>
      {characters.map(
        ({ character, isWordStart, collisionHeightScale }, index) => (
          <span
            className={`physics-test-letter${isWordStart ? " is-word-start" : ""}`}
          style={{
            "--collision-height": `${collisionHeightScale * 100}%`,
            "--collision-bottom-offset": `${LETTER_COLLISION_BASELINE_OFFSET}px`,
            "--collider-display": SHOW_COLLIDERS ? "block" : "none",
            }}
            ref={(element) => {
              characterRefs.current[index] = element;
            }}
            key={`${character}-${index}`}
          >
            {character}
          </span>
        ),
      )}
    </div>
  );
}
