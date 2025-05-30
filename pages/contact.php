<style>
    .header-overlay {
        position: relative;
        width: 100%;
        aspect-ratio: 25 / 8;
        overflow: hidden;

    }

    .header-overlay img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--radii-extra);
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
        margin: 0;
        color: white;
    }

    .img-wide,
    .img-wide img,
    .img-wide>* {
        aspect-ratio: 25 / 8;
    }

    .icon {
        width: 4rem;
        height: 4rem;
    }

    .iconholder {
        display: grid;
        /* Define two columns, each taking up 1 fraction of the available space */
        grid-template-columns: 1fr 1fr;
        /* Optional: gap between items */
        grid-gap: 16px;
    }


    .iconholder a {
        display: flex;
        align-items: center;
        gap: 2rem;
        text-decoration: none;
        color: black;
        border-radius: 2rem;
        padding: 1rem;
        transition: transform 130ms ease-in-out;
    }

    .iconholder a:hover {
        transform: scale(1.1);
    }



    @media screen and (max-width: 1100px) {
        .iconholder {
            grid-template-columns: 1fr;
        }
    }

    @media screen and (max-width: 800px) {
        .iconholder {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media screen and (max-width: 550px) {
        .iconholder {
            grid-template-columns: 1fr;
        }
    }
</style>

<link rel="stylesheet" href="css/form.css">
<div class="container physics separator header-overlay" matter>
    <img src="images/projectsimages/contact.jpg" alt="Contact background">
    <div class="overlay-text">
        <h1>Contact</h1>
        <p>Where to find me</p>
    </div>
</div>

<div class="container separator split">
    <div class="card physics" matter>
        <h3 class="headline">Info</h3>
        <div class="iconholder">
            <a href="https://www.linkedin.com/in/nick-esselman/">
                <img class="icon physics physics-nested" src="https://img.icons8.com/?size=100&id=8808&format=png&color=000000">
                nick-esselman</a>
            <a href="https://discordapp.com/users/452409871300558848">
                <img class="icon physics physics-nested" src="https://img.icons8.com/?size=100&id=30888&format=png&color=000000">
                @nikkcc.nick</a>
            <a href="https://github.com/Nickdev8">
                <img class="icon physics physics-nested" src="https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=000000">
                Nickdev8</a>
            <a href="https://www.instagram.com/nick.esselman/">
                <img class="icon physics physics-nested" src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000">
                @nick.esselman</a>
            <a href="mailto:info@nickesselman.nl">
                <img class="icon physics physics-nested" src="https://img.icons8.com/?size=100&id=qRMmG0Arw19N&format=png&color=000000">
                info@nickesselman.nl</a>
            <a href="mailto:nick.esselman@gmail.com">
                <img class="icon physics physics-nested" src="https://img.icons8.com/?size=100&id=zVhqEPoFFZ89&format=png&color=000000">
                nick.esselman@gmail.com</a>
        </div>
    </div>
    <div class="card physics" matter>
        <form class="form">
            <h3 class="headline">Contact us</h3>
            <input type="text" placeholder="Your email" class="input">
            <textarea placeholder="Your message"></textarea>

            <button class="cta">Submit</button>
        </form>
    </div>
    <?php
    include_once 'pages/specials/cat.php';
    ?>
</div>