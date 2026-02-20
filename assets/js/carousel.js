/**
 * carousel.js — Sistema Unificado de Carruseles
 */

const Carousel = (() => {

  /* ════════════════════════════════════════════════════
      1. HERO SLIDER (Desplazamiento Lateral)
  ════════════════════════════════════════════════════ */
  function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    const dotsContainer = document.querySelector('.hero-dots');
    if (!slider) return;

    const cfg = SITE_CONFIG.hero;
    const total = cfg.slides.length;
    let current = 0;
    let timer = null;

    // Generar Dots
    if (dotsContainer) {
      dotsContainer.innerHTML = cfg.slides.map((_, i) => 
        `<button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i+1}"></button>`
      ).join('');
    }

    function goTo(index) {
      const contents = slider.querySelectorAll('.hero-slide-content');
      const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

      // Limpiar activos
      contents.forEach(c => c.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      current = (index + total) % total;

      // Mover el track
      slider.style.transform = `translateX(-${current * 100}%)`;

      // Activar nuevo
      if (contents[current]) contents[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    // Controles
    const btnNext = document.querySelector('.hero-arrow-next');
    const btnPrev = document.querySelector('.hero-arrow-prev');

    if (btnNext) btnNext.onclick = () => { stop(); goTo(current + 1); start(); };
    if (btnPrev) btnPrev.onclick = () => { stop(); goTo(current - 1); start(); };

    if (dotsContainer) {
      dotsContainer.onclick = (e) => {
        const dot = e.target.closest('.dot');
        if (dot) { stop(); goTo(parseInt(dot.dataset.index)); start(); }
      };
    }

    function start() { timer = setInterval(() => goTo(current + 1), cfg.autoplayInterval); }
    function stop() { clearInterval(timer); }

    start();
  }

  /* ════════════════════════════════════════════════════
      2. INSTALACIONES (Scroll Horizontal con Drag)
  ════════════════════════════════════════════════════ */
  function initInstallations() {
    const track = document.querySelector('.installations-track');
    if (!track) return;

    const btnPrev = document.querySelector('.installations-prev');
    const btnNext = document.querySelector('.installations-next');

    const getCardWidth = () => {
      const card = track.querySelector('.zone-card');
      if (!card) return 300;
      const gap = parseInt(getComputedStyle(track).gap) || 20;
      return card.offsetWidth + gap;
    };

    if (btnNext) btnNext.onclick = () => track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    if (btnPrev) btnPrev.onclick = () => track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });

    // Drag simple para mouse
    let isDown = false;
    let startX;
    let scrollLeft;

    track.onmousedown = (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    track.onmouseleave = () => isDown = false;
    track.onmouseup = () => isDown = false;
    track.onmousemove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollLeft - walk;
    };
  }

  /* ════════════════════════════════════════════════════
      3. TESTIMONIOS (Fade entre tarjetas)
  ════════════════════════════════════════════════════ */
  function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonials-dots');
    if (cards.length <= 1) return;

    let current = 0;
    const total = cards.length;

    function go(idx) {
      cards.forEach(c => c.classList.remove('active'));
      const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
      dots.forEach(d => d.classList.remove('active'));

      current = (idx + total) % total;
      cards[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = Array.from(cards).map((_, i) => 
        `<button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`
      ).join('');

      dotsContainer.onclick = (e) => {
        const dot = e.target.closest('.dot');
        if (dot) go(parseInt(dot.dataset.index));
      };
    }

    // Autoplay simple
    setInterval(() => go(current + 1), SITE_CONFIG.testimonials?.autoplayInterval || 5000);
  }

  /* ════════════════════════════════════════════════════
      INICIALIZACIÓN ORQUESTADA
  ════════════════════════════════════════════════════ */
  function init() {
    // Escuchamos el evento que lanza tu inyector de HTML
    document.addEventListener('configInjected', () => {
      // Usamos un pequeño delay para asegurar que el DOM se renderizó
      setTimeout(() => {
        initHeroSlider();
        initInstallations();
        initTestimonials();
      }, 50);
    });
  }

  return { init };
})();

// Ejecutar
Carousel.init();