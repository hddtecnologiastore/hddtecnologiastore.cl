# 📊 INFORME 10 DÍAS — Fecha objetivo: **13 oct 2026**

**Cómo usar este documento:** el 13/10/2026 (o después) abrir opencode en `C:\Users\PC\Desktop\HDD` y decir:

> **"Ejecuta el informe de 10 días"**

El agente ejecuta la Sección A (automática), te entrega la plantilla de la Sección B llena con lo que pueda verificar, y tú completas lo que requiere tus logins. Todo esto se revisó/aplicó el **03-10-2026**.

---

## Sección A — Verificación automática (la ejecuta el agente)

Checklist de estado del sitio + presencia de lo instalado:

- [ ] Home responde 200 y `<title>` = `Servicio Técnico Notebooks y PCs en Ñuñoa | HDD Tecnología Store`
- [ ] `og:title` y `twitter:title` = mismo title
- [ ] Meta description intacta (la original, sin tocar)
- [ ] `terminos.html` y `privacidad.html` → 200
- [ ] `catalogo.html` → 404 (eliminado por decisión del cliente)
- [ ] `sitemap.xml` → 200 con 3 URLs | `robots.txt` → `Allow: /`, sin `noindex` en home
- [ ] CSP viva con dominios GA4 (4) + Clarity (script-src y connect-src)
- [ ] Chrome headless: **0 violaciones CSP, 0 errores JS**
- [ ] GA4 gtag (`G-911W1R6JG0`) presente en home
- [ ] Clarity (`ys3iggtq4i`) presente en home + recibiendo hits (net-log)
- [ ] Cookie bar HTML existe y menciona GA + Clarity
- [ ] Git: último commit = deploy activo (`git log --oneline -3` vs último deploy Netlify)

### Búsqueda en Google (websearch)
- [ ] Buscar: `site:hddtecnologiastore.cl` → ¿cuántas páginas indexadas? (esperado: home + privacidad + terminos)
- [ ] Buscar: `servicio técnico notebooks ñuñoa` (o `servicio tecnico pc santiago`) → ¿aparece la web? ¿con el **nuevo title** o el viejo?
- [ ] Estado del sitemap en Search Console (pedir captura al cliente o verificar estado "Éxito")

---

## Sección B — Métricas a revisar (requiere logins del cliente)

Plantilla para que el cliente complete (o pegue capturas). **Pedir estas 4 capturas:**

### 1. GA4 (analytics.google.com) — propiedad 547876179
| Métrica | Valor (03-10 al 13-10) | Esperado |
|---|---|---|
| Usuarios totales | | > 0 (¡antes era 0!) |
| Páginas vistas | | |
| `page_view` eventos | | coincide con vistas |
| `whatsapp_click` total | | ≥ 1 por cada 10-20 visitas |
| Por `event_label` (float/header/promo/footer) | | ¿cuál convierte más? |
| Fuentes de tráfico (Organic/Social/Direct) | | ver crecimiento de orgánico |

### 2. Google Search Console — propiedad `https://hddtecnologiastore.cl/`
| Métrica | Valor | Esperado |
|---|---|---|
| Clics (7 días) | | > 0 |
| Impresiones | | > 0 y creciendo |
| CTR | | — |
| Posición promedio | | < 50 al inicio |
| Consultas top | | ¿aparece "servicio técnico" / "reparación notebook"? |
| Páginas indexadas | | 3 (home, términos, privacidad) |
| Estado sitemap | | Éxito (no "No se ha podido obtener") |

### 3. Google Ads — cuenta 675-412-6264
| Métrica | Valor | Esperado |
|---|---|---|
| Conversiones `whatsapp_click` registradas | | primera conversión importada |
| Clics / impresiones / CTR | | — |
| CPC promedio | | — |
| Costo por conversión | | primer dato de ROI |

### 4. Microsoft Clarity (`ys3iggtq4i`)
| Métrica | Valor | Observación |
|---|---|---|
| Sesiones totales | | |
| Páginas/sesión | | |
| % rebote | | |
| Grabaciones disponibles | | ¿ver 2-3 para insights? |
| Heatmap scroll (home) | | ¿hasta dónde llegan? ¿ven CTA WhatsApp? |
| Páginas con más salida | | posible problema de contenido |

---

## Sección C — Insights y acción (agente + cliente)

Preguntas que el informe debe responder:

1. **¿GA4 recibió datos desde el fix de CSP?** (era 0 antes del 03-10)
2. **¿La primera conversión de Ads apareció?** (clic WhatsApp → conversión importada)
3. **¿Google tomó el nuevo title?** (si no → repetir solicitud de indexación)
4. **¿De dónde llega el tráfico orgánico?** (Search Console consultas)
5. **¿Los usuarios hacen clic en WhatsApp?** (si no → revisar CTA/heatmap de Clarity)
6. **Acciones concretas** para el próximo ciclo (ej: crear contenido, ajustar title si CTR bajo, presupuesto Ads)

---

## Histórico de intervenciones (03-10-2026)

| # | Cambio | Commit |
|---|---|---|
| 1 | CSP: 4 dominios de recolección GA4 a connect-src (GA4 no recibía datos) | `1d70776` |
| 2 | Conversión Ads vía importación GA4 (`whatsapp_click` como evento clave) | interfaz (sin código) |
| 3 | Microsoft Clarity instalado (5 páginas + CSP + privacidad + cookies) | `271d739` |
| 4 | Catálogo eliminado — web 100% informativa | `01ec29d` |
| 5 | Nuevo title SEO + og/twitter + document.title i18n | `ddbbcef` |
| 6 | Indexación solicitada en Search Console (cola prioritaria) | interfaz |
| 7 | Netlify: créditos de cuenta agotados → repuestos por el cliente | infra |

## Pendientes / futuro

- [ ] **Meta Pixel**: solo el día que se pauta en Instagram/Facebook (revisar playbook 04)
- [ ] **Productos**: si se retoma, crear pestaña nueva (no resucitar el catálogo viejo)
- [ ] **Revisión 10 días** → este informe
- [ ] **Revisión 30 días**: decidir si conviene blog/contenido SEO local ("reparación notebook Ñuñoa")
