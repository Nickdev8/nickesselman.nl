<?php
$navItems = [
    ['label' => 'Home', 'slug' => 'home'],
    ['label' => 'Projects', 'slug' => 'projects'],
    ['label' => 'About', 'slug' => 'about'],
    ['label' => 'Contact', 'slug' => 'contact'],
    ['label' => 'CV', 'slug' => 'cv'],
];

$current = $currentPage ?? 'home';
?>

<header class="site-header">
    <div class="nav-shell">
        <a href="<?= page_url('home'); ?>" class="brand">
            <span class="brand-kicker">Nick Esselman</span>
            <span class="brand-sub">builds playful software & hardware</span>
        </a>

        <button class="nav-toggle" data-nav-toggle aria-label="Toggle navigation">
            <span></span>
            <span></span>
        </button>

        <nav class="nav-links" data-open="false">
            <?php foreach ($navItems as $item): ?>
                <?php $isActive = $current === $item['slug']; ?>
                <a href="<?= page_url($item['slug']); ?>" class="<?= $isActive ? 'active' : ''; ?>">
                    <?= htmlspecialchars($item['label']); ?>
                </a>
            <?php endforeach; ?>
            <a href="https://blog.nickesselman.nl" target="_blank" rel="noopener" class="ghost-link">Live&nbsp;Blog</a>
            <a href="<?= page_url('contact'); ?>" class="pill">Say hi</a>
        </nav>
    </div>
</header>
