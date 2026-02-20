/**
 * main.js — ENTRY POINT
 * ─────────────────────────────────────────────────────────────────────────────
 * Importa y coordina todos los módulos.
 * Orden de inicialización optimizado para performance:
 *
 *  1. ConfigInjector  → Crítico: construye el DOM desde SITE_CONFIG
 *  2. Navbar          → Crítico: above-the-fold, interacción inmediata
 *  3. ScrollReveal    → Crítico: debe registrar observers antes de scroll
 *  4. Carousel        → Above-the-fold (hero)
 *  5. Counter         → Below-the-fold, diferido
 *  6. FAQ             → Below-the-fold, diferido
 *  7. WhatsApp        → Non-blocking, diferido con delay propio
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * NOTA: Este proyecto usa módulos en ES5-compatible (IIFEs), no ES Modules,
 * para máxima compatibilidad sin bundler. Los scripts se cargan en orden
 * en el HTML con defer.
 */

(function () {
  'use strict';

  /* ── Verificar que SITE_CONFIG existe ── */
  if (typeof SITE_CONFIG === 'undefined') {
    console.error(
      '[APEX] SITE_CONFIG no encontrado. ' +
      'Asegurate de cargar config/site-config.js antes de main.js.'
    );
    return;
  }

  /* ── Función de init principal ── */
  function init() {
    // Fase 1: Crítico (ejecutar sincrónicamente en DOMContentLoaded)
    ConfigInjector.init();
    Navbar.init();
    ScrollReveal.init();

    // Fase 2: Interacción (primer frame tras el render)
    requestAnimationFrame(() => {
      Carousel.init();
    });

    // Fase 3: Diferido (no bloquea interactividad)
    // Usamos setTimeout para darle prioridad al LCP y TTI
    setTimeout(() => {
      Counter.init();
      FAQ.init();
      WhatsApp.init();
    }, 0);
  }

  /* ── Ejecutar cuando el DOM esté listo ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM ya cargado (por defer en script tag)
    init();
  }

  /* ── Helper global para debug ── */
  if (typeof window !== 'undefined') {
    window.__APEX_VERSION__ = '1.0.0';
    window.__APEX_CONFIG__  = SITE_CONFIG; // Acceso fácil desde devtools
  }

})();
