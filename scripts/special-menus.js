document.addEventListener('DOMContentLoaded', () => {
  const specialPhysics = document.getElementById('morephysics-menu');
  const physToggle = document.getElementById('enablephysics');
  const blindmode = document.getElementById('blindmode');
  const duckbox = document.getElementById('duckhunt-card');
  const checkbox = document.getElementById('checkbox');
  const menu = document.getElementById('specials-menu');
  const ravemode = document.getElementById('ravemode');
  const devmode = document.getElementById('devModeToggle');
  const rulet = document.getElementById('rulet');
  const audio = document.getElementById('bounceSound');
  const mutebutton = document.getElementById('muteicon');
  const muteimg = document.getElementById('muteiconimg');


  // Add any other objects that should be toggled with the main menu checkbox
  const whatobjects = [menu, duckbox];
  // const allmenuitems = document.querySelectorAll('.overlay-menu');

  // Objects that should add what class when rave is on
  whattochangetowhat = [
    { from: 'sp-rave', to: 'raveactive' },
    { from: 'card', to: 'raveactive' }
  ];

  const toggledCheckboxes = [
    {
      element: checkbox,
      storageKey: 'mainmenucheckbox',
      remember: false,
      onstart: true,
      updateUI: (checked) => {
        if (checked) {
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
      }
    },
    {
      element: mutebutton,
      storageKey: 'mutebutton',
      remember: false,
      updateUI: (checked) => {
        if (checked) {
          audio.muted = true;
          muteimg.src = 'images/specials/mute.png';
          audio.src = '';
        } else {
          audio.muted = false;
          muteimg.src = 'images/specials/notmute.png';
          audio.src = 'sounds/bounce.mp3';
        }
      }
    },
    {
      element: physToggle,
      storageKey: 'physToggle',
      remember: false,
      updateUI: (checked) => {
        if (checked) {
          specialPhysics.style.opacity = 1;
          mutebutton.style.opacity = 1;
          specialPhysics.classList.remove('inactive');
          mutebutton.classList.remove('inactive');
          enableMatter(physicsConfig);

          // Disable AOS animations:
          AOS.init({ disable: true });
          document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
            el.classList.remove('aos-init', 'aos-animate');
          });
        } else {
          location.reload();
        }
      }
    },
    {
      element: devmode,
      storageKey: 'devModeToggle',
      remember: false,
      updateUI: (checked) => {
        document.querySelectorAll('*').forEach(el => {
          if (checked) {
            el.classList.add('dev-border');
          } else {
            el.classList.remove('dev-border');
          }
        });
      }
    },
    {
      element: ravemode,
      storageKey: 'ravemode',
      remember: true,
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
      remember: true,
      updateUI: (checked) => {
        const body = document.querySelector('body');
        body.style.fontFamily = checked ? 'Braille, sans-serif' : '';
      }
    },
    {
      element: rulet
    }
  ];

  toggledCheckboxes.forEach(toggle => {
    let state;
    if (toggle.element.tagName === 'INPUT') {
        state = toggle.element.checked;
    } else {
        state = toggle.element.dataset.checked === "true" ? true : false;
    }
    console.log(`Initial state for ${toggle.storageKey}: ${toggle.onstart}`);
    if (typeof toggle.updateUI === 'function' && toggle.onstart) {
        toggle.updateUI(state);
        console.log(`Loaded ${toggle.storageKey} state: ${state}`);
    }
    toggle.element.addEventListener('click', () => {
        if (toggle.element.tagName === 'INPUT') {
            state = toggle.element.checked;
        } else {
            state = !(toggle.element.dataset.checked === "true");
            toggle.element.dataset.checked = state;
        }
        if (toggle.remember) {
            localStorage.setItem(toggle.storageKey, state);
        }
        if (typeof toggle.updateUI === 'function') {
            toggle.updateUI(state);
        }
    });
  });

  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();

});
