# APEX Template — Guía de Personalización

> Plantilla modular de landing page de alta conversión para negocios locales.  
> **Un solo archivo a editar por cliente.**

---

## ¿Qué es esta plantilla?

APEX Template es una base reutilizable diseñada para que cualquier agencia o freelancer pueda clonarla, cambiar solo el archivo de configuración, y tener una landing page profesional lista en minutos.

**Sin frameworks. Sin bundlers. Sin dependencias npm.**  
Solo HTML, CSS y JavaScript vanilla.

---

## Estructura del proyecto

```
apex-template/
│
├── index.html                 ← Estructura HTML (no modificar a menos que agregues secciones)
│
├── config/
│   └── site-config.js        ← ⭐ ÚNICO ARCHIVO A MODIFICAR POR CLIENTE
│
├── assets/
│   ├── css/
│   │   ├── variables.css      ← Custom properties / tokens de diseño
│   │   ├── base.css           ← Reset y tipografía global
│   │   ├── components.css     ← Botones, cards, badges, inputs
│   │   ├── sections.css       ← Estilos por sección
│   │   └── responsive.css     ← Media queries
│   │
│   ├── js/
│   │   ├── main.js            ← Entry point
│   │   ├── config-injector.js ← Cerebro: inyecta SITE_CONFIG en el DOM
│   │   ├── navbar.js          ← Smart navbar
│   │   ├── carousel.js        ← Hero + instalaciones + testimonios
│   │   ├── scroll-reveal.js   ← Animaciones por scroll
│   │   ├── counter.js         ← Contadores animados
│   │   ├── faq.js             ← Acordeón
│   │   └── whatsapp.js        ← Botón flotante
│   │
│   └── img/
│       └── (imágenes del cliente)
│
└── README.md
```

---

## Cómo clonar para un nuevo cliente

### Paso 1 — Duplicar la carpeta

```bash
cp -r apex-template/ nombre-cliente/
```

### Paso 2 — Editar `config/site-config.js`

Abrí el archivo y completá **todos los campos** siguiendo la guía de abajo.  
Ese es el único archivo que necesitás tocar para el 90% de los clientes.

### Paso 3 — Reemplazar imágenes

Copiá las imágenes del cliente a `assets/img/` usando los nombres de la lista más abajo.

### Paso 4 — Verificar

```bash
# Cualquier servidor local funciona, por ejemplo:
npx serve nombre-cliente/
# o simplemente abrir index.html en el browser
```

### Paso 5 — Deploy

Subir toda la carpeta a tu hosting estático (ver sección Deploy al final).

---

## Guía de campos de `site-config.js`

### `brand` — Datos del negocio

| Campo              | Tipo     | Descripción                                          | Ejemplo                              |
|--------------------|----------|------------------------------------------------------|--------------------------------------|
| `name`             | string   | Nombre completo del negocio (aparece en navbar/footer) | `"APEX Training Center"`           |
| `tagline`          | string   | Slogan corto                                         | `"Forjá tu mejor versión."`         |
| `city`             | string   | Ciudad (aparece en títulos y SEO)                   | `"Asunción"`                        |
| `neighborhood`     | string   | Barrio                                               | `"Las Mercedes"`                    |
| `country`          | string   | País (para schema markup)                            | `"Paraguay"`                        |
| `whatsapp`         | string   | Número con código de país, sin `+` ni espacios      | `"595981234567"`                    |
| `whatsappMessage`  | string   | Mensaje predefinido al abrir WhatsApp               | `"Hola! Quiero info sobre..."`      |
| `address`          | string   | Dirección completa                                   | `"Av. España 123, Asunción"`        |
| `googleMapsEmbed`  | string   | URL del iframe de Google Maps (ver nota abajo)      | `"https://www.google.com/maps/embed?pb=..."` |
| `googleMapsLink`   | string   | URL para abrir Maps en app/navegador                | `"https://goo.gl/maps/..."`        |
| `hours`            | array    | Array de `{ day, time }`                            | Ver ejemplo en config              |
| `social.instagram` | string   | URL completa del perfil                             | `"https://instagram.com/apexgym"`  |
| `social.facebook`  | string   | URL completa del perfil                             | `"https://facebook.com/apexgym"`   |
| `social.tiktok`    | string   | URL completa del perfil                             | `"https://tiktok.com/@apexgym"`    |

**Cómo obtener el embed de Google Maps:**  
Google Maps → buscar el lugar → Compartir → Incorporar mapa → copiar el `src` del iframe.

---

### `seo` — Optimización para buscadores

| Campo           | Tipo   | Descripción                                         |
|-----------------|--------|-----------------------------------------------------|
| `title`         | string | Título de la página (máx 60 chars recomendado)     |
| `description`   | string | Descripción (máx 160 chars recomendado)            |
| `keywords`      | string | Palabras clave separadas por coma                  |
| `ogImage`       | string | Ruta a imagen para redes sociales (1200×630px)     |
| `canonical`     | string | URL final del sitio (sin trailing slash)           |
| `schemaRating`  | object | `{ value: 4.9, count: 248 }` para schema markup    |

---

### `theme` — Tema visual

| Campo              | CSS Variable generada | Descripción                        |
|--------------------|-----------------------|------------------------------------|
| `colorBg`          | `--color-bg`          | Color de fondo principal           |
| `colorBgSecondary` | `--color-bg-secondary`| Fondo de secciones alternas        |
| `colorText`        | `--color-text`        | Texto principal                    |
| `colorTextMuted`   | `--color-text-muted`  | Texto secundario/subtítulos        |
| `colorAccent`      | `--color-accent`      | Color de acento (botones, links)   |
| `colorAccentHover` | `--color-accent-hover`| Hover del acento                   |
| `colorCard`        | `--color-card`        | Fondo de tarjetas                  |
| `colorBorder`      | `--color-border`      | Bordes y líneas                    |
| `fontDisplay`      | `--font-display`      | Fuente de títulos                  |
| `fontBody`         | `--font-body`         | Fuente de cuerpo de texto          |
| `borderRadius`     | `--border-radius`     | Radio de bordes global             |
| `transitionSpeed`  | `--transition-speed`  | Velocidad de transiciones CSS      |

> ⚠️ Si cambiás `fontDisplay` o `fontBody`, acordate de actualizar también el `<link>` de Google Fonts en `index.html`.

---

### `hero` — Slider principal

| Campo              | Tipo   | Descripción                                      |
|--------------------|--------|--------------------------------------------------|
| `autoplayInterval` | number | Milisegundos entre slides (default: 5000)        |
| `slides`           | array  | Array de objetos slide (ver estructura abajo)    |

**Estructura de cada slide:**
```js
{
  image:        "assets/img/hero-1.jpg",   // Imagen de fondo
  imageAlt:     "Descripción alt text",    // Importante para SEO y accesibilidad
  eyebrow:      "Texto pequeño arriba",
  title:        "Título principal",        // Este es el H1 de la página
  subtitle:     "Subtítulo descriptivo",
  primaryCTA:   { label: "Texto botón", href: "#section" },
  secondaryCTA: { label: "Texto botón", href: "#section" },
  microcopy:    "Texto pequeño bajo los botones"
}
```

---

### `plans` — Planes/precios

Cada ítem del array `plans.items` tiene esta estructura:

```js
{
  name:        "STARTER",         // Nombre del plan
  badge:       "MÁS ELEGIDO",     // Badge opcional (dejar "" para ninguno)
  price:       "Gs. 150.000",     // Precio formateado
  period:      "/mes",            // Período
  description: "Para quienes...", // Descripción breve
  featured:    false,             // true para destacar (generalmente el del medio)
  features:    ["Feature 1", "Feature 2", ...]
}
```

---

## Imágenes requeridas

Guardar en `assets/img/` con exactamente estos nombres:

| Archivo                | Dimensiones       | Descripción                                  |
|------------------------|-------------------|----------------------------------------------|
| `hero-1.jpg`           | 1920×1080px       | Slide 1 del hero                             |
| `hero-2.jpg`           | 1920×1080px       | Slide 2 del hero                             |
| `hero-3.jpg`           | 1920×1080px       | Slide 3 del hero                             |
| `zone-weights.jpg`     | 800×600px         | Zona de pesos libres                         |
| `zone-machines.jpg`    | 800×600px         | Zona de máquinas                             |
| `zone-cardio.jpg`      | 800×600px         | Zona de cardio                               |
| `zone-functional.jpg`  | 800×600px         | Zona funcional                               |
| `zone-stretch.jpg`     | 800×600px         | Zona de estiramiento                         |
| `testimonial-1.jpg`    | 120×120px         | Avatar testimonio 1 (cuadrado)               |
| `testimonial-2.jpg`    | 120×120px         | Avatar testimonio 2                          |
| `testimonial-3.jpg`    | 120×120px         | Avatar testimonio 3                          |
| `testimonial-4.jpg`    | 120×120px         | Avatar testimonio 4                          |
| `og-image.jpg`         | 1200×630px        | Imagen para redes sociales (Open Graph)      |
| `favicon.svg`          | —                 | Favicon vectorial                            |
| `favicon.png`          | 32×32px           | Favicon PNG fallback                         |
| `apple-touch-icon.png` | 180×180px         | Ícono para iOS                               |

**Optimización recomendada antes de subir:**
- Hero: comprimir a < 200KB (usar [Squoosh](https://squoosh.app) o similar)
- Zonas: < 80KB cada una
- Avatares: < 20KB cada uno
- Convertir todo a `.webp` si el hosting lo soporta

---

## Cómo cambiar el tema de color

Solo modificá el bloque `theme` en `site-config.js`:

```js
theme: {
  colorBg:     "#FFFFFF",   // Fondo blanco (modo claro)
  colorText:   "#111111",   // Texto oscuro
  colorAccent: "#0066FF",   // Nuevo acento azul
  // ... resto de campos
}
```

El `config-injector.js` aplicará automáticamente los valores como CSS custom properties al `:root` del documento. No hay que tocar ningún archivo CSS.

---

## Cómo agregar o quitar secciones

### Quitar una sección
1. En `index.html`, buscar el bloque `<!-- SECTION: NOMBRE -->` y comentarlo.
2. La sección simplemente desaparece. El JS detecta automáticamente si los contenedores existen antes de inyectar contenido.

### Agregar una sección nueva
1. Agregar el objeto de configuración en `site-config.js`.
2. Agregar la función `buildNuevaSección()` en `config-injector.js`.
3. Agregar los estilos en `sections.css`.
4. Agregar el bloque HTML en `index.html`.

---

## Deploy

### Hosting estático (recomendado)
La plantilla no requiere backend. Cualquier hosting estático funciona:

- **Netlify:** Arrastrar la carpeta a [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel:** `vercel --prod` en la carpeta del proyecto
- **GitHub Pages:** Push al repo, activar Pages desde Settings
- **cPanel / FTP:** Subir todos los archivos a `public_html/`

### Headers recomendados (para mejor performance)
Si tu hosting permite configurar headers HTTP, agregar:

```
# Cache de assets estáticos
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# No cachear HTML (para recibir actualizaciones)
/*.html
  Cache-Control: no-cache
```

---

## Preguntas frecuentes de desarrollo

**¿Por qué el HTML está casi vacío?**  
Por diseño. Todo el contenido sale de `site-config.js` y es inyectado por JavaScript. Esto permite cambiar todo el sitio modificando un solo archivo.

**¿Puedo agregar más de 3 slides al hero?**  
Sí. Agregá más objetos al array `hero.slides` en el config. El carrusel se adapta automáticamente.

**¿Funciona sin JavaScript?**  
El sitio requiere JS para mostrar contenido. Para usuarios sin JS, se muestra la estructura base con el CSS crítico inline. Se puede agregar un `<noscript>` con mensaje si es necesario.

**¿Los fonts son obligatorios?**  
No. Podés cambiar `fontDisplay` y `fontBody` en el `theme` del config, y actualizar el `<link>` de Google Fonts en el `<head>` del HTML.

**¿Cómo cambio el idioma?**  
Cambiá el atributo `lang` en `<html>` y todos los textos en `site-config.js`. El schema markup se genera automáticamente desde el config.

---

## Checklist antes de entregar al cliente

- [ ] Todos los campos de `brand` completados
- [ ] SEO: `title`, `description`, `canonical` correctos
- [ ] WhatsApp: número real con código de país
- [ ] Google Maps embed configurado
- [ ] Imágenes reemplazadas y optimizadas
- [ ] `og-image.jpg` creada (1200×630px)
- [ ] Favicon actualizado
- [ ] Precios reales en `plans.items`
- [ ] Testimonios reales
- [ ] FAQ con preguntas reales del cliente
- [ ] Horarios correctos
- [ ] Links de redes sociales reales
- [ ] Probar en mobile (Chrome DevTools)
- [ ] Probar con teclado (navegación accesible)
- [ ] Verificar en [PageSpeed Insights](https://pagespeed.web.dev)
- [ ] Verificar schema en [Rich Results Test](https://search.google.com/test/rich-results)

---

*APEX Template v1.0.0 — Construido para escalar.*
