document.addEventListener('DOMContentLoaded', () => {
  const specialPhysics = document.getElementById('morephysics-menu');
  const physToggle = document.getElementById('enablephysics');
  const blindmode = document.getElementById('blindmode');
  const duckbox = document.getElementById('duckhunt-card');
  const checkbox = document.getElementById('checkbox');
  const mutebutton = document.getElementById('muteicon');
  const menu = document.getElementById('specials-menu');

  const whatobjects = [menu, duckbox];
  const allmenuitems = document.querySelectorAll('.overlay-menu')

  // Restore saved toggle states (localStorage stores only strings)
  // if (localStorage.getItem('physToggle')) {
  //   physToggle.checked = localStorage.getItem('physToggle') === 'true';
  //   if (physToggle.checked) {
  //     gsap.to(specialPhysics, { duration: 2, autoAlpha: 1 });
  //     gsap.to(mutebutton, { duration: 2, autoAlpha: 1 });
  //     specialPhysics.style.display = 'unset';
  //     mutebutton.style.display = 'unset';
  //     enableMatter(physicsConfig);
  //   }
  // }

  if (localStorage.getItem('blindmode')) {
    blindmode.checked = localStorage.getItem('blindmode') === 'true';
    const body = document.querySelector('body');
    body.style.fontFamily = blindmode.checked ? 'Braille, sans-serif' : '';
  }

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

  // ---- StartSim (GSAP) ----
  physToggle.addEventListener('click', () => {
    localStorage.setItem('physToggle', physToggle.checked);
    if (physToggle.checked) {
      specialPhysics.style.opacity = 1;
      mutebutton.style.opacity = 1;
      specialPhysics.classList.remove('inactive');
      mutebutton.classList.remove('inactive');
      enableMatter(physicsConfig);
    } else {
      location.reload();
    }
  });

  blindmode.addEventListener('change', () => {
    localStorage.setItem('blindmode', blindmode.checked);
    const body = document.querySelector('body');
    body.style.fontFamily = blindmode.checked ? 'Braille, sans-serif' : '';
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
