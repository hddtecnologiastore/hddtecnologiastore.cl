# HDD Tecnologia Store — Web informativa V2 (carpeta HDD)

Web **100% informativa** (servicios + contacto + legales). No toca `Proyectos/WEB HDD` (original intacto). Sin catálogo de productos (removido; evaluar pestaña de productos en el futuro).

## Qué mejora vs original (verificado línea por línea)
- **Performance:** CSS/JS separados + `defer`, sin FontAwesome CDN (SVG inline), canvas ligero con `prefers-reduced-motion`, cache inmutable CSS/JS.
- **Seguridad:** headers HSTS/CSP/nosniff/COOP/CORP (`netlify.toml` + `server.js`), `esc()` en todo render, validación nombre/teléfono/RUT/`q`, sin API keys ni tokens (la key de Places del original NO se copió).
- **UX/Efectos:** preloader, scroll-progress, cursor glow, red de partículas, typing (solo frases de la web: garantía/diagnóstico/atención), terminal ilustrativo, tilt 3D, contadores 1435+/20/99%/5, reveals IO, carrusel (solo Byron real + mock original), modales servicio/empresas → WhatsApp, toast, back-to-top, menú móvil.
- **Páginas:** `index.html`, `terminos.html`, `privacidad.html`, `404.html` (catálogo eliminado).
- **Fidelidad:** textos de servicios = web original; sin promesa de 48h de servicio (solo garantías <48h como dice la fuente); sin horario inventado (la fuente no publica); sin marcas inventadas (solo "todas las marcas" + HP/Dell del catálogo); sin "factura/soldadura/SSD" agregados.
- **No portado (a propósito):** QR dinámico + subida de fotos + GTM + API de reviews en vivo (requerían servicios externos/keys). Reseñas enlazan a Google.

## Probar local
```powershell
node server.js
# http://localhost:3100/
```

## Deploy Netlify
Arrastrar carpeta `HDD` o conectar repo; `netlify.toml` ya trae headers + cache.
