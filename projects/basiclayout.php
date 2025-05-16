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
if (!$selectedProject) {
    echo "<h1>Project not found</h1>";
    return;
}
?>
<div class="container separator">
    <h1><?= htmlspecialchars($selectedProject['title']) ?></h1>
    <p><?= htmlspecialchars($selectedProject['description']) ?></p>
</div>
<?php if (!empty($selectedProject['blocks'])): ?>
    <?php foreach ($selectedProject['blocks'] as $block): ?>
        <div class="card container separator">
            <?php if (!empty($block['title'])): ?>
                <h2 class="headline"><?= htmlspecialchars($block['title']) ?></h2>
            <?php endif; ?>
            <?php if (!empty($block['subtitle'])): ?>
                <h3 class="subheadline"><?= htmlspecialchars($block['subtitle']) ?></h3>
            <?php endif; ?>
            <?php if (!empty($block['image'])): ?>
                <div class="split">
                    <div>
                        <?= $block['content'] ?? '' ?>
                    </div>
                    <div>
                        <img src="<?= htmlspecialchars($block['image']) ?>"
                             alt="<?= htmlspecialchars($block['title'] ?? 'Block image') ?>"
                             class="img-cropped">
                    </div>
                </div>
            <?php else: ?>
                <div>
                    <?= $block['content'] ?? '' ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
<?php endif; ?>