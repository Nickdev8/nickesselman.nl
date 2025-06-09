<script type="module" src="scripts/globerenderer.js"></script>

<div class="objectToMoreToTheBackClasses mainthingprojects" data-aos="fade-up">
    <div class="weirdsplit">
        <div class="conatiner objectToMoreToTheBackClasses card posfixed">
            <div id="globe"></div>
            <h1>hi</h1>
        </div>
        <div class="card objectToMoreToTheBackClasses">
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

<style>
    .weirdsplit {
        border: 3px solid #fff;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        border: 2px dashed rgba(114, 186, 94, 0.35);
        background: rgba(114, 186, 94, 0.05);
    }

    .weirdsplit>div {
    }
    .posfixed{
        position: sticky;
        top: 0;
    }

    .mainthingprojects {
        margin: 2rem;
    }

    .posfixed {
        /* max-width: fit-content; */
        position: sticky;
        top: 0;
        background-color: yellow;
        padding: 50px;
        font-size: 20px;
        height: 40vh;
    }

    .projectgrid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
    }

    .project {
        padding: 0 !important;
        width: 100%;
        display: block;
        will-change: transform;
    }

    .img-ratio {
        position: relative;
        /* <-- enable overlay positioning */
        width: 100%;
        aspect-ratio: 4/3;
        overflow: hidden;
        border-radius: .5rem;
        background: #eee;
    }

    .img-ratio img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    /* the little badge in top-left */
    .overlay-text {
        position: absolute;
        top: 1.5rem;
        left: 1rem;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding: .25rem .5rem;
        border-radius: .25rem;
        pointer-events: none;
    }

    .project>.card-content {
        padding: 1rem;
        padding-top: 1.5rem;
        z-index: 1;
        min-height: 13rem;
    }

    @media screen and (max-width: 1200px) {
        .projectgrid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 900px) {
        .projectgrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
    }

    .project-link {
        color: inherit;
        text-decoration: none;
    }

    .project-link:hover {
        text-decoration: none;
    }
</style>