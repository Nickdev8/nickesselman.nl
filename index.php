<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $_GET['page']?></title>
    <link rel="stylesheet" href="https://css.hackclub.com/theme.css" />
    <link rel="icon" type="image/png" href="./images/logo.png">
    <link rel="stylesheet" href="scrips/helper.php">

    <!-- basic css -->
    <link rel="stylesheet" href="css/reset.css?v=1.0.0">
    <link rel="stylesheet" href="css/main.css?v=1.0.0">

    <!-- add css of the page Im on -->
    <?php
    $page = isset($_GET['page']) ? $_GET['page'] : 'home';
    $cssFile = "css/{$page}.css";
    if (file_exists($cssFile)):
        ?>
        <link rel="stylesheet" href="<?php echo $cssFile; ?>?v=1.0.0">
    <?php endif; ?>

</head>

<main>
    <?php
    include 'projects.php';
    include 'pages/specials/header.php';
    ?>
    <main>
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
        // Find the project in the $projects array
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
    <?php
    include 'pages/specials/footer.php';
    ?>
</body>

</html>