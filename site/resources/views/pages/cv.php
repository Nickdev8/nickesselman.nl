<section class="cv-hero">
    <div>
        <p class="eyebrow">Resume</p>
        <h1>Nick Esselman</h1>
        <p>Creative developer · Almere, NL · <?= years_since('2008-08-08'); ?> years old</p>
        <p>info@nickesselman.nl · github.com/Nickdev8 · linkedin.com/in/nick-esselman</p>
    </div>
    <img src="/images/me.png" alt="Nick Esselman" loading="lazy">
</section>

<section class="cv-grid">
    <article>
        <h2>Education</h2>
        <p><strong>Mediacollege Amsterdam</strong> - Software Development (2022 – present)</p>
        <p>Focus on full-stack web, .NET, and product thinking.</p>
    </article>
    <article>
        <h2>Experience</h2>
        <ul>
            <li>Freelance creative developer (web + Unity)</li>
            <li>Hack Club contributor & event participant</li>
            <li>Former bartender - honed hospitality & teamwork</li>
        </ul>
    </article>
    <article>
        <h2>Highlights</h2>
        <ul>
            <?php foreach ($highlightProjects as $project): ?>
                <li>
                    <strong><?= htmlspecialchars($project['title']); ?></strong> - <?= htmlspecialchars($project['summary']); ?> <a href="<?= project_url($project['slug']); ?>">→</a>
                </li>
            <?php endforeach; ?>
        </ul>
    </article>
    <article>
        <h2>Skills</h2>
        <div class="skills-columns">
            <?php foreach ($skills as $group): ?>
                <div>
                    <strong><?= htmlspecialchars($group['title']); ?></strong>
                    <p><?= htmlspecialchars(implode(', ', $group['items'])); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </article>
</section>

<section class="timeline-full">
    <header class="section-header">
        <div>
            <p class="eyebrow">Selected timeline</p>
            <h2>Milestones</h2>
        </div>
    </header>
    <div class="timeline-list full">
        <?php foreach ($timeline as $entry): ?>
            <article class="timeline-card">
                <p class="timeline-year"><?= htmlspecialchars($entry['year']); ?></p>
                <h3><?= htmlspecialchars($entry['title']); ?></h3>
                <p><?= htmlspecialchars($entry['summary']); ?></p>
            </article>
        <?php endforeach; ?>
    </div>
</section>
