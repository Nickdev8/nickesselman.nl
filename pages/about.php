<!-- About Me Section -->
<div class="card container">
    <h2 class="headline">About Me</h2>
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
        <code>Full Stack Software Development</code>.
    </p>
</div>