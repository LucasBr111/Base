/**
 * navbar.js — SMART NAVBAR
 * ─────────────────────────────────────────────────────────────────────────────
 * - Oculta el navbar al hacer scroll hacia abajo
 * - Lo muestra al hacer scroll hacia arriba
 * - Agrega clase .scrolled para cambio de fondo al pasar de 80px
 * - Maneja el menú hamburguesa en mobile
 * - Smooth scroll a las secciones
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Navbar = (() => {

  const SCROLL_THRESHOLD = 80;  // px desde top para agregar .scrolled
  const HIDE_OFFSET      = 120; // px scrolleados antes de ocultar

  let navbar, toggle, mobileMenu;
  let lastScrollY   = 0;
  let ticking       = false;
  let mobileOpen    = false;

  /* ─── Scroll handler ─── */
  function onScroll() {
    if (ticking) return;
    // requestAnimationFrame: limitar a 1 update por frame (performance)
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;

      // Clase .scrolled para fondo opaco
      navbar.classList.toggle('scrolled', currentY > SCROLL_THRESHOLD);

      // Hide/show: solo si scrolleamos más de HIDE_OFFSET desde top
      if (currentY > HIDE_OFFSET) {
        if (currentY > lastScrollY) {
          // Bajando → ocultar
          navbar.classList.add('hidden');
          // Cerrar el mobile menu si estaba abierto
          if (mobileOpen) closeMobileMenu();
        } else {
          // Subiendo → mostrar
          navbar.classList.remove('hidden');
        }
      } else {
        navbar.classList.remove('hidden');
      }

      lastScrollY = currentY;
      ticking     = false;
    });

    ticking = true;
  }

  /* ─── Mobile menu ─── */
  function openMobileMenu() {
    mobileOpen = true;
    mobileMenu.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    // Evitar scroll del body mientras el menu está abierto
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileOpen = false;
    mobileMenu.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    mobileOpen ? closeMobileMenu() : openMobileMenu();
  }

  /* ─── Smooth scroll ─── */
  function setupSmoothScroll() {
    // Todos los links internos con href="#algo"
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#' || id === '#whatsapp') return; // Casos especiales

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        // Cerrar menu mobile si está abierto
        if (mobileOpen) closeMobileMenu();

        // Calcular offset por navbar fijo
        const navH = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ─── Active link (Intersection) ─── */
  function setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.navbar-nav a');

    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  /* ─── Init ─── */
  function init() {
    navbar      = document.getElementById('navbar');
    toggle      = document.querySelector('.navbar-toggle');
    mobileMenu  = document.querySelector('.navbar-mobile-menu');

    if (!navbar) return;

    // Scroll con passive: true para performance
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toggle && mobileMenu) {
      toggle.addEventListener('click', toggleMobileMenu);

      // Cerrar menu al hacer click en links del menú mobile
      mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeMobileMenu();
      });

      // Cerrar con Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOpen) closeMobileMenu();
      });
    }

    setupSmoothScroll();
    setupActiveLinks();
  }

  return { init };

})();
