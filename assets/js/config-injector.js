/**
 * config-injector.js — CEREBRO DE LA PLANTILLA
 * ─────────────────────────────────────────────────────────────────────────────
 * Lee SITE_CONFIG e inyecta todo el contenido en el DOM.
 * SIN este módulo el sitio queda vacío.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ConfigInjector = (() => {

  /* ──────────────────────────────────────────────────
     1. TEMA VISUAL → :root
  ────────────────────────────────────────────────── */
  function applyTheme() {
    const theme = SITE_CONFIG.theme;
    // Convierte camelCase a kebab-case con prefijo --
    // e.g. colorBg → --color-bg
    Object.entries(theme).forEach(([key, value]) => {
      const cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      document.documentElement.style.setProperty(cssVar, value);
    });
  }


  /* ──────────────────────────────────────────────────
     2. SEO DINÁMICO → <head>
  ────────────────────────────────────────────────── */
  function injectSEO() {
    const { seo, brand } = SITE_CONFIG;

    // Title
    document.title = seo.title;

    // Meta description
    setMeta('description', seo.description);
    setMeta('keywords', seo.keywords);
    setMeta('robots', 'index, follow');

    // Open Graph
    setOG('og:type',        'website');
    setOG('og:url',          seo.canonical);
    setOG('og:title',        seo.title);
    setOG('og:description',  seo.description);
    setOG('og:image',        seo.canonical + '/' + seo.ogImage);
    setOG('og:locale',       'es_ES');

    // Twitter Card
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:title',        seo.title);
    setMeta('twitter:description',  seo.description);
    setMeta('twitter:image',        seo.canonical + '/' + seo.ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;

    // Schema: LocalBusiness
    injectSchema(buildLocalBusinessSchema());

    // Schema: FAQPage
    injectSchema(buildFAQSchema());
  }

  function setMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.appendChild(el);
    }
    el.content = content;
  }

  function setOG(property, content) {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.content = content;
  }

  function injectSchema(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  function buildLocalBusinessSchema() {
    const { brand, seo } = SITE_CONFIG;
    return {
      "@context":        "https://schema.org",
      "@type":           "SportsActivityLocation",
      "name":            brand.name,
      "description":     seo.description,
      "url":             seo.canonical,
      "telephone":       '+' + brand.whatsapp,
      "address": {
        "@type":           "PostalAddress",
        "streetAddress":   brand.address,
        "addressLocality": brand.city,
        "addressCountry":  brand.country
      },
      "geo": {
        "@type": "GeoCoordinates"
        // Opcional: agregar latitude/longitude en config
      },
      "openingHoursSpecification": brand.hours.map(h => ({
        "@type": "OpeningHoursSpecification",
        "name":  h.day,
        "description": h.time
      })),
      "aggregateRating": {
        "@type":       "AggregateRating",
        "ratingValue": seo.schemaRating.value,
        "reviewCount": seo.schemaRating.count,
        "bestRating":  5,
        "worstRating": 1
      },
      "sameAs": Object.values(brand.social).filter(Boolean)
    };
  }

  function buildFAQSchema() {
    return {
      "@context":  "https://schema.org",
      "@type":     "FAQPage",
      "mainEntity": SITE_CONFIG.faq.items.map(item => ({
        "@type": "Question",
        "name":  item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text":  item.answer
        }
      }))
    };
  }


  /* ──────────────────────────────────────────────────
     3. DATA-CONFIG → Inyección de texto simple
  ────────────────────────────────────────────────── */

  /**
   * Navega el objeto SITE_CONFIG por una ruta como "brand.name"
   * Devuelve el valor o '' si no existe.
   */
  function resolveConfig(path) {
    return path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : '';
    }, SITE_CONFIG);
  }

  /**
   * Inyecta textContent en todos los elementos con data-config="ruta.al.valor"
   */
  function injectTextNodes() {
    document.querySelectorAll('[data-config]').forEach(el => {
      const path = el.getAttribute('data-config');
      const value = resolveConfig(path);
      if (value !== '' && typeof value !== 'object') {
        el.textContent = value;
      }
    });
  }

  /**
   * Inyecta href en elementos con data-config-href="ruta"
   */
  function injectHrefs() {
    document.querySelectorAll('[data-config-href]').forEach(el => {
      const path = el.getAttribute('data-config-href');
      const value = resolveConfig(path);
      if (value) el.href = value;
    });
  }


  /* ──────────────────────────────────────────────────
     4. NAVBAR
  ────────────────────────────────────────────────── */
  function buildNavbar() {
    const { navbar, brand } = SITE_CONFIG;

    // Logo
    const logo = document.querySelector('.navbar-logo');
    if (logo) logo.textContent = brand.name;

    // Links
    const navEl = document.querySelector('.navbar-nav');
    if (navEl) {
      navEl.innerHTML = navbar.links.map(link =>
        `<a href="${link.href}">${link.label}</a>`
      ).join('');
    }

    // Mobile menu links
    const mobileNav = document.querySelector('.navbar-mobile-menu');
    if (mobileNav) {
      mobileNav.innerHTML = navbar.links.map(link =>
        `<a href="${link.href}" class="mobile-nav-link">${link.label}</a>`
      ).join('') +
      `<a href="#plans" class="btn btn-primary btn-lg">${navbar.ctaLabel}</a>`;
    }

    // CTA
    const ctaEls = document.querySelectorAll('.navbar-cta');
    ctaEls.forEach(el => {
      el.textContent = navbar.ctaLabel;
      el.href = '#plans';
    });
  }


  /* ──────────────────────────────────────────────────
     5. HERO SLIDER
  ────────────────────────────────────────────────── */
  function buildHero() {
    const { hero } = SITE_CONFIG;
    const track = document.querySelector('.hero-slider');
    if (!track) return;

    track.innerHTML = hero.slides.map((slide, i) => `
      <div class="hero-slide" role="group" aria-label="Slide ${i + 1} de ${hero.slides.length}">
        <img
          class="hero-slide-img"
          src="${slide.image}"
          alt="${slide.imageAlt}"
          ${i === 0 ? '' : 'loading="lazy"'}
          fetchpriority="${i === 0 ? 'high' : 'auto'}"
          decoding="${i === 0 ? 'sync' : 'async'}"
        >
        <div class="hero-slide-overlay" aria-hidden="true"></div>
        <div class="hero-slide-content ${i === 0 ? 'active' : ''}">
          <div class="hero-slide-inner">
            <span class="hero-eyebrow">${slide.eyebrow}</span>
            <h1 class="hero-title">${slide.title}</h1>
            <p class="hero-subtitle">${slide.subtitle}</p>
            <div class="hero-ctas">
              <a href="${slide.primaryCTA.href}" class="btn btn-primary btn-lg">
                ${slide.primaryCTA.label}
              </a>
              <a href="${slide.secondaryCTA.href}" class="btn btn-secondary">
                ${slide.secondaryCTA.label}
              </a>
            </div>
            ${slide.microcopy ? `<p class="hero-microcopy">${slide.microcopy}</p>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }


  /* ──────────────────────────────────────────────────
     6. STATS BAR
  ────────────────────────────────────────────────── */
  function buildStats() {
    const container = document.querySelector('.stats-grid');
    if (!container) return;

    container.innerHTML = SITE_CONFIG.stats.map(stat => `
      <div class="stat-item" data-reveal="up">
        <span class="stat-icon" aria-hidden="true">${stat.icon}</span>
        <span class="stat-value" data-counter="${stat.value}" data-suffix="${stat.suffix}">
          ${stat.value}${stat.suffix}
        </span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');
  }


  /* ──────────────────────────────────────────────────
     7. CÓMO FUNCIONA
  ────────────────────────────────────────────────── */
  function buildHowItWorks() {
    const { howItWorks } = SITE_CONFIG;

    // Títulos
    const titleEl = document.querySelector('#how-it-works-title');
    const subtitleEl = document.querySelector('#how-it-works-subtitle');
    if (titleEl) titleEl.textContent = howItWorks.title;
    if (subtitleEl) subtitleEl.textContent = howItWorks.subtitle;

    // Cards
    const container = document.querySelector('.steps-grid');
    if (!container) return;

    container.innerHTML = howItWorks.steps.map((step, i) => `
      <article class="step-card" data-reveal="up" data-reveal-delay="${i * 120}">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">${step.number}</span>
          <span class="step-icon" aria-hidden="true">${step.icon}</span>
        </div>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      </article>
    `).join('');
  }


  /* ──────────────────────────────────────────────────
     8. BENEFICIOS
  ────────────────────────────────────────────────── */
  function buildBenefits() {
    const { benefits } = SITE_CONFIG;

    const titleEl = document.querySelector('#benefits-title');
    const subtitleEl = document.querySelector('#benefits-subtitle');
    if (titleEl) titleEl.textContent = benefits.title;
    if (subtitleEl) subtitleEl.textContent = benefits.subtitle;

    const container = document.querySelector('.benefits-grid');
    if (!container) return;

    container.innerHTML = benefits.items.map((item, i) => {
      // Alternar reveal izquierda/derecha
      const dir = i % 2 === 0 ? 'left' : 'right';
      return `
        <article class="benefit-card" data-reveal="${dir}" data-reveal-delay="${(i % 2) * 80}">
          <span class="benefit-icon" aria-hidden="true">${item.icon}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `;
    }).join('');
  }


  /* ──────────────────────────────────────────────────
     9. INSTALACIONES
  ────────────────────────────────────────────────── */
  function buildInstallations() {
    const { installations } = SITE_CONFIG;

    const titleEl = document.querySelector('#installations-title');
    const introEl = document.querySelector('#installations-intro');
    if (titleEl) titleEl.textContent = installations.title;
    if (introEl) introEl.textContent = installations.intro;

    const track = document.querySelector('.installations-track');
    if (!track) return;

    track.innerHTML = installations.zones.map(zone => `
      <article class="zone-card">
        <div class="zone-img-wrapper">
          <img
            src="${zone.image}"
            alt="${zone.imageAlt}"
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="zone-card-body">
          <h3>${zone.title}</h3>
          <p>${zone.description}</p>
        </div>
      </article>
    `).join('');
  }


  /* ──────────────────────────────────────────────────
     10. PLANES
  ────────────────────────────────────────────────── */
  function buildPlans() {
    const { plans } = SITE_CONFIG;

    const titleEl = document.querySelector('#plans-title');
    const subtitleEl = document.querySelector('#plans-subtitle');
    if (titleEl) titleEl.textContent = plans.title;
    if (subtitleEl) subtitleEl.textContent = plans.subtitle;

    const container = document.querySelector('.plans-grid');
    if (!container) return;

    container.innerHTML = plans.items.map((plan, i) => `
      <article class="plan-card ${plan.featured ? 'featured' : ''}" data-reveal="up" data-reveal-delay="${i * 100}">
        <div class="plan-header">
          <div class="plan-name-row">
            <span class="plan-name">${plan.name}</span>
            ${plan.badge ? `<span class="badge badge-accent">${plan.badge}</span>` : ''}
          </div>
          <div class="plan-price">
            <span class="plan-price-value">${plan.price}</span>
            <span class="plan-price-period">${plan.period}</span>
          </div>
          <p class="plan-description">${plan.description}</p>
        </div>
        <div class="plan-body">
          <ul class="feature-list">
            ${plan.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <a href="#" class="btn btn-${plan.featured ? 'primary' : 'secondary'} plan-cta ${plan.featured ? 'btn-pulse' : ''}">
            ${plans.ctaLabel}
          </a>
        </div>
      </article>
    `).join('');

    // El click en los planes abre WhatsApp con mensaje
    container.querySelectorAll('.plan-cta').forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = plans.items[i];
        const { brand } = SITE_CONFIG;
        const msg = encodeURIComponent(
          `Hola! Quiero información sobre el plan ${plan.name} de ${brand.name}.`
        );
        window.open(`https://wa.me/${brand.whatsapp}?text=${msg}`, '_blank', 'noopener');
      });
    });
  }


  /* ──────────────────────────────────────────────────
     12. FAQ
  ────────────────────────────────────────────────── */
  function buildFAQ() {
    const { faq } = SITE_CONFIG;

    const titleEl = document.querySelector('#faq-title');
    const subtitleEl = document.querySelector('#faq-subtitle');
    if (titleEl) titleEl.textContent = faq.title;
    if (subtitleEl) subtitleEl.textContent = faq.subtitle;

    const container = document.querySelector('.faq-list');
    if (!container) return;

    container.innerHTML = faq.items.map((item, i) => `
      <div class="faq-item" data-reveal="up" data-reveal-delay="${i * 60}">
        <button
          class="faq-question"
          aria-expanded="false"
          aria-controls="faq-answer-${i}"
          id="faq-question-${i}"
        >
          ${item.question}
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div
          class="faq-answer"
          id="faq-answer-${i}"
          role="region"
          aria-labelledby="faq-question-${i}"
        >
          <div class="faq-answer-inner">
            <p>${item.answer}</p>
          </div>
        </div>
      </div>
    `).join('');
  }


  /* ──────────────────────────────────────────────────
     13. UBICACIÓN
  ────────────────────────────────────────────────── */
  function buildLocation() {
    const { brand } = SITE_CONFIG;

    // Dirección
    const addressEl = document.querySelector('.location-address');
    if (addressEl) addressEl.textContent = brand.address;

    // Horarios
    const hoursContainer = document.querySelector('.hours-list');
    if (hoursContainer) {
      hoursContainer.innerHTML = brand.hours.map(h => `
        <div class="hours-row">
          <span>${h.day}</span>
          <span>${h.time}</span>
        </div>
      `).join('');
    }

    // Enlace externo a Maps
    const mapsLink = document.querySelector('.location-maps-link');
    if (mapsLink) {
      mapsLink.href = brand.googleMapsLink;
    }

    // Embed iframe
    const mapWrapper = document.querySelector('.map-wrapper');
    if (mapWrapper) {
      if (brand.googleMapsEmbed && !brand.googleMapsEmbed.startsWith('URL_')) {
        mapWrapper.innerHTML = `
          <iframe
            title="Mapa de ${brand.name}"
            src="${brand.googleMapsEmbed}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        `;
      } else {
        // Placeholder mientras no se configura el embed
        mapWrapper.innerHTML = `
          <div class="map-placeholder">
            <span class="map-placeholder-icon" aria-hidden="true">📍</span>
            <p>Reemplazá <code>googleMapsEmbed</code> en site-config.js</p>
          </div>
        `;
      }
    }
  }


  /* ──────────────────────────────────────────────────
     14. CTA FINAL
  ────────────────────────────────────────────────── */
  function buildCTAFinal() {
    const { cta, brand } = SITE_CONFIG;

    const titleEl = document.querySelector('#cta-title');
    const subtitleEl = document.querySelector('#cta-subtitle');
    const btnEl = document.querySelector('#cta-btn');
    const proofEl = document.querySelector('#cta-social-proof');

    if (titleEl)    titleEl.textContent = cta.title;
    if (subtitleEl) subtitleEl.textContent = cta.subtitle;
    if (proofEl)    proofEl.textContent = cta.socialProof;

    if (btnEl) {
      btnEl.textContent = cta.buttonLabel;
      btnEl.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = encodeURIComponent(brand.whatsappMessage);
        window.open(`https://wa.me/${brand.whatsapp}?text=${msg}`, '_blank', 'noopener');
      });
    }
  }


  /* ──────────────────────────────────────────────────
     15. FOOTER
  ────────────────────────────────────────────────── */
  function buildFooter() {
    const { footer, brand } = SITE_CONFIG;

    // Logo y tagline
    const logoEl = document.querySelector('.footer-logo');
    const taglineEl = document.querySelector('.footer-tagline');
    if (logoEl)    logoEl.textContent = brand.name;
    if (taglineEl) taglineEl.textContent = footer.tagline;

    // Links de navegación
    const navEl = document.querySelector('.footer-nav');
    if (navEl) {
      navEl.innerHTML = footer.links.map(link =>
        `<a href="${link.href}">${link.label}</a>`
      ).join('');
    }

    // Redes sociales
    const socialEl = document.querySelector('.footer-social');
    if (socialEl) {
      const icons = {
        instagram: `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
        facebook:  `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
        tiktok:    `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
      };

      const socialLinks = Object.entries(brand.social)
        .filter(([, url]) => url && !url.includes('USUARIO'))
        .map(([platform, url]) => `
          <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${platform}">
            ${icons[platform] || platform}
          </a>
        `).join('');

      socialEl.innerHTML = socialLinks || '';
    }

    // Copyright
    const year = new Date().getFullYear();
    const copyrightEl = document.querySelector('.footer-copyright');
    if (copyrightEl) {
      copyrightEl.textContent = `© ${year} ${brand.name}. ${footer.legal}`;
    }
  }


  /* ──────────────────────────────────────────────────
     INIT — Punto de entrada
  ────────────────────────────────────────────────── */
  function init() {
    // Prioridad 1: tema y SEO (no bloquean render)
    applyTheme();

    // Prioridad 2: secciones críticas above-the-fold
    buildNavbar();
    buildHero();

    // Prioridad 3: resto de secciones (con microtask para no bloquear)
    // Usamos requestAnimationFrame para diferir hasta el próximo frame
    requestAnimationFrame(() => {
      injectSEO();
      buildStats();
      buildHowItWorks();
      buildBenefits();
      buildInstallations();
      buildPlans();
      buildFAQ();
      buildLocation();
      buildCTAFinal();
      buildFooter();
      injectTextNodes();
      injectHrefs();

      // Dispatch evento para que otros módulos sepan que el DOM está listo
      document.dispatchEvent(new CustomEvent('configInjected'));
    });
  }

  return { init };

})();