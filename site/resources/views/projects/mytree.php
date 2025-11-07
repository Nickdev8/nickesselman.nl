<section class="project-hero stack gap-md">
    <p class="eyebrow"><?= htmlspecialchars($project['subtitle'] ?? $project['title']); ?></p>
    <h1><?= htmlspecialchars($project['title']); ?></h1>
    <p class="project-description"><?= htmlspecialchars($project['description']); ?></p>
    <p class="muted">Drag to explore the branches. Click a node to open its project when available.</p>
</section>

<div class="tree-wrapper">
    <canvas id="treeCanvas"></canvas>
    <div id="treeTooltip" class="tree-tooltip"></div>
</div>

<section class="project-sections">
    <article class="project-section">
        <div>
            <p class="eyebrow">Why</p>
            <p>I wanted a way to see every project as part of a living system. Each branch groups experiments, Hack Club trips, and school assignments so I can quickly explain how they connect.</p>
            <p>The tree data is plain JSON, so I can regenerate it whenever a new project ships.</p>
        </div>
    </article>
</section>

<?php if (!empty($related)): ?>
    <section class="stack gap-md">
        <header class="section-header">
            <div>
                <p class="eyebrow">Related</p>
                <h2>Explore these next</h2>
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

<script>
    const treeCanvas = document.getElementById('treeCanvas');
    const treeTooltip = document.getElementById('treeTooltip');
    const treeCtx = treeCanvas.getContext('2d');

    const treeData = {
        name: 'Projects',
        link: null,
        children: [
            { name: 'Hack Club', link: '<?= project_url('juice'); ?>', children: [
                { name: 'Juice', link: '<?= project_url('juice'); ?>', children: [] },
                { name: 'HighSeas', link: '<?= project_url('highseas'); ?>', children: [] },
            ]},
            { name: 'Games', link: null, children: [
                { name: 'Monkey Swing', link: '<?= project_url('monkeyswing'); ?>', children: [] },
                { name: 'PartyVR', link: '<?= project_url('partyvr'); ?>', children: [] },
                { name: 'Game Jams', link: '<?= project_url('gamejams'); ?>', children: [] },
            ]},
            { name: 'Hardware', link: null, children: [
                { name: 'HackPad', link: '<?= project_url('hackpad'); ?>', children: [] },
                { name: '3D Printing', link: '<?= project_url('3d-printing'); ?>', children: [] },
                { name: 'EcoNest', link: '<?= project_url('econest'); ?>', children: [] },
            ]},
            { name: 'Web', link: null, children: [
                { name: 'JazzDesign', link: '<?= project_url('jazzdesign'); ?>', children: [] },
                { name: 'Sticker Wall', link: '<?= project_url('stickers'); ?>', children: [] },
                { name: 'Minecraft Bot', link: '<?= project_url('dcmcbot'); ?>', children: [] },
            ]},
        ]
    };

    const CONFIG = {
        decay: 0.74,
        baseLength: 140,
        curve: 0.25,
        minRadius: 4,
    };

    let width = treeCanvas.width = treeCanvas.clientWidth;
    let height = treeCanvas.height = 520;
    let offsetX = width / 2;
    let offsetY = height - 40;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    function resizeCanvas() {
        width = treeCanvas.width = treeCanvas.clientWidth || treeCanvas.offsetWidth;
        height = treeCanvas.height = 520;
        drawTree();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawNode(node, x, y, angle, depth) {
        const length = CONFIG.baseLength * Math.pow(CONFIG.decay, depth);
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        const controlX = x + Math.cos(angle) * length * 0.5 + Math.sin(angle) * length * CONFIG.curve;
        const controlY = y + Math.sin(angle) * length * 0.5 - Math.cos(angle) * length * CONFIG.curve;

        treeCtx.strokeStyle = depth === 0 ? '#ff8c37' : 'rgba(255,255,255,0.8)';
        treeCtx.lineWidth = Math.max(1.5, 6 - depth);
        treeCtx.beginPath();
        treeCtx.moveTo(x, y);
        treeCtx.quadraticCurveTo(controlX, controlY, endX, endY);
        treeCtx.stroke();

        node._pos = { x: endX, y: endY };
        node._radius = CONFIG.minRadius + Math.max(0, 6 - depth);

        treeCtx.fillStyle = node.link ? '#ff8c37' : '#9da6ff';
        treeCtx.beginPath();
        treeCtx.arc(endX, endY, node._radius, 0, Math.PI * 2);
        treeCtx.fill();

        treeCtx.fillStyle = '#ffffff';
        treeCtx.font = '400 14px "Space Grotesk", sans-serif';
        treeCtx.textAlign = Math.cos(angle) > 0 ? 'left' : 'right';
        treeCtx.fillText(node.name, endX + (Math.cos(angle) > 0 ? 10 : -10), endY + 4);

        if (node.children) {
            const spread = Math.PI / (depth + 2.5);
            node.children.forEach((child, index) => {
                const childAngle = angle - spread / 2 + (index / Math.max(1, node.children.length - 1)) * spread;
                drawNode(child, endX, endY, childAngle, depth + 1);
            });
        }
    }

    function drawTree() {
        treeCtx.clearRect(0, 0, width, height);
        treeCtx.save();
        treeCtx.translate(offsetX, offsetY);
        drawNode(treeData, 0, 0, -Math.PI / 2, 0);
        treeCtx.restore();
    }

    drawTree();

    function findNode(node, position) {
        const dx = position.x - node._pos.x;
        const dy = position.y - node._pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= node._radius + 6) return node;
        if (!node.children) return null;
        for (const child of node.children) {
            const match = findNode(child, position);
            if (match) return match;
        }
        return null;
    }

    treeCanvas.addEventListener('mousedown', (event) => {
        isDragging = true;
        dragStart = { x: event.clientX - offsetX, y: event.clientY - offsetY };
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        treeTooltip.classList.remove('visible');
    });

    treeCanvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            offsetX = event.clientX - dragStart.x;
            offsetY = event.clientY - dragStart.y;
            drawTree();
            return;
        }

        const rect = treeCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left - offsetX;
        const y = event.clientY - rect.top - offsetY;
        const node = findNode(treeData, { x, y });

        if (node) {
            treeTooltip.textContent = node.name;
            treeTooltip.style.left = `${event.clientX + 12}px`;
            treeTooltip.style.top = `${event.clientY + 12}px`;
            treeTooltip.classList.add('visible');
        } else {
            treeTooltip.classList.remove('visible');
        }
    });

    treeCanvas.addEventListener('click', (event) => {
        const rect = treeCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left - offsetX;
        const y = event.clientY - rect.top - offsetY;
        const node = findNode(treeData, { x, y });

        if (node && node.link) {
            window.location.href = node.link;
        }
    });
</script>
