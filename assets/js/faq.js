/**
 * faq.js — ACORDEÓN ANIMADO
 * ─────────────────────────────────────────────────────────────────────────────
 * Abre/cierra ítems de FAQ con animación de max-height.
 * Solo un ítem abierto a la vez.
 * Compatible con keyboard navigation (Enter, Space).
 * ─────────────────────────────────────────────────────────────────────────────
 */

const FAQ = (() => {

  function init() {
    // Esperar a que el injector construya el acordeón
    document.addEventListener('configInjected', () => {
      requestAnimationFrame(setup);
    });

    // Por si el HTML ya tiene ítems estáticos
    setup();
  }

  function setup() {
    const list = document.querySelector('.faq-list');
    if (!list) return;

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-question');
      if (!btn) return;
      toggle(btn.closest('.faq-item'));
    });

    // Accesibilidad: teclado
    list.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const btn = e.target.closest('.faq-question');
      if (!btn) return;
      e.preventDefault();
      toggle(btn.closest('.faq-item'));
    });
  }

  function toggle(item) {
    const isOpen = item.classList.contains('open');
    const list   = item.closest('.faq-list');

    // Cerrar todos los abiertos
    list.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) close(openItem);
    });

    isOpen ? close(item) : open(item);
  }

  function open(item) {
    const answer = item.querySelector('.faq-answer');
    const btn    = item.querySelector('.faq-question');

    item.classList.add('open');
    btn?.setAttribute('aria-expanded', 'true');

    // Calcular la altura real del contenido para la animación max-height
    const inner = answer.querySelector('.faq-answer-inner');
    if (inner) {
      answer.style.maxHeight = inner.scrollHeight + 'px';
    }
  }

  function close(item) {
    const answer = item.querySelector('.faq-answer');
    const btn    = item.querySelector('.faq-question');

    item.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = '0';
  }

  return { init };

})();
