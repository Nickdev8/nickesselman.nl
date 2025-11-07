<?php
if (!empty($project['custom_view'])) {
    partial($project['custom_view'], ['project' => $project, 'related' => $related ?? []]);
    return;
}
?>

<section class="project-hero stack gap-md">
    <p class="eyebrow"><?= htmlspecialchars($project['subtitle'] ?? $project['title']); ?></p>
    <h1><?= htmlspecialchars($project['title']); ?></h1>
    <p class="project-description"><?= htmlspecialchars($project['description'] ?? $project['summary']); ?></p>
    <div class="project-meta">
        <?php if (!empty($project['year'])): ?>
            <span><?= htmlspecialchars($project['year']); ?></span>
        <?php endif; ?>
        <?php if (!empty($project['location'])): ?>
            <span><?= htmlspecialchars($project['location']); ?></span>
        <?php endif; ?>
        <?php if (!empty($project['status'])): ?>
            <span><?= htmlspecialchars($project['status']); ?></span>
        <?php endif; ?>
    </div>
    <?php if (!empty($project['links'])): ?>
        <div class="project-links">
            <?php foreach ($project['links'] as $link): ?>
                <a class="btn ghost" href="<?= htmlspecialchars($link['url']); ?>" target="_blank" rel="noopener">
                    <?= htmlspecialchars($link['label']); ?>
                </a>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<?php if (!empty($project['hero'])): ?>
    <div class="project-hero-media">
        <img src="/<?= htmlspecialchars($project['hero']); ?>" alt="<?= htmlspecialchars($project['title']); ?>" loading="lazy">
    </div>
<?php else: ?>
    <div class="project-hero-media">
        <img src="/<?= htmlspecialchars($project['cover']); ?>" alt="<?= htmlspecialchars($project['title']); ?>" loading="lazy">
    </div>
<?php endif; ?>

<?php if (!empty($project['stats'])): ?>
    <section class="stat-grid compact">
        <?php foreach ($project['stats'] as $stat): ?>
            <article class="stat-card">
                <p class="stat-label"><?= htmlspecialchars($stat['label']); ?></p>
                <p class="stat-value"><?= htmlspecialchars($stat['value']); ?></p>
            </article>
        <?php endforeach; ?>
    </section>
<?php endif; ?>

<?php if (!empty($project['sections'])): ?>
    <section class="project-sections">
        <?php foreach ($project['sections'] as $section): ?>
            <article class="project-section">
                <div>
                    <p class="eyebrow"><?= htmlspecialchars($section['heading']); ?></p>
                    <div><?= $section['body']; ?></div>
                </div>
                <?php if (!empty($section['media'])): ?>
                    <div class="project-media">
                        <?php foreach ($section['media'] as $media): ?>
                            <figure>
                                <img src="/<?= htmlspecialchars($media['src']); ?>" alt="<?= htmlspecialchars($media['alt'] ?? 'Project media'); ?>" loading="lazy">
                            </figure>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </section>
<?php endif; ?>

<?php if (!empty($project['gallery'])): ?>
    <section class="gallery-grid">
        <?php foreach ($project['gallery'] as $entry): ?>
            <figure>
                <img src="/<?= htmlspecialchars($entry['src']); ?>" alt="<?= htmlspecialchars($entry['alt'] ?? $project['title']); ?>" loading="lazy">
            </figure>
        <?php endforeach; ?>
    </section>
<?php endif; ?>

<?php if (!empty($related)): ?>
    <section class="stack gap-md">
        <header class="section-header">
            <div>
                <p class="eyebrow">Related</p>
                <h2>More in this vibe</h2>
            </div>
        </header>
        <div class="project-grid related">
            <?php foreach ($related as $item): ?>
                <article class="project-card">
                    <div class="project-card-media">
                        <img src="/<?= htmlspecialchars($item['cover']); ?>" alt="<?= htmlspecialchars($item['title']); ?>">
                    </div>
                    <div class="project-card-body">
                        <p class="eyebrow"><?= htmlspecialchars($item['subtitle'] ?? 'Project'); ?></p>
                        <h3><?= htmlspecialchars($item['title']); ?></h3>
                        <p><?= htmlspecialchars($item['summary']); ?></p>
                        <a class="inline-link" href="<?= project_url($item['slug']); ?>">Open project</a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
<?php endif; ?>
