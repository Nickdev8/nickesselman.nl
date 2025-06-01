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
      gsap.to(menu, { duration: 0.2, autoAlpha: 0.5 });
    } else {
      gsap.to(menu, {
        duration: 0.2,
        autoAlpha: 0,
        onComplete: () => { menu.style.display = 'none'; }
      });
    }
  });

  // ---- MUTE / UNMUTE BUTTON ----
  const audio = document.getElementById('bounceSound');
  const mutebutton = document.getElementById('muteicon');
  const muteimg = mutebutton.querySelector('img');

  function updateButton() {
    if (audio.muted) {
      muteimg.src = 'images/specials/notmute.png';
      audio.src = '';
    } else {
      muteimg.src = 'images/specials/mute.png';
      audio.src = 'sounds/bounce.mp3';
    }
  }

  mutebutton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateButton();
  });

  // ---- INIT AOS (after any DOM tweaks) ----
  AOS.init();
});
