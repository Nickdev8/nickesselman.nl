<script src="scripts/loadmoreimages.js"></script>

<div class="main-top">
    <!-- <div id="particles-js" style="position:absolute;top:0;left:0;width:100%;height:auto;z-index:1;overflow:hidden;"></div> -->
    <div style="margin:auto; width: fit-content;">
        <h1 class="ultratitle physics" style="background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
            Nick Esselman</h1>
    </div>

    <div class="physics"
        style="margin:auto; width: fit-content; background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
        <span id="typed-text"></span><span class="cursor" data-aos="fade-up">&nbsp;</span>
    </div>
</div>

<div class="container split physics separator card" matter data-aos="fade-up">
    <div>
        <h2 class="headline">Hi!</h2>
        <p>
            This is a place where I share my projects, ideas, and experiences.<br>
            I'm a creative soul with a passion for building, learning, and exploring new ideas.
            Every project and every line of code tells a story about my journey.
        </p>
    </div>
        <img src="images/me.png" alt="Nick Essleman" class="img-cropped-wide">
</div>

<div class="container physics separator card narrow" matter data-aos="fade-up">

    <div class="card-3d">
        <link rel="stylesheet" href="css/luanguagesamination.css">
        <?php include 'pages/specials/alltheprogramingluangages.html'; ?>
    </div>
</div>

<?php
include './pages/projects.php';
?>
<div class="card wide objectToMoreToTheBackClasses container separator" data-aos="fade-up">
    <h2 class="headline">More images</h2>
    <div class="grid" id="imageGrid">
        <?php
        // Only load the first batch
        $dir = 'images/*'; // All images in all subfolders of images/
        $_GET['limit'] = 10;
        include "./load_images.php";
        ?>
    </div>
    <button id="loadMoreBtn" class="btn" style="display:block;margin:1em auto;">Load More</button>
    <div id="sentinel" style="height: 1px;"></div>

</div>


<script>
    const texts = [
        "Web Developer.",
        "Designer.",
        "Fullstack Developer.",
        "Problem Solver.",
        "Student."
    ];

    const TYPING_SPEED = 100;   // ms per character
    const ERASING_SPEED = 50;   // ms per character on erase
    const NEW_TEXT_DELAY = 1500; // pause before typing next text

    const typedTextSpan = document.getElementById("typed-text");
    const cursorSpan = document.querySelector(".cursor");

    let textIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    function type() {
        const currentText = texts[textIndex];

        if (!isErasing) {
            // typing
            typedTextSpan.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                // done typing, pause before erasing
                isErasing = true;
                setTimeout(type, NEW_TEXT_DELAY);
            } else {
                setTimeout(type, TYPING_SPEED);
            }

        } else {
            // erasing
            typedTextSpan.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                // done erasing, move to next text
                isErasing = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, TYPING_SPEED);
            } else {
                setTimeout(type, ERASING_SPEED);
            }
        }
    }

    // kick it off on DOM load
    document.addEventListener("DOMContentLoaded", function () {
        if (texts.length) setTimeout(type, NEW_TEXT_DELAY);
    });


    gsap.from(".ultratitle", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "bounce.out",
        delay: 0.5
    });

    // VanillaTilt.init(document.querySelectorAll(".img-cropped-wide"), {
    //     max: 15,
    //     speed: 400,
    //     glare: true,
    //     "max-glare": 0.2,
    // });

    /* after Particles.js is loaded */
    // particlesJS("particles-js", {
    //     "particles": {
    //         "number": { "value": 60 },
    //         "size": { "value": 3 },
    //         "move": { "speed": 1.5 },
    //         "line_linked": { "enable": true }
    //     }
    // });
</script>