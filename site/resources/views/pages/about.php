<section class="section stack gap-lg">
    <div class="about-hero">
        <div>
            <p class="eyebrow">Hi, I’m Nick</p>
            <h1>Creative developer, Hack Clubber, and playful systems nerd.</h1>
            <p>
                I taught myself to code when I was nine by breaking WordPress themes and rebuilding them from scratch.
                Today I balance school at Mediacollege Amsterdam with Hack Club adventures, Unity experiments,
                and contract work for small studios.
            </p>
            <p>
                My favourite projects mix storytelling with tech — VR parties, interactive trees, or custom hardware that
                ships with a narrative. Community keeps me accountable, so I document everything publicly.
            </p>
            <div class="about-actions">
                <a class="btn primary" href="<?= page_url('projects'); ?>">See projects</a>
                <a class="btn ghost" href="<?= page_url('contact'); ?>">Start a collab</a>
            </div>
        </div>
        <div class="about-card">
            <img src="/images/me.png" alt="Nick Esselman" loading="lazy">
            <p class="caption">Always collecting field notes + stickers.</p>
        </div>
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

<section class="skills-grid">
    <header class="section-header">
        <div>
            <p class="eyebrow">Tools of the trade</p>
            <h2>What I reach for</h2>
        </div>
    </header>
    <div class="skills-columns">
        <?php foreach ($skills as $group): ?>
            <article>
                <h3><?= htmlspecialchars($group['title']); ?></h3>
                <ul>
                    <?php foreach ($group['items'] as $item): ?>
                        <li><?= htmlspecialchars($item); ?></li>
                    <?php endforeach; ?>
                </ul>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="timeline-full">
    <header class="section-header">
        <div>
            <p class="eyebrow">Timeline</p>
            <h2>How I got here</h2>
        </div>
    </header>
    <div class="timeline-list full">
        <?php foreach ($timeline as $entry): ?>
            <article class="timeline-card">
                <p class="timeline-year"><?= htmlspecialchars($entry['year']); ?></p>
                <h3><?= htmlspecialchars($entry['title']); ?></h3>
                <p><?= htmlspecialchars($entry['summary']); ?></p>
                <p class="muted"><?= htmlspecialchars($entry['details']); ?></p>
                <?php if (!empty($entry['tags'])): ?>
                    <div class="tags">
                        <?php foreach ($entry['tags'] as $tag): ?>
                            <span><?= htmlspecialchars($tag); ?></span>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </div>
</section>
