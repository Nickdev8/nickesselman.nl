<?php
// Ensure no output before headers
ob_start();

// Allow a custom directory via $dir variable, then ?dir=..., then default
$dir = $dir ?? (isset($_GET['dir']) ? $_GET['dir'] : './images/nice/');
if (substr($dir, -1) !== '/') $dir .= '/';

// Prevent directory traversal
$dir = preg_replace('#\.\.[/\\\]#', '', $dir);

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 15; // Start with images
$displayed = isset($_GET['displayed']) ? explode(',', $_GET['displayed']) : [];

$imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

if (is_dir($dir)) {
    $files = scandir($dir);
    $mediaPaths = [];
    $videoExtensions = ['mp4', 'webm'];
    $panoExtensions = ['pano', 'PANO.jpg'];

    foreach ($files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        $filePath = $dir . $file;
        if (in_array($ext, array_merge($imageExtensions, $videoExtensions, $panoExtensions)) && !in_array($filePath, $displayed)) {
            $mediaPaths[] = $file;
        }
    }

    $totalImages = count($mediaPaths); // Total remaining images
    shuffle($mediaPaths); // Shuffle the media paths
    $mediaPaths = array_slice($mediaPaths, $offset, $limit); // Limit the number of items

    foreach ($mediaPaths as $src) {
        $ext = strtolower(pathinfo($src, PATHINFO_EXTENSION));
        if (in_array($ext, $imageExtensions)) {
            // Get image dimensions to determine if it's landscape
            $imageSize = @getimagesize($dir . $src);
            $isLandscape = $imageSize && $imageSize[0] > $imageSize[1]; // Width > Height
            $class = $isLandscape ? 'landscape' : '';
            // Output image with correct relative path for browser
            $webPath = $dir . $src;
            // Remove leading './' if present for browser compatibility
            if (substr($webPath, 0, 2) === './') $webPath = substr($webPath, 2);
            echo '<div class="media ' . $class . '">
                    <img src="' . htmlspecialchars($webPath) . '" alt="Image" onclick="openPreview(this)">
                  </div>';
        } elseif (in_array($ext, $videoExtensions)) {
            $webPath = $dir . $src;
            if (substr($webPath, 0, 2) === './') $webPath = substr($webPath, 2);
            echo '<div class="media"><video controls>
                <source src="' . htmlspecialchars($webPath) . '" type="video/mp4">
                Your browser does not support the video tag.
            </video></div>';
        } elseif (in_array($ext, $panoExtensions)) {
            $webPath = $dir . $src;
            if (substr($webPath, 0, 2) === './') $webPath = substr($webPath, 2);
            echo '<div class="media"><iframe src="' . htmlspecialchars($webPath) . '" frameborder="0" allowfullscreen></iframe></div>';
        }
    }
} else {
    echo '<p>Directory not found: ' . htmlspecialchars($dir) . '</p>';
}

// Ensure no extra output is sent
ob_end_flush();
?>