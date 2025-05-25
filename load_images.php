<?php
// Ensure no output before headers
ob_start();

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 15;

$imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
$videoExtensions = ['mp4', 'webm'];
$panoExtensions = ['pano', 'PANO.jpg'];

// Use RecursiveDirectoryIterator to get all media in the images folder (and its subfolders)
$directory = './images';
$files = [];
$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory, FilesystemIterator::SKIP_DOTS));

foreach ($it as $file) {
    if ($file->isFile()) {
        // Calculate the relative path from the images folder.
        $relative = substr($file->getPathname(), strlen($directory) + 1);
        // Only include files that reside in a subfolder (relative path must contain a slash)
        if (strpos($relative, '/') === false) {
            continue;
        }
        $ext = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));
        if (in_array($ext, array_merge($imageExtensions, $videoExtensions, $panoExtensions))) {
            $files[] = $file->getPathname();
        }
    }
}

// Scramble the file order without altering images within each file.
shuffle($files);

$totalImages = count($files);
error_log("Total images: " . $totalImages); // Debug line
$mediaPaths = array_slice($files, $offset, $limit);

foreach ($mediaPaths as $filePath) {
    $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    $webPath = $filePath;
    if (substr($webPath, 0, 2) === './') {
        $webPath = substr($webPath, 2);
    }

    if (in_array($ext, $imageExtensions)) {
        $imageSize = @getimagesize($filePath);
        $isLandscape = $imageSize && $imageSize[0] > $imageSize[1];
        $class = $isLandscape ? 'landscape' : '';
        echo '<div data-aos="zoom-in" class="media ' . $class . '">
                <img src="' . htmlspecialchars($webPath) . '" alt="Image">
              </div>';
    } elseif (in_array($ext, $videoExtensions)) {
        echo '<div data-aos="zoom-in" class="media"><video controls>
            <source src="' . htmlspecialchars($webPath) . '" type="video/mp4">
            Your browser does not support the video tag.
        </video></div>';
    } elseif (in_array($ext, $panoExtensions)) {
        echo '<div data-aos="zoom-in" class="media"><iframe src="' . htmlspecialchars($webPath) . '" frameborder="0" allowfullscreen></iframe></div>';
    }
}

ob_end_flush();
?>

<img src="" alt="">