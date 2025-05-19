<?php
include_once 'adddata.php';
include_once 'basics.php';
?>
<?php if (!empty($selectedProject['blocks'])): ?>
    <?php foreach ($selectedProject['blocks'] as $block): ?>
        <div class="card container separator">
            <?php if (!empty($block['title'])): ?>
                <h2 class="headline"><?= htmlspecialchars($block['title']) ?></h2>
            <?php endif; ?>
            <?php if (!empty($block['subtitle'])): ?>
                <h3 class="lead"><?= htmlspecialchars($block['subtitle']) ?></h3>
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