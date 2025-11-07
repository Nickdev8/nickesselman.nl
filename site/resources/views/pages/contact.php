<section class="contact-hero">
    <div>
        <p class="eyebrow">Let’s build something</p>
        <h1>Prefer voice notes, long emails, or code reviews? I’m in.</h1>
        <p><?= htmlspecialchars($note); ?></p>
    </div>
</section>

<section class="contact-grid" data-contact-list>
    <?php foreach ($channels as $channel): ?>
        <?php $isExternal = isset($channel['url']) && strpos($channel['url'], 'http') === 0; ?>
        <article class="contact-card" data-copy="<?= !empty($channel['copy']) ? htmlspecialchars($channel['value']) : ''; ?>">
            <p class="contact-label"><?= htmlspecialchars($channel['label']); ?></p>
            <a href="<?= htmlspecialchars($channel['url']); ?>" <?= $isExternal ? 'target="_blank" rel="noopener"' : ''; ?>>
                <?= htmlspecialchars($channel['value']); ?>
            </a>
            <?php if (!empty($channel['copy'])): ?>
                <button class="chip tiny" type="button">Copy</button>
            <?php endif; ?>
        </article>
    <?php endforeach; ?>
</section>

<section class="now-card">
    <div>
        <p class="eyebrow">Availability</p>
        <h2>Currently</h2>
        <p><?= htmlspecialchars($now['intro'] ?? ''); ?></p>
    </div>
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
