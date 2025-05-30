const CATEGORY_NONE = 0x0000;
const CATEGORY_HOOP = 0x0001;
const CATEGORY_BALL = 0x0002;
const CATEGORY_CORNER = 0x0004;

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

var engine;
if (page == "about")
    engine = Engine.create({ enableSleeping: true });

else
    engine = Engine.create({ enableSleeping: false });


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

var ropedistnace = 50;
var ropeLength = 100;
var hoopSensor;

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
        constraintMappings
            .filter(m => m.constraint && (m.constraint.bodyA || m.constraint.pointA))
            .forEach(function (m) {
                const c = m.constraint;
                const worldA = c.bodyA
                    ? Vector.add(c.bodyA.position, Vector.rotate(c.pointA, c.bodyA.angle))
                    : c.pointA;
                const worldB = c.bodyB
                    ? Vector.add(c.bodyB.position, Vector.rotate(c.pointB, c.bodyB.angle))
                    : c.pointB;
                m.elem.setAttribute('x1', worldA.x);
                m.elem.setAttribute('y1', worldA.y);
                m.elem.setAttribute('x2', worldB.x);
                m.elem.setAttribute('y2', worldB.y);
            });
    });

    Events.on(engine, 'collisionStart', function (event) {
        event.pairs.forEach(function (pair) {
            // Check if one body is the sensor and the other is a ball
            [pair.bodyA, pair.bodyB].forEach(function (body) {
                if (body === hoopSensor) {
                    const otherBody = pair.bodyA === hoopSensor ? pair.bodyB : pair.bodyA;

                    // Check if otherBody is one of your balls (you can refine this further)
                    if (otherBody.circleRadius) {
                        // Trigger your custom function
                        ballWentThroughHoop(otherBody);
                    }
                }
            });
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

    if (page == "about") {

        var mainElem = document.querySelector('main');

        mainElem.style.overflow = 'hidden';
        addManyBalls(100);
        dobasketballhoop();
    }

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

}


function addManyBalls(count) {
    // starting x/y so the balls don't all overlap
    const startX = window.innerWidth / 2 - 100;
    const startY = window.scrollY + 100;
    const spacing = 50; // px gap between balls

    for (let i = 0; i < count; i++) {
        // compute a grid layout: 10 per row
        const col = i % 10;
        const row = Math.floor(i / 10);

        const x = startX + col * spacing;
        const y = startY + row * spacing;

        // create the body
        const ball = Bodies.circle(x, y, 20, {
            restitution: 0.5,
            friction: 0.1
        });

        // add to world
        Composite.add(world, ball);

        // add its sprite
        const img = document.createElement('img');
        img.src = 'images/specials/ball.png';
        img.style.position = 'absolute';
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.transformOrigin = 'center center';
        document.body.appendChild(img);

        imageMappings.push({
            elem: img,
            body: ball,
            x0: ball.position.x,
            y0: ball.position.y
        });
    }
}


function dobasketballhoop() {
    var p1 = { x: window.scrollX + window.innerWidth - ropedistnace, y: window.scrollY + 50 };
    var p2 = { x: p1.x - ropedistnace, y: p1.y };
    var rectWidth = 180;
    var rectHeight = 120;

    // === 1. rectC (backboard): gravity only, no collision
    var rectC = Bodies.rectangle(
        p1.x - ropeLength, p1.y,
        rectWidth, rectHeight,
        {
            restitution: 0,
            friction: 0,
            inertia: Infinity,
            collisionFilter: {
                category: CATEGORY_NONE,
                mask: CATEGORY_NONE
            }
        }
    );
    Composite.add(world, rectC);

    // === 2. rope constraints (same)
    ropeConstraint1 = Constraint.create({
        pointA: p1,
        bodyB: rectC,
        pointB: { x: rectWidth / 2, y: -rectHeight / 2 },
        length: ropeLength,
        stiffness: 0.001, damping: 0.05
    });
    ropeConstraint2 = Constraint.create({
        pointA: p2,
        bodyB: rectC,
        pointB: { x: -rectWidth / 2, y: -rectHeight / 2 },
        length: ropeLength,
        stiffness: 0.001, damping: 0.05
    });
    Composite.add(world, [ropeConstraint1, ropeConstraint2]);

    // === 3. rectCHoop (hoop visual only, no collision)
    var hoopWidth = rectWidth / 2;
    var hoopHeight = rectWidth / 2;
    var rectCHoop = Bodies.rectangle(
        rectC.position.x,
        (rectC.position.y + rectHeight / 2 + hoopHeight / 2),
        hoopWidth, hoopHeight,
        {
            inertia: Infinity,
            collisionFilter: {
                category: CATEGORY_NONE,
                mask: CATEGORY_NONE
            }
        }
    );
    Composite.add(world, rectCHoop);

    // === 4. Lock hoop to board (no relative movement)
    Composite.add(world, [
        Constraint.create({ bodyA: rectC, pointA: { x: 0, y: rectHeight / 2 }, bodyB: rectCHoop, pointB: { x: 0, y: -hoopHeight / 2 }, length: 0, stiffness: 1 }),
        Constraint.create({ bodyA: rectC, pointA: { x: -hoopWidth / 2, y: rectHeight / 2 }, bodyB: rectCHoop, pointB: { x: -hoopWidth / 2, y: -hoopHeight / 2 }, length: 0, stiffness: 1 }),
        Constraint.create({ bodyA: rectC, pointA: { x: hoopWidth / 2, y: rectHeight / 2 }, bodyB: rectCHoop, pointB: { x: hoopWidth / 2, y: -hoopHeight / 2 }, length: 0, stiffness: 1 })
    ]);

    // === 5. Top-corner colliders (real collisions!)
    const cornerRadius = 8;
    const cornerOffsetY = -hoopHeight / 2;
    const corners = [
        { x: -hoopWidth / 2 + cornerRadius, y: cornerOffsetY },  // left
        { x: hoopWidth / 2 - cornerRadius, y: cornerOffsetY }   // right
    ];
    corners.forEach(offset => {
        const corner = Bodies.circle(
            rectCHoop.position.x + offset.x,
            rectCHoop.position.y + offset.y,
            cornerRadius,
            {
                isSensor: false,
                friction: 0,
                restitution: 0.2,
                collisionFilter: {
                    category: CATEGORY_CORNER,
                    mask: CATEGORY_BALL // only collide with balls
                }
            }
        );
        // Keep circle glued to the hoop
        Composite.add(world, [
            corner,
            Constraint.create({
                bodyA: rectCHoop,
                pointA: offset,
                bodyB: corner,
                pointB: { x: 0, y: 0 },
                length: 0,
                stiffness: 1
            })
        ]);
    });

    // === 6. Hoop image
    const imgHoop = document.createElement('img');
    imgHoop.src = 'images/specials/hoop.png';
    imgHoop.style.position = 'absolute';
    imgHoop.style.width = hoopWidth / 10 + 'rem';
    imgHoop.style.height = hoopHeight / 10 + 'rem';
    imgHoop.style.transformOrigin = 'center center';
    imgHoop.style.zIndex = -9;
    document.body.appendChild(imgHoop);
    imageMappings.push({ elem: imgHoop, body: rectCHoop, x0: rectCHoop.position.x, y0: rectCHoop.position.y });

    // === 7. Board image
    const imgRect = document.createElement('img');
    imgRect.src = 'images/specials/board.png';
    imgRect.style.position = 'absolute';
    imgRect.style.width = rectWidth / 10 + 'rem';
    imgRect.style.height = rectHeight / 10 + 'rem';
    imgRect.style.transformOrigin = 'center center';
    imgRect.style.zIndex = -10;
    document.body.appendChild(imgRect);
    imageMappings.push({ elem: imgRect, body: rectC, x0: rectC.position.x, y0: rectC.position.y });


    // === 8. RIM: positioned below the hoop, with only left & right collisions
    const rimWidth = hoopWidth;
    const rimHeight = -225;
    const rimX = rectCHoop.position.x;
    const rimY = rectCHoop.position.y + hoopHeight / 2 + rimHeight / 2;

    // The main rim body (invisible, no collision)
    const rim = Bodies.rectangle(rimX, rimY, rimWidth, rimHeight, {
        inertia: Infinity,
        collisionFilter: {
            category: CATEGORY_NONE,
            mask: CATEGORY_NONE
        }
    });
    Composite.add(world, rim);

    // Attach to hoop (follows it)
    Composite.add(world, Constraint.create({
        bodyA: rectCHoop,
        pointA: { x: 0, y: hoopHeight / 2 },
        bodyB: rim,
        pointB: { x: 0, y: -rimHeight / 2 },
        length: 0,
        stiffness: 1
    }));

    // Add visible image for rim
    const imgRim = document.createElement('img');
    imgRim.src = 'images/specials/rim.png'; // <-- use your rim image here
    imgRim.style.position = 'absolute';
    imgRim.style.width = rimWidth / 10 + 'rem';
    imgRim.style.height = rimHeight / 10 + 'rem';
    imgRim.style.zIndex = '6'; // above balls & hoop
    imgRim.style.transformOrigin = 'center center';
    document.body.appendChild(imgRim);
    imageMappings.push({
        elem: imgRim,
        body: rim,
        x0: rim.position.x,
        y0: rim.position.y
    });

    // === 9. RIM EDGE COLLIDERS (left & right)
    const edgeSize = 6;
    const offsetX = rimWidth / 2 - edgeSize;
    ['left', 'right'].forEach(side => {
        const sign = side === 'left' ? -1 : 1;
        const edge = Bodies.rectangle(
            rim.position.x + sign * offsetX,
            rim.position.y,
            edgeSize,
            rimHeight,
            {
                isSensor: false,
                restitution: 0.2,
                collisionFilter: {
                    category: CATEGORY_CORNER,
                    mask: CATEGORY_BALL
                }
            }
        );
        Composite.add(world, edge);
        Composite.add(world, Constraint.create({
            bodyA: rim,
            pointA: { x: sign * offsetX, y: 0 },
            bodyB: edge,
            pointB: { x: 0, y: 0 },
            length: 0,
            stiffness: 1
        }));

        hoopSensor = Bodies.rectangle(
            rim.position.x,
            rim.position.y,
            rimWidth * 0.7,
            6,
            {
                isSensor: true,
                isStatic: false,
                render: { visible: false }
            }
        );

        Composite.add(world, hoopSensor);

        Composite.add(world, Constraint.create({
            bodyA: rim,
            pointA: { x: 0, y: 0 },
            bodyB: hoopSensor,
            pointB: { x: 0, y: 0 },
            length: 0,
            stiffness: 1
        }));

    });

}


function ballWentThroughHoop(otherBody) {
    console.log(otherBody);
    Matter.World.remove(world, otherBody);
    const mappingIndex = imageMappings.findIndex(m => m.body === otherBody);
    if (mappingIndex !== -1) {
        const sprite = imageMappings[mappingIndex].elem;
        sprite.remove(); // remove DOM element
        imageMappings.splice(mappingIndex, 1); // remove from mapping list
    }

}
