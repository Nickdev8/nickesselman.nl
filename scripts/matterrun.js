// ===== Matter.js Declarations & Setup =====
var Engine            = Matter.Engine,
    World             = Matter.World,
    Bodies            = Matter.Bodies,
    Body              = Matter.Body,
    Runner            = Matter.Runner,
    Composite         = Matter.Composite,
    Constraint        = Matter.Constraint,
    Mouse             = Matter.Mouse,
    MouseConstraint   = Matter.MouseConstraint,
    Events            = Matter.Events;

var engine  = Engine.create({ enableSleeping: false });
var world   = engine.world;
var runner  = Runner.create();

// State Collections
var dynamicMappings    = [];
var imageMappings      = [];
var constraintMappings = [];
var staticColliders    = [];
var walls              = [];
var originalPositions  = new Map();
var fixedStyles        = new Map();

var isDragging     = false;
var justDragged    = false;
var filterInstalled= false;

// ===== Interface Toggles =====
function enableMatter() {
    var mainElem = document.querySelector('main');
    var rect     = mainElem.getBoundingClientRect();
    mainElem.style.height  = rect.height + 'px';
    mainElem.style.overflow= 'hidden';

    disableAllAOS();
    teardownPhysics();
    setupPhysics();

    document.getElementById('loadMoreBtn').style.display = 'none';
    document.querySelectorAll('.objectToMoreToTheBackClasses').forEach(function(elem) {
        elem.classList.add('objectToMoreToTheBackClasses-active');
        elem.classList.remove('projecttilt');
    });

    Runner.run(runner, engine);
}

function disableMatter() {
    var mainElem = document.querySelector('main');
    mainElem.style.height  = '';
    mainElem.style.overflow= '';

    enableAllAOS();
    teardownPhysics();
}

// ===== Physics Initialization =====
function setupPhysics() {
    // Reset State
    dynamicMappings.length    = 0;
    imageMappings.length      = 0;
    constraintMappings.length = 0;
    staticColliders.length    = 0;
    walls.length              = 0;
    originalPositions.clear();
    fixedStyles.clear();

    // Fix .physics-fixed Elements
    document.querySelectorAll('.physics-fixed').forEach(function(elem) {
        var r = elem.getBoundingClientRect();
        fixedStyles.set(elem, {
            position: elem.style.position,
            left:     elem.style.left,
            top:      elem.style.top
        });
        elem.style.position = 'absolute';
        elem.style.left     = (r.left + window.scrollX) + 'px';
        elem.style.top      = (r.top  + window.scrollY) + 'px';
    });

    // Record Original Positions
    document.querySelectorAll('.physics, .physics-loose').forEach(function(elem) {
        var r = elem.getBoundingClientRect();
        originalPositions.set(elem, {
            parent:      elem.parentNode,
            nextSibling: elem.nextSibling,
            x0:          r.left + window.scrollX + r.width/2,
            y0:          r.top  + window.scrollY + r.height/2,
            width:       r.width,
            height:      r.height
        });
    });

    // Re-parent Nested & Loose
    document.querySelectorAll('.physics-nested').forEach(function(elem) {
        var outer = elem.closest('.physics:not(.physics-nested)');
        if (outer && outer.parentNode) {
            outer.parentNode.insertBefore(elem, outer.nextSibling);
        }
    });
    var mainElem = document.querySelector('main');
    document.querySelectorAll('.physics-loose').forEach(function(elem) {
        mainElem && mainElem.appendChild(elem);
    });

    // Create Dynamic Bodies for .physics divs
    document.querySelectorAll('.physics, .physics-loose').forEach(function(elem) {
        var orig   = originalPositions.get(elem);
        var r      = elem.getBoundingClientRect();
        var newX   = r.left + window.scrollX + r.width/2;
        var newY   = r.top  + window.scrollY + r.height/2;
        var offsetX= orig.x0 - newX;
        var offsetY= orig.y0 - newY;

        if (offsetX || offsetY) {
            elem.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
        }
        elem.style.transformOrigin = 'center center';
        elem.classList.add('physics-active');
        elem.classList.remove('physics-inactive');

        var body = Bodies.rectangle(orig.x0, orig.y0, orig.width, orig.height, {
            restitution: 0.4,
            friction:    0.1
        });
        Composite.add(world, body);
        dynamicMappings.push({ elem: elem, body: body, x0: orig.x0, y0: orig.y0, offsetX: offsetX, offsetY: offsetY });
    });

    // Static Colliders
    document.querySelectorAll('.collision').forEach(function(elem) {
        var r = elem.getBoundingClientRect();
        var body = Bodies.rectangle(
            r.left + window.scrollX + r.width/2,
            r.top  + window.scrollY + r.height/2,
            r.width, r.height,
            { isStatic: true, restitution: 0, friction: 1 }
        );
        Composite.add(world, body);
        staticColliders.push(body);
    });

    // Add Custom Objects, Images & Joint
    addObjects();

    // Page Walls
    var t = 50;
    var W = document.documentElement.scrollWidth;
    var H = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    walls = [
        Bodies.rectangle(W/2,   -t/2, W, t, { isStatic: true }),
        Bodies.rectangle(W/2,   H+t/2, W, t, { isStatic: true }),
        Bodies.rectangle(-t/2,  H/2,   t, H, { isStatic: true }),
        Bodies.rectangle(W+t/2, H/2,   t, H, { isStatic: true })
    ];
    Composite.add(world, walls);

    // Scroll Filtering
    if (!filterInstalled) {
        var filter = function(e) { if (!mouseConstraint.body) e.stopImmediatePropagation(); };
        ['wheel','mousewheel','DOMMouseScroll','touchmove','pointermove'].forEach(function(type) {
            window.addEventListener(type, filter, { capture: true });
        });
        filterInstalled = true;
    }

    // Mouse Control
    var mouse = Mouse.create(document.body);
    var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { length: 0.001, stiffness: 0.9, render: { visible: false } }
    });
    Composite.add(world, mouseConstraint);
    Events.on(mouseConstraint, 'startdrag', function(){ isDragging = true;  });
    Events.on(mouseConstraint, 'enddrag',   function(){ isDragging = false; justDragged = true; setTimeout(function(){ justDragged = false; }, 0); });

    // Sync Loop
    Events.on(engine, 'afterUpdate', function() {
        // sync physics divs
        dynamicMappings.forEach(function(m) {
            var dx = m.body.position.x - m.x0 + m.offsetX;
            var dy = m.body.position.y - m.y0 + m.offsetY;
            m.elem.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + m.body.angle + 'rad)';
            if (m.body.position.y > H + 200) {
                Body.setPosition(m.body, { x: m.x0, y: m.y0 });
                Body.setVelocity(m.body, { x: 0, y: 0 });
                Body.setAngle(m.body, 0);
            }
        });
        // respawn and sync ball images
        imageMappings.forEach(function(m) {
            if (m.body.position.y > H + 200) {
                Body.setPosition(m.body, { x: m.x0, y: m.y0 });
                Body.setVelocity(m.body, { x: 0, y: 0 });
                Body.setAngle(m.body, 0);
            }
            var p = m.body.position;
            m.elem.style.left = p.x + 'px';
            m.elem.style.top  = p.y + 'px';
            m.elem.style.transform = 'translate(-50%, -50%) rotate(' + m.body.angle + 'rad)';
        });
        // sync joint lines
        constraintMappings.forEach(function(m) {
            var pA = m.bodyA.position;
            var pB = m.bodyB.position;
            m.elem.setAttribute('x1', pA.x);
            m.elem.setAttribute('y1', pA.y);
            m.elem.setAttribute('x2', pB.x);
            m.elem.setAttribute('y2', pB.y);
        });
    });

    // Interaction Guards
    document.addEventListener('click', function(e){ if (justDragged){ e.stopImmediatePropagation(); e.preventDefault(); } }, true);
    document.addEventListener('mousedown', function(e){ if (isDragging){ e.stopImmediatePropagation(); e.preventDefault(); } }, true);

    // Disable Selection
    document.body.style.userSelect        = 'none';
    document.body.style.webkitUserSelect  = 'none';
    document.body.style.msUserSelect      = 'none';
    document.querySelectorAll('img').forEach(function(img){ img.draggable = false; img.style.userSelect = 'none'; img.ondragstart = function(){ return false; }; });
    document.body.style.overflowY         = 'auto';
    AOS.refresh();
}

// ===== Physics Teardown =====
function teardownPhysics() {
    Runner.stop(runner);

    dynamicMappings.forEach(function(m) { Composite.remove(world, m.body); });
    imageMappings.forEach(function(m) { document.body.removeChild(m.elem); });
    constraintMappings.forEach(function(m){ m.elem.ownerSVGElement.remove(); });
    staticColliders.forEach(function(b){ Composite.remove(world, b); });
    walls.forEach(function(b){ Composite.remove(world, b); });

    originalPositions.forEach(function(info, elem) {
        if (info.nextSibling) info.parent.insertBefore(elem, info.nextSibling);
        else info.parent.appendChild(elem);
    });
    originalPositions.clear();

    fixedStyles.forEach(function(styles, elem) {
        elem.style.position = styles.position;
        elem.style.left     = styles.left;
        elem.style.top      = styles.top;
    });
    fixedStyles.clear();

    document.body.style.userSelect       = '';
    document.body.style.webkitUserSelect = '';
    document.body.style.msUserSelect     = '';
    document.querySelectorAll('img').forEach(function(img){ img.draggable = true; img.style.userSelect = ''; img.ondragstart = null; });
    document.body.style.overflowY        = '';

    isDragging  = false;
    justDragged = false;
    dynamicMappings    = [];
    imageMappings      = [];
    constraintMappings = [];
    staticColliders    = [];
    walls              = [];
}

// ===== Custom Objects, Images & Joint =====
function addObjects() {
    // compute viewport center and store for respawn
    var cx = window.scrollX + window.innerWidth  / 2;
    var cy = window.scrollY + window.innerHeight / 2;

    // create two balls
    var ballA = Bodies.circle(cx - 25, cy, 20, { restitution: 0.5, friction: 0.1 });
    var ballB = Bodies.circle(cx + 25, cy, 20, { restitution: 0.5, friction: 0.1 });

    // add spring constraint
    var spring = Constraint.create({
        bodyA: ballA, pointA: { x: 0, y: 0 },
        bodyB: ballB, pointB: { x: 0, y: 0 },
        length: 50, stiffness: 0.05, damping: 0.02
    });
    Composite.add(world, [ballA, ballB, spring]);

    // create SVG overlay for joint, absolute so it scrolls with the page
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg   = document.createElementNS(svgNS, 'svg');
    var docW  = document.documentElement.scrollWidth;
    var docH  = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    svg.style.position       = 'absolute';
    svg.style.left           = '0px';
    svg.style.top            = '0px';
    svg.style.width          = docW + 'px';
    svg.style.height         = docH + 'px';
    svg.style.pointerEvents  = 'none';
    document.body.appendChild(svg);

    var line = document.createElementNS(svgNS, 'line');
    line.setAttribute('stroke', '#888');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);

    [ballA, ballB].forEach(function(body) {
        var img = document.createElement('img');
        img.src                    = 'images/specials/ball.png';
        img.style.position         = 'absolute';
        img.style.width            = '40px';
        img.style.height           = '40px';
        img.style.transformOrigin  = 'center center';
        document.body.appendChild(img);
        imageMappings.push({ elem: img, body: body, x0: body.position.x, y0: body.position.y });
    });

    constraintMappings.push({ elem: line, bodyA: ballA, bodyB: ballB });
}
