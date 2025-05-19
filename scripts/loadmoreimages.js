document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('imageGrid');
    const sentinel = document.getElementById('sentinel');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let offset = grid.children.length;
    const limit = 20;
    let loading = false;
    let allLoaded = false;

    function loadMoreImages(trigger = 'auto') {
        if (loading || allLoaded) return;
        loading = true;
        console.debug(`[Gallery] Loading more images (offset=${offset}, limit=${limit}, trigger=${trigger})`);
        fetch(`scripts/load_images.php?offset=${offset}&limit=${limit}`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const newMedia = doc.querySelectorAll('.media');
                if (newMedia.length === 0) {
                    allLoaded = true;
                    observer.disconnect();
                    loadMoreBtn.style.display = 'none';
                    console.debug('[Gallery] No more images to load.');
                    return;
                }
                newMedia.forEach(el => grid.appendChild(el));
                offset += newMedia.length;
                loading = false;
                console.debug(`[Gallery] Loaded ${newMedia.length} images, new offset: ${offset}`);
                // Hide button if all loaded
                if (newMedia.length < limit) {
                    allLoaded = true;
                    observer.disconnect();
                    loadMoreBtn.style.display = 'none';
                    console.debug('[Gallery] All images loaded (less than limit returned).');
                }
            })
            .catch(err => {
                console.error('[Gallery] Error loading images:', err);
                loading = false;
            });
    }

    // Button click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => loadMoreImages('button'));
    }

    // IntersectionObserver for infinite scroll
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            console.debug('[Gallery] Sentinel is visible, triggering auto load.');
            loadMoreImages('auto');
        }
    });

    observer.observe(sentinel);
});