<script src="scripts/loadmoreimages.js"></script>

<?php
include 'pages/specials/header.php';
?>

<div class="main-top">
    <h1 class="ultratitle">Nick Essleman</h1>
    <h2 class="headline">
        A passionate student who loves creating and learning.
    </h2>
</div>

<div class="container split separator card">
    <div>
        <h2 class="headline">Hi!</h2>
        <p>
            This is a place where I share my projects, ideas, and experiences.
            I'm a creative soul with a passion for building, learning, and exploring new ideas.
            Every project and every line of code tells a story about my journey.
        </p>
    </div>
    <img src="images/me.png" alt="Nick Essleman" class="img-cropped-wide">


</div>
<?php
include './pages/projects.php';
?>
<div class="card wide container separator">
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
    <!-- Modal for image preview -->
    <div id="imageModal" class="modal" style="display:none;">
        <span class="modal-close" id="modalClose">&times;</span>
        <img class="modal-content" id="modalImg" src="" alt="Preview">
    </div>
</div>