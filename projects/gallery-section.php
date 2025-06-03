<?php
// ─── A. SERVER-SIDE “load_images” LOGIC ────────────────────────────────────────
// (Same as before, wrapped in a function so it can also respond to ?offset=…)
$imageExtensions = ['jpg','jpeg','png','gif'];
$videoExtensions = ['mp4','webm'];
$panoExtensions   = ['pano','PANO.jpg'];
$baseDirectory    = './images';

function outputMedia(int $offset, int $limit): void {
    global $baseDirectory, $imageExtensions, $videoExtensions, $panoExtensions;

    $files = [];
    $it = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($baseDirectory, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($it as $file) {
        if (! $file->isFile()) continue;

        // Only include files in a subfolder of “./images”
        $relative = substr($file->getPathname(), strlen($baseDirectory) + 1);
        if (strpos($relative, '/') === false) continue;

        $ext = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));
        if (
            in_array($ext, $imageExtensions, true) ||
            in_array($ext, $videoExtensions, true) ||
            in_array($ext, $panoExtensions,  true)
        ) {
            $files[] = $file->getPathname();
        }
    }

    shuffle($files);
    $mediaSlice = array_slice($files, $offset, $limit);

    foreach ($mediaSlice as $filePath) {
        $ext        = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $webPath    = $filePath;
        if (strpos($webPath, './') === 0) {
            $webPath = substr($webPath, 2);
        }
        $webPathEsc = htmlspecialchars($webPath, ENT_QUOTES);

        if (in_array($ext, $imageExtensions, true)) {
            $imageSize   = @getimagesize($filePath);
            $isLandscape = $imageSize && ($imageSize[0] > $imageSize[1]);
            $class       = $isLandscape ? 'landscape' : '';
            echo <<<HTML
<div data-aos="zoom-in" class="physics media {$class}">
    <img src="{$webPathEsc}" alt="Image">
</div>
HTML;
        }
        elseif (in_array($ext, $videoExtensions, true)) {
            echo <<<HTML
<div data-aos="zoom-in" class="physics media">
    <video controls>
        <source src="{$webPathEsc}" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
HTML;
        }
        elseif (in_array($ext, $panoExtensions, true)) {
            echo <<<HTML
<div data-aos="zoom-in" class="physics media">
    <iframe src="{$webPathEsc}" frameborder="0" allowfullscreen></iframe>
</div>
HTML;
        }
    }
}

// ─── B. AJAX RESPONDER ──────────────────────────────────────────────────────────
if (isset($_GET['offset'])) {
    $offset = intval($_GET['offset']);
    $limit  = isset($_GET['limit']) ? intval($_GET['limit']) : 15;
    outputMedia($offset, $limit);
    exit;
}

// ─── C. INITIAL GALLERY MARKUP (offset=0, limit=10) ─────────────────────────────
?>
<div class="card wide objectToMoreToTheBackClasses container separator" data-aos="fade-up">
    <h2 class="headline">More images</h2>
    <div class="grid" id="imageGrid">
        <?php
        // On first page load, show the first 10 media items:
        outputMedia(0, 10);
        ?>
    </div>

    <button id="loadMoreBtn" class="btn" style="display: block; margin: 1em auto;">
        Load More
    </button>
    <div id="sentinel" style="height: 1px;"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    // ─── 1. EXCLUDE DIRECTORIES (if needed) ───────────────────────────────────
    const excludedDirs = [
        '/images/innerprojects/stickers/',
        // '/images/another/folder/to/exclude/',
    ];
    function isInExcludedDir(imgSrc) {
        return excludedDirs.some(dir => imgSrc.startsWith(dir));
    }

    // ─── 2. CACHE DOM NODES & STATE ────────────────────────────────────────────
    const grid        = document.getElementById('imageGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    let offset    = grid.querySelectorAll('.media').length; // should be 10 initially
    const limit   = 10;
    let isLoading = false;

    // ─── 3. FETCH NEXT BATCH ───────────────────────────────────────────────────
    function loadMoreImages(trigger = 'button') {
        if (isLoading) return;
        isLoading = true;

        console.debug(`[Gallery] Loading more (offset=${offset}, limit=${limit}, trigger=${trigger})`);

        // Call THIS SAME FILE with ?offset=…&limit=…
        fetch(`<?php echo basename(__FILE__); ?>?offset=${offset}&limit=${limit}`)
            .then(resp => resp.text())
            .then(htmlString => {
                const parser = new DOMParser();
                const doc    = parser.parseFromString(htmlString, 'text/html');
                const newItems = Array.from(doc.querySelectorAll('.media'));

                let addedCount = 0;
                newItems.forEach(item => {
                    const img = item.querySelector('img');
                    if (img) {
                        const src = img.getAttribute('src') || '';
                        if (isInExcludedDir(src)) {
                            return; // skip if it’s in an excluded folder
                        }
                    }
                    grid.appendChild(item);
                    addedCount++;
                });

                offset += addedCount;
                isLoading = false;
                console.debug(`[Gallery] Appended ${addedCount} items, new offset = ${offset}`);
            })
            .catch(err => {
                console.error('[Gallery] Error loading images:', err);
                isLoading = false;
            });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => loadMoreImages('button'));
    }

    // ─── 4. MODAL SETUP (identical to before) ───────────────────────────────────
    function setupModal() {
        const modal    = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        const closeBtn = document.getElementById('modalClose');
        if (!modal || !modalImg || !closeBtn) return;

        grid.addEventListener('click', e => {
            const target = e.target;
            if (target.tagName !== 'IMG') return;
            if (!target.closest('.media')) return;

            modal.style.display = 'flex';
            modalImg.src = target.src;
            modalImg.alt = target.alt || '';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        document.addEventListener('keydown', e => {
            const isOpen = modal.style.display !== 'none';
            if (isOpen && (e.key === 'Escape' || e.key === 'Esc')) {
                modal.style.display = 'none';
            }
        });
    }

    setupModal();
});
</script>
