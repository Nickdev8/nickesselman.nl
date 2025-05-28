<?php
$versionnum = "1.0.5"
    ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $_GET['page'] ?></title>
    <link rel="stylesheet" href="https://css.hackclub.com/theme.css">
    <link rel="icon" type="image/png" href="./images/logo.png">
    <script type="module" src="scripts/loadmoreimages.js" defer></script>

    <!-- libs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>



    <!-- basic css -->
    <link rel="stylesheet" href="css/reset.css?v=<?= $versionnum ?>">
    <link rel="stylesheet" href="css/main.css?v=<?= $versionnum ?>">

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

    if ($page == "home"): ?>
        <script src="scripts/home.js" defer></script>
    <?php endif; ?>

</head>

<body>

    <?php
    include 'projects.php';
    include 'pages/specials/header.php';
    ?>
    <main class="inner-main">
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
        AOS.init({ duration: 800, once: false, mirror: true });
    </script>
</body>

</html>