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
                onComplete: () => {
                    menu.style.display = 'none';
                }
            });
        }
    });



    const enphysics = document.getElementById('enablephysics');

    let running = true;
    enphysics.addEventListener('change', () => {
        running = enphysics.checked;
        if (running) {
            startphysics(true);
        }
        else
            startphysics(false);
        console.log(running)
    });

});

// Alias commonly used modules
const { Engine, World, Bodies, Runner, Events } = Matter;

// 1. Create an engine
const engine = Engine.create();
const world = engine.world;

// 2. Create a runner to control the update loop
const runner = Runner.create();

function startphysics(isrunning = false) {
    if (!isrunning) {
        Runner.stop(runner);
        return;
    }


    // 3. Start the simulation
    Runner.run(runner, engine);


    const elements = [];

    const allElements = [];
    document.querySelectorAll('.physics, .collision').forEach(elem => {
        const rect = elem.getBoundingClientRect();
        const isStatic = elem.classList.contains('collision');

        // Build a matching Matter.js body
        const body = Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            { isStatic: isStatic, restitution: isStatic ? 0 : 0.4, friction: isStatic ? 1 : 0.1 }
        );

        Matter.World.add(world, body);
        allElements.push({ elem, body });
    });



    const w = window.innerWidth, h = window.innerHeight;
    const thickness = 50;
    const walls = [
        Bodies.rectangle(w / 2, -thickness / 2, w, thickness, { isStatic: true }), // top
        Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, { isStatic: true }), // bottom
        Bodies.rectangle(-thickness / 2, h / 2, thickness, h, { isStatic: true }), // left
        Bodies.rectangle(w + thickness / 2, h / 2, thickness, h, { isStatic: true })  // right
    ];
    World.add(world, walls);

    allElements
        .filter(({ elem }) => elem.classList.contains('physics'))
        .forEach(({ elem }) => {
            elem.style.position = 'absolute';
            elem.style.transformOrigin = 'center center';
            elem.style.left = '0';
            elem.style.top = '0';
        });


    Matter.Events.on(engine, 'afterUpdate', () => {
        allElements.forEach(({ elem, body }) => {
            if (body.isStatic) return;  // no DOM update for .collision

            const { x, y } = body.position;
            const angle = body.angle;

            elem.style.transform =
                `translate(${x - elem.offsetWidth / 2}px, ${y - elem.offsetHeight / 2}px) ` +
                `rotate(${angle}rad)`;
        });
    });
}