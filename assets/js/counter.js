/**
 * counter.js — ANIMACIÓN DE CONTADORES NUMÉRICOS (bidireccional)
 * ─────────────────────────────────────────────────────────────────────────────
 * Al entrar en viewport: anima de 0 al valor final.
 * Al salir del viewport: resetea a 0 (para re-animar al volver a entrar).
 *
 * USO: <span data-counter="1200" data-suffix="+">1200+</span>
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Counter = (() => {

  var DURATION      = 1600;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el, target, suffix, isDecimal) {
    if (prefersReduced) {
      el.textContent = (isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString('es-PY')) + suffix;
      return;
    }

    var startTime = null;

    function frame(now) {
      if (!startTime) startTime = now;
      var progress = Math.min((now - startTime) / DURATION, 1);
      var value    = target * easeOut(progress);

      el.textContent = isDecimal
        ? value.toFixed(1) + suffix
        : Math.round(value).toLocaleString('es-PY') + suffix;

      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function init() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-counter]').forEach(function(el) {
        el.textContent = el.getAttribute('data-counter') + (el.getAttribute('data-suffix') || '');
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var el        = entry.target;
        var raw       = el.getAttribute('data-counter');
        var target    = parseFloat(raw);
        var suffix    = el.getAttribute('data-suffix') || '';
        var isDecimal = raw.indexOf('.') !== -1;

        if (entry.isIntersecting) {
          // Animar al entrar
          setTimeout(function() { animateCounter(el, target, suffix, isDecimal); }, 250);
        } else {
          // Resetear al salir para re-animar al volver
          if (!prefersReduced) {
            el.textContent = (isDecimal ? '0.0' : '0') + suffix;
          }
        }
      });
    }, { threshold: 0.5 });

    function observeCounters() {
      document.querySelectorAll('[data-counter]').forEach(function(el) {
        // Texto inicial = 0
        var suffix    = el.getAttribute('data-suffix') || '';
        var raw       = el.getAttribute('data-counter');
        var isDecimal = raw.indexOf('.') !== -1;
        if (!prefersReduced) {
          el.textContent = (isDecimal ? '0.0' : '0') + suffix;
        }
        observer.observe(el);
      });
    }

    observeCounters();
    document.addEventListener('configInjected', function() {
      requestAnimationFrame(observeCounters);
    });
  }

  return { init: init };

})();