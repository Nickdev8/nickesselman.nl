<section class="stack gap-lg">
    <header class="section-header">
        <div>
            <p class="eyebrow">Index</p>
            <h1>Projects, events, and experiments</h1>
            <p>Filtered chaos: games, hardware, client work, and Hack Club adventures.</p>
        </div>
    </header>

    <div class="filter-bar" data-filter-root>
        <button class="chip active" data-filter="all">All</button>
        <?php foreach ($categories as $category): ?>
            <button class="chip" data-filter="<?= htmlspecialchars($category); ?>"><?= htmlspecialchars($category); ?></button>
        <?php endforeach; ?>
    </div>

    <div class="project-grid catalog">
        <?php foreach ($projects as $project): ?>
            <?php $groups = implode(',', $project['categories'] ?? []); ?>
            <article class="project-card" data-groups="<?= htmlspecialchars($groups); ?>">
                <div class="project-card-media">
                    <img src="/<?= htmlspecialchars($project['cover']); ?>" alt="<?= htmlspecialchars($project['title']); ?>">
                    <?php if (!empty($project['year'])): ?>
                        <span class="badge"><?= htmlspecialchars($project['year']); ?></span>
                    <?php endif; ?>
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
                    <a class="inline-link" href="<?= project_url($project['slug']); ?>">Dive deeper</a>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
