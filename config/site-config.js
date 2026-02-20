/**
 * APEX TEMPLATE — SITE CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 * ESTE ES EL ÚNICO ARCHIVO QUE DEBÉS EDITAR AL CLONAR PARA UN NUEVO CLIENTE.
 * Todos los textos, colores, datos y URLs salen de aquí.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SITE_CONFIG = {

  /* ─── MARCA ──────────────────────────────────────────────────────────── */
  brand: {
    name:             "APEX TRAINING CENTER",
    tagline:          "Forjá tu mejor versión.",
    city:             "CIUDAD",
    neighborhood:     "BARRIO",
    country:          "PAÍS",
    whatsapp:         "595XXXXXXXXX",
    whatsappMessage:  "Hola! Quiero información sobre la prueba gratis.",
    address:          "DIRECCIÓN COMPLETA",
    googleMapsEmbed:  "URL_EMBED_GOOGLE_MAPS",
    googleMapsLink:   "URL_GOOGLE_MAPS_EXTERNO",
    hours: [
      { day: "Lunes a Viernes", time: "06:00 – 23:00" },
      { day: "Sábados",         time: "08:00 – 20:00" },
      { day: "Domingos",        time: "09:00 – 14:00" }
    ],
    social: {
      instagram: "https://instagram.com/USUARIO",
      facebook:  "https://facebook.com/USUARIO",
      tiktok:    "https://tiktok.com/@USUARIO"
    }
  },

  /* ─── SEO ────────────────────────────────────────────────────────────── */
  seo: {
    title:        "APEX Training Center | Gimnasio en CIUDAD – Entrenamiento Profesional",
    description:  "Entrená en el mejor gimnasio de CIUDAD. Entrenadores certificados, evaluación física gratuita y planes personalizados. ¡Probá 7 días sin costo!",
    keywords:     "gimnasio CIUDAD, entrenamiento personalizado CIUDAD, gym cerca de mí, entrenador personal CIUDAD",
    ogImage:      "assets/img/og-image.jpg",
    canonical:    "https://tusitio.com",
    schemaRating: { value: 4.9, count: 248 }
  },

  /* ─── TEMA VISUAL ─────────────────────────────────────────────────────
   * Solo modificar estos valores para cambiar toda la paleta del sitio.
   * Los nombres en camelCase se convierten a CSS custom properties:
   * colorBg → --color-bg, fontDisplay → --font-display, etc.
   * ──────────────────────────────────────────────────────────────────── */
  theme: {
    colorBg:          "#0A0A0A",
    colorBgSecondary: "#111111",
    colorText:        "#F5F4F0",
    colorTextMuted:   "#888888",
    colorAccent:      "#D4500A",
    colorAccentHover: "#FF6B2B",
    colorCard:        "#1A1A1A",
    colorBorder:      "#222222",
    fontDisplay:      "'Bebas Neue', sans-serif",
    fontBody:         "'DM Sans', sans-serif",
    borderRadius:     "8px",
    transitionSpeed:  "0.35s"
  },

  /* ─── NAVBAR ─────────────────────────────────────────────────────────── */
  navbar: {
    links: [
      { label: "Nosotros",      href: "#how-it-works" },
      { label: "Instalaciones", href: "#installations" },
      { label: "Planes",        href: "#plans" },
      { label: "Ubicación",     href: "#location" }
    ],
    ctaLabel: "Prueba gratis"
  },

  /* ─── HERO SLIDER ────────────────────────────────────────────────────── */
  hero: {
    autoplayInterval: 5000,
    slides: [
      {
        image:        "assets/img/hero-1.jpg",
        imageAlt:     "Persona entrenando con pesas en gimnasio profesional en CIUDAD",
        eyebrow:      "Más de 7 años transformando vidas",
        title:        "El gimnasio en CIUDAD que transforma cuerpos y forja mentalidades",
        subtitle:     "Entrenadores certificados, metodología probada y resultados medibles desde el primer mes.",
        primaryCTA:   { label: "🔥 Empezar 7 días gratis", href: "#plans" },
        secondaryCTA: { label: "Ver cómo funciona ↓",      href: "#how-it-works" },
        microcopy:    "Sin tarjeta de crédito · Sin permanencia mínima"
      },
      {
        image:        "assets/img/hero-2.jpg",
        imageAlt:     "Equipamiento profesional de alto rendimiento en APEX Training Center",
        eyebrow:      "Equipamiento de nivel internacional",
        title:        "No entrenás en cualquier lugar. Entrenás donde los resultados son inevitables.",
        subtitle:     "Máquinas de última generación, zona funcional completa y entrenadores que te acompañan.",
        primaryCTA:   { label: "📋 Ver planes",  href: "#plans" },
        secondaryCTA: { label: "📍 Cómo llegar", href: "#location" },
        microcopy:    ""
      },
      {
        image:        "assets/img/hero-3.jpg",
        imageAlt:     "T en APEX Training Center CIUDAD",
        eyebrow:      "+1.200 socios activos",
        title:        "Tu mejor versión no empieza el lunes. Empieza hoy.",
        subtitle:     "+1.200 personas ya eligieron cambiar. Vos podés ser la siguiente.",
        primaryCTA:   { label: "🔥 Quiero mi lugar",        href: "#plans" },
        secondaryCTA: { label: "💬 Hablar por WhatsApp",    href: "#whatsapp" },
        microcopy:    ""
      }
    ]
  },

  /* ─── SOCIAL PROOF BAR ───────────────────────────────────────────────── */
  stats: [
    { value: 1200, suffix: "+", label: "Miembros activos",   icon: "👥" },
    { value: 4.9,  suffix: "",  label: "Calificación Google", icon: "⭐" },
    { value: 7,    suffix: "+", label: "Años de experiencia", icon: "🏆" },
    { value: 100,  suffix: "%", label: "Entrenadores cert.",  icon: "🎓" }
  ],

  /* ─── CÓMO FUNCIONA ──────────────────────────────────────────────────── */
  howItWorks: {
    title:    "De cero a tu mejor versión en 3 pasos",
    subtitle: "Sin complicaciones. Sin excusas. Solo resultados.",
    steps: [
      {
        number:      "01",
        icon:        "📋",
        title:       "Evaluación gratuita",
        description: "Analizamos tu punto de partida: composición corporal, movilidad y objetivos reales. Sin juicios, sin presión."
      },
      {
        number:      "02",
        icon:        "🎯",
        title:       "Plan 100% personalizado",
        description: "Tu rutina, tus tiempos, tus objetivos. Un plan diseñado específicamente para vos, no una plantilla genérica."
      },
      {
        number:      "03",
        icon:        "📈",
        title:       "Seguimiento semanal real",
        description: "Tu entrenador mide tu progreso cada semana y ajusta el plan para que nunca te estanques."
      }
    ]
  },

  /* ─── BENEFICIOS ─────────────────────────────────────────────────────── */
  benefits: {
    title:    "Por qué quienes prueban Apex no vuelven a otro gym",
    subtitle: "No somos el gym más barato. Somos el que más resultados genera.",
    items: [
      { icon: "🏅", title: "Entrenadores certificados",      description: "Certificación NSCA y ACSM. Tu progreso en manos de profesionales reales." },
      { icon: "📋", title: "Plan personalizado desde día 1", description: "Nada de rutinas genéricas. Tu plan se diseña en tu primera sesión." },
      { icon: "🥗", title: "Asesoramiento nutricional",      description: "Orientación básica de nutrición incluida en todos los planes." },
      { icon: "📊", title: "Evaluación física gratuita",     description: "Medición de composición corporal al ingresar y cada 30 días." },
      { icon: "🔥", title: "Ambiente sin ego",               description: "Para todos los niveles. Nadie te juzga. Todos te impulsan." },
      { icon: "🕐", title: "Horarios extendidos",            description: "Abrimos temprano y cerramos tarde para que no tengas excusas." }
    ]
  },

  /* ─── INSTALACIONES ──────────────────────────────────────────────────── */
  installations: {
    title: "Equipamiento profesional de alto rendimiento en CIUDAD",
    intro: "No entrenás en cualquier lugar. Entrenás donde los resultados son inevitables.",
    zones: [
      { image: "assets/img/zone-weights.jpg",    imageAlt: "Zona de pesos libres y mancuernario completo",   title: "Pesos Libres",      description: "Mancuernario completo, barras olímpicas y plataformas de levantamiento." },
      { image: "assets/img/zone-machines.jpg",   imageAlt: "Máquinas guiadas de última generación",          title: "Máquinas Guiadas",  description: "Equipamiento de última generación para entrenamiento seguro y efectivo." },
      { image: "assets/img/zone-cardio.jpg",     imageAlt: "Área de cardio con cintas y bicicletas",         title: "Zona Cardio",       description: "Cintas, bicicletas, elípticas y rowers con pantallas interactivas." },
      { image: "assets/img/zone-functional.jpg", imageAlt: "Espacio funcional y crosstraining",              title: "Funcional & Cross", description: "Box de entrenamiento funcional con todo el equipamiento necesario." },
      { image: "assets/img/zone-stretch.jpg",    imageAlt: "Zona de estiramiento y movilidad",               title: "Estiramiento",      description: "Espacio tranquilo para movilidad, yoga y recuperación activa." }
    ]
  },

  /* ─── PLANES ─────────────────────────────────────────────────────────── */
  plans: {
    title:     "Elegí el plan que se adapta a tu vida y tus objetivos",
    subtitle:  "Todos incluyen evaluación inicial gratuita. Sin permanencia obligatoria.",
    ctaLabel:  "Empezar ahora",
    items: [
      {
        name:        "STARTER",
        badge:       "",
        price:       "Gs. XXX.000",
        period:      "/mes",
        description: "Para quienes empiezan su camino.",
        featured:    false,
        features: [
          "Acceso libre en horario estándar",
          "Evaluación física inicial",
          "Rutina base personalizada",
          "Acceso a todas las máquinas",
          "Vestuario y duchas"
        ]
      },
      {
        name:        "PRO",
        badge:       "MÁS ELEGIDO",
        price:       "Gs. XXX.000",
        period:      "/mes",
        description: "Para quienes buscan resultados medibles.",
        featured:    true,
        features: [
          "Todo lo del plan Starter",
          "Acceso horario extendido",
          "Seguimiento mensual de progreso",
          "Ajuste de rutina mensual",
          "Asesoramiento nutricional básico",
          "Clases grupales incluidas"
        ]
      },
      {
        name:        "ELITE",
        badge:       "",
        price:       "Gs. XXX.000",
        period:      "/mes",
        description: "Transformación total con entrenador personal.",
        featured:    false,
        features: [
          "Todo lo del plan Pro",
          "4 sesiones/mes con entrenador personal",
          "Plan nutricional detallado",
          "Seguimiento semanal de progreso",
          "Acceso prioritario en horas pico",
          "Acceso a zonas premium"
        ]
      }
    ]
  },

  /* ─── TESTIMONIOS ────────────────────────────────────────────────────── */
  testimonials: {
    title:            "Historias reales de personas que eligieron cambiar",
    subtitle:         "No te contamos lo que hacemos. Te mostramos lo que logramos.",
    autoplayInterval: 4000,
    items: [
      { avatar: "assets/img/testimonial-1.jpg", name: "Martín G.",     age: 34, result: "Bajó 11 kg en 5 meses",       text: "Nunca pensé que lo lograría. El seguimiento semanal fue clave. No es solo un gym, es un sistema.", stars: 5 },
      { avatar: "assets/img/testimonial-2.jpg", name: "Laura P.",      age: 28, result: "Ganó fuerza y confianza",      text: "Nunca había pisado un gym. Hoy entreno 4 veces por semana y me siento completamente diferente.", stars: 5 },
      { avatar: "assets/img/testimonial-3.jpg", name: "Diego R.",      age: 41, result: "Primera competencia a los 41", text: "Me preparé para mi primera competencia acá. El nivel de los trainers es otro. Absolutamente recomendable.", stars: 5 },
      { avatar: "assets/img/testimonial-4.jpg", name: "Valentina S.",  age: 31, result: "Bajó 3 tallas en 4 meses",    text: "El ambiente me motivó a no rendirme. Nunca sentí que estaba sola en el proceso.", stars: 5 }
    ]
  },

  /* ─── FAQ ────────────────────────────────────────────────────────────── */
  faq: {
    title:    "Preguntas frecuentes sobre nuestro gimnasio en CIUDAD",
    subtitle: "Todo lo que necesitás saber antes de empezar.",
    items: [
      { question: "¿Necesito experiencia previa para inscribirme?",           answer: "No. Tenemos planes y entrenadores para todos los niveles, desde personas que nunca pisaron un gimnasio hasta atletas con años de experiencia." },
      { question: "¿Puedo cancelar mi membresía cuando quiera?",              answer: "Sí. No tenemos permanencia mínima ni penalidades por cancelación. Podés dar de baja tu membresía en cualquier momento." },
      { question: "¿Las clases grupales están incluidas en todos los planes?", answer: "Las clases grupales están incluidas en los planes Pro y Elite. En el plan Starter tienen un costo adicional." },
      { question: "¿Tienen estacionamiento?",                                 answer: "Sí, contamos con estacionamiento gratuito para todos nuestros socios activos." },
      { question: "¿Qué pasa si me enfermo o viajo?",                        answer: "Podés pausar tu membresía hasta 30 días por año sin costo adicional. Solo avisanos con anticipación." },
      { question: "¿Incluye asesoramiento nutricional?",                      answer: "Los planes Pro y Elite incluyen asesoramiento nutricional básico. El plan Elite incluye un plan nutricional detallado." }
    ]
  },

  /* ─── CTA FINAL ──────────────────────────────────────────────────────── */
  cta: {
    title:       "Tu mejor versión no empieza el lunes. Empieza hoy.",
    subtitle:    "Solo quedan [X] cupos disponibles para evaluación gratuita este mes.",
    buttonLabel: "🔥 Quiero mi lugar ahora",
    socialProof: "+1.200 personas ya tomaron esta decisión."
  },

  /* ─── FOOTER ─────────────────────────────────────────────────────────── */
  footer: {
    tagline: "Forjá tu mejor versión.",
    links: [
      { label: "Nosotros",      href: "#how-it-works" },
      { label: "Instalaciones", href: "#installations" },
      { label: "Planes",        href: "#plans" },
      { label: "Ubicación",     href: "#location" },
      { label: "FAQ",           href: "#faq" }
    ],
    legal: "Todos los derechos reservados."
  }

};
