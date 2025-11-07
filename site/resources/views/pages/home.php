<section class="hero">
    <p class="eyebrow">Creative developer · Amsterdam</p>
    <h1>
        I build playful<span class="accent"> software</span>,
        curious <span class="accent">hardware</span>,
        and document the journey.
    </h1>
    <p class="lede">
        From Hack Club residencies to late-night Unity jams, I love shipping experiments that feel handcrafted.
        This space tracks what I’m building, learning, and obsessing over.
    </p>
    <div class="hero-actions">
        <a class="btn primary" href="<?= page_url('projects'); ?>">Browse projects</a>
        <a class="btn ghost" href="<?= page_url('contact'); ?>">Get in touch</a>
    </div>
</section>

<section class="stat-grid">
    <?php foreach ($stats as $stat): ?>
        <article class="stat-card">
            <p class="stat-value"><?= htmlspecialchars($stat['value']); ?></p>
            <p class="stat-label"><?= htmlspecialchars($stat['label']); ?></p>
            <?php if (!empty($stat['hint'])): ?>
                <p class="stat-hint"><?= htmlspecialchars($stat['hint']); ?></p>
            <?php endif; ?>
        </article>
    <?php endforeach; ?>
</section>

<section class="stack gap-lg">
    <header class="section-header">
        <div>
            <p class="eyebrow">Highlights</p>
            <h2>Featured work</h2>
        </div>
        <a class="inline-link" href="<?= page_url('projects'); ?>">View all projects →</a>
    </header>

    <div class="project-grid">
        <?php foreach ($featured as $project): ?>
            <article class="project-card">
                <div class="project-card-media">
                    <img src="/<?= htmlspecialchars($project['cover']); ?>" alt="<?= htmlspecialchars($project['title']); ?>">
                </div>
                <div class="project-card-body">
                    <p class="eyebrow"><?= htmlspecialchars($project['subtitle'] ?? $project['title']); ?></p>
                    <h3><?= htmlspecialchars($project['title']); ?></h3>
                    <p><?= htmlspecialchars($project['summary']); ?></p>
                    <div class="tags">
                        <?php foreach ($project['categories'] ?? [] as $tag): ?>
                            <span><?= htmlspecialchars($tag); ?></span>
                        <?php endforeach; ?>
                    </div>
                    <a class="inline-link" href="<?= project_url($project['slug']); ?>">Read the case study</a>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="now-card">
    <div>
        <p class="eyebrow">Now</p>
        <h2><?= htmlspecialchars($now['headline'] ?? 'Right now'); ?></h2>
        <p><?= htmlspecialchars($now['intro'] ?? ''); ?></p>
    </div>
    <div class="now-list">
        <?php foreach (($now['items'] ?? []) as $item): ?>
            <article>
                <p class="now-label"><?= htmlspecialchars($item['label']); ?></p>
                <p><?= htmlspecialchars($item['detail']); ?></p>
            </article>
        <?php endforeach; ?>
        <?php if (!empty($now['availability'])): ?>
            <div class="now-availability">
                <p class="now-label">Availability</p>
                <p><?= htmlspecialchars($now['availability']); ?></p>
            </div>
        <?php endif; ?>
    </div>
    <a class="inline-link" href="<?= page_url('now'); ?>">Full now page →</a>
</section>

<section class="timeline-preview">
    <div class="section-header">
        <div>
            <p class="eyebrow">Timeline</p>
            <h2>Recent checkpoints</h2>
        </div>
        <a class="inline-link" href="<?= page_url('about'); ?>">Full story →</a>
    </div>
    <div class="timeline-list">
        <?php foreach ($timeline as $entry): ?>
            <article class="timeline-card">
                <p class="timeline-year"><?= htmlspecialchars($entry['year']); ?></p>
                <h3><?= htmlspecialchars($entry['title']); ?></h3>
                <p><?= htmlspecialchars($entry['summary']); ?></p>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="cta-card">
    <div>
        <h2>Have an idea I should hear about?</h2>
        <p>I love teaming up on playful experiments, fast prototypes, and hardware storytelling.</p>
    </div>
    <a class="btn primary" href="<?= page_url('contact'); ?>">Start a convo</a>
</section>
