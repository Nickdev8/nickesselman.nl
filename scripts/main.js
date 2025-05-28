document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox');
    const menu = document.getElementById('specials-menu');
    const enphysics = document.getElementById('enablephysics');

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

    enphysics.addEventListener('change', () => {
        if (enphysics.checked) {
            console.log("physics is on!")
        }
    });
});


function startphysics() {
    // Alias commonly used modules
    const { Engine, World, Bodies, Runner, Events } = Matter;

    // 1. Create an engine
    const engine = Engine.create();
    const world = engine.world;

    // 2. Create a runner to control the update loop
    const runner = Runner.create();

    // 3. Start the simulation
    Runner.run(runner, engine);


    const elements = [];
    document.querySelectorAll('.physics').forEach(elem => {
        const rect = elem.getBoundingClientRect();
        // 3.2 Create a matching physics body
        const body = Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            {
                restitution: 0.4, // bounciness
                friction: 0.1  // surface friction
            }
        );
        World.add(world, body);
        elements.push({ elem, body });
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


    // Ensure elements are absolutely positioned
    elements.forEach(({ elem }) => {
        elem.style.position = 'absolute';
        elem.style.transformOrigin = 'center center';
        elem.style.left = '0';
        elem.style.top = '0';
    });

    // Sync loop
    Events.on(engine, 'afterUpdate', () => {
        elements.forEach(({ elem, body }) => {
            const { x, y } = body.position;
            const angle = body.angle;
            elem.style.transform =
                `translate(${x - elem.offsetWidth / 2}px, ${y - elem.offsetHeight / 2}px) ` +
                `rotate(${angle}rad)`;
        });
    });


}

startphysics();