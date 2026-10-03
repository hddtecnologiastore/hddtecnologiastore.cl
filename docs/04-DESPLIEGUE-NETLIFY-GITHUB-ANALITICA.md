# Despliegue: Netlify + GitHub + Analítica

Workflow completo usado en hddtecnologiastore.cl para mantener web en línea sincronizada con el repo.

---

## 1. Estructura del proyecto

```
carpeta-del-sitio/
├── index.html          # home
├── privacidad.html     # legal
├── terminos.html       # legal
├── 404.html            # error personalizado (noindex)
├── styles.css
├── app.js              # lógica + diccionario i18n
├── data.js             # contenidos (opcional)
├── favicon.svg
├── og-image.png        # imagen social 1200×630
├── robots.txt
├── sitemap.xml
├── netlify.toml        # CSP, caché, bloqueos 404
└── docs/               # estas plantillas (opcional, no se sirve)
```

## 2. netlify.toml base

```toml
[build]
  command = "echo done"

# Caché
[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "max-age=0, must-revalidate"

# CSP (ajustar según herramientas del proyecto)
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://flagcdn.com https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

# Bloqueo de archivos sensibles → ver docs/02-SEGURIDAD.md
[[redirects]]
  from = "/*.md"
  to = "/404.html"
  status = 404
  force = true
# ... resto de bloqueos (README, .env, .git, package.json, src, *.map)
```

## 3. Deploy con CLI

```powershell
npx netlify deploy --prod --dir "C:\ruta\al\sitio" --site <<SITE_ID>>
```

- `--site <<SITE_ID>>` → ID del sitio en Netlify (visible en Site configuration)
- **Timeout**: usar 120000 ms en el ejecutor de comandos (30s a veces no alcanza)
- Tras el deploy, verificar en la URL pública
- Errores 403/timeout ocasionales → reintentar, suelen ser transitorios

### Comandos útiles de Netlify

```powershell
npx netlify status                    # cuentas y sitios
npx netlify sites:list                # listar sitios
npx netlify open                      # abrir panel del sitio
npx netlify api getSite --data siteId="<<SITE_ID>>"   # ver config
```

## 4. Sincronización con GitHub

Si el sitio tiene deploy automático desde GitHub, **el CLI solo se pierde** al siguiente push. Workflow correcto:

```powershell
# 1) Desplegar cambios locales
npx netlify deploy --prod --dir "C:\ruta\al\sitio" --site <<SITE_ID>>

# 2) Commitear y subir para no perder nada
git add -A
git commit -m "descripción breve del cambio"
git push origin main
```

**Reglas de PowerShell 5.1** (Windows):
- Usar `;` para encadenar (NO `&&` que no existe)
- No usar `rg` ni `head` (no disponibles)
- Ejemplo real: `git add -A; git commit -m "fix"; git push origin main`

### Evitar conflictos

- Un solo origen de verdad: los cambios locales → deploy CLI → push inmediato
- Si alguien edita desde GitHub, `git pull` antes de trabajar
- Cambiar versión en `?v=` de CSS/JS cada release (`styles.css?v=3`) → invalida caché del navegador

## 5. Google Analytics 4 — instalación

En `<head>` de **todas** las páginas:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<<GA-ID>>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '<<GA-ID>>');
</script>
```

1. Crear propiedad GA4 en https://analytics.google.com
2. Obtener ID de medición (`G-XXXXXXXXXX`)
3. Agregar el script
4. **Agregar los dominios a la CSP** (script-src + connect-src) — si no, GA no carga en producción
5. Verificar: GA → Tiempo real → abrir la web → debe aparecer tu visita

### Eventos de conversión para webs de servicios

```js
// Clics en cualquier link WhatsApp → conversión + evento
document.addEventListener("click", function(e){
  var a = e.target.closest("a[href*='wa.me']");
  if(!a || typeof gtag!=="function") return;
  var label = a.classList.contains("wa-float") ? "whatsapp_float"
            : a.classList.contains("promo-yes") ? "whatsapp_promo"
            : a.classList.contains("promo-btn") ? "whatsapp_promo"
            : "whatsapp_main";
  gtag("event","conversion",{send_to:"<<GA-ID>>/<<CONV-ID>>"});
  gtag("event","whatsapp_click",{event_category:"contact",event_label:label});
}, true);
```

- En GA4: **Configurar → Eventos** para ver `whatsapp_click`
- Crear **conversiones** marcando el evento (o usar `conversion` con `send_to` si hay Google Ads)
- `label` permite distinguir botón flotante, hero, promo, etc.

## 6. Dominio propio

1. Comprar dominio (ej: Namecheap, GoDaddy, Google Domains)
2. Netlify → Domain management → Add custom domain
3. Configurar DNS en el registrar:
   - **Recomendado**: apuntar nameservers a los de Netlify
   - O registros: `A @ 75.2.60.5` + `CNAME www <<sitio>>.netlify.app`
4. HTTPS automático (Let's Encrypt), forzar redirect http→https

## 7. Verificación post-deploy

```powershell
# Estado de páginas clave
foreach ($f in @("","sitemap.xml","robots.txt","404")) {
  try { $r=Invoke-WebRequest "https://<<dominio>>/$f" -UseBasicParsing; "$f → $($r.StatusCode)" }
  catch { "$f → $($_.Exception.Response.StatusCode.value__)" }
}
```

Checklist:
- [ ] Home carga y se ve correcta (Ctrl+Shift+R para saltar caché)
- [ ] sitemap.xml → 200
- [ ] robots.txt → 200
- [ ] URL inexistente → 404 personalizada
- [ ] Consola del navegador sin errores CSP
- [ ] GA recibe datos (Tiempo real)
- [ ] WhatsApp/promo/botones responden
- [ ] `git status` limpio (todo commiteado)

## 8. Orden recomendado de cada entrega

1. Terminar cambios en local → probar
2. `netlify deploy --prod`
3. Verificar en la URL en línea
4. `git add -A; git commit; git push`
5. Search Console: solicitar indexación si cambió contenido importante
6. Entregar accesos y checklist `00-CHECKLIST-ENTREGA-WEB.md` completado
