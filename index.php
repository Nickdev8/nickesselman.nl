<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://css.hackclub.com/theme.css" />
    <link rel="icon" type="image/png" href="./images/logo.png">
    <link rel="stylesheet" href="scrips/helper.php">

    <!-- all css -->
    <link rel="stylesheet" href="css/main-top.css?v=1.0.0">

</head>

<body>
    <?php
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