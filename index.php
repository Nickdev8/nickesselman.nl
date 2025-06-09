<?php
// filepath: /home/nick/Documents/HackClub/projects/nickesselman.nl/index.php
$cacheDuration = floor(86400 * 365.25); // 1 year
header("Cache-Control: public, max-age={$cacheDuration}");
header("Expires: " . gmdate("D, d M Y H:i:s", time() + $cacheDuration) . " GMT");
$versionnum = "1.1.5";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $_GET['page'] ?></title>
    <link rel="stylesheet" href="https://css.hackclub.com/theme.css">
    <link rel="icon" type="image/png" href="./images/logo.png">

    <!-- libs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/elevator.js/elevator.min.js"></script>
    <script src="https://rawgit.com/WeiChiaChang/Easter-egg/master/easter-eggs-collection.js"></script>
    <script src="scripts/comcastify.js"></script>

    <!-- injects LightstreamerClient & Subscription into window -->
    <script src="https://unpkg.com/lightstreamer-client-web/lightstreamer.min.js"></script>

    <!-- (Optional) Client-side validation script; see Section 3 -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/matter-dom-plugin@1.0.0/build/matter-dom-plugin.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/matter-attractors@0.1.6/build/matter-attractors.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJk2+m3pvpvVzKDh4jHzKx3v57B+8H0E2eX+E=" crossorigin="anonymous"></script>


    <!-- basic css -->
    <link rel="stylesheet" href="css/reset.css?v=<?= $versionnum ?>">
    <link rel="stylesheet" href="css/main.css?v=<?= $versionnum ?>">
    <link rel="stylesheet" href="css/topmenuoffset.css?v=<?= $versionnum ?>">

    <!-- add css of the page Im on -->
    <?php
    $page = isset($_GET['page']) ? $_GET['page'] : 'home';
    if (isset($_GET['project']))
        $page = 'null';
    $cssFile = "css/{$page}.css";
    if (file_exists($cssFile)):
        ?>
        <link rel="stylesheet" href="<?php echo $cssFile; ?>?v=<?= $versionnum ?>">
    <?php endif;
    ?>

</head>

<body>
    <?php
    include 'projects.php';
    include 'pages/specials/header.php';
    ?>
    <main id="inner-main" class="inner-main">
        <?php
        $page = $_GET['page'] ?? null;
        $project = $_GET['project'] ?? null;

        if ($page === null && $project === null) {
            $page = 'home';
        }

        if ($page !== null) {
            if (file_exists("pages/$page.php")) {
                include "pages/$page.php";
            } else {
                include 'pages/specials/404.php';
            }
        } else if ($project !== null) {
            $selectedProject = null;
            foreach ($projects as $proj) {
                if ($proj['link'] === $project) {
                    $selectedProject = $proj;
                    break;
                }
            }

            if ($selectedProject) {
                if (isset($selectedProject['basiclayout']) && $selectedProject['basiclayout'] === 'true') {
                    include 'projects/basiclayout.php';
                } else if (file_exists("projects/$project.php")) {
                    include "projects/$project.php";
                } else {
                    include 'pages/specials/404.php';
                }
            } else {
                include 'pages/specials/404.php';
            }
        } else {
            include 'pages/home.php';
        }
        ?>
    </main>
    <!-- Modal for image preview -->
    <div id="imageModal" class="modal" style="display:none;">
        <span class="modal-close" id="modalClose">&times;</span>
        <img class="modal-content" id="modalImg" src="" alt="Preview">
    </div>
    <?php
    include 'pages/specials/footer.php';
    ?>
    <script>
        var page = "<?php echo $page; ?>"

        // your normal AOS settings
        const aosOptions = {
            offset: 120,
            duration: 400,
            easing: 'ease',
            once: false
        };

        function disableAllAOS() {
            AOS.init({ ...aosOptions, disable: true });

            document.body.classList.add('no-hover');
        }

        function enableAllAOS() {
            AOS.init({ ...aosOptions, disable: false });
            AOS.refresh();
            document.body.classList.remove('no-hover');
        }

        AOS.init(aosOptions);
    </script>



    <!-- physics engine -->
    <div id="devView">
        <strong>Dev View</strong>
        <div id="devInfo"></div>
    </div>

    <?php if ($page != "cv"): ?>
        <script src="scripts/unnecessary.js?v=<?= $versionnum ?>"></script>
        <script src="scripts/main.js?v=<?= $versionnum ?>"></script>
        <script src="scripts/special-menus.js?v=<?= $versionnum ?>"></script>
        <script src="scripts/matterrun.js?v=<?= $versionnum ?>"></script>
        <script src="scripts/physics-configs.js?v=<?= $versionnum ?>"></script>
        <script src="scripts/physics-controls.js?v=<?= $versionnum ?>"></script>
        <script src="scripts/special-menu-controls.js?v=<?= $versionnum ?>"></script>
        <?php
        include 'pages/specials/duckhunt.php';
        include 'pages/specials/specialsmenu.php';
        ?>
    <?php endif; ?>

</body>

</html>