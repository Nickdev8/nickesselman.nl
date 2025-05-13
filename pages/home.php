<script src="scripts/loadmoreimages.js"></script>

<header>
    <h1 class="ultratitle">Nick Essleman</h1>
    <p class="headline">
        A passionate student who loves creating and learning.
    </p>
</header>

<div class="card wide container split">
    <div class="left">
        <h2 class="headline">Hi!</h2>
        <p>
            Learning to code, building projects, and growing every day.
            <br>
            This is a place where I share my projects, ideas, and experiences.
        </p>
    </div>
    <div class="right middle">
        <h2>Click <a href="?page=projects"><button class="lg cta">Here</button></a> to find the most interesing stuff
        </h2>
    </div>
</div>

<div class="separator"></div>

<div class="card wide container">
    <h2 class="headline">Some random images</h2>
    <h2 class="subheadline">Click on an image to see it its source</h2>
    <div class="grid" id="imageGrid">
        <?php include './scripts/load_images.php'; // Load the first set of images ?>
    </div>
    <button class="separator" id="loadMore" onclick="loadMoreImages()">Load More</button>
</div>

<div class="separator"></div>