/**
 * scroll-reveal.js — SISTEMA DE ANIMACIONES POR SCROLL
 * ─────────────────────────────────────────────────────────────────────────────
 * Observa elementos con atributo data-reveal y aplica animaciones CSS
 * al entrar en viewport usando IntersectionObserver.
 *
 * USO EN HTML:
 *   <div data-reveal="up">                   → slide de abajo hacia arriba
 *   <div data-reveal="down">                 → slide de arriba hacia abajo
 *   <div data-reveal="left">                 → slide desde la izquierda
 *   <div data-reveal="right">                → slide desde la derecha
 *   <div data-reveal="fade">                 → fade in
 *   <div data-reveal="zoom">                 → scale desde 85%
 *   <div data-reveal="stagger">              → aplica delay incremental a hijos
 *
 * ATRIBUTOS ADICIONALES:
 *   data-reveal-delay="200"      → delay inicial en ms (default: 0)
 *   data-reveal-duration="600"   → duración en ms (default: 600)
 *   data-stagger-delay="100"     → delay entre hijos en stagger (default: 80)
 *
 * NOTA: Respeta prefers-reduced-motion — si el usuario lo activa, los
 *       elementos se muestran inmediatamente sin animación.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * scroll-reveal.js — ANIMACIONES BIDIRECCIONALES POR SCROLL
 * ─────────────────────────────────────────────────────────────────────────────
 * Elemento entra en viewport  → aparece (reveal)
 * Elemento sale del viewport  → desaparece (hide)
 *
 * Al hacer scroll hacia arriba los elementos "se van" igual que aparecieron.
 *
 * Tipos de data-reveal:
 *   up | down | left | right | fade | zoom | stagger
 *
 * Atributos opcionales:
 *   data-reveal-delay="200"      → ms de delay al aparecer
 *   data-reveal-duration="600"   → duración en ms
 *   data-stagger-delay="80"      → delay entre hijos (stagger)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ScrollReveal = (() => {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TRANSFORMS = {
    up:    'translateY(44px)',
    down:  'translateY(-44px)',
    left:  'translateX(-56px)',
    right: 'translateX(56px)',
    fade:  null,
    zoom:  'scale(0.85)',
  };

  function applyTransition(el, duration) {
    el.style.transitionProperty      = 'opacity, transform';
    el.style.transitionDuration      = duration + 'ms';
    el.style.transitionTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  function setHidden(el, type) {
    el.style.opacity   = '0';
    var t = TRANSFORMS[type];
    if (t) el.style.transform = t;
  }

  function setVisible(el, delay) {
    el.style.transitionDelay = delay + 'ms';
    el.style.opacity         = '1';
    el.style.transform       = 'none';
  }

  function setInvisible(el, type) {
    el.style.transitionDelay = '0ms';
    el.style.opacity         = '0';
    var t = TRANSFORMS[type];
    if (t) el.style.transform = t;
  }

  function staggerChildren(el, staggerDelay, duration, revealing) {
    var children = Array.from(el.querySelectorAll(':scope > *'));
    children.forEach(function(child, i) {
      var idx   = revealing ? i : (children.length - 1 - i);
      var delay = idx * staggerDelay;

      child.style.transitionProperty       = 'opacity, transform';
      child.style.transitionDuration       = duration + 'ms';
      child.style.transitionTimingFunction  = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      child.style.transitionDelay           = delay + 'ms';

      if (revealing) {
        child.style.opacity   = '1';
        child.style.transform = 'none';
      } else {
        child.style.opacity   = '0';
        child.style.transform = 'translateY(24px)';
      }
    });
  }

  function prepareElement(el) {
    var type     = el.getAttribute('data-reveal');
    var duration = parseInt(el.getAttribute('data-reveal-duration') || '600', 10);

    if (prefersReduced) { el.style.opacity = '1'; return; }

    applyTransition(el, duration);
    el.style.willChange = 'opacity, transform';

    if (type === 'stagger') {
      Array.from(el.querySelectorAll(':scope > *')).forEach(function(child) {
        child.style.transitionProperty       = 'opacity, transform';
        child.style.transitionDuration       = duration + 'ms';
        child.style.transitionTimingFunction  = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        child.style.opacity   = '0';
        child.style.transform = 'translateY(24px)';
        child.style.willChange = 'opacity, transform';
      });
    } else {
      setHidden(el, type);
    }
  }

  function createObserver() {
    return new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var el       = entry.target;
        var type     = el.getAttribute('data-reveal');
        var delay    = parseInt(el.getAttribute('data-reveal-delay')    || '0',   10);
        var duration = parseInt(el.getAttribute('data-reveal-duration') || '600', 10);
        var stagger  = parseInt(el.getAttribute('data-stagger-delay')   || '80',  10);

        if (entry.isIntersecting) {
          // REVELAR
          if (type === 'stagger') {
            staggerChildren(el, stagger, duration, true);
          } else {
            el.style.willChange = 'opacity, transform';
            setVisible(el, delay);
            setTimeout(function() { el.style.willChange = 'auto'; }, delay + duration + 100);
          }
        } else {
          // OCULTAR (bidireccional)
          if (prefersReduced) return;

          if (type === 'stagger') {
            staggerChildren(el, stagger, duration, false);
          } else {
            el.style.willChange = 'opacity, transform';
            setInvisible(el, type);
          }
        }
      });
    }, {
      threshold:  0,
      rootMargin: '0px 0px -6% 0px'
    });
  }

  function observeAll(observer) {
    document.querySelectorAll('[data-reveal]').forEach(function(el) {
      if (!el.getAttribute('data-reveal-ready')) {
        prepareElement(el);
        el.setAttribute('data-reveal-ready', 'true');
        observer.observe(el);
      }
    });
  }

  function init() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(function(el) {
        el.style.opacity   = '1';
        el.style.transform = 'none';
      });
      return;
    }

    var observer = createObserver();

    observeAll(observer);

    document.addEventListener('configInjected', function() {
      requestAnimationFrame(function() { observeAll(observer); });
    });

    var mutObs = new MutationObserver(function(mutations) {
      var hasNew = false;
      mutations.forEach(function(m) {
        m.addedNodes.forEach(function(node) {
          if (node.nodeType !== 1) return;
          if (node.getAttribute && node.getAttribute('data-reveal')) hasNew = true;
          if (node.querySelectorAll && node.querySelectorAll('[data-reveal]').length) hasNew = true;
        });
      });
      if (hasNew) requestAnimationFrame(function() { observeAll(observer); });
    });

    mutObs.observe(document.body, { childList: true, subtree: true });
  }

  return { init: init };

})();