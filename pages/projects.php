<script src="//cdn.jsdelivr.net/npm/globe.gl"></script>
<script type="module" src="scripts/globerenderer.js"></script>


<div id="tooltip" style="
        position: absolute;
        pointer-events: none;
        background: rgba(0,0,0,0.75);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-family: sans-serif;
        font-size: 0.8rem;
        display: block;
        z-index: 9999;
     ">
     <h3 class="lead" style="margin: 0;"></h3>
     <h4 class="caption"></h4>
</div>
<div class="projects-top">
    <div data-aos="fade-down" style="margin:auto; width: fit-content;">
        <h1 class="ultratitle physics" style="background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
            Projects</h1>
    </div>

    <div class="physics" data-aos="fade-down"
        style="margin:auto; width: fit-content; background-color: var(--myblue); padding: 1rem; border-radius: 0.5rem">
        <span>This is a place for me to put all kinds of projects, events and creations</span>
    </div>
</div>

<div class="objectToMoreToTheBackClasses mainthingprojects">
    <div class="weirdsplit">
        <div class="card objectToMoreToTheBackClasses" style="margin-right: 2rem;" data-aos="fade-up">
            <h2 class="headline">These are most of my personal Projects! And events I've contributed in</h2>
            <div class="projectgrid">
                <?php
                foreach ($projects as $project) {
                    // extract everything after the ":" (or use full title if no colon)
                    $title = $project['title'];
                    if (($pos = strpos($title, ':')) !== false) {
                        $badge = trim(substr($title, $pos + 1));
                    } else {
                        $badge = $title;
                    }

                    echo '<a href="?project=' . $project['link'] . '" class="card projecttilt physics project project-link" data-aos="fade-up">';
                    echo '  <div class="img-ratio">';
                    echo '    <img src="/images/projectsimages/' . $project['image'] . '" alt="' . htmlspecialchars($title) . '" />';
                    // echo '    <span class="overlay-text">' . htmlspecialchars($badge) . '</span>';
                    echo '  </div>';
                    echo '  <div class="card-content">';
                    echo '    <h3>' . htmlspecialchars($title) . '</h3>';
                    echo '    <p>' . htmlspecialchars($project['description']) . '</p>';
                    echo '  </div>';
                    echo '</a>';
                }
                ?>
            </div>
        </div>
        <link rel="stylesheet" href="/css/globe.css">
        <div class="conatiner objectToMoreToTheBackClasses card posfixed" data-aos="fade-left" data-aos-once="true">
            <div id="globe"></div>
        </div>
    </div>
</div>

<script>
    VanillaTilt.init(document.querySelectorAll(".projecttilt"), {
        max: 15,
        speed: 400,
        glare: false,
        gyroscope: false,
        scale: 1.02
    });
</script>