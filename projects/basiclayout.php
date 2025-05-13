<?php
$project = $_GET['project'] ?? null;
// Find the project in the $projects array
$selectedProject = null;
foreach ($projects as $proj) {
    if ($proj['link'] === $project) {
        $selectedProject = $proj;
        break;
    }
}
?>
<h1><?=$selectedProject['text1']?></h1>
<h1><?=$selectedProject['text2']?></h1>