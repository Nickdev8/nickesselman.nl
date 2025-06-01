// physics-controls.js

// (Make sure Matter.* and your physicsConfig are already loaded.)

document.addEventListener('DOMContentLoaded', () => {
  const physToggle     = document.getElementById('enablephysics');
  const specialPhysics = document.getElementById('morephysics-menu');
  const mutebutton     = document.getElementById('muteicon'); // to show/hide if needed

  const roofcollision  = document.getElementById('roofcollision');
  const sleepToggle    = document.getElementById('sleepToggle');
  const wakingbutton   = document.getElementById('wakingbutton');
  const arrowgravity   = document.getElementById('arrowgravity');

  // 1) Enable / Disable Matter.js
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      // Reveal the “more physics” sub‐menu
      gsap.to(specialPhysics, { duration: 2, autoAlpha: 1 });
      // Show mute button (override CSS if needed)
      mutebutton.style.display = 'unset';
      // Start the physics engine
      enableMatter(physicsConfig);
    } else {
      // Simply reload page to clear physics state
      location.reload();
    }
  });

  // 2) Roof toggle
  roofcollision.addEventListener('click', () => {
    if (roofcollision.checked) {
      addRoofCollider();
    }
    else if (window.roofBody) {
      Matter.Composite.remove(world, window.roofBody);
      walls = walls.filter(b => b !== window.roofBody);
      staticColliders = staticColliders.filter(b => b !== window.roofBody);
      window.roofBody = null;
    } else {
      console.warn("No roof found to remove (window.roofBody is null).");
    }
  });

  // 3) Sleep toggle
  sleepToggle.addEventListener('change', () => {
    engine.enableSleeping = sleepToggle.checked;

    if (!sleepToggle.checked) {
      // Wake all bodies immediately
      Composite.allBodies(world).forEach(body => {
        if (body.isSleeping) {
          Sleeping.set(body, false);
        }
      });
    } else {
      // Reset sleep‐counters so bodies can go to sleep afresh
      Composite.allBodies(world).forEach(body => {
        body.sleepCounter = 0;
      });
    }
  });

  // 4) Wake button
  wakingbutton.addEventListener('click', () => {
    Composite.allBodies(world).forEach(body => {
      if (body.isSleeping) {
        Sleeping.set(body, false);
        body.sleepCounter = 0;
      }
    });
  });

  // 5) Arrow‐key gravity (only if physics is enabled & arrow‐toggle checked)
  document.addEventListener('keydown', (event) => {
    if (!physToggle.checked || !arrowgravity.checked) return;

    switch (event.key) {
      case 'ArrowUp':
        engine.world.gravity.x = 0;
        engine.world.gravity.y = -1;
        break;
      case 'ArrowDown':
        engine.world.gravity.x = 0;
        engine.world.gravity.y = 1;
        break;
      case 'ArrowLeft':
        engine.world.gravity.x = -1;
        engine.world.gravity.y = 0;
        break;
      case 'ArrowRight':
        engine.world.gravity.x = 1;
        engine.world.gravity.y = 0;
        break;
      default:
        return;
    }
  });
});
