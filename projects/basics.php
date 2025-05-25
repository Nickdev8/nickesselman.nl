<?php
include_once 'adddata.php';

// grab blocks
$blocks = $selectedProject['blocks'] ?? [];
$firstBlock = $blocks[0] ?? null;
$hasOnlyImage = $firstBlock
  && !empty($firstBlock['image'])
  && empty($firstBlock['title'])
  && empty($firstBlock['subtitle'])
  && empty($firstBlock['content']);

// normalize to first image URL
if ($hasOnlyImage) {
  $imgs = is_array($firstBlock['image'])
    ? $firstBlock['image']
    : [$firstBlock['image']];
  $bg = $imgs[0];
}
?>
<?php if ($hasOnlyImage): ?>
  <!-- only‐image header variant -->
  <style>
    .header-overlay {
      position: relative;
    }

    .header-overlay .overlay-text {
      position: absolute;
      top: 3rem;
      left: 5rem;
      color: #fff;
      z-index: 2;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
    }

    .header-overlay .overlay-text h1,
    .header-overlay .overlay-text p {
      color: #fff;
    }

    .header-overlay img.bg {
      display: block;
      width: 100%;
      height: auto;
    }
  </style>

  <div class="container wide separator header-overlay">
    <div class="overlay-text">
      <h1><?= htmlspecialchars($selectedProject['title']) ?></h1>
      <p><?= htmlspecialchars($selectedProject['description']) ?></p>
    </div>
  </div>
<?php else: ?>
  <!-- regular header -->
  <div class="container separator">
    <h1><?= htmlspecialchars($selectedProject['title']) ?></h1>
    <p><?= htmlspecialchars($selectedProject['description']) ?></p>
  </div>
<?php endif; ?>





<button class="totopbutton" id="backToTop">
  <svg class="svgIcon" viewBox="0 0 384 512">
    <path
      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8
         0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3
         32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8
         0-45.3l-160-160z">
    </path>
  </svg>
</button>

<style>
  .totopbutton {
    /* layout & look (your existing) */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--darkless);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
    overflow: hidden;
    cursor: pointer;
    position: fixed;      /* STICK IT */
    bottom: 4rem;
    right: 4rem;
    z-index: 999;

    /* hide-offscreen by default */
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    pointer-events: none;

    /* animate everything (including your hover-expansion props) */
    transition: all 0.3s ease-out;
  }

  /* when we add .visible, slide up + fade in */
  .totopbutton.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* your existing hover-to-expand */
  .totopbutton .svgIcon {
    width: 12px;
    transition-duration: 0.3s;
  }

  .totopbutton .svgIcon path {
    fill: white;
  }

  .totopbutton:hover {
    width: 140px;
    border-radius: 50px;
    background-color: var(--orange);
    align-items: center;
  }

  .totopbutton:hover .svgIcon {
    transform: translateY(-200%);
  }

  .totopbutton::before {
    position: absolute;
    bottom: -20px;
    content: "Back to Top";
    color: white;
    font-size: 0;
    transition: font-size 0.3s;
  }

  .totopbutton:hover::before {
    font-size: 13px;
    bottom: unset;
  }
</style>

<script>
  (function() {
    const totopbtn       = document.getElementById('backToTop');
    const showAfter = 100; // px scrolled before showing

    window.addEventListener('scroll', () => {
      totopbtn.classList.toggle('visible', window.scrollY > showAfter);
    });

    totopbtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
</script>
