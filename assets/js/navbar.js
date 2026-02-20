/**
 * navbar.js — SMART NAVBAR (estilo Eón: transparent → solid)
 * ─────────────────────────────────────────────────────────────────────────────
 * Comportamientos:
 *  - Transparente al top, sólido con backdrop al hacer scroll
 *  - Se oculta al scrollear hacia abajo, reaparece al subir
 *  - Modal dropdown en mobile (slide-down animado)
 *  - Cerrar modal al click fuera, al navegar o con Escape
 *  - Active link por IntersectionObserver
 *  - Smooth scroll con offset de navbar
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Navbar = (() => {

  /* ── Umbrales ── */
  const SOLID_THRESHOLD = 24;   // px: a partir de aquí se vuelve sólido
  const HIDE_OFFSET     = 100;  // px: mínimo scrolleado antes de ocultar

  /* ── Estado ── */
  let navbar, burger, modal;
  let lastScrollY = 0;
  let ticking     = false;
  let modalOpen   = false;

  /* ════════════════════════════════════════════════════
     SCROLL: transparent → solid + hide/show
  ════════════════════════════════════════════════════ */

  function onScroll() {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      const y = window.scrollY;

      /* transparent → solid */
      navbar.classList.toggle('solid', y > SOLID_THRESHOLD);

      /* hide / show */
      if (y > HIDE_OFFSET) {
        if (y > lastScrollY) {
          if (modalOpen) closeModal();      // cerrar modal al ocultar navbar
        } 
      }

      lastScrollY = y;
      ticking     = false;
    });

    ticking = true;
  }

  /* ════════════════════════════════════════════════════
     MODAL MOBILE
  ════════════════════════════════════════════════════ */

  function openModal() {
    modalOpen = true;
    modal.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOpen = false;
    modal.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleModal() {
    modalOpen ? closeModal() : openModal();
  }

  /* ════════════════════════════════════════════════════
     SMOOTH SCROLL
  ════════════════════════════════════════════════════ */

  function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href === '#' || href === '#whatsapp') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      if (modalOpen) closeModal();

      const navH = navbar ? navbar.offsetHeight : 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  /* ════════════════════════════════════════════════════
     ACTIVE LINK
  ════════════════════════════════════════════════════ */

  function setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const markActive = (id) => {
      document.querySelectorAll('.navbar-nav a, .navbar-modal-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) markActive(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => io.observe(s));
  }

  /* ════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════ */

  function init() {
    navbar = document.getElementById('navbar');
    burger = document.querySelector('.navbar-burger');
    modal  = document.querySelector('.navbar-modal');

    if (!navbar) return;

    /* Aplicar estado inicial (por si la página ya está scrolleada al cargar) */
    navbar.classList.toggle('solid', window.scrollY > SOLID_THRESHOLD);
    lastScrollY = window.scrollY;

    window.addEventListener('scroll', onScroll, { passive: true });

    /* Burger */
    if (burger && modal) {
      burger.addEventListener('click', (e) => { e.stopPropagation(); toggleModal(); });

      /* Cerrar al hacer click fuera del modal */
      document.addEventListener('click', (e) => {
        if (modalOpen && !modal.contains(e.target) && !burger.contains(e.target)) {
          closeModal();
        }
      });

      /* Cerrar al navegar dentro del modal */
      modal.addEventListener('click', (e) => {
        if (e.target.closest('a')) closeModal();
      });

      /* Escape */
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOpen) closeModal();
      });
    }

    setupSmoothScroll();

    /* Active links: espera a que el injector construya los links */
    document.addEventListener('configInjected', () => {
      requestAnimationFrame(setupActiveLinks);
    });
    /* Fallback si el DOM ya tiene links */
    setupActiveLinks();
  }

  return { init };

})();