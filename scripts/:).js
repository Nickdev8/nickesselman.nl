

// ===== Matter.js Declarations & Setup =====
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Vector = Matter.Vector;

var engine = Engine.create({ enableSleeping: false });
var world = engine.world;
var runner = Runner.create();

// State Collections
var dynamicMappings = [];
var imageMappings = [];
var constraintMappings = [];
var staticColliders = [];
var walls = [];
var originalPositions = new Map();
var fixedStyles = new Map();

// viewport-fixed anchors
var ropeConstraint1, ropeConstraint2, fixedAnchor1, fixedAnchor2;
var isDragging = false, justDragged = false, filterInstalled = false;

var ropedistnace = 150;
var ropeLength = 100;

// ===== Interface Toggles =====
function enableMatter() {
    var mainElem = document.querySelector('main');

    // 1) fix missing dot in your selector
    document.querySelectorAll('span.physics, .physics-add-card').forEach(elem => {
        elem.classList.add('card');
    });

    // 2) in each <p.onlyspans>, remove anything that isn't a <span.physics>
    document.querySelectorAll('p.onlyspans').forEach(p => {
        Array.from(p.childNodes).forEach(node => {
            if (!(node.nodeType === Node.ELEMENT_NODE && node.matches('span.physics'))) {
                p.removeChild(node);
            }
        });
    });

    // now the rest of your normal flow…
    var rect = mainElem.getBoundingClientRect();
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    var minHeight = window.innerHeight
        - (header ? header.getBoundingClientRect().height : 0)
        - (footer ? footer.getBoundingClientRect().height : 0);
    var finalHeight = Math.max(rect.height, minHeight);

    mainElem.style.height = finalHeight + 'px';
    mainElem.style.overflow = 'hidden';

    disableAllAOS();
    setupPhysics();  // setupPhysics will now record the spans' original positions and reparent them
    if (document.getElementById('loadMoreBtn'))
        document.getElementById('loadMoreBtn').style.display = 'none';
    document.querySelectorAll('.objectToMoreToTheBackClasses')
        .forEach(elem => {
            elem.classList.add('objectToMoreToTheBackClasses-active');
            elem.classList.remove('projecttilt');
        });

    Runner.run(runner, engine);
}


// ===== Physics Initialization =====
function setupPhysics() {
    // Reset State
    dynamicMappings.length = 0;
    imageMappings.length = 0;
    constraintMappings.length = 0;
    staticColliders.length = 0;
    walls.length = 0;
    originalPositions.clear();
    fixedStyles.clear();

    // near the top of setupPhysics (or enableMatter), before you wire up afterUpdate:
    var footer = document.querySelector('footer');
    var footerHeight = footer ? footer.getBoundingClientRect().height : 0;

    // Fix .physics-fixed Elements
    document.querySelectorAll('.physics-fixed').forEach(function (elem) {
        var r = elem.getBoundingClientRect();
        fixedStyles.set(elem, {
            position: elem.style.position,
            left: elem.style.left,
            top: elem.style.top
        });
        elem.style.position = 'absolute';
        elem.style.left = (r.left + window.scrollX) + 'px';
        elem.style.top = (r.top + window.scrollY) + 'px';
    });

    // Record Original Positions
    document.querySelectorAll('.physics, .physics-loose').forEach(function (elem) {
        elem.classList.add('physics-active');
        elem.classList.remove('physics-inactive');

        var r = elem.getBoundingClientRect();
        originalPositions.set(elem, {
            parent: elem.parentNode,
            nextSibling: elem.nextSibling,
            x0: r.left + window.scrollX + r.width / 2,
            y0: r.top + window.scrollY + r.height / 2,
            width: r.width,
            height: r.height
        });
    });
    // Re-parent Nested & Loose
    document.querySelectorAll('.physics-nested').forEach(function (elem) {
        var outer = elem.closest('.physics:not(.physics-nested)');
        if (outer && outer.parentNode) {
            outer.parentNode.insertBefore(elem, outer.nextSibling);
        }
    });
    var mainElem = document.querySelector('main');
    document.querySelectorAll('.physics-loose').forEach(function (elem) {
        mainElem && mainElem.appendChild(elem);
    });

    // Create Dynamic Bodies for .physics divs
    document.querySelectorAll('.physics, .physics-loose').forEach(function (elem) {
        var orig = originalPositions.get(elem);
        var r = elem.getBoundingClientRect();
        var newX = r.left + window.scrollX + r.width / 2;
        var newY = r.top + window.scrollY + r.height / 2;
        var offsetX = orig.x0 - newX;
        var offsetY = orig.y0 - newY;

        if (offsetX || offsetY) {
            elem.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
        }
        elem.style.transformOrigin = 'center center';

        var body = Bodies.rectangle(orig.x0, orig.y0, orig.width, orig.height, {
            restitution: 0.4,
            friction: 0.1
        });
        Composite.add(world, body);
        dynamicMappings.push({
            elem: elem,
            body: body,
            x0: orig.x0,
            y0: orig.y0,
            offsetX: offsetX,
            offsetY: offsetY
        });
    });

    // Static Colliders
    document.querySelectorAll('.collision').forEach(function (elem) {
        var r = elem.getBoundingClientRect();
        var body = Bodies.rectangle(
            r.left + window.scrollX + r.width / 2,
            r.top + window.scrollY + r.height / 2,
            r.width, r.height,
            { isStatic: true, restitution: 0, friction: 1 }
        );
        Composite.add(world, body);
        staticColliders.push(body);
    });

    // Add Custom Objects, Images & Joints
    addObjects();

    // Page walls
    var t = 50;
    var W = document.documentElement.scrollWidth;
    var H = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
    );
    walls = [
        Bodies.rectangle(W / 2, -t / 2, W, t, { isStatic: true }),          // top
        Bodies.rectangle(W / 2, H + t / 2 - footerHeight, W, t, { isStatic: true }), // bottom
        Bodies.rectangle(-t / 2, H / 2, t, H, { isStatic: true }),          // left
        Bodies.rectangle(W + t / 2, H / 2, t, H, { isStatic: true })           // right
    ];
    Composite.add(world, walls);



    // Scroll Filtering
    if (!filterInstalled) {
        var filter = function (e) {
            if (!mouseConstraint.body) e.stopImmediatePropagation();
        };
        ['wheel', 'mousewheel', 'DOMMouseScroll', 'touchmove', 'pointermove']
            .forEach(function (type) {
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
    Events.on(mouseConstraint, 'startdrag', function () { isDragging = true; });
    Events.on(mouseConstraint, 'enddrag', function () {
        isDragging = false;
        justDragged = true;
        setTimeout(function () { justDragged = false; }, 0);
    });

    // update anchors every frame
    Events.on(engine, 'beforeUpdate', function () {
        var offX = window.innerWidth - 100;
        var offY = 50;
        var ax1 = window.scrollX + offX;
        var ay1 = window.scrollY + offY;
        var ax2 = ax1 - ropedistnace;
        var ay2 = ay1;
        if (ropeConstraint1) {
            ropeConstraint1.pointA.x = ax1;
            ropeConstraint1.pointA.y = ay1;
        }
        if (fixedAnchor1) {
            fixedAnchor1.position.x = ax1;
            fixedAnchor1.position.y = ay1;
        }
        if (ropeConstraint2) {
            ropeConstraint2.pointA.x = ax2;
            ropeConstraint2.pointA.y = ay2;
        }
        if (fixedAnchor2) {
            fixedAnchor2.position.x = ax2;
            fixedAnchor2.position.y = ay2;
        }
    });

    // Sync Loop
    Events.on(engine, 'afterUpdate', function () {
        // sync physics divs
        dynamicMappings.forEach(function (m) {
            var dx = m.body.position.x - m.x0 + m.offsetX;
            var dy = m.body.position.y - m.y0 + m.offsetY;
            m.elem.style.transform =
                'translate(' + dx + 'px,' + dy + 'px) rotate(' + m.body.angle + 'rad)';
            // respawn if fallen off
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

        // respawn & sync ball images
        imageMappings.forEach(function (m) {
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
            m.elem.style.left = p.x + 'px';
            m.elem.style.top = p.y + 'px';
            m.elem.style.transform =
                'translate(-50%,-50%) rotate(' + m.body.angle + 'rad)';
        });

        // improved joint-line sync:
        constraintMappings.forEach(function (m) {
            var c = m.constraint;
            var worldA = c.bodyA
                ? Vector.add(
                    c.bodyA.position,
                    Vector.rotate(c.pointA, c.bodyA.angle)
                )
                : c.pointA;
            var worldB = c.bodyB
                ? Vector.add(
                    c.bodyB.position,
                    Vector.rotate(c.pointB, c.bodyB.angle)
                )
                : c.pointB;

            m.elem.setAttribute('x1', worldA.x);
            m.elem.setAttribute('y1', worldA.y);
            m.elem.setAttribute('x2', worldB.x);
            m.elem.setAttribute('y2', worldB.y);
        });
    });

    // Interaction Guards & misc
    document.addEventListener('click', function (e) {
        if (justDragged) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);
    document.addEventListener('mousedown', function (e) {
        if (isDragging) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);

    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    document.querySelectorAll('img').forEach(function (img) {
        img.draggable = false;
        img.style.userSelect = 'none';
        img.ondragstart = function () { return false; };
    });
    document.body.style.overflowY = 'auto';
    AOS.refresh();
}


// ===== Custom Objects, Images & Joints =====
function addObjects() {
    // compute viewport center for respawn
    var cx = window.scrollX + window.innerWidth / 2;
    var cy = window.scrollY + window.innerHeight / 2;

    // two balls connected by a spring
    var ballA = Bodies.circle(cx - 25, cy, 20, { restitution: 0.5, friction: 0.1 });
    var ballB = Bodies.circle(cx + 25, cy, 20, { restitution: 0.5, friction: 0.1 });
    var spring = Constraint.create({
        bodyA: ballA, pointA: { x: 0, y: 0 },
        bodyB: ballB, pointB: { x: 0, y: 0 },
        length: 50, stiffness: 0.05, damping: 0.02
    });
    Composite.add(world, [ballA, ballB, spring]);

    // long rope anchors
    var ropeOffsetX = window.innerWidth - ropedistnace;
    var ropeOffsetY = 50;
    var p1 = { x: window.scrollX + ropeOffsetX, y: window.scrollY + ropeOffsetY };
    var p2 = { x: p1.x - ropedistnace, y: p1.y };

    // rectC instead of ballC: twice as big, inertia locked, no collisions
    var rectWidth = 60 * 3;   // 120px wide
    var rectHeight = 40 * 3;   //  80px tall
    var rectC = Bodies.rectangle(
        p1.x - ropeLength,
        p1.y,
        rectWidth,
        rectHeight,
        {
            restitution: 0.5,
            friction: 0.1,
            inertia: Infinity,        // lock rotation
            collisionFilter: { mask: 0 }  // ignore all collisions
        }
    );
    Composite.add(world, rectC);

    // now hook both corners
    ropeConstraint1 = Constraint.create({
        pointA: p1,
        bodyB: rectC,
        pointB: { x: rectWidth / 2, y: -rectHeight / 2 },
        length: ropeLength,
        stiffness: 0.01, damping: 0.04
    });
    ropeConstraint2 = Constraint.create({
        pointA: p2,
        bodyB: rectC,
        pointB: { x: -rectWidth / 2, y: -rectHeight / 2 },
        length: ropeLength,
        stiffness: 0.01, damping: 0.04
    });
    Composite.add(world, [ropeConstraint1, ropeConstraint2]);
    fixedAnchor1 = { position: p1 };
    fixedAnchor2 = { position: p2 };

    // standalone extra ball
    var ballD = Bodies.circle(cx, cy + 60, 20, { restitution: 0.5, friction: 0.1 });
    Composite.add(world, ballD);

    // SVG overlay for joints
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    var docW = document.documentElement.scrollWidth;
    var docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
    );
    svg.style.position = 'absolute';
    svg.style.left = '0';
    svg.style.top = '0';
    svg.style.width = docW + 'px';
    svg.style.height = docH + 'px';
    svg.style.pointerEvents = 'none';
    document.body.appendChild(svg);

    // spring line
    var line1 = document.createElementNS(svgNS, 'line');
    line1.setAttribute('stroke', '#888');
    line1.setAttribute('stroke-width', '2');
    svg.appendChild(line1);
    constraintMappings.push({ elem: line1, constraint: spring });

    // rope lines
    var line2 = document.createElementNS(svgNS, 'line');
    line2.setAttribute('stroke', '#888');
    line2.setAttribute('stroke-width', '2');
    svg.appendChild(line2);
    constraintMappings.push({ elem: line2, constraint: ropeConstraint1 });

    var line3 = document.createElementNS(svgNS, 'line');
    line3.setAttribute('stroke', '#888');
    line3.setAttribute('stroke-width', '2');
    svg.appendChild(line3);
    constraintMappings.push({ elem: line3, constraint: ropeConstraint2 });

    // map sprites for balls
    [ballA, ballB, ballD].forEach(function (body) {
        var img = document.createElement('img');
        img.src = 'images/specials/ball.png';
        img.style.position = 'absolute';
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.transformOrigin = 'center center';
        document.body.appendChild(img);
        imageMappings.push({
            elem: img,
            body: body,
            x0: body.position.x,
            y0: body.position.y
        });
    });

    // sprite for rectC
    var imgRect = document.createElement('img');
    imgRect.src = 'images/specials/board.png';
    imgRect.style.position = 'absolute';
    imgRect.style.width = rectWidth / 10 + 'rem';
    imgRect.style.height = rectHeight / 10 + 'rem';
    imgRect.style.transformOrigin = 'center center';
    document.body.appendChild(imgRect);
    imageMappings.push({
        elem: imgRect,
        body: rectC,
        x0: rectC.position.x,
        y0: rectC.position.y
    });
}