<section class="now-page">
    <header class="section-header">
        <div>
            <p class="eyebrow">Now</p>
            <h1><?= htmlspecialchars($now['headline'] ?? 'Right now'); ?></h1>
            <p><?= htmlspecialchars($now['intro'] ?? ''); ?></p>
        </div>
    </header>

    <div class="now-list">
        <?php foreach (($now['items'] ?? []) as $item): ?>
            <article>
                <p class="now-label"><?= htmlspecialchars($item['label']); ?></p>
                <p><?= htmlspecialchars($item['detail']); ?></p>
            </article>
        <?php endforeach; ?>
    </div>
    <?php if (!empty($now['availability'])): ?>
        <p class="muted"><?= htmlspecialchars($now['availability']); ?></p>
    <?php endif; ?>
</section>
