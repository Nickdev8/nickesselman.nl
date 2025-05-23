<?php
include_once 'adddata.php';
include_once 'basics.php';
?>
<?php if (!empty($selectedProject['blocks'])): ?>
    <?php foreach ($selectedProject['blocks'] as $block): ?>

        <?php
        $hasImage = !empty($block['image']);
        $hasTitle = !empty($block['title']);
        $hasSubtitle = !empty($block['subtitle']);
        $hasContent = !empty($block['content']);
        $isOnlyImage = $hasImage && !($hasTitle || $hasSubtitle || $hasContent);

        $wrapperClass = $isOnlyImage
            ? 'wide container separator img-wide'
            : 'card container separator';
        ?>

        <div class="<?= $wrapperClass ?>">

            <?php if (!$isOnlyImage): ?>
                <?php if ($hasTitle): ?>
                    <h2 class="headline"><?= htmlspecialchars($block['title']) ?></h2>
                <?php endif; ?>
                <?php if ($hasSubtitle): ?>
                    <h3 class="lead"><?= htmlspecialchars($block['subtitle']) ?></h3>
                <?php endif; ?>
            <?php endif; ?>

            <?php if (!$hasImage): ?>
                <div>
                    <?= $block['content'] ?? '' ?>
                </div>

            <?php else: ?>
                <?php
                $images = is_array($block['image'])
                    ? $block['image']
                    : [$block['image']];
                ?>

                <?php if ($isOnlyImage): ?>
                    <?php foreach ($images as $img): ?>
                        <img src="<?= htmlspecialchars($img) ?>" alt="" class="img-full">
                    <?php endforeach; ?>

                <?php else: ?>
                    <div class="split">
                        <div>
                            <?= $block['content'] ?? '' ?>
                        </div>
                        <div>
                            <?php foreach ($images as $img): ?>
                                <img src="<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($block['title'] ?? 'Block image') ?>"
                                    style="border-radius: 2rem;">
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endif; ?>

        </div>
    <?php endforeach; ?>
<?php endif; ?>