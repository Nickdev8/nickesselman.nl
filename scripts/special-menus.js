document.addEventListener('DOMContentLoaded', () => {
  const specialPhysics = document.getElementById('morephysics-menu');
  const physToggle = document.getElementById('enablephysics');
  const duckhuntToggle = document.getElementById('enableduckhunt');
  const duckbox = document.getElementById('duckhunt-card');
  const checkbox = document.getElementById('checkbox');
  const mutebutton = document.getElementById('muteicon');

  const menu = document.getElementById('specials-menu');
  gsap.set(menu, { autoAlpha: 0, display: 'none' });

  // ---- MENU TOGGLE (GSAP) ----
  checkbox.addEventListener('change', () => {
    const whatobjects = [menu, duckhuntToggle];
    if (checkbox.checked) {
      whatobjects.forEach(obj => {
        obj.style.display = 'block';
        gsap.to(obj, { duration: 0.2, autoAlpha: 1 });
      });
    } else if (physToggle.checked) {
      gsap.to(menu, { duration: 0.2, autoAlpha: 0.5 });
      if (duckhuntToggle.checked) gsap.to(duckbox, { duration: 0.2, autoAlpha: 0.5 });
    } else {
      if (duckhuntToggle.checked) gsap.to(duckbox, { duration: 0.2, autoAlpha: 0 });
      gsap.to(menu, {
        duration: 0.2, autoAlpha: 0,
        onComplete: () => { menu.style.display = 'none'; }
      });
    }
  });

  // ---- StartSim (GSAP) ----
  physToggle.addEventListener('click', () => {
    if (physToggle.checked) {
      gsap.to(specialPhysics, { duration: 2, autoAlpha: 1 });
      gsap.to(mutebutton, { duration: 2, autoAlpha: 1 });
      specialPhysics.style.display = 'unset';
      mutebutton.style.display = 'unset';
      enableMatter(physicsConfig);
    } else {
      location.reload();
    }
  });


  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();
});
