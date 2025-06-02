document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY > maxScroll) {
      window.scrollTo(window.scrollX, maxScroll);
    }
  });


  const specialPhysics = document.getElementById('morephysics-menu');
  const physToggle = document.getElementById('enablephysics');
  const checkbox = document.getElementById('checkbox');
  const mutebutton = document.getElementById('muteicon');

  const menu = document.getElementById('specials-menu');
  gsap.set(menu, { autoAlpha: 0, display: 'none' });

  // ---- MENU TOGGLE (GSAP) ----
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      menu.style.display = 'block';
      gsap.to(menu, { duration: 0.2, autoAlpha: 1 });
    } else if (physToggle.checked) {
      gsap.to(menu, { duration: 0.2, autoAlpha: 0.5 });
    } else {
      gsap.to(menu, {
        duration: 0.2,
        autoAlpha: 0,
        onComplete: () => { menu.style.display = 'none'; }
      });
    }
  });

  // ---- StartSim (GSAP) ----
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      gsap.to(specialPhysics, { duration: 2, autoAlpha: 1 });
      mutebutton.style.display = 'unset';
      enableMatter(physicsConfig);
    } else {
      location.reload();
    }
  });

  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();
});
