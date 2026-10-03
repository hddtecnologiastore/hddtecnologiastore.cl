# Seguridad Web (Netlify + Estática)

Medidas aplicadas en hddtecnologiastore.cl, replicables en cualquier web estática en Netlify.

---

## 1. CSP — Content Security Policy

La CSP define qué recursos puede cargar la página. **Un error aquí rompe la web en producción sin romperla en local** (local no lleva CSP), por eso es la fuente #1 de "en mi PC se ve bien y en la web rota".

En `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://flagcdn.com https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://wa.me https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://stats.g.doubleclick.net https://www.googleadservices.com https://clarity.ms https://*.clarity.ms; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

### Puntos críticos

| Directiva | Por qué |
|---|---|
| `style-src ... 'unsafe-inline'` | **Obligatoria** si hay `style="..."` en el HTML (plantillas con estilos inline). Sin ella, Chrome bloquea TODOS los estilos inline: la web se ve destruida en producción pero perfecta en local. |
| `script-src` + dominios de GA | Si agregas Google Analytics y no lo añades, GA no carga en producción (sin error visible). |
| `connect-src` + **TODOS** los dominios de GA4 | **GA4 envía los hits a CUATRO dominios, no a uno**: `www.google-analytics.com`, `analytics.google.com`, `stats.g.doubleclick.net` y `www.google.com`. Si falta alguno, Chrome bloquea esos hits y **GA4 no recibe NINGÚN dato en producción** (en local no hay CSP, por eso siempre funciona en local). |
| `img-src ... https://flagcdn.com` | Si se usan banderas de idioma u otras imágenes externas. |

**Regla de oro:** cada vez que agregues un `<script>`, `<img>` o fetch de un dominio nuevo, añadir ese dominio a la CSP. Síntoma de fallo: mensajes en consola `Refused to ...`.

### Cómo diagnosticar violaciones de CSP sin adivinar

Chrome headless captura los bloqueos reales de producción (no hay que pedirle capturas al cliente):

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --enable-logging=stderr --v=0 --virtual-time-budget=12000 --user-data-dir="$env:TEMP\opencode\cspdiag" https://TU-SITIO/ 2> "$env:TEMP\opencode\csp.log"
Select-String -Path "$env:TEMP\opencode\csp.log" -Pattern 'Content Security Policy|Refused'
```

Cada línea `Refused to connect ... violates ... "connect-src ..."` indica el dominio exacto que falta agregar.

## 2. Bloqueo de archivos sensibles

Los archivos del proyecto quedan en el deploy de Netlify (el sitio sirve TODO lo que esté en la carpeta). Bloquear con redirect 404 **forzado** en `netlify.toml`:

```toml
# ---- Bloqueo de archivos sensibles (404 forzado) ----
[[redirects]]
  from = "/README.md"
  to = "/404.html"
  status = 404
  force = true
```

### Lista completa a bloquear

| Archivo/patrón | Motivo |
|---|---|
| `README.md`, `SECURITY.md`, `*.md` | Notas internas, información del proyecto |
| `.env`, `.env.*` | Secretos |
| `.git/*`, `.gitignore` | Historial y config de git |
| `package.json`, `package-lock.json` | Dependencias/versiones (fingerprint) |
| `src/*` | Código fuente original no usado en producción |
| `*.map` | Source maps (expone código formateado) |
| `node_modules/*` | Dependencias |
| Páginas borrador (`catalogo.html`, `admin.html`...) | No publicadas |

### Patrón para varios `.md` en una regla

```toml
[[redirects]]
  from = "/*.md"
  to = "/404.html"
  status = 404
  force = true
```

### ⚠️ Lo que NO se puede bloquear

- `sitemap.xml` y `robots.txt` → **SEO las necesita**, dejarlas fuera del bloqueo
- `/.netlify/*` → Netlify **rechaza** redirects cuyo `from` empiece con `/.netlify`

### Verificación

Tras desplegar, comprobar con PowerShell o curl que devuelven 404:

```powershell
Invoke-WebRequest "https://<<dominio>>/README.md"  # → 404 esperado
Invoke-WebRequest "https://<<dominio>>/sitemap.xml" # → 200 esperado
```

## 3. Headers de caché

```toml
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
```

- HTML: cache corto (los cambios se ven de inmediato)
- CSS/JS: cache largo con `?v=` en el HTML → al cambiar el archivo, cambiar el `?v=` para forzar actualización (`styles.css?v=2`)

## 4. Buenas prácticas en el código

- **Sin secretos en frontend**: API keys, tokens, contraseñas → nunca en JS/HTML (el cliente ve el código fuente)
- **Sanitizar entradas** antes de insertar en el DOM:
  ```js
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  ```
- **Validar formularios** en cliente (y asumir que cualquiera puede enviar lo que quiera si hubiera backend)
- **`rel="noopener noreferrer"`** en todo `target="_blank"` (evita que la página abierta manipule la original)
- **`autocomplete`** correcto en inputs (`name`, `tel`, `email`) → mejora UX y accesibilidad
- **Contraste AA** en texto (WCAG): texto claro sobre fondo oscuro

## 5. HTTPS

- Netlify lo da gratis con dominio propio (certificado Let's Encrypt automático)
- Redirección HTTP → HTTPS automática
- No hace falta configurar nada; verificar que `http://` redirige a `https://`

## 6. Formularios → WhatsApp (patrón sin backend)

Para webs sin servidor, enviar todo a WhatsApp del negocio:

- Formulario valida en JS (formato RUT módulo 11, teléfono, etc.)
- Construye mensaje con `encodeURIComponent` y abre `https://wa.me/<<numero>>?text=...`
- **Ventaja de seguridad**: no hay backend que atacar, no se guardan datos personales en servidores
- **Contra**: el límite de URL (~2000 chars) → limitar longitud de campos

## 7. Auditoría antes de entregar

```powershell
# Archivos sensibles deben dar 404
foreach ($f in @("README.md",".env","package.json","app.js.map")) {
  try { Invoke-WebRequest "https://<<dominio>>/$f" | Out-Null; "FALLO (200): $f" } catch { "OK (404): $f" }
}

# Archivos SEO deben dar 200
foreach ($f in @("sitemap.xml","robots.txt")) {
  try { Invoke-WebRequest "https://<<dominio>>/$f" | Out-Null; "OK (200): $f" } catch { "FALLO: $f" }
}
```

- [ ] CSP sin errores de consola en producción
- [ ] Bloqueos 404 verificados
- [ ] sitemap/robots accesibles
- [ ] Sin secretos en el código fuente
- [ ] `noopener` en todos los enlaces externos
