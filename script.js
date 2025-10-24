document.addEventListener('DOMContentLoaded', () => {
  // Intro / стартове вікно
  const intro = document.getElementById('intro');
  const startBtn = document.getElementById('startBtn');
  const site = document.getElementById('siteContent');

  function openSite() {
    if (!intro || !site) return;
    // ховаємо intro (доступність + клас для анімації)
    intro.setAttribute('aria-hidden', 'true');
    intro.classList.add('hidden');
    // після анімації прибираємо з потоку сторінки
    setTimeout(() => { intro.style.display = 'none'; }, 300);
    // показуємо основний вміст
    site.setAttribute('aria-hidden', 'false');
    // фокус на перший фокусований елемент сайту
    const first = site.querySelector('a, button, [tabindex]') || site;
    if (first && typeof first.focus === 'function') first.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startBtn?.addEventListener('click', openSite);
  startBtn?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openSite(); });

  // Якщо потрібно одразу відкривати сайт (наприклад тест), можна використовувати хеш
  if (location.hash === '#open') openSite();

  // Nav toggle for mobile
  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('navToggle');
  btn?.addEventListener('click', () => nav.classList.toggle('show'));

  // Gallery modal
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  document.getElementById('galleryGrid')?.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const full = img.dataset.full || img.src;
    modalImg.src = full;
    modalImg.alt = img.alt || '';
    modalCaption.textContent = img.alt || '';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
});