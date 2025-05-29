document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('checkbox');
  const menu = document.getElementById('specials-menu');

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

const physToggle = document.getElementById('enablephysics');

physToggle.addEventListener('click', e => {
  if (physToggle.checked) {
    // if it was already running, stop & clear it...
    teardownPhysics();
    // then rebuild from scratch with fresh positions
    setupPhysics();
    Runner.run(runner, engine);
  } else {
    teardownPhysics();
  }
});

});


// Matter.js setup
const { Engine, World, Bodies, Runner, Events, Mouse, MouseConstraint } = Matter;
const engine = Engine.create();
const world = engine.world;
const runner = Runner.create();

// track bodies & DOM positions
let dynamicMappings = [];
let staticColliders = [];
let walls = [];
const originalPositions = new Map();

// drag state
let isDragging = false;
let justDragged = false;

function setupPhysics() {
  // reset
  dynamicMappings = [];
  staticColliders = [];
  walls = [];
  originalPositions.clear();

  // 0) record each .physics elem's original parent, sibling, size & center
  document.querySelectorAll('.physics').forEach(elem => {
    const r = elem.getBoundingClientRect();
    originalPositions.set(elem, {
      parent: elem.parentNode,
      nextSibling: elem.nextSibling,
      x0: r.left + r.width / 2,
      y0: r.top + r.height / 2,
      width: r.width,
      height: r.height
    });
  });

  // 0.5) reparent nested ones *after* recording positions
  document.querySelectorAll('.physics-nested').forEach(elem => {
    const outer = elem.closest('.physics:not(.physics-nested)');
    if (outer && outer.parentNode) {
      outer.parentNode.insertBefore(elem, outer.nextSibling);
    }
  });

  // 1) create dynamic bodies & compute per-element offset
  document.querySelectorAll('.physics').forEach(elem => {
    const orig = originalPositions.get(elem);
    // new screen‐center after reparent
    const nr = elem.getBoundingClientRect();
    const newX0 = nr.left + nr.width / 2;
    const newY0 = nr.top + nr.height / 2;
    // offset so it stays visually put until physics moves it
    const offsetX = orig.x0 - newX0;
    const offsetY = orig.y0 - newY0;

    // apply that initial offset
    if (offsetX || offsetY) {
      elem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
    elem.style.transformOrigin = 'center center';
    elem.classList.add('physics-active');
    elem.classList.remove('physics-inactive');

    // make the Matter body at the *original* center
    const body = Bodies.rectangle(
      orig.x0, orig.y0,
      orig.width, orig.height,
      { restitution: 0.4, friction: 0.1 }
    );
    World.add(world, body);

    // remember everything for sync
    dynamicMappings.push({
      elem, body,
      x0: orig.x0, y0: orig.y0,
      offsetX, offsetY
    });
  });

  // 2) static colliders
  document.querySelectorAll('.collision').forEach(elem => {
    const r = elem.getBoundingClientRect();
    const body = Bodies.rectangle(
      r.left + r.width / 2,
      r.top + r.height / 2,
      r.width, r.height,
      { isStatic: true, restitution: 0, friction: 1 }
    );
    World.add(world, body);
    staticColliders.push(body);
  });

  const w = window.innerWidth;
  const h = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    document.documentElement.clientHeight
  );
  const t = 50;

  walls = [
    Bodies.rectangle(w / 2, -t / 2, w, t, { isStatic: true }), // top
    Bodies.rectangle(w / 2, h + t / 2, w, t, { isStatic: true }), // bottom
    Bodies.rectangle(-t / 2, h / 2, t, h, { isStatic: true }), // left
    Bodies.rectangle(w + t / 2, h / 2, t, h, { isStatic: true })  // right
  ];
  World.add(world, walls);

  // 4) mouse dragging
  const mouse = Mouse.create(document.body);
  const mc = MouseConstraint.create(engine, {
    mouse, constraint: { stiffness: 0.2, render: { visible: false } }
  });
  World.add(world, mc);
  Events.on(mc, 'startdrag', () => { isDragging = true; });
  Events.on(mc, 'enddrag', () => {
    isDragging = false;
    justDragged = true;
    setTimeout(() => { justDragged = false; }, 0);
  });

  // 5) sync loop
  Events.on(engine, 'afterUpdate', () => {
    dynamicMappings.forEach(({ elem, body, x0, y0, offsetX, offsetY }) => {
      const dx = body.position.x - x0 + offsetX;
      const dy = body.position.y - y0 + offsetY;
      const angle = body.angle;
      elem.style.transform =
        `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
    });
  });

  // 6) suppress clicks/selection while dragging
  document.addEventListener('click', e => {
    if (justDragged) e.stopImmediatePropagation(), e.preventDefault();
  }, true);
  document.addEventListener('mousedown', e => {
    if (isDragging) e.stopImmediatePropagation(), e.preventDefault();
  }, true);

  // 7) disable text selection
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';

  // 8) disable image dragging
  document.querySelectorAll('img').forEach(img => {
    img.draggable = false;
    img.style.userSelect = 'none';
    img.ondragstart = () => false;
  });

  // 9) allow scrolling
  document.body.style.overflowY = 'auto';
}

function teardownPhysics() {

  // remove dynamic bodies & clear styles
  dynamicMappings.forEach(({ elem }) => {
    elem.classList.remove('physics-active');
    elem.classList.add('physics-inactive');
  });


  Runner.stop(runner);

  // remove dynamic bodies & clear styles
  dynamicMappings.forEach(({ elem, body }) => {
    World.remove(world, body);
    elem.style.transform = '';
    elem.style.transformOrigin = '';
  });

  // remove static colliders & walls
  staticColliders.forEach(b => World.remove(world, b));
  walls.forEach(b => World.remove(world, b));

  // restore nested elems to original parent/sibling
  originalPositions.forEach(({ parent, nextSibling }, elem) => {
    if (nextSibling) parent.insertBefore(elem, nextSibling);
    else parent.appendChild(elem);
  });
  originalPositions.clear();

  // clear drag flags
  isDragging = false;
  justDragged = false;

  // restore selection & dragging
  document.body.style.userSelect = '';
  document.body.style.webkitUserSelect = '';
  document.body.style.msUserSelect = '';
  document.querySelectorAll('img').forEach(img => {
    img.draggable = true;
    img.style.userSelect = '';
    img.ondragstart = null;
  });

  // restore scrolling
  document.body.style.overflowY = '';

  dynamicMappings = [];
  staticColliders = [];
  walls = [];
}
