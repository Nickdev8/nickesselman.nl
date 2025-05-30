// ===== Matter.js Declarations & Setup =====
var Engine          = Matter.Engine,
    World           = Matter.World,
    Bodies          = Matter.Bodies,
    Body            = Matter.Body,
    Runner          = Matter.Runner,
    Composite       = Matter.Composite,
    Constraint      = Matter.Constraint,
    Mouse           = Matter.Mouse,
    Events          = Matter.Events,
    Vector          = Matter.Vector;

var engine            = Engine.create({ enableSleeping: false });
var world             = engine.world;
var runner            = Runner.create();

// State Collections
var dynamicMappings   = [];
var imageMappings     = [];
var constraintMappings= [];
var staticColliders   = [];
var walls             = [];
var originalPositions = new Map();
var fixedStyles       = new Map();

// viewport-fixed anchors
var ropeConstraint1, ropeConstraint2, fixedAnchor1, fixedAnchor2;
var isDragging = false, justDragged = false, filterInstalled = false;

// for custom “grab pivot” dragging:
var grabbedBody    = null;
var grabConstraint = null;

var ropedistnace = 150;
var ropeLength   = 100;


// ===== Interface Toggles =====
function enableMatter() {
    var mainElem = document.querySelector('main');

    // 1) fix missing dot in your selector
    document.querySelectorAll('span.physics, .physics-add-card')
            .forEach(elem => elem.classList.add('card'));

    // 2) strip out non-physics spans
    document.querySelectorAll('p.onlyspans').forEach(p => {
        Array.from(p.childNodes).forEach(node => {
            if (!(node.nodeType === Node.ELEMENT_NODE && node.matches('span.physics'))) {
                p.removeChild(node);
            }
        });
    });

    // set up main container height
    var rect   = mainElem.getBoundingClientRect();
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    var minH   = window.innerHeight
                 - (header ? header.getBoundingClientRect().height : 0)
                 - (footer ? footer.getBoundingClientRect().height : 0);
    mainElem.style.height  = Math.max(rect.height, minH) + 'px';
    mainElem.style.overflow = 'hidden';

    disableAllAOS();
    setupPhysics();
    if (document.getElementById('loadMoreBtn')) {
        document.getElementById('loadMoreBtn').style.display = 'none';
    }
    document.querySelectorAll('.objectToMoreToTheBackClasses')
            .forEach(elem => {
                elem.classList.add('objectToMoreToTheBackClasses-active');
                elem.classList.remove('projecttilt');
            });

    Runner.run(runner, engine);
}


// ===== Physics Initialization =====
function setupPhysics() {
    // --- Reset all state ---
    dynamicMappings.length    = 0;
    imageMappings.length      = 0;
    constraintMappings.length = 0;
    staticColliders.length    = 0;
    walls.length              = 0;
    originalPositions.clear();
    fixedStyles.clear();

    var footer       = document.querySelector('footer');
    var footerHeight = footer ? footer.getBoundingClientRect().height : 0;

    // --- Fix .physics-fixed Elements ---
    document.querySelectorAll('.physics-fixed').forEach(elem => {
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

    // --- Record Original Positions for all .physics and .physics-loose ---
    document.querySelectorAll('.physics, .physics-loose').forEach(elem => {
        elem.classList.add('physics-active');
        elem.classList.remove('physics-inactive');
        var r = elem.getBoundingClientRect();
        originalPositions.set(elem, {
            parent:      elem.parentNode,
            nextSibling: elem.nextSibling,
            x0:          r.left   + window.scrollX + r.width  / 2,
            y0:          r.top    + window.scrollY + r.height / 2,
            width:       r.width,
            height:      r.height
        });
    });

    // --- Re-parent nested & loose elements to <main> ---
    document.querySelectorAll('.physics-nested').forEach(elem => {
        var outer = elem.closest('.physics:not(.physics-nested)');
        if (outer && outer.parentNode) outer.parentNode.insertBefore(elem, outer.nextSibling);
    });
    var mainElem = document.querySelector('main');
    document.querySelectorAll('.physics-loose').forEach(elem => {
        mainElem && mainElem.appendChild(elem);
    });

    // --- Create dynamic bodies for each physics element ---
    document.querySelectorAll('.physics, .physics-loose').forEach(elem => {
        var orig    = originalPositions.get(elem);
        var r       = elem.getBoundingClientRect();
        var newX    = r.left + window.scrollX + r.width  / 2;
        var newY    = r.top  + window.scrollY + r.height / 2;
        var offsetX = orig.x0 - newX;
        var offsetY = orig.y0 - newY;
        if (offsetX || offsetY) {
            elem.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
        }
        elem.style.transformOrigin = 'center center';

        var body = Bodies.rectangle(orig.x0, orig.y0, orig.width, orig.height, {
            restitution: 0.4,
            friction:    0.1
        });
        Composite.add(world, body);
        dynamicMappings.push({
            elem:    elem,
            body:    body,
            x0:      orig.x0,
            y0:      orig.y0,
            offsetX: offsetX,
            offsetY: offsetY
        });
    });

    // --- Static colliders (.collision) ---
    document.querySelectorAll('.collision').forEach(elem => {
        var r = elem.getBoundingClientRect();
        var body = Bodies.rectangle(
            r.left + window.scrollX + r.width  / 2,
            r.top  + window.scrollY + r.height / 2,
            r.width, r.height,
            { isStatic: true, restitution: 0, friction: 1 }
        );
        Composite.add(world, body);
        staticColliders.push(body);
    });

    // --- Add your custom objects, images & joints ---
    addObjects();

    // --- Page walls (top/bottom/left/right) ---
    var t = 50;
    var W = document.documentElement.scrollWidth;
    var H = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
    );
    walls = [
        Bodies.rectangle(W/2, -t/2, W, t, { isStatic: true }),                          // top
        Bodies.rectangle(W/2, H + t/2 - footerHeight, W, t, { isStatic: true }),        // bottom
        Bodies.rectangle(-t/2, H/2, t, H, { isStatic: true }),                          // left
        Bodies.rectangle(W + t/2, H/2, t, H, { isStatic: true })                        // right
    ];
    Composite.add(world, walls);

    // --- Scroll filtering: prevent page scroll while dragging our grab-joint ---
    if (!filterInstalled) {
        var filter = function(e) {
            if (grabConstraint) e.stopImmediatePropagation();
        };
        ['wheel','mousewheel','DOMMouseScroll','touchmove','pointermove']
            .forEach(type => window.addEventListener(type, filter, { capture: true }));
        filterInstalled = true;
    }

    // --- Custom “grab pivot” Mouse Handling ---
    var mouse = Mouse.create(document.body);

    // On mousedown: pick the topmost dynamic body under the cursor
    document.addEventListener('mousedown', function(e) {
        var pos    = mouse.position;
        var bodies = Matter.Query.point(dynamicMappings.map(m => m.body), pos);
        if (bodies.length > 0) {
            grabbedBody = bodies[0];
            // compute local offset in the body’s frame
            var localPoint = Vector.rotate(
                Vector.sub(pos, grabbedBody.position),
                -grabbedBody.angle
            );
            grabConstraint = Constraint.create({
                pointA:   { x: pos.x, y: pos.y },  // world-space
                bodyB:    grabbedBody,             // attach to the body
                pointB:   localPoint,              // local pivot
                length:   0,                       // pin
                stiffness:1,                       // very stiff
                damping:  0,
                render:   { visible: false }
            });
            Composite.add(world, grabConstraint);
        }
    });

    // On mousemove: move the pin to follow the cursor
    document.addEventListener('mousemove', function(e) {
        if (grabConstraint) {
            var pos = mouse.position;
            grabConstraint.pointA.x = pos.x;
            grabConstraint.pointA.y = pos.y;
        }
    });

    // On mouseup: release the pin
    document.addEventListener('mouseup', function(e) {
        if (grabConstraint) {
            Composite.remove(world, grabConstraint);
            grabConstraint = null;
            grabbedBody   = null;
        }
    });


    // ===== Matter.js update loops =====

    // beforeUpdate: keep any fixed anchors up to date
    Events.on(engine, 'beforeUpdate', function() {
        var offX = window.innerWidth - 100,
            offY = 50,
            ax1  = window.scrollX + offX,
            ay1  = window.scrollY + offY,
            ax2  = ax1 - ropedistnace,
            ay2  = ay1;

        if (ropeConstraint1) {
            ropeConstraint1.pointA.x = ax1;
            ropeConstraint1.pointA.y = ay1;
        }
        if (fixedAnchor1) fixedAnchor1.position.x = ax1, fixedAnchor1.position.y = ay1;
        if (ropeConstraint2) {
            ropeConstraint2.pointA.x = ax2;
            ropeConstraint2.pointA.y = ay2;
        }
        if (fixedAnchor2) fixedAnchor2.position.x = ax2, fixedAnchor2.position.y = ay2;
    });

    // afterUpdate: sync DOM & bodies, respawn off-screen objects
    Events.on(engine, 'afterUpdate', function() {
        // sync physics divs
        dynamicMappings.forEach(function(m) {
            var dx = m.body.position.x - m.x0 + m.offsetX,
                dy = m.body.position.y - m.y0 + m.offsetY;
            m.elem.style.transform =
                'translate(' + dx + 'px,' + dy + 'px) rotate(' + m.body.angle + 'rad)';
            // respawn if it falls off
            var H = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );
            if (m.body.position.y > H + 200) {
                Body.setPosition(m.body, { x: m.x0, y: m.y0 });
                Body.setVelocity(m.body, { x: 0, y: 0 });
                Body.setAngle(m.body, 0);
            }
        });

        // image sprites (balls, boards)
        imageMappings.forEach(function(m) {
            var H = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );
            if (m.body.position.y > H + 200) {
                Body.setPosition(m.body, { x: m.x0, y: m.y0 });
                Body.setVelocity(m.body, { x: 0, y: 0 });
                Body.setAngle(m.body, 0);
            }
            var p = m.body.position;
            m.elem.style.left      = p.x + 'px';
            m.elem.style.top       = p.y + 'px';
            m.elem.style.transform = 'translate(-50%,-50%) rotate(' + m.body.angle + 'rad)';
        });

        // joints / springs SVG sync
        constraintMappings.forEach(function(m) {
            var c      = m.constraint,
                worldA = c.bodyA
                         ? Vector.add(c.bodyA.position, Vector.rotate(c.pointA, c.bodyA.angle))
                         : c.pointA,
                worldB = c.bodyB
                         ? Vector.add(c.bodyB.position, Vector.rotate(c.pointB, c.bodyB.angle))
                         : c.pointB;

            m.elem.setAttribute('x1', worldA.x);
            m.elem.setAttribute('y1', worldA.y);
            m.elem.setAttribute('x2', worldB.x);
            m.elem.setAttribute('y2', worldB.y);
        });
    });

    // Interaction guards: prevent click/drag events from interfering
    document.addEventListener('click', function(e) {
        if (justDragged) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);
    document.addEventListener('mousedown', function(e) {
        if (isDragging) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);

    // disable text-selection & native drag
    document.body.style.userSelect       = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.msUserSelect     = 'none';
    document.querySelectorAll('img').forEach(img => {
        img.draggable     = false;
        img.style.userSelect = 'none';
        img.ondragstart   = () => false;
    });
    document.body.style.overflowY = 'auto';
    AOS.refresh();
}


// ===== Custom Objects, Images & Joints =====
function addObjects() {
    // center of viewport
    var cx = window.scrollX + window.innerWidth  / 2,
        cy = window.scrollY + window.innerHeight / 2;

    // two balls & spring
    var ballA = Bodies.circle(cx - 25, cy, 20, { restitution: 0.5, friction: 0.1 });
    var ballB = Bodies.circle(cx + 25, cy, 20, { restitution: 0.5, friction: 0.1 });
    var spring = Constraint.create({
        bodyA:     ballA, pointA: { x: 0, y: 0 },
        bodyB:     ballB, pointB: { x: 0, y: 0 },
        length:    50, stiffness: 0.05, damping: 0.02
    });
    Composite.add(world, [ ballA, ballB, spring ]);

    // long rope anchors & a big board
    var ropeOffsetX = window.innerWidth - ropedistnace,
        ropeOffsetY = 50;
    var p1 = { x: window.scrollX + ropeOffsetX, y: window.scrollY + ropeOffsetY },
        p2 = { x: p1.x - ropedistnace,          y: p1.y };

    var rectWidth  = 60 * 3,   // 120px
        rectHeight = 40 * 3;   // 80px
    var rectC = Bodies.rectangle(
        p1.x - ropeLength, p1.y,
        rectWidth, rectHeight, {
            restitution: 0.5,
            friction:    0.1,
            inertia:     Infinity,        // lock rotation
            collisionFilter: { mask: 0 }  // ignore all collisions
        }
    );
    Composite.add(world, rectC);

    ropeConstraint1 = Constraint.create({
        pointA: p1, bodyB: rectC,
        pointB: { x:  rectWidth/2, y: -rectHeight/2 },
        length: ropeLength, stiffness: 0.01, damping: 0.04
    });
    ropeConstraint2 = Constraint.create({
        pointA: p2, bodyB: rectC,
        pointB: { x: -rectWidth/2, y: -rectHeight/2 },
        length: ropeLength, stiffness: 0.01, damping: 0.04
    });
    Composite.add(world, [ ropeConstraint1, ropeConstraint2 ]);
    fixedAnchor1 = { position: p1 };
    fixedAnchor2 = { position: p2 };

    // standalone extra ball
    var ballD = Bodies.circle(cx, cy + 60, 20, { restitution: 0.5, friction: 0.1 });
    Composite.add(world, ballD);

    // SVG overlay for springs & ropes
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg   = document.createElementNS(svgNS, 'svg');
    var docW  = document.documentElement.scrollWidth,
        docH  = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    svg.style.position      = 'absolute';
    svg.style.left          = '0';
    svg.style.top           = '0';
    svg.style.width         = docW + 'px';
    svg.style.height        = docH + 'px';
    svg.style.pointerEvents = 'none';
    document.body.appendChild(svg);

    // spring line
    var line1 = document.createElementNS(svgNS, 'line');
    line1.setAttribute('stroke', '#888');
    line1.setAttribute('stroke-width', '2');
    svg.appendChild(line1);
    constraintMappings.push({ elem: line1, constraint: spring });

    // rope lines
    [ ropeConstraint1, ropeConstraint2 ].forEach(c => {
        var line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', '#888');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
        constraintMappings.push({ elem: line, constraint: c });
    });

    // map sprites for balls
    [ ballA, ballB, ballD ].forEach(function(body) {
        var img = document.createElement('img');
        img.src                = 'images/specials/ball.png';
        img.style.position     = 'absolute';
        img.style.width        = '40px';
        img.style.height       = '40px';
        img.style.transformOrigin = 'center center';
        document.body.appendChild(img);
        imageMappings.push({
            elem: img,
            body: body,
            x0:   body.position.x,
            y0:   body.position.y
        });
    });

    // sprite for rectC
    var imgRect = document.createElement('img');
    imgRect.src                = 'images/specials/board.png';
    imgRect.style.position     = 'absolute';
    imgRect.style.width        = rectWidth  / 10 + 'rem';
    imgRect.style.height       = rectHeight / 10 + 'rem';
    imgRect.style.transformOrigin = 'center center';
    document.body.appendChild(imgRect);
    imageMappings.push({
        elem: imgRect,
        body: rectC,
        x0:   rectC.position.x,
        y0:   rectC.position.y
    });
}
