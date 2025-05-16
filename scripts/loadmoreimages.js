let offset = 0;
const limit = 20;

function loadMoreImages() {
    const grid = document.getElementById('imageGrid');
    const loadMoreButton = document.getElementById('loadMore');

    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'Loading...';

    fetch(`load_images.php?offset=${offset}&limit=${limit}`)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const newElements = parser.parseFromString(data, 'text/html').querySelectorAll('.media');
            newElements.forEach((element) => grid.appendChild(element));

            offset += limit; 

            if (newElements.length === 0) {
                loadMoreButton.remove();
            } else {
                loadMoreButton.disabled = false;
                loadMoreButton.textContent = 'Load More';
            }
        })
        .catch((error) => {
            console.error('Error loading images:', error);
            loadMoreButton.disabled = false;
            loadMoreButton.textContent = 'Load More';
        });
}