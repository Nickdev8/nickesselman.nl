const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.getAttribute('data-open') === 'true';
    navLinks.setAttribute('data-open', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      navLinks.setAttribute('data-open', 'false');
    }
  });
}

const filterRoot = document.querySelector('[data-filter-root]');
if (filterRoot) {
  filterRoot.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    const filter = button.getAttribute('data-filter');
    const cards = document.querySelectorAll('.project-card[data-groups]');

    filterRoot.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
    button.classList.add('active');

    cards.forEach((card) => {
      if (filter === 'all') {
        card.style.display = '';
        return;
      }

      const groups = (card.getAttribute('data-groups') || '').split(',').map((item) => item.trim());
      card.style.display = groups.includes(filter) ? '' : 'none';
    });
  });
}

const contactList = document.querySelector('[data-contact-list]');
if (contactList) {
  contactList.addEventListener('click', async (event) => {
    const card = event.target.closest('.contact-card[data-copy]');
    if (!card || !event.target.matches('button')) return;

    const text = card.getAttribute('data-copy');
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      event.target.textContent = 'Copied';
      setTimeout(() => (event.target.textContent = 'Copy'), 1600);
    } catch {
      event.target.textContent = 'Oops';
      setTimeout(() => (event.target.textContent = 'Copy'), 1600);
    }
  });
}

// Background glow now static; script retained for navigation/contact enhancements only.
