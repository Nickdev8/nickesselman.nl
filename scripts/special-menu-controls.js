window.devMode = false;

document.addEventListener('DOMContentLoaded', () => {
  const devToggle = document.getElementById('devModeToggle');
  const devOverlay = document.getElementById('devView');

  if (devToggle) {
    devToggle.addEventListener('change', () => {
      window.devMode = devToggle.checked;
      console.log("Dev mode is now", window.devMode ? "ON" : "OFF");

      if (devOverlay) {
        devOverlay.style.display = window.devMode ? "block" : "none";
      }
    });
  }
});

// Konami code: ↑↑↓↓←→←→
(function () {
  var konamiCode  = [38, 38, 40, 40, 37, 39, 37, 39]; //66, 65 BA
  var konamiIndex = 0;

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        window.devMode = !window.devMode;
        console.log("Konami code activated – Dev mode toggled to", window.devMode ? "ON" : "OFF");

        const devToggle = document.getElementById('devModeToggle');
        if (devToggle) devToggle.checked = window.devMode;

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
