// physics-controls.js

// (Make sure Matter.* and your physicsConfig are already loaded.)

document.addEventListener('DOMContentLoaded', () => {
  const roofcollision = document.getElementById('roofcollision');
  const sleepToggle = document.getElementById('sleepToggle');
  const wakingbutton = document.getElementById('wakingbutton');
  const devToggle = document.getElementById('devModeToggle');
  const devOverlay = document.getElementById('devView');

  // ---- Dev mode ----

  if (devToggle) {
    devToggle.addEventListener('change', () => {
      window.devMode = devToggle.checked;
      console.log("Dev mode is now", window.devMode ? "ON" : "OFF");

      if (devOverlay) {
        devOverlay.style.display = window.devMode ? "block" : "none";
      }
    });
  }

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
});
