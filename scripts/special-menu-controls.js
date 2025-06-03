window.devMode = false;

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bounceSound');
    const mutebutton = document.getElementById('muteicon');
    const muteimg = mutebutton.querySelector('img');

    // ---- MUTE / UNMUTE BUTTON ----
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

});




// Konami code: ↑↑↓↓←→←→ (also dev mode)
(function () {
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39]; //66, 65 BA
    var konamiIndex = 0;

    document.addEventListener('keydown', function (e) {

        const physToggle = document.getElementById('enablephysics');
        const arrowgravity = document.getElementById('arrowgravity');

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

        // switch gravity
        if (physToggle.checked && arrowgravity.checked) {
            switch (e.key) {
                case 'ArrowUp':
                    engine.world.gravity.x = 0;
                    engine.world.gravity.y = -1;
                    break;
                case 'ArrowDown':
                    engine.world.gravity.x = 0;
                    engine.world.gravity.y = 1;
                    break;
                case 'ArrowLeft':
                    engine.world.gravity.x = -1;
                    engine.world.gravity.y = 0;
                    break;
                case 'ArrowRight':
                    engine.world.gravity.x = 1;
                    engine.world.gravity.y = 0;
                    break;
                default:
                    return;
            }
        }
    });




})();
