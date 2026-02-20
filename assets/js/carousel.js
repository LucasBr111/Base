/**
 * carousel.js — HERO SLIDER + CARRUSEL INSTALACIONES + TESTIMONIOS
 * ─────────────────────────────────────────────────────────────────────────────
 * HERO:          Slides con transición translate + fade de contenido interno
 * INSTALACIONES: Scroll horizontal drag/swipe
 * TESTIMONIOS:   Fade entre tarjetas con autoplay
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Carousel = (() => {

  /* ════════════════════════════════════════════════════
     HERO SLIDER
  ════════════════════════════════════════════════════ */

  function initHeroSlider() {
    var slider = document.querySelector('.hero-slider');
    if (!slider) return;

    var cfg   = SITE_CONFIG.hero;
    var total = cfg.slides.length;
    if (total <= 1) return;

    var current = 0;
    var timer   = null;
    var paused  = false;

    // Generar dots en el contenedor del hero
    var dotsContainer = document.querySelector('.hero-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (var d = 0; d < total; d++) {
        var dot = document.createElement('button');
        dot.className    = 'carousel-dot' + (d === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (d + 1));
        dot.setAttribute('aria-current', d === 0 ? 'true' : 'false');
        dotsContainer.appendChild(dot);
      }
    }

    function getInners() { return slider.querySelectorAll('.hero-slide-inner'); }
    function getDots()   { return dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : []; }

    function goTo(index) {
      var inners = getInners();
      var dots   = getDots();

      // Ocultar current
      if (inners[current]) {
        inners[current].style.opacity   = '0';
        inners[current].style.transform = 'translateY(20px)';
      }
      if (dots[current]) {
        dots[current].classList.remove('active');
        dots[current].setAttribute('aria-current', 'false');
      }

      current = ((index % total) + total) % total;

      // Mover el track
      slider.style.transform = 'translateX(-' + (current * 100) + '%)';

      // Revelar nuevo inner con delay (espera que el slide esté visible)
      setTimeout(function() {
        var inner = inners[current];
        if (inner) {
          inner.style.transitionDelay = '0s';
          inner.style.opacity         = '1';
          inner.style.transform       = 'none';
        }
      }, 120);

      // Actualizar dot
      if (dots[current]) {
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-current', 'true');
      }
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() {
      if (paused) return;
      timer = setInterval(next, cfg.autoplayInterval);
    }
    function stop() { clearInterval(timer); }

    // Botones flecha
    var btnNext = document.querySelector('.hero-arrow-next');
    var btnPrev = document.querySelector('.hero-arrow-prev');

    if (btnNext) btnNext.addEventListener('click', function() { stop(); next(); start(); });
    if (btnPrev) btnPrev.addEventListener('click', function() { stop(); prev(); start(); });

    // Dots click
    if (dotsContainer) {
      dotsContainer.addEventListener('click', function(e) {
        var dot = e.target.closest('.carousel-dot');
        if (!dot) return;
        var allDots = Array.from(getDots());
        var idx     = allDots.indexOf(dot);
        if (idx < 0) return;
        stop(); goTo(idx); start();
      });
    }

    // Swipe mobile
    setupSwipe(slider, function() { stop(); next(); start(); }, function() { stop(); prev(); start(); });

    // Teclado
    var heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft')  { stop(); prev(); start(); }
        if (e.key === 'ArrowRight') { stop(); next(); start(); }
      });
    }

    // Pausa en hover
    var hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('mouseenter', function() { paused = true; stop(); });
      hero.addEventListener('mouseleave', function() { paused = false; start(); });
      hero.addEventListener('focusin',    function() { paused = true; stop(); });
      hero.addEventListener('focusout',   function() { paused = false; start(); });
    }

    // Activar el primer inner (ya viene con clase active del injector)
    var firstInner = slider.querySelector('.hero-slide-inner');
    if (firstInner && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      firstInner.style.opacity   = '1';
      firstInner.style.transform = 'none';
    }

    // Iniciar autoplay
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      start();
    }
  }


  /* ════════════════════════════════════════════════════
     INSTALACIONES (carrusel scroll horizontal)
  ════════════════════════════════════════════════════ */

  function initInstallationsCarousel() {
    var track = document.querySelector('.installations-track');
    if (!track) return;

    var btnPrev = document.querySelector('.installations-prev');
    var btnNext = document.querySelector('.installations-next');
    var dots    = document.querySelector('.installations-dots');

    function cardWidth() {
      var card = track.querySelector('.zone-card');
      if (!card) return 320;
      var gap = parseInt(getComputedStyle(track).gap) || 16;
      return card.offsetWidth + gap;
    }

    function scrollBy(dir) {
      track.scrollBy({ left: dir * cardWidth(), behavior: 'smooth' });
    }

    if (btnPrev) btnPrev.addEventListener('click', function() { scrollBy(-1); });
    if (btnNext) btnNext.addEventListener('click', function() { scrollBy(1); });

    setupDrag(track);

    // Dots
    function buildDots() {
      if (!dots) return;
      var cards = track.querySelectorAll('.zone-card');
      var n     = cards.length;
      if (!n) return;

      dots.innerHTML = '';
      for (var i = 0; i < n; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Zona ' + (i + 1));
        dots.appendChild(dot);
      }

      track.addEventListener('scroll', function() {
        var active = Math.round(track.scrollLeft / cardWidth());
        var allDots = dots.querySelectorAll('.carousel-dot');
        allDots.forEach(function(d, i) { d.classList.toggle('active', i === active); });
      }, { passive: true });

      dots.addEventListener('click', function(e) {
        var dot = e.target.closest('.carousel-dot');
        if (!dot) return;
        var allDots = Array.from(dots.querySelectorAll('.carousel-dot'));
        var idx     = allDots.indexOf(dot);
        track.scrollTo({ left: idx * cardWidth(), behavior: 'smooth' });
      });
    }

    // Construir dots después de que el injector genere las cards
    document.addEventListener('configInjected', function() {
      requestAnimationFrame(buildDots);
    });
  }


  /* ════════════════════════════════════════════════════
     TESTIMONIOS (fade slider)
  ════════════════════════════════════════════════════ */

  function initTestimonialsCarousel() {
    function setup() {
      var track  = document.querySelector('.testimonials-track');
      var dots   = document.querySelector('.testimonials-dots');
      var btnP   = document.querySelector('.testimonials-prev');
      var btnN   = document.querySelector('.testimonials-next');

      if (!track) return;

      var cfg      = SITE_CONFIG.testimonials;
      var cards    = track.querySelectorAll('.testimonial-card');
      var total    = cards.length;
      var current  = 0;
      var timer    = null;

      if (total <= 1) return;

      // Generar dots
      if (dots) {
        dots.innerHTML = '';
        for (var i = 0; i < total; i++) {
          var dot = document.createElement('button');
          dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', 'Testimonio ' + (i + 1));
          dots.appendChild(dot);
        }
      }

      function go(idx) {
        var allCards = track.querySelectorAll('.testimonial-card');
        var allDots  = dots ? dots.querySelectorAll('.carousel-dot') : [];

        allCards[current].classList.remove('active');
        allCards[current].setAttribute('aria-hidden', 'true');
        if (allDots[current]) allDots[current].classList.remove('active');

        current = ((idx % total) + total) % total;

        allCards[current].classList.add('active');
        allCards[current].setAttribute('aria-hidden', 'false');
        if (allDots[current]) allDots[current].classList.add('active');
      }

      function start() { timer = setInterval(function() { go(current + 1); }, cfg.autoplayInterval); }
      function stop()  { clearInterval(timer); }

      if (btnP) btnP.addEventListener('click', function() { stop(); go(current - 1); start(); });
      if (btnN) btnN.addEventListener('click', function() { stop(); go(current + 1); start(); });

      if (dots) {
        dots.addEventListener('click', function(e) {
          var dot = e.target.closest('.carousel-dot');
          if (!dot) return;
          var allDots = Array.from(dots.querySelectorAll('.carousel-dot'));
          var idx     = allDots.indexOf(dot);
          stop(); go(idx); start();
        });
      }

      var section = document.getElementById('testimonials');
      if (section) {
        section.addEventListener('mouseenter', stop);
        section.addEventListener('mouseleave', start);
      }

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
    }

    document.addEventListener('configInjected', function() {
      requestAnimationFrame(setup);
    });
  }


  /* ════════════════════════════════════════════════════
     HELPERS
  ════════════════════════════════════════════════════ */

  function setupSwipe(el, onNext, onPrev) {
    var startX    = 0;
    var THRESHOLD = 50;

    el.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    el.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < THRESHOLD) return;
      diff > 0 ? onNext() : onPrev();
    }, { passive: true });
  }

  function setupDrag(track) {
    var isDown     = false;
    var startX     = 0;
    var scrollLeft = 0;

    track.addEventListener('mousedown', function(e) {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX     = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    document.addEventListener('mouseup', function() {
      isDown = false;
      track.style.cursor = '';
    });

    track.addEventListener('mouseleave', function() {
      isDown = false;
      track.style.cursor = '';
    });

    track.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      var x    = e.pageX - track.offsetLeft;
      var walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  }


  /* ─── Init ─── */
  function init() {
    document.addEventListener('configInjected', function() {
      requestAnimationFrame(function() {
        initHeroSlider();
        initInstallationsCarousel();
      });
    });

    initTestimonialsCarousel();
  }

  return { init: init };

})();