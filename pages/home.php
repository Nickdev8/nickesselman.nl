<script src="scripts/loadmoreimages.js"></script>

<div class="main-top">
    <h1 class="ultratitle">Nick Essleman</h1>
    <h2 class="headline">
        A passionate student who loves creating and learning.
    </h2>
</div>

<div class="container wide split separator" style="padding: 0 !important;">
    <div class="card">
        <h2 class="headline">Hi!</h2>
        <p>
            This is a place where I share my projects, ideas, and experiences.
            I'm a creative soul with a passion for building, learning, and exploring new ideas.
            Every project and every line of code tells a story about my journey.
        </p>
        <img src="images/nice/1.jpg" alt="Nick Essleman" class="img-profile">
    </div>


</div>
<?php
include './pages/projects.php';
?>
<div class="card wide container separator">
    <h2 class="headline">More images</h2>
    <div class="grid" id="imageGrid">
        <?php
        $dir = 'images/mainpagegrid/';
        include './scripts/load_images.php';
        ?>
    </div>
    <button class="separator" id="loadMore" onclick="loadMoreImages()">Load More</button>
</div>