document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('checkbox');
  const menu     = document.getElementById('specials-menu');

  gsap.set(menu, { autoAlpha: 0, display: 'none' });

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      menu.style.display = 'block';
      gsap.to(menu, { duration: 0.2, autoAlpha: 1 });
    } else {
      gsap.to(menu, {
        duration: 0.2,
        autoAlpha: 0,
        onComplete: () => { menu.style.display = 'none'; }
      });
    }
  });

  document.getElementById('enablephysics')
    .addEventListener('change', e => {
      if (e.target.checked) {
        setupPhysics();
        Runner.run(runner, engine);
      } else {
        teardownPhysics();
      }
    });
});

// Matter.js setup
const { Engine, World, Bodies, Runner, Events } = Matter;
const engine = Engine.create();
const world  = engine.world;
const runner = Runner.create();

// track your bodies
let dynamicMappings = [];   // for .physics (to sync transforms)
let staticColliders = [];   // for .collision
let walls = [];             // world bounds

function setupPhysics() {
  // clear old
  dynamicMappings = [];
  staticColliders = [];

  // 1) dynamic bodies for .physics
  document.querySelectorAll('.physics').forEach(elem => {
    const rect = elem.getBoundingClientRect();
    const x0   = rect.left + rect.width  / 2;
    const y0   = rect.top  + rect.height / 2;

    elem.style.transformOrigin = 'center center';

    const body = Bodies.rectangle(
      x0, y0,
      rect.width, rect.height,
      { restitution: 0.4, friction: 0.1 }
    );
    World.add(world, body);
    dynamicMappings.push({ elem, body, x0, y0 });
  });

  // 2) static bodies for .collision
  document.querySelectorAll('.collision').forEach(elem => {
    const rect = elem.getBoundingClientRect();
    const body = Bodies.rectangle(
      rect.left + rect.width  / 2,
      rect.top  + rect.height / 2,
      rect.width,
      rect.height,
      { isStatic: true, restitution: 0, friction: 1 }
    );
    World.add(world, body);
    staticColliders.push(body);
  });

  // 3) invisible walls
  const w = window.innerWidth, h = window.innerHeight, t = 50;
  walls = [
    Bodies.rectangle(w/2, -t/2, w, t, { isStatic: true }),
    Bodies.rectangle(w/2, h+t/2, w, t, { isStatic: true }),
    Bodies.rectangle(-t/2, h/2, t, h, { isStatic: true }),
    Bodies.rectangle(w+t/2, h/2, t, h, { isStatic: true })
  ];
  World.add(world, walls);

  // 4) sync loop for dynamics only
  Events.on(engine, 'afterUpdate', () => {
    dynamicMappings.forEach(({ elem, body, x0, y0 }) => {
      const dx    = body.position.x - x0;
      const dy    = body.position.y - y0;
      const angle = body.angle;
      elem.style.transform = `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
    });
  });
}

function teardownPhysics() {
  Runner.stop(runner);

  // remove dynamic bodies & clear transforms
  dynamicMappings.forEach(({ elem, body }) => {
    World.remove(world, body);
    elem.style.transform       = '';
    elem.style.transformOrigin = '';
  });

  // remove static colliders
  staticColliders.forEach(body => World.remove(world, body));

  // remove walls
  walls.forEach(body => World.remove(world, body));

  // clear arrays
  dynamicMappings = [];
  staticColliders = [];
  walls = [];
}
