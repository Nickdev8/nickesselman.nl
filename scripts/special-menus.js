document.addEventListener('DOMContentLoaded', () => {
  const specialPhysics = document.getElementById('morephysics-menu');
  const physToggle = document.getElementById('enablephysics');
  const blindmode = document.getElementById('blindmode');
  const duckbox = document.getElementById('duckhunt-card');
  const checkbox = document.getElementById('checkbox');
  const mutebutton = document.getElementById('muteicon');
  const menu = document.getElementById('specials-menu');
  const ravemode = document.getElementById('ravemode');
  const devmode = document.getElementById('devModeToggle');

  const whatobjects = [menu, duckbox];
  const allmenuitems = document.querySelectorAll('.overlay-menu');

  // ---- MENU TOGGLE (GSAP) ----
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      whatobjects.forEach(obj => {
        gsap.to(obj, {
          duration: 0.2,
          autoAlpha: 1,
          onStart: () => { obj.classList.remove('inactive'); }
        });
      });
    } else if (physToggle.checked) {
      whatobjects.forEach(obj => {
        gsap.to(obj, {
          duration: 0.2,
          autoAlpha: 0.5,
          onStart: () => { obj.classList.remove('inactive'); }
        });
      });
    } else {
      whatobjects.forEach(obj => {
        gsap.to(obj, {
          duration: 0.2,
          autoAlpha: 0,
          onComplete: () => {
            obj.classList.add('overlay-menu', 'inactive');
          }
        });
      });
    }
  });

  devmode.addEventListener('click', () => {
    document.querySelectorAll('*').forEach(el => {
      if (devmode.checked) {
      el.classList.add('dev-border');
      }
      else {
        el.classList.remove('dev-border');
      }
    });
  });
  // ---- StartSim (GSAP) ----
  physToggle.addEventListener('click', () => {
    localStorage.setItem('physToggle', physToggle.checked);
    if (physToggle.checked) {
      specialPhysics.style.opacity = 1;
      mutebutton.style.opacity = 1;
      specialPhysics.classList.remove('inactive');
      mutebutton.classList.remove('inactive');
      enableMatter(physicsConfig);

      // Disable AOS animations:
      AOS.init({ disable: true });
      // Optionally, remove the data attribute and animation classes from any AOS element:
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.removeAttribute('data-aos');
        el.classList.remove('aos-init', 'aos-animate');
      });
    } else {
      location.reload();
    }
  });

  whattochangetowhat = [
    { from: 'sp-rave', to: 'raveactive' },
    { from: 'card', to: 'raveactive' }
  ];

  // ---- LocalStorage Checkbox Array for automatic state handling ----
  const toggledCheckboxes = [
    {
      element: ravemode,
      storageKey: 'ravemode',
      updateUI: (checked) => {
        whattochangetowhat.forEach(change => {
          document.querySelectorAll(`.${change.from}`).forEach(el => {
            if (checked) {
              el.classList.add(change.to);
            } else {
              el.classList.remove(change.to);
            }
          });
        });
        // Include /pages/specials/rave.php when ravemode is checked; remove when unchecked.
        if (checked) {
          let raveContainer = document.getElementById('ravemode-container');
          if (!raveContainer) {
            raveContainer = document.createElement('div');
            raveContainer.id = 'ravemode-container';
            document.body.insertAdjacentElement('afterbegin', raveContainer);
          }
          fetch('/pages/specials/rave.php')
            .then(response => response.text())
            .then(text => {
              raveContainer.innerHTML = text;
            })
            .catch(error => console.error('Error loading rave.php:', error));
        } else {
          const raveContainer = document.getElementById('ravemode-container');
          if (raveContainer) {
            raveContainer.remove();
          }
        }
      }
    },
    {
      element: blindmode,
      storageKey: 'blindmode',
      updateUI: (checked) => {
        const body = document.querySelector('body');
        body.style.fontFamily = checked ? 'Braille, sans-serif' : '';
      }
    }
  ];

  toggledCheckboxes.forEach(toggle => {
    if (localStorage.getItem(toggle.storageKey) !== null) {
      toggle.element.checked = localStorage.getItem(toggle.storageKey) === 'true';
      if (typeof toggle.updateUI === 'function') {
        toggle.updateUI(toggle.element.checked);
      }
    }
    toggle.element.addEventListener('click', () => {
      localStorage.setItem(toggle.storageKey, toggle.element.checked);
      if (typeof toggle.updateUI === 'function') {
        toggle.updateUI(toggle.element.checked);
      }
    });
  });



  if (physToggle.checked) {
    objectsopenonmenuclick.forEach(obj => {
      if (obj.style.opacity == 0) {
        obj.style.opacity = 1;
      }
    });
  }
  allmenuitems.forEach(obj => {
    if (parseFloat(window.getComputedStyle(obj).opacity) === 0) {
      obj.classList.add('inactive');
    }
  });

  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();

});
