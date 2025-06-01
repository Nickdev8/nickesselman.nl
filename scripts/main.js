document.addEventListener('DOMContentLoaded', () => {

  // ---- MENU TOGGLE (GSAP) ----
  const checkbox = document.getElementById('checkbox');
  const menu = document.getElementById('specials-menu');
  const physToggle = document.getElementById('enablephysics');
  gsap.set(menu, { autoAlpha: 0, display: 'none' });

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      menu.style.display = 'block';
      gsap.to(menu, { duration: 0.2, autoAlpha: 1 });
    } else if (physToggle.checked) {
      gsap.to(menu, {
        duration: 0.2,
        autoAlpha: 0.5,
      });
    } else {
      gsap.to(menu, {
        duration: 0.2,
        autoAlpha: 0,
        onComplete: () => { menu.style.display = 'none'; }
      });
    }
  });

  const audio = document.getElementById('bounceSound');
  const mutebutton = document.getElementById('muteicon');
  const muteimg = mutebutton.querySelector('img');
  function updateButton() {
    if (audio.muted) {
      muteimg.src = 'images/specials/notmute.png';
      audio.src = '';
      console.log('unmuted');
    } else {
      muteimg.src = 'images/specials/mute.png';
      audio.src = 'sounds/bounce.mp3';
      console.log('muted');
    }
  }

  mutebutton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateButton();
  });



  // ---- PHYSICS TOGGLE ---- call to the file /scripts/matterrun.js
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      mutebutton.style.display = 'unset !important';
      enableMatter(physicsConfig);
    } else {
      location.reload();
    }
  });

  if (document.getElementById('nottobig')) {
    // document.querySelector('main').style.maxHeight = '85vh';
    // document.querySelector('main').style.overflow = 'hidden';

  }

  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();
});


// function removemaintop() {
//   if (document.querySelector('.main-top')) {

//     gsap.to(".main-top", {
//       backgroundColor: "transparent",  // fade to fully transparent
//       duration: 1.5,                   // 1.5 seconds
//       ease: "power2.out",              // nice smooth easing

//     });
//   }
// }

// Global flag for dev mode:
window.devMode = false;

// Dev mode toggle from the specialsmenu checkbox:
document.addEventListener('DOMContentLoaded', () => {
  const devToggle = document.getElementById('devModeToggle');
  if (devToggle) {
    devToggle.addEventListener('change', () => {
      window.devMode = devToggle.checked;
      console.log("Dev mode is now", window.devMode ? "ON" : "OFF");
      // Toggle debug view overlay visibility based on dev mode:
      const devOverlay = document.getElementById('devView');
      if (devOverlay) {
        devOverlay.style.display = window.devMode ? "block" : "none";
      }
    });
  }
});

// Konami code implementation:
(function() {
  var konamiCode = [38,38,40,40,37,39,37,39,66,65];
  var konamiIndex = 0;
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        window.devMode = !window.devMode;
        console.log("Konami code activated - Dev mode toggled to", window.devMode ? "ON" : "OFF");
        const devToggle = document.getElementById('devModeToggle');
        if (devToggle) {
          devToggle.checked = window.devMode;
        }
        // Toggle debug view overlay visibility based on dev mode:
        const devOverlay = document.getElementById('devView');
        if (devOverlay) {
          devOverlay.style.display = window.devMode ? "block" : "none";
        }
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
})();
