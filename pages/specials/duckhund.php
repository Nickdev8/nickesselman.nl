<style>
  #duckbox {
    position: fixed;
    bottom: 1rem;
    left: calc(50% - 3rem);
    background-color: var(--muted);
    padding: 1rem;
    border-radius: 0.5rem;
    display: inline-block;
    z-index: 998;
    box-shadow: inset 0 -2.1rem var(--slate);
  }

  #duckbutton {
    width: 4rem;
    height: 4rem;
    margin-bottom: 2rem !important;
    background-color: var(--orange);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3),
                inset 0 -0.8rem var(--red);
    color: transparent;
    font-size: 0;
  }

  #duckbutton:hover {
    transform: scale(1);
  }

  #duckbutton:active {
    box-shadow: inset 0 1rem var(--red);
  }

  .duckhunt-duck {
    position: fixed;
    z-index: 999;
    width: 32px;
    height: 32px;
    transform-origin: center center;
    transform: scale(2, 2);
    pointer-events: none; /* until hovered or clicked */
  }

  .duckhunt-duck:hover {
    cursor: pointer;
    pointer-events: auto;
  }
</style>

<div id="duckbox" class="physics-fixed">
  <button id="duckbutton"></button>
</div>

<!-- Container where ducks will be appended -->
<div id="duck-container"></div>

<script>
  // Each 32×32 sprite‐frame is now its own image URL:
  const duckFrames = {
    upRight: [
      "/images/duckhunt/duck_upRight_1.png",
      "/images/duckhunt/duck_upRight_2.png",
      "/images/duckhunt/duck_upRight_3.png"
    ],
    side: [
      "/images/duckhunt/duck_side_1.png",
      "/images/duckhunt/duck_side_2.png",
      "/images/duckhunt/duck_side_3.png"
    ]
  };

  document.getElementById("duckbutton").addEventListener("click", () => {
    const duckCount = 5;
    const container = document.getElementById("duck-container");

    for (let i = 0; i < duckCount; i++) {
      let duck = document.createElement("img");
      duck.classList.add("physics-fixed", "specials", "duckhunt-duck");
      // Start with a default frame; will switch once we pick direction:
      duck.src = duckFrames.upRight[0];
      container.appendChild(duck);
      startDuckAnimation(duck);
    }
  });

  function startDuckAnimation(duck) {
    let frameIntervalID = null;
    let frameIndex = 0;
    let currentFrames = duckFrames.upRight;

    // Fixed speed for all ducks (in pixels per second)
    const SPEED = 240;

    // Choose an angle STRICTLY between 20° and 160° (in degrees):
    //   20°  => slight tilt above right horizontal
    //  160°  => slight tilt above left horizontal
    const angleDeg = 20 + Math.random() * 140; // [20, 160)
    const angleRad = (angleDeg * Math.PI) / 180;

    // Compute dx, dy in screen coordinates (y positive → down).
    // To go UP: dy must be negative. In math, sin(angleRad) is positive when angle∈(0,180).
    // So dirY = –sin(angleRad) → negative. dirX = cos(angleRad).
    const dirX = Math.cos(angleRad);
    const dirY = -Math.sin(angleRad);

    // Pick appropriate sprite‐set based on whether vertical motion dominates:
    if (Math.abs(dirY) > Math.abs(dirX)) {
      currentFrames = duckFrames.upRight;
    } else {
      currentFrames = duckFrames.side;
    }

    // Flip horizontally if dirX < 0 (angle > 90° → going up‐left):
    if (dirX < 0) {
      duck.style.transform = "scale(-2, 2)";
    } else {
      duck.style.transform = "scale(2, 2)";
    }

    // Begin cycling through frames every 200ms:
    frameIntervalID = setInterval(() => {
      frameIndex = (frameIndex + 1) % currentFrames.length;
      duck.src = currentFrames[frameIndex];
    }, 100);

    // Place duck just below the bottom edge, at random X:
    function placeDuckBelowView() {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const duckRect = duck.getBoundingClientRect();
      const duckW = duckRect.width; // actually 64px on screen (32×scale2)
      const startX = Math.floor(Math.random() * (winW - duckW));
      duck.style.left = startX + "px";
      duck.style.top = winH + "px"; // y = viewport height = just off‐screen bottom
    }

    placeDuckBelowView();

    // Track last timestamp for uniform speed
    let lastTimestamp = null;
    let animationID = null;

    function step(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000; // seconds elapsed
      lastTimestamp = timestamp;

      // Move by dx = dirX * SPEED * dt , dy = dirY * SPEED * dt
      const curX = parseFloat(duck.style.left);
      const curY = parseFloat(duck.style.top);
      const newX = curX + dirX * SPEED * deltaTime;
      const newY = curY + dirY * SPEED * deltaTime;
      duck.style.left = newX + "px";
      duck.style.top = newY + "px";

      // Once duck is fully off‐screen, remove it:
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const rect = duck.getBoundingClientRect();
      if (
        rect.right < 0 ||
        rect.left > winW ||
        rect.bottom < 0 ||
        rect.top > winH
      ) {
        cleanupDuck();
        return;
      }

      animationID = requestAnimationFrame(step);
    }

    // If user clicks a duck, remove it immediately:
    duck.addEventListener("click", () => {
      cleanupDuck();
    });

    function cleanupDuck() {
      if (frameIntervalID !== null) {
        clearInterval(frameIntervalID);
        frameIntervalID = null;
      }
      if (animationID !== null) {
        cancelAnimationFrame(animationID);
        animationID = null;
      }
      duck.remove();
    }

    // Kick off the movement loop:
    animationID = requestAnimationFrame(step);
  }
</script>
