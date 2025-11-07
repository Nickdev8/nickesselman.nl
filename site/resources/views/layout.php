<?php
$pageTitle = $meta['title'] ?? 'Nick Esselman';
$pageDescription = $meta['description'] ?? 'Creative developer building playful software.';
$metaImage = $meta['image'] ?? '/images/logo.png';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle); ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription); ?>">
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle); ?>">
    <meta property="og:description" content="<?= htmlspecialchars($pageDescription); ?>">
    <meta property="og:image" content="<?= htmlspecialchars($metaImage); ?>">
    <link rel="icon" type="image/png" href="/images/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=General+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= asset('css/app.css'); ?>">
</head>

<body>
    <?php partial('nav', ['currentPage' => $currentPage ?? 'home']); ?>
    <main class="page-shell">
        <?= $content; ?>
    </main>
    <?php partial('footer'); ?>
    <script type="module" src="<?= asset('scripts/app.js'); ?>"></script>
</body>

</html>
