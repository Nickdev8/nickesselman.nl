<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
    if (file_exists($cssFile)) :
    ?>
    <link rel="stylesheet" href="<?php echo $cssFile; ?>?v=1.0.0">
    <?php endif; ?>

</head>

<body>
    <?php
    include 'pages/nav.php';

    if (isset($_GET['page'])) {
        $page = $_GET['page'];

    } else {
        $page = 'home';
    }

    if (file_exists("pages/$page.php")) {
        include "pages/$page.php";
    } else {
        include 'pages/404.php';
    }
    ?>
</body>

</html>