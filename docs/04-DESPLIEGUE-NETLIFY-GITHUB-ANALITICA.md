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
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://flagcdn.com https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://wa.me https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://stats.g.doubleclick.net https://www.googleadservices.com https://clarity.ms https://*.clarity.ms; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

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
   - `connect-src` necesita los **4 dominios de recolección de GA4**: `www.google-analytics.com`, `analytics.google.com`, `stats.g.doubleclick.net`, `www.google.com`
5. Verificar: GA → Tiempo real → abrir la web → debe aparecer tu visita
6. **Si no aparece**: diagnosticar con Chrome headless (ver `docs/02-SEGURIDAD.md` → "Cómo diagnosticar violaciones de CSP") — en local NUNCA falla porque no hay CSP

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
  if(window.ADS_CONV_ID){gtag("event","conversion",{send_to:window.ADS_CONV_ID,value:1,currency:"CLP"})}
  gtag("event","whatsapp_click",{event_category:"contact",event_label:label});
}, true);
```

- En GA4: **Configurar → Eventos** para ver `whatsapp_click`
- `label` permite distinguir botón flotante, hero, promo, etc.

#### Conversión en Google Ads — camino recomendado: importar de GA4 (sin código)

Si Ads y GA4 están **vinculados** (Admin de Ads → vincular propiedad GA4):

1. GA4 → **Configurar → Eventos** → hacer **1 clic real** en un botón WhatsApp antes (para que el evento exista) → activar **"Marcar como evento clave"** en `whatsapp_click`
2. Google Ads → **Herramientas → Medición → Conversiones → + Crear conversión → Importar → Google Analytics (GA4)** → elegir `whatsapp_click` → categoría **Contacto** → Guardar
3. **No tocar** `ADS_CONV_ID` (queda vacío) — Ads cuenta el evento importado, cero etiquetas en el sitio

⚠️ **Trampas al crear eventos en GA4:**
- **NO usar "Crear sin código"** con trigger `page_view` + "URL contains" para un clic: crearía un evento falso que se dispara en cada carga de página, no en el clic. El evento ya viene del sitio (`app.js`), solo hay que marcarlo como evento clave.
- Si el evento no aparece en la lista: hacer 1 clic real en la web + esperar 2-5 min.

#### Camino alternativo: etiqueta manual (`send_to`)

Solo si NO hay vinculación Ads↔GA4: crear conversión "Sitio web" manual en Ads y usar el ID que entrega, formato **`AW-XXXXXXXXX/etiqueta`** (formato Ads). Con `G-...` de GA4, **Ads no registra la conversión** y el gasto en pauta queda sin ROI medible.

## 6. Microsoft Clarity — mapas de calor (gratis)

Herramienta de CRO: heatmaps, grabaciones de sesión, scroll tracking. No es publicitaria, pero SÍ debe declararse en privacidad.

### Instalación

1. https://clarity.microsoft.com → cuenta Microsoft → **+ Add project** → URL del sitio → sector
2. Copiar **ID de proyecto** (panel → Información general → "Id. de proyecto", formato corto tipo `ys3iggtq4i`)
3. Pegar en el `<head>` de **TODAS** las páginas:

```html
<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "<<CLARITY-ID>>");
</script>
```

4. **CSP** (`netlify.toml`): agregar `https://clarity.ms https://*.clarity.ms` a **`script-src` Y `connect-src`** (si falta → bloqueado en producción; en local funciona igual que GA4 porque no hay CSP)
5. **privacidad.html**: declarar en 3 lugares:
   - §1 datos automáticos → mencionar Clarity (mapas de calor / sesiones anónimas)
   - §5 transferencias → proveedor Microsoft
   - §9 cookies → cookies `CLID`, `MUID`, `_clck` + enlace privacy.microsoft.com
6. **Aviso de cookies** (HTML + i18n ES/EN en `app.js`): mencionar Clarity junto a GA
7. Verificar: Chrome headless → 0 violaciones CSP; net-log → hits `clarity.ms/tag`

### Cuándo NO usar Meta Pixel

Meta Pixel solo si se pauta en Meta: sin pauta = tracking sin uso que contradice la propia política de privacidad (hoy dice "no usamos píxeles de remarketing... ni en redes sociales"). Si el día se pauta: instalar pixel + reescribir esa sección de privacidad.

## 7. Dominio propio

1. Comprar dominio (ej: Namecheap, GoDaddy, Google Domains)
2. Netlify → Domain management → Add custom domain
3. Configurar DNS en el registrar:
   - **Recomendado**: apuntar nameservers a los de Netlify
   - O registros: `A @ 75.2.60.5` + `CNAME www <<sitio>>.netlify.app`
4. HTTPS automático (Let's Encrypt), forzar redirect http→https

## 8. Verificación post-deploy

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

## 9. Orden recomendado de cada entrega

1. Terminar cambios en local → probar
2. `netlify deploy --prod`
3. Verificar en la URL en línea
4. `git add -A; git commit; git push`
5. Search Console: solicitar indexación si cambió contenido importante
6. Entregar accesos y checklist `00-CHECKLIST-ENTREGA-WEB.md` completado
