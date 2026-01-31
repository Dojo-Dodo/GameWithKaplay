// Topbar search: toggle & live filter for cards
(() => {
  const searchWrap = document.getElementById('search');
  const toggle = searchWrap.querySelector('.search__toggle');
  const input = document.getElementById('site-search');
  const cards = Array.from(document.querySelectorAll('.card'));

  const setActive = (on) => {
    searchWrap.classList.toggle('search--active', on);
    toggle.setAttribute('aria-expanded', on ? 'true' : 'false');
  };

  // open/close on button
  toggle.addEventListener('click', () => {
    const next = !searchWrap.classList.contains('search--active');
    setActive(next);
    if (next) input.focus();
    else input.value = '';
    filter('');
  });

  // Keyboard shortcut: "/" focuses search (like many sites)
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    const typing = tag === 'INPUT' || tag === 'TEXTAREA';
    if (e.key === '/' && !typing) {
      e.preventDefault();
      setActive(true);
      input.focus();
    }
    if (e.key === 'Escape' && document.activeElement === input) {
      input.blur();
      setActive(false);
      input.value = '';
      filter('');
    }
  });

  // Filter cards by title/body
  const filter = (term) => {
    const q = term.trim().toLowerCase();
    cards.forEach((card) => {
      const hay = (card.dataset.title + ' ' + card.textContent).toLowerCase();
      card.style.display = hay.includes(q) ? '' : 'none';
    });
  };
  input.addEventListener('input', (e) => filter(e.target.value));
})();