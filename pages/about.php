<div class="card container">
    <h2 class="headline">Nick Esselman</h2>
    <p>
        I'm <?php echo floor((time() - strtotime('2008-08-08')) / (365.25 * 24 * 60 * 60) * 100) / 100; ?> years old.
    </p>
    <ul>
        <li id="months-old"></li>
        <li id="days-old"></li>
        <li id="minutes-old"></li>
        <li id="seconds-old"></li>
    </ul>
    <script src="scripts/updateage.js"></script>
    <p>
        I'm a student at <a href="https://www.ma-web.nl/">Media College Amsterdam</a>, studying
        <strong>Full Stack Software Development</strong>.
    </p>
</div>


<div class="card container separator">
    <h2 class="headline">My story</h2>
    <p>
        I started Programming
        <?php echo floor((time() - strtotime('2017-09-02')) / (365.25 * 24 * 60 * 60) * 100) / 100; ?>
        years ago, back when i was 9. all on my own, I learned to code by trial and error. And did this for a few years.
        <br><br>
        After high school I went to Media College Amsterdam to study full stack development.
        <br>
        And in the first year i joined HackClub. where i experienced a lot fun of new things.
        <a href="?page=HackClub"> Read here. </a>
        <br><br>
        its worth your time to read if you are someone or know somewhat that has even the slightest interest in
        coding. (and is below <strong>18</strong>)
        <br>
        At HackClub i met some incredible people and i went on trips to places like Shanghai and San Francisco.
        Everything was paid for by HackClub.
    </p>

    <div class="separator"></div>

    <div class="right" style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.125); border-radius: 1rem; height: fit-content;">
        <?php
        include 'pages/specials/alltheprogramingluangages.html';
        ?>

        <style>
            .PLIK {
                margin: 5px;
                transition: transform 0.2s;
            }

            .PLIK:hover {
                transform: scale(1.1);
            }
        </style>
    </div>
</div>