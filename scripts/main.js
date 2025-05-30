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

  // ---- PHYSICS TOGGLE ---- call to the file /scripts/matterrun.js
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      enablebasketballbutton();
      removemaintop();
      enableMatter();
    } else {
      location.reload();
    }
  });

  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();
});

function enablebasketballbutton() {
  const hoop = document.getElementById('baskedball-hoop');
}


function removemaintop() {
  if (document.querySelector('.main-top')) {

    gsap.to(".main-top", {
      backgroundColor: "transparent",  // fade to fully transparent
      duration: 1.5,                   // 1.5 seconds
      ease: "power2.out",              // nice smooth easing

    });
  }
}
