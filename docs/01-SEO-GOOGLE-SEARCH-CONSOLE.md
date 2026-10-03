# SEO + Google Search Console

Guía paso a paso para que una web nueva aparezca en Google.

---

## 1. Título y meta description

El `<title>` es el texto que Google muestra en resultados. Reglas:

- **≤ 70 caracteres** (más, se corta)
- Keyword principal **al inicio**
- Incluir localidad si el negocio es local
- Marca al final
- Una sola etiqueta `<title>` por página

**Fórmula ganadora (servicio local):**
```html
<title>Servicio Técnico Computacional en Santiago | Reparación Notebooks y PCs — Marca</title>
<meta name="description" content="Servicio con 20 años de experiencia. Reparación de notebooks, PCs y armado de equipos. Diagnóstico, mantenimiento y formateo en Comuna, Ciudad.">
```

- Description: **140–155 caracteres**, con keywords + zona geográfica
- Elegir **keywords por las que la gente busca** (ej: "servicio técnico computacional Santiago"), no solo el nombre de la marca
- Aplicar lo mismo a `og:title` / `og:description` (compartir en redes)

## 2. robots.txt

```txt
User-agent: *
Allow: /
Disallow: /pagina-borrador.html

Sitemap: https://<<dominio>>/sitemap.xml
```

- `Allow: /` → rastrear todo
- Bloquear páginas internas/no publicadas con `Disallow` (mejor aún: bloquearlas también con 404 forzado en Netlify)
- **Siempre** apuntar al sitemap

## 3. sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://<<dominio>>/</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://<<dominio>>/privacidad.html</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- `loc` con URL absoluta (https)
- Home `priority` 1.0, legales 0.3
- Actualizar `lastmod` al modificar páginas

## 4. Canonical

Evita contenido duplicado (por ejemplo si la home responde en `/` e `/index.html`):

```html
<link rel="canonical" href="https://<<dominio>>/">
```

Una por página con su URL completa.

## 5. Datos estructurados JSON-LD

Se inserta en el `<head>` de la home. Google lo usa para mostrar información enriquecida (ficha del negocio, horarios, rating):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ComputerStore",
  "name": "<<Nombre del negocio>>",
  "description": "<<Descripción con keywords>>",
  "url": "https://<<dominio>>/",
  "telephone": "+569XXXXXXXX",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<<calle número>>",
    "addressLocality": "<<comuna>>",
    "addressRegion": "<<región>>",
    "addressCountry": "CL"
  },
  "founder": { "@type": "Person", "name": "<<nombre>>" },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "11:00", "closes": "19:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "11:00", "closes": "16:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "122" },
  "sameAs": ["https://www.instagram.com/...", "https://www.tiktok.com/@..."]
}
</script>
```

- Cambiar `@type` según rubro: `ComputerStore`, `Electrician`, `Restaurant`, `MedicalClinic`, etc. (schema.org)
- `aggregateRating` **solo si hay reseñas reales** y debe coincidir EXACTAMENTE con tu perfil de Google Business (rating y número de opiniones reales, no clientes atendidos) — Google penaliza los datos estructurados engañosos
- **Trabajos/órdenes emitidas ≠ reseñas**: el número de trabajos (ej: 1.435 órdenes) va en el **texto visible** (KPIs, descripción, JSON-LD `description`), NUNCA en `reviewCount`. Mostrar ambas cifras da credibilidad: "122 reseñas de 1.435 trabajos realizados"
- Validar en https://search.google.com/test/rich-results

## 6. Open Graph + Twitter Card (compartir en redes)

```html
<meta property="og:title" content="<<título>>">
<meta property="og:description" content="<<descripción corta>>">
<meta property="og:type" content="website">
<meta property="og:url" content="https://<<dominio>>/">
<meta property="og:image" content="https://<<dominio>>/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://<<dominio>>/og-image.png">
```

- **`og:image` debe ser PNG/JPG real de 1200×630** — SVG no funciona en WhatsApp/Facebook
- Verificar con https://developers.facebook.com/tools/debug/

## 7. Google Search Console — pasos

1. Entrar a https://search.google.com/search-console (cuenta Google del cliente)
2. **Agregar propiedad** → elegir **"Prefijo de URL"** (NO "Dominio", ese solo permite DNS) → `https://<<dominio>>/`
3. Verificación → método **"Tag HTML"** → copiar la meta:
   ```html
   <meta name="google-site-verification" content="<<token>>">
   ```
   Incrustarla en el `<head>` del index → redeploy → volver a GSC → **Verificar**
4. **Sitemaps** (menú izquierdo) → escribir `sitemap.xml` → **Enviar**
   - Estado "No se ha podido obtener" recién enviado es normal: esperar horas/día, Google lo releerá
5. **Inspección de URL** (barra superior) → `https://<<dominio>>/` → **Solicitar indexación**
6. Repetir 5 con páginas clave si se desea
7. Monitorear en menú **"Páginas"** (cobertura): procesadas / indexadas / descartadas

### Errores comunes en GSC

| Error | Causa / solución |
|---|---|
| "No se ha podido verificar" con método DNS | Registro TXT aún no propagado o se eligió propiedad "Dominio" → usar Prefijo de URL + Tag HTML |
| Sitemap "No se ha podido obtener" | Acaba de enviarse: esperar. Si persiste, verificar que responda 200 y `application/xml` |
| Página "Descubierta, no indexada" | Normal en sitios nuevos; solicitar indexación manualmente |

## 8. Google Analytics (GA4)

```html
<!-- Google tag (gtag.js) en <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<<GA-ID>>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '<<GA-ID>>');
</script>
```

**¡IMPORTANTE!** Si usas CSP en Netlify, agregar al `script-src` y `connect-src`:
```
https://www.googletagmanager.com https://www.google-analytics.com
```
Si no, GA queda silenciosamente bloqueado en producción (en local funciona y parece todo bien).

### Eventos de conversión (ejemplo WhatsApp)

```js
document.addEventListener("click", function(e){
  var a = e.target.closest("a[href*='wa.me']");
  if(!a) return;
  var label = a.classList.contains("wa-float") ? "whatsapp_float"
            : a.classList.contains("promo-yes") ? "whatsapp_promo"
            : "whatsapp_main";
  gtag("event","conversion",{"send_to":"<<GA-ID>>/<<CONVERSION-ID>>"});
  gtag("event","whatsapp_click",{event_category:"contact",event_label:label});
}, true);
```

## 9. Google Business Profile (negocios locales)

Imprescindible para salir en Google Maps y "cerca de mí":

1. https://business.google.com → Crear perfil
2. Nombre, categoría, dirección (o área de servicio si es móvil)
3. Verificar (postal, teléfono o video)
4. Agregar horarios, fotos, servicios y precio
5. Pedir reseñas a clientes (el rating ayuda al SEO local)

## 10. Checklist rápido antes de entregar

- [ ] Title/description únicos y con keywords
- [ ] robots.txt + sitemap.xml en línea (200)
- [ ] Canonical en todas las páginas
- [ ] JSON-LD válido
- [ ] og:image PNG 1200×630
- [ ] GSC verificada + sitemap enviado + indexación solicitada
- [ ] GA4 cargando (verificar en pestaña Red o en tiempo real de GA)
- [ ] CSP permite Google
