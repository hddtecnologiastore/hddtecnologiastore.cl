# Checklist: Web Lista para Vender

Plantilla maestra basada en el sitio **hddtecnologiastore.cl**. Aplicar a cada nueva web antes de entregarla al cliente.

> Los campos entre `<<...>>` se reemplazan por cada proyecto.

---

## 1. Estructura de páginas

- [ ] `index.html` — home completa (hero, servicios, proceso, prueba social/reseñas, contacto, redes, footer)
- [ ] `privacidad.html` — política de privacidad
- [ ] `terminos.html` — términos y aviso legal
- [ ] `404.html` — página no encontrada personalizada (Netlify la usa sola; marcar `noindex`)
- [ ] Footer con enlaces a privacidad + términos en **todas** las páginas
- [ ] Navegación consistente entre páginas

## 2. SEO on-page (ver `01-SEO-GOOGLE-SEARCH-CONSOLE.md`)

- [ ] `<title>` con keyword principal + localidad + marca (≤ 70 caracteres)
- [ ] `<meta name="description">` con keywords + llamada a la acción (≤ 155 caracteres)
- [ ] `<link rel="canonical">` en cada página
- [ ] `robots.txt` con `Allow: /` + `Sitemap: <<dominio>>/sitemap.xml`
- [ ] `sitemap.xml` con todas las páginas publicadas
- [ ] Datos estructurados JSON-LD (tipo de negocio, dirección, horarios, teléfono, rating)
- [ ] Open Graph + Twitter Card (`og:title`, `og:description`, `og:image` 1200×630)
- [ ] `og:image` real (PNG, no SVG) — las redes no muestran SVG
- [ ] `<html lang="es">` correcto
- [ ] Un solo H1 por página
- [ ] Imágenes con `alt` descriptivo

## 3. Google Search Console + Analytics

- [ ] Propiedad creada y verificada (método Tag HTML → meta en `<head>`)
- [ ] Sitemap enviado en GSC
- [ ] Indexación solicitada para la home
- [ ] Google Analytics (GA4) cargando con gtag
- [ ] CSP actualizado para permitir googletagmanager.com y google-analytics.com
- [ ] Eventos de conversión configurados (clics en WhatsApp, envíos de formularios)
- [ ] Google Business Profile creado (si tiene local físico)

## 4. Seguridad (ver `02-SEGURIDAD.md`)

- [ ] CSP en `netlify.toml` (incluye `style-src 'unsafe-inline'` si hay estilos inline)
- [ ] Bloqueo 404 forzado de: `README.md`, `.env`, `.git/*`, `package.json`, `*.md`, `src/*`, `*.map`, `node_modules/*`
- [ ] Sin API keys ni secretos en el frontend
- [ ] Validación/sanitización de entradas de formularios
- [ ] HTTPS obligatorio (Netlify lo da gratis)
- [ ] `rel="noopener"` en todos los `target="_blank"`
- [ ] Sin archivos de catálogo borrador o páginas internas indexables (bloquear con 404 o `noindex`)

## 5. Legales (ver `03-LEGALES-PRIVACIDAD-TERMINOS.md`)

- [ ] Privacidad: datos recogidos, finalidad, terceros (Google Analytics, WhatsApp), derechos ARCO, cookies reales (no mentir: si hay GA, declararlo)
- [ ] Términos: identificación del negocio, servicios, garantía, jurisdicción
- [ ] Barra de cookies visible (markup + CSS + JS — verificar que el **HTML existe**, no solo CSS/JS)
- [ ] Enlaces legales en modales de formulario ("Al enviar aceptas privacidad y términos")
- [ ] Fecha de última actualización

## 6. Responsive / móvil

- [ ] Prueba a 320px, 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal (`html{overflow-x:hidden}` + revisar elementos con posicionamiento absoluto)
- [ ] Menú hamburguesa funciona
- [ ] Botones táctiles ≥ 44px
- [ ] Tipografía legible sin zoom
- [ ] `viewport` meta presente

## 7. Analítica y conversión

- [ ] GA4 instalado
- [ ] Eventos: clics WhatsApp (botón flotante, hero, contacto, promo) → `gtag('event','conversion',...)` o evento personalizado
- [ ] Meta de conversión en Google Ads si se pauta
- [ ] Formularios → WhatsApp (sin backend que perder)

## 8. Idiomas (si aplica)

- [ ] Toggle ES/EN en header, `data-i18n` en textos, diccionario en JS
- [ ] Persistencia en `localStorage`
- [ ] `document.title` cambia con el idioma
- [ ] Probar que el toggle **no** desaparece tras cambiar idioma (re-query después de innerHTML)

## 9. Rendimiento

- [ ] Imágenes comprimidas / SVG donde sea posible
- [ ] CSS/JS con `?v=` para cache-busting tras cambios
- [ ] Preloader con salida segura (no bloquea si falla algo)
- [ ] `font-display: swap` en fuentes (Google Fonts)

## 10. Entrega final

- [ ] `git push` al repo del cliente
- [ ] Deploy de producción en Netlify (CLI: `npx netlify deploy --prod --dir . --site <<SITE_ID>>`)
- [ ] Dominio propio conectado + HTTPS activo
- [ ] Verificación de que deploy local == deploy en línea (mismo commit)
- [ ] Probar en un móvil real
- [ ] Lista de accesos entregada al cliente (Netlify, GitHub, GA4, Search Console, dominio)

---

## Lecciones aprendidas (errores reales de este proyecto)

1. **CSP bloquea estilos inline**: `style-src 'self'` sin `'unsafe-inline'` rompe TODOS los `style=""` — en local sin CSP se ve bien y en producción roto. Siempre incluir `'unsafe-inline'`.
2. **CSP bloquea scripts inline (gtag)**: `script-src 'self'` sin `'unsafe-inline'` bloquea el `<script>` inline de Google Analytics — **Analytics no recibe NINGÚN dato** (ni page_view), sin error visible en la página. Síntoma: GA4 dice "No se ha recibido ningún dato" con el tag aparentemente instalado. Incluir `'unsafe-inline'` o usar hash/nonce.
2. **`maxlength` cuenta el espacio**: input con placeholder `1234 1234` y `maxlength="8"` cortaba antes. Quitar `maxlength` y limitar con JS.
3. **CSS/JS huérfanos**: existía `#cookieBar` en CSS y JS pero **no en el HTML** → la barra nunca se mostraba. Siempre verificar los 3.
4. **Política de privacidad desactualizada**: decía "no usamos cookies" con GA instalado. Revisar legales tras cada cambio de herramientas.
5. **`transform` centraliza modales**: `top:50%;left:50%` requiere `translate(-50%,-50%)` también en la clase `.show`, no solo en la base.
6. **GitHub puede pisar deploys**: si hay deploy automático desde GitHub, el CLI debe ir seguido de `git push` para no perder cambios.
7. **Netlify rechaza redirects `/.netlify/*`**: no se puede redirigir un path que empiece con `/.netlify`.
8. **Search Console**: propiedad tipo "Dominio" solo verifica por DNS; usar tipo **"Prefijo de URL"** para verificar con Tag HTML.
9. **`*.xml`/`*.txt` no bloquear** en redirects anti-exposición: `sitemap.xml` y `robots.txt` deben quedar fuera del bloqueo.
