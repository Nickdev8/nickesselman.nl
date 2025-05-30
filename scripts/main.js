document.addEventListener('DOMContentLoaded', () => {

  // ---- MENU TOGGLE (GSAP) ----
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
        onComplete: () => { menu.style.display = 'none'; }
      });
    }
  });

  // ---- PHYSICS TOGGLE ---- call to the file /scripts/matterrun.js
  const physToggle = document.getElementById('enablephysics');
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      enablebasketballbutton();
      enableMatter();
    } else {
      disableMatter();
    }
  });

  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();
});

function enablebasketballbutton(){
  const hoop = document.getElementById('baskedball-hoop');
}