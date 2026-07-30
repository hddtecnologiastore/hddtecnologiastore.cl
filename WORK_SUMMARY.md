# HDD Tecnologia Store - Work Summary

## Domain & Hosting
- **Dominio:** hddtecnologiastore.cl (Netlify DNS)
- **Netlify Site ID:** 455a9716-407a-4de5-9784-21e7cd552ea2
- **Netlify Token:** nfp_7hHdb2fnGDazurwHGbTs1HQTM1SNZw8m04ed
- **GitHub:** hddtecnologiastore/hddtecnologiastore.cl (branch master)
- **Deploy:** auto-deploy desde GitHub conectado a Netlify (rama master). Build command vacío, publish dir `/`, functions dir `netlify/functions`.

## Google APIs
- **Place ID:** ChIJC6Bso6XPYpYRk9egCQTftUE
- **API Key:** AIzaSyBQZuhkcAidwM8M6xzv9sDgxZ2tMKgGlKw
  - ⚠️ Restringir por HTTP referrer en Google Cloud Console: `*hddtecnologiastore.cl/*`, `*netlify.app/*`

## Contact Info
- **Teléfono:** +56961991725
- **Dirección:** Av. Rodrigo de Araya 3076, Ñuñoa
- **WhatsApp:** wa.me/56961991725

## Core Features (implemented)
1. **Servicios:** 4 tarjetas + "Contrato Mensual para Empresas" con modal (RUT validado, WhatsApp directo)
2. **Notebooks Reacondicionados:** tarjeta anuncio centrada, botón "Consultar disponibilidad" → WhatsApp
3. **Google Reviews:** fetch client-side desde Places API (New), 5 reseñas reales + 1 mock, ordenadas por fecha, cache localStorage v2 (TTL 6h)
4. **Formulario "Solicitar Atención":** QR dinámico, WhatsApp directo
5. **WhatsApp flotante:** link directo wa.me
6. **SEO/OG:** meta tags, favicon.png, og-image.jpg
7. **Responsive:** menú hamburguesa, breakpoints

## Pending
- [x] Conectar GitHub → Netlify para auto-deploys
- [ ] Una vez conectado, Netlify Functions (`netlify/functions/reviews.js`) funcionarán solas
- [ ] Restringir API Key por HTTP referrer en Google Cloud Console
- [x] Google Tag Manager instalado (GTM-MJXVGZKX) para analytics

## Relevant Files
- `C:\Users\PC\Desktop\mi-web\index.html` — todo el HTML+CSS+JS
- `C:\Users\PC\Desktop\mi-web\netlify\functions\reviews.js` — Netlify Function (inactiva sin build step)
- `C:\Users\PC\Desktop\mi-web\netlify.toml` — config functions + CORS
- `C:\Users\PC\Desktop\mi-web\.github\workflows\deploy.yml` — GitHub Action (build hook)
- `C:\Users\PC\Desktop\mi-web\logo-back.jpg`, `favicon.png`, `og-image.jpg`
- `C:\Users\PC\Desktop\mi-web\WORK_SUMMARY.md` — este archivo

## Deploy Command (manual)
```powershell
# Empaquetar y subir ZIP a Netlify API:
# (script en .github/workflows/deploy.yml como referencia)
```
