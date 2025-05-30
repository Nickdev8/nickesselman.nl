document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('imageGrid')) return;
    const grid = document.getElementById('imageGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let offset = grid.querySelectorAll('.media').length;
    const limit = 10;
    let loading = false;

    function loadMoreImages(trigger = 'button') {
        if (loading) return;
        loading = true;
        console.debug(`[Gallery] Loading more images (offset=${offset}, limit=${limit}, trigger=${trigger})`);
        // Removed the unused "dir" parameter here
        fetch(`load_images.php?offset=${offset}&limit=${limit}`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const newMedia = doc.querySelectorAll('.media');
                newMedia.forEach(el => grid.appendChild(el));
                offset += newMedia.length;
                loading = false;
                console.debug(`[Gallery] Loaded ${newMedia.length} images, new offset: ${offset}`);
            })
            .catch(err => {
                console.error('[Gallery] Error loading images:', err);
                loading = false;
            });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => loadMoreImages('button'));
    }

    // Modal logic remains unchanged
    function setupModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        const closeBtn = document.getElementById('modalClose');

        document.getElementById('imageGrid').addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG' && e.target.closest('.media')) {
                modal.style.display = 'flex';
                modalImg.src = e.target.src;
                modalImg.alt = e.target.alt || '';
            }
        });

        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
        document.addEventListener('keydown', (e) => {
            if (modal.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) {
                modal.style.display = 'none';
            }
        });
    }

    setupModal();
});