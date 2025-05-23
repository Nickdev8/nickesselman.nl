<div class="card container">
    <h2 class="headline">These are most of my personal Projects! And events I've contributed in</h2>

    <div class="projectgrid">
        <?php
        foreach ($projects as $project) {
            echo '<a href="?project=' . $project['link'] . '" class="card interactive project project-link">';
            echo '    <div class="img-ratio">';
            echo '      <img src="/images/projectsimages/' . $project['image'] . '" alt="' . $project['title'] . '" />';
            echo '    </div>';
            echo '    <div class="card-content">';
            echo '      <h3>' . $project['title'] . '</h3>';
            echo '      <p>' . $project['description'] . '</p>';
            echo '    </div>';
            echo '</a>';
        }
        ?>
    </div>
</div>

<style>
    .projectgrid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 3rem;
    }

    .project {
        padding: 0 !important;
        width: 100%;
        height: max-content;
        display: block;
        object-fit: cover;
    }

    .project>div {
        padding: 1rem;
        z-index: 1;
    }

    @media screen and (max-width: 1200px) {
        .projectgrid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media screen and (max-width: 900px) {
        .projectgrid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
    }

    .img-ratio {
        width: 100%;
        aspect-ratio: 4/3;
        /* or 16/9, 1/1, etc. */
        overflow: hidden;
        border-radius: 0.5rem;
        background: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .img-ratio img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .project-link {
        color: inherit;
        text-decoration: none;
        display: block;
    }

    .project-link:visited,
    .project-link:active,
    .project-link:hover {
        color: inherit;
        text-decoration: none;
    }
</style>