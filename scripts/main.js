document.addEventListener('DOMContentLoaded', () => {
  // ---- MENU TOGGLE (GSAP) ----
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

  // ---- PHYSICS TOGGLE ----
  const physToggle = document.getElementById('enablephysics');
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      teardownPhysics();
      setupPhysics();
      Runner.run(runner, engine);
    } else {
      teardownPhysics();
    }
  });

  // ---- INIT AOS AFTER YOUR MENU SETUP ----
  AOS.init();
});


// ==== MATTER.JS SETUP ====
const {
  Engine, World, Bodies, Body,
  Runner, Events,
  Mouse, MouseConstraint
} = Matter;

const engine = Engine.create();
const world  = engine.world;
const runner = Runner.create();

let dynamicMappings    = [];
let staticColliders    = [];
let walls              = [];
const originalPositions = new Map();

let isDragging  = false;
let justDragged = false;
let filterInstalled = false;

function setupPhysics() {
  // reset state
  dynamicMappings = [];
  staticColliders = [];
  walls = [];
  originalPositions.clear();

  // 1) RECORD EACH .physics ELEMENT’S PAGE‐SPACE CENTER
  document.querySelectorAll('.physics').forEach(elem => {
    const r = elem.getBoundingClientRect();
    const x0 = r.left  + window.scrollX + r.width  / 2;
    const y0 = r.top   + window.scrollY + r.height / 2;
    originalPositions.set(elem, {
      parent:      elem.parentNode,
      nextSibling: elem.nextSibling,
      x0, y0,
      width:  r.width,
      height: r.height
    });
  });

  // 2) RE‐PARENT NESTED .physics‐nested ITEMS
  document.querySelectorAll('.physics-nested').forEach(elem => {
    const outer = elem.closest('.physics:not(.physics-nested)');
    if (outer && outer.parentNode) {
      outer.parentNode.insertBefore(elem, outer.nextSibling);
    }
  });

  // 3) BUILD DYNAMIC BODIES
  document.querySelectorAll('.physics').forEach(elem => {
    const orig = originalPositions.get(elem);
    const r    = elem.getBoundingClientRect();
    const newX0 = r.left  + window.scrollX + r.width  / 2;
    const newY0 = r.top   + window.scrollY + r.height / 2;
    const offsetX = orig.x0 - newX0;
    const offsetY = orig.y0 - newY0;

    // initial “teleport” so it doesn’t jump
    if (offsetX || offsetY) {
      elem.style.transform = `translate(${offsetX}px,${offsetY}px)`;
    }
    elem.style.transformOrigin = 'center center';
    elem.classList.add('physics-active');
    elem.classList.remove('physics-inactive');

    const body = Bodies.rectangle(
      orig.x0, orig.y0,
      orig.width, orig.height,
      { restitution: 0.4, friction: 0.1 }
    );
    World.add(world, body);

    dynamicMappings.push({
      elem, body,
      x0: orig.x0, y0: orig.y0,
      offsetX, offsetY
    });
  });

  // 4) BUILD STATIC COLLIDERS (page‐space)
  document.querySelectorAll('.collision').forEach(elem => {
    const r = elem.getBoundingClientRect();
    const body = Bodies.rectangle(
      r.left + window.scrollX + r.width  / 2,
      r.top  + window.scrollY + r.height / 2,
      r.width, r.height,
      { isStatic: true, restitution: 0, friction: 1 }
    );
    World.add(world, body);
    staticColliders.push(body);
  });

  // 5) ONE‐TIME SETUP OF THE FOUR “WALL” BODIES AT PAGE BOUNDARIES
  const t = 50;
  const W = document.documentElement.scrollWidth;
  const H = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  walls = [
    Bodies.rectangle( W/2,    -t/2,   W, t, { isStatic: true } ), // top
    Bodies.rectangle( W/2,  H + t/2,   W, t, { isStatic: true } ), // bottom
    Bodies.rectangle(-t/2,    H/2,    t, H, { isStatic: true } ), // left
    Bodies.rectangle(W + t/2,  H/2,    t, H, { isStatic: true } )  // right
  ];
  World.add(world, walls);

  // only install filter once, even if you toggle physics repeatedly
  if (!filterInstalled) {
    const filter = e => {
      // if you’re *not* currently dragging a body, let the browser scroll
      if (!mouseConstraint.body) {
        e.stopImmediatePropagation();
      }
    };
    ['wheel','mousewheel','DOMMouseScroll','touchmove','pointermove']
      .forEach(type => window.addEventListener(type, filter, { capture: true }));
    filterInstalled = true;
  }

  // 6) MOUSE DRAGGING (VERY SNAPPY)
  const mouse = Mouse.create(document.body);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      length: 0.001,
      stiffness: 0.9,
      render: { visible: false }
    }
  });
  World.add(world, mouseConstraint);
  Events.on(mouseConstraint, 'startdrag', () => { isDragging = true; });
  Events.on(mouseConstraint, 'enddrag',   () => {
    isDragging = false;
    justDragged = true;
    setTimeout(() => { justDragged = false; }, 0);
  });

  // 7) SYNC LOOP (NO scroll‐math needed)
  Events.on(engine, 'afterUpdate', () => {
    dynamicMappings.forEach(({ elem, body, x0, y0, offsetX, offsetY }) => {
      const dx = body.position.x - x0 + offsetX;
      const dy = body.position.y - y0 + offsetY;
      elem.style.transform = `translate(${dx}px, ${dy}px) rotate(${body.angle}rad)`;

      // respawn if it ever falls way off the bottom
      if (body.position.y > H + 200) {
        Body.setPosition(body, { x: x0, y: y0 });
        Body.setVelocity(body, { x: 0, y: 0 });
        Body.setAngle(body, 0);
      }
    });
  });

  // 8) SUPPRESS FOULED CLICK/DRAG EVENTS
  document.addEventListener('click', e => {
    if (justDragged) e.stopImmediatePropagation(), e.preventDefault();
  }, true);
  document.addEventListener('mousedown', e => {
    if (isDragging) e.stopImmediatePropagation(), e.preventDefault();
  }, true);

  // 9) DISABLE TEXT/IMAGE SELECTION WHILE ACTIVE
  document.body.style.userSelect       = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect     = 'none';
  document.querySelectorAll('img').forEach(img => {
    img.draggable     = false;
    img.style.userSelect = 'none';
    img.ondragstart   = () => false;
  });

  // 10) RE‐ENABLE NATIVE SCROLL BAR
  document.body.style.overflowY = 'auto';

  // 11) REFRESH AOS SO IT STAYS OUT OF YOUR WAY
  AOS.refresh();
}


function teardownPhysics() {
  Runner.stop(runner);

  // remove dynamic bodies & reset DOM
  dynamicMappings.forEach(({ elem, body }) => {
    World.remove(world, body);
    elem.style.transform       = '';
    elem.style.transformOrigin = '';
    elem.classList.remove('physics-active');
    elem.classList.add('physics-inactive');
  });
  staticColliders.forEach(b => World.remove(world, b));
  walls.forEach(b           => World.remove(world, b));

  // restore any moved elements
  originalPositions.forEach(({ parent, nextSibling }, elem) => {
    if (nextSibling) parent.insertBefore(elem, nextSibling);
    else parent.appendChild(elem);
  });
  originalPositions.clear();

  // undo CSS overrides
  document.body.style.userSelect       = '';
  document.body.style.webkitUserSelect = '';
  document.body.style.msUserSelect     = '';
  document.querySelectorAll('img').forEach(img => {
    img.draggable   = true;
    img.style.userSelect = '';
    img.ondragstart = null;
  });
  document.body.style.overflowY = '';

  // clear flags & arrays
  isDragging      = false;
  justDragged     = false;
  dynamicMappings = [];
  staticColliders = [];
  walls           = [];
}
