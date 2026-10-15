# Security — HDD Tecnología Store

Postura segura por defecto. Sitio estático en Netlify + Netlify Identity.

## Superficie pública

- **Sitio**: `https://hddtecnologiastore.cl` (estático, sin backend propio).
- **CMS**: `/admin` (Netlify CMS + Netlify Identity).

## Controles activos (verificados 11-10-2026)

### Headers globales (`netlify.toml`)
- HSTS `max-age=31536000`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Content-Security-Policy` (default-src self; frame-ancestors none; form-action restringido)
- `Referrer-Policy`, `Permissions-Policy`, COOP/CORP same-origin
- `/admin/*` extra: `Cache-Control: no-store`, `Referrer-Policy: no-referrer`,
  **`Cross-Origin-Opener-Policy: same-origin-allow-popups`** (excepción obligatoria:
  con `same-origin`, Chrome corta `window.opener` de la ventana de login del Media
  Library de Cloudinary y el flujo se colgaba en "Redirecting to Media Library...".
  Validado 15-10-2026 con prueba controlada. El resto del sitio mantiene `same-origin`.)

### Archivos bloqueados (404 forzado con `force = true`)
`server.js`, `package.json`, `build-usados.cjs`, `vite.config.js`, `postcss.config.js`,
`tailwind.config.js`, `SECURITY.md`, `README.md`, `docs/*`, `.github/*`, `.git/*`, `.env`

### Autenticación del CMS (`/admin`)
- Netlify Identity + Git Gateway: sin sesión → **401** en git-gateway y API admin.
- **Registro cerrado**: función `netlify/functions/identity-validate.mjs` niega todo
  signup salvo los correos de `IDENTITY_ALLOW_EMAILS` (env var). Verificado: signup
  ajeno → 422 bloqueado; webhook recibe email y allowlist.
- Recomendación Netlify UI: Identity → Registration → **Invite only** (cierre de doble capa).

### Código
- XSS: render con `esc()`; formularios rechazan `<>`; WhatsApp con `encodeURIComponent`.
- Validación: nombre 2-60 letras, teléfono `9xxxxxxxx`, RUT módulo 11, `q` allowlist 100 chars.
- Traversal: `server.js` valida `fp.startsWith(ROOT)` (solo uso local; bloqueado en producción).
- Secretos: `.env` ignorado; sin tokens ni claves en el código del sitio.

## Conocido / aceptado

- **Cloudinary `api_key`** en `admin/config.yml`: requerida por el Media Library de
  Netlify CMS (unsigned upload). No da acceso de lectura/eliminación de assets;
  para endurecer: habilitar *Signed uploads* en consola de Cloudinary.
- **`GOOGLE_API_KEY`** en env vars de Netlify: sin uso en el código (candidato a eliminar).
- **Email**: registro permitido solo para `IDENTITY_ALLOW_EMAILS`.

## Reporte

Contacto: +56 9 6199 1725 / Av. Rodrigo de Araya 3076, Ñuñoa.
