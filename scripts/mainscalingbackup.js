// track current CSS scale so we can compensate
let currentScale = 1;

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const root = document.documentElement;

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
        duration: 0.2, autoAlpha: 0,
        onComplete: () => menu.style.display = 'none'
      });
    }
  });

  // ---- SMOOTH ZOOM TRANSITIONS ----
  root.style.transition      = 'transform 0.3s ease, width 0.3s ease';
  root.style.transformOrigin = '0 0';

  // ---- PHYSICS TOGGLE ----
  const physToggle = document.getElementById('enablephysics');
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      currentScale = 0.8;
      root.style.transform = `scale(${currentScale})`;
      root.style.width     = `${100/currentScale}%`;

      disableAllAOS();
      teardownPhysics();
      setupPhysics();

      document.getElementById('loadMoreBtn').style.display = 'none';
      document.querySelectorAll('.objectToMoreToTheBackClasses')
        .forEach(el => {
          el.classList.add('objectToMoreToTheBackClasses-active');
          el.classList.remove('projecttilt');
        });

      Runner.run(runner, engine);
    } else {
      currentScale = 1;
      root.style.transform = '';
      root.style.width     = '';

      enableAllAOS();
      teardownPhysics();
    }
  });

  AOS.init();
});


// ---- MATTER.JS IMPORTS & GLOBAL STATE ----
const {
  Engine, World, Bodies, Body,
  Runner, Events,
  Mouse, MouseConstraint
} = Matter;

const engine = Engine.create();
const world  = engine.world;
const runner = Runner.create();

let dynamicMappings = [];
let staticColliders = [];
let walls           = [];
const originalPositions = new Map();
const fixedStyles       = new Map();
let isDragging = false;
let justDragged = false;
let filterInstalled = false;
let mouseConstraint;

// helper: get true DOM rect ignoring our root CSS scale
function getUnscaledRect(elem) {
  const root = document.documentElement;
  const prevT = root.style.transform;
  const prevW = root.style.width;
  root.style.transform = '';
  root.style.width     = '';
  const r = elem.getBoundingClientRect();
  root.style.transform = prevT;
  root.style.width     = prevW;
  return r;
}

function setupPhysics() {
  dynamicMappings = [];
  staticColliders = [];
  walls           = [];
  originalPositions.clear();
  fixedStyles.clear();

  const main = document.querySelector('main');

  // 1) ABSOLUTIZE any .physics-fixed
  document.querySelectorAll('.physics-fixed').forEach(elem => {
    const r = getUnscaledRect(elem);
    fixedStyles.set(elem, {
      position: elem.style.position,
      left:     elem.style.left,
      top:      elem.style.top
    });
    elem.style.position = 'absolute';
    elem.style.left     = `${r.left + window.scrollX}px`;
    elem.style.top      = `${r.top  + window.scrollY}px`;
  });

  // 2) RECORD unscaled original positions
  document.querySelectorAll('.physics, .physics-loose').forEach(elem => {
    const r = getUnscaledRect(elem);
    originalPositions.set(elem, {
      parent:      elem.parentNode,
      nextSibling: elem.nextSibling,
      x0:          r.left  + window.scrollX + r.width/2,
      y0:          r.top   + window.scrollY + r.height/2,
      width:       r.width,
      height:      r.height
    });
  });

  // 3) RE-PARENT .physics-nested out
  document.querySelectorAll('.physics-nested').forEach(elem => {
    const outer = elem.closest('.physics:not(.physics-nested)');
    if (outer && outer.parentNode) {
      outer.parentNode.insertBefore(elem, outer.nextSibling);
    }
  });

  // 4) RE-PARENT .physics-loose into <main>
  document.querySelectorAll('.physics-loose').forEach(elem => {
    if (main) main.appendChild(elem);
  });

  // 5) CREATE DYNAMIC BODIES
  document.querySelectorAll('.physics, .physics-loose').forEach(elem => {
    const orig = originalPositions.get(elem);
    const r    = getUnscaledRect(elem);
    const newX = r.left  + window.scrollX + r.width/2;
    const newY = r.top   + window.scrollY + r.height/2;
    const offsetX = orig.x0 - newX;
    const offsetY = orig.y0 - newY;

    // prevent initial jump
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
    dynamicMappings.push({ elem, body, x0: orig.x0, y0: orig.y0, offsetX, offsetY });
  });

  // 6) STATIC COLLIDERS
  document.querySelectorAll('.collision').forEach(elem => {
    const r = getUnscaledRect(elem);
    const body = Bodies.rectangle(
      r.left + window.scrollX + r.width/2,
      r.top  + window.scrollY + r.height/2,
      r.width, r.height,
      { isStatic: true, restitution: 0, friction: 1 }
    );
    World.add(world, body);
    staticColliders.push(body);
  });

  // 7) PAGE BOUNDS “WALLS”
  const t = 50;
  const W = document.documentElement.scrollWidth;
  const H = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  walls = [
    Bodies.rectangle( W/2,    -t/2,   W, t, { isStatic: true }),
    Bodies.rectangle( W/2,  H + t/2,   W, t, { isStatic: true }),
    Bodies.rectangle(-t/2,    H/2,    t, H, { isStatic: true }),
    Bodies.rectangle(W + t/2,  H/2,    t, H, { isStatic: true })
  ];
  World.add(world, walls);

  // 8) SCROLL FILTER
  if (!filterInstalled) {
    const filter = e => { if (!mouseConstraint.body) e.stopImmediatePropagation(); };
    ['wheel','mousewheel','DOMMouseScroll','touchmove','pointermove']
      .forEach(type => window.addEventListener(type, filter, { capture: true }));
    filterInstalled = true;
  }

  // 9) MOUSE CONSTRAINT (now use scale as pixelRatio)
  const mouse = Mouse.create(document.body);
  mouse.pixelRatio = currentScale;
  mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { length: 0.001, stiffness: 0.9, render: { visible: false } }
  });
  World.add(world, mouseConstraint);

  Events.on(mouseConstraint, 'startdrag', () => { isDragging = true; });
  Events.on(mouseConstraint, 'enddrag',   () => {
    isDragging = false;
    justDragged = true;
    setTimeout(() => { justDragged = false; }, 0);
  });

  // 10) SYNC & RESPAWN
  Events.on(engine, 'afterUpdate', () => {
    dynamicMappings.forEach(({ elem, body, x0, y0, offsetX, offsetY }) => {
      const dx = body.position.x - x0 + offsetX;
      const dy = body.position.y - y0 + offsetY;
      elem.style.transform = `translate(${dx}px, ${dy}px) rotate(${body.angle}rad)`;
      if (body.position.y > H + 200) {
        Body.setPosition(body, { x: x0, y: y0 });
        Body.setVelocity(body, { x: 0, y: 0 });
        Body.setAngle(body, 0);
      }
    });
  });

  // 11) SAFEGUARDS
  document.addEventListener('click',    e => {
    if (justDragged) e.stopImmediatePropagation(), e.preventDefault();
  }, true);
  document.addEventListener('mousedown',e => {
    if (isDragging)  e.stopImmediatePropagation(), e.preventDefault();
  }, true);

  // 12) DISABLE SELECTION
  document.body.style.userSelect       = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect     = 'none';
  document.querySelectorAll('img').forEach(img => {
    img.draggable       = false;
    img.style.userSelect = 'none';
    img.ondragstart     = () => false;
  });

  // 13) ENABLE SCROLLBAR
  document.body.style.overflowY = 'auto';

  // 14) REFRESH AOS
  AOS.refresh();
}

function teardownPhysics() {
  Runner.stop(runner);

  dynamicMappings.forEach(({ elem, body }) => {
    World.remove(world, body);
    elem.style.transform       = '';
    elem.style.transformOrigin = '';
    elem.classList.remove('physics-active');
    elem.classList.add('physics-inactive');
  });
  staticColliders.forEach(b => World.remove(world, b));
  walls.forEach(b           => World.remove(world, b));

  originalPositions.forEach(({ parent, nextSibling }, elem) => {
    if (nextSibling) parent.insertBefore(elem, nextSibling);
    else parent.appendChild(elem);
  });
  originalPositions.clear();

  fixedStyles.forEach((styles, elem) => {
    elem.style.position = styles.position;
    elem.style.left     = styles.left;
    elem.style.top      = styles.top;
  });
  fixedStyles.clear();

  document.body.style.userSelect       = '';
  document.body.style.webkitUserSelect = '';
  document.body.style.msUserSelect     = '';
  document.querySelectorAll('img').forEach(img => {
    img.draggable       = true;
    img.style.userSelect = '';
    img.ondragstart     = null;
  });
  document.body.style.overflowY = '';

  isDragging = false;
  justDragged = false;
  dynamicMappings = [];
  staticColliders = [];
  walls = [];
}
