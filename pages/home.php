<script src="scripts/loadmoreimages.js"></script>

<div class="main-top">
    <h1 class="ultratitle">Nick Essleman</h1>
    <h2 class="headline">
        A passionate student who loves creating and learning.
    </h2>
</div>

<div class="container split separator">
    <div class="left copy card">
        <h2 class="headline">Hi!</h2>
        <p>
            This is a place where I share my projects, ideas, and experiences.
        </p>
        <h2>
            I Have a lot of projects!<br>
            <span class="subheadline">Click the button below to see them!</span>
            <br><br>
        </h2>
        <a href="?page=projects"><button class="lg cta">Projects</button></a>
    </div>


    <div class="right card">
        <div class="profile-description">
            <h2 class="headline">About Me</h2>
            <p>
                I'm a creative soul with a passion for building, learning, and exploring new ideas.
                Every project and every line of code tells a story about my journey.
            </p>
            <p>
                Explore my world and discover the adventures behind the scenes!
            </p>
        </div>
    </div>
    <img src="images/nice/1.jpg" alt="Nick Essleman" class="img-profile">
</div>

<div class="card wide container separator">
    <h2 class="headline">More images</h2>
    <div class="grid" id="imageGrid">
        <?php
        $dir = 'images/front/';
        include './scripts/load_images.php';
        ?>
    </div>
    <button class="separator" id="loadMore" onclick="loadMoreImages()">Load More</button>
</div>