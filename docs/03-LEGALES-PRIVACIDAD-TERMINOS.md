# Legales: Privacidad, Términos y Cookies

Plantillas basadas en lo entregado en hddtecnologiastore.cl. **Adaptar siempre al caso real** y, para clientes importantes, validar con abogado.

> Referencia legal Chile: Ley 19.628 de Protección de Datos Personales y su nueva Ley 21.719 (regulación moderna de datos personales). Para Uniones Europeas, considerar RGPD/GDPR.

---

## 1. Política de Privacidad — estructura obligatoria

Toda web que recoja datos (aunque sea solo por WhatsApp/GA) necesita `privacidad.html`:

### Secciones mínimas

1. **Última actualización + identificación** (nombre, dirección, teléfono)
2. **Qué datos tratamos**
   - Formularios: nombre, teléfono, mensaje, empresa/RUT si aplica
   - Google Analytics: navegación anónima
   - No pedir datos sensibles (RUT con solo dígitos + dígito verificador está bien; evitar datos de salud/pagos salvo estricto necesario)
3. **Para qué los usamos** (responder solicitud, coordinar servicio, emitir presupuesto, garantía)
4. **Base legal / consentimiento** (envío del formulario, contacto voluntario por WhatsApp; revocable en cualquier momento)
5. **Con quién los compartimos** — ser honesto:
   - Google (Analytics) → anonimizado
   - WhatsApp/Meta → el mensaje viaja por esa plataforma
   - **No** marketing a terceros sin consentimiento
6. **Derechos ARCO** (Acceso, Rectificación, Cancelación, Oposición) + cómo ejercerlos (WhatsApp, dirección, plazo de respuesta: 10 días hábiles)
7. **Seguridad** — HTTPS, CSP, sanitización, sin claves en frontend
8. **Cookies** — ¡listar las REALES!
9. **Menores** — servicio para mayores de 18
10. **Contacto** — teléfono, WhatsApp, email

### ⚠️ Errores reales a evitar

- ❌ Decir "no usamos cookies" **teniendo Google Analytics** → mentira legal. Las cookies de GA (`_ga`, `_ga_*`) deben declararse con su finalidad.
- ❌ Declarar herramientas que no se usan
- ❒ Olvidar actualizar tras instalar/quitar herramientas de tracking

### Plantilla sección cookies (si hay GA4)

```html
<h3>7. Cookies</h3>
<p>Usamos cookies propias y de terceros para el funcionamiento del sitio y medición de audiencia:</p>
<ul>
<li><b>Google Analytics (GA4)</b>: cookies <code>_ga</code>, <code>_ga_*</code> para medir de forma anónima
    las visitas. No se usa para publicidad ni se comparte con terceros.</li>
<li><b>Almacenamiento local</b>: recuerda idioma y avisos cerrados.</li>
</ul>
<p>No usamos cookies publicitarias. Puedes eliminarlas desde la configuración de tu navegador sin
que afecte el uso del sitio.</p>
```

## 2. Términos y Aviso Legal — estructura

`terminos.html`:

1. **Identificación** — negocio, responsable, dirección, teléfono + aclaración clave:
   > "Servicio técnico independiente, no representante oficial de marcas. 'Todas las marcas' se refiere a capacidad técnica, no a vínculo comercial."
   (Evita problemas legales al decir "atendemos todas las marcas")
2. **Servicios y garantía** — qué cubre, plazos, qué la anula (daño líquido, manipulación de terceros)
3. **Presupuestos y pagos** — validez, formas de pago
4. **Limitación de responsabilidad** — daños en datos (responsabilidad del cliente hacer respaldos), retrasos por repuestos
5. **Propiedad intelectual** — marca y contenido propios
6. **Ley aplicable y jurisdicción** — tribunales de <<ciudad>>, Chile
7. **Contacto**

## 3. Barra de cookies (aviso visible)

Patrón completo (CSS + JS + **HTML** — los tres deben existir):

### HTML (antes de `</body>`)

```html
<div id="cookieBar" role="region" aria-label="Aviso de cookies">
  <span>Usamos cookies propias y de Google Analytics para mejorar tu experiencia y
  medir el tráfico. Al continuar, aceptas su uso.
  <a href="privacidad.html">Más información</a>.</span>
  <button id="cookieOk" class="btn primary">Entendido</button>
</div>
```

### CSS

```css
#cookieBar{position:fixed;bottom:0;left:0;right:0;background:rgba(5,11,24,.96);
  border-top:1px solid var(--line);padding:12px 16px;display:flex;gap:12px;
  align-items:center;justify-content:center;flex-wrap:wrap;z-index:260;
  font-size:12px;color:var(--mut);transform:translateY(100%);transition:.3s}
#cookieBar.show{transform:none}
#cookieBar a{color:var(--acc)}
```

### JS

```js
(function(){
  var bar=document.getElementById("cookieBar"), ok=document.getElementById("cookieOk");
  if(!bar||!ok)return;
  try{ if(localStorage.getItem("cookie_ok")==="1") return; }catch(e){}
  bar.classList.add("show");
  ok.addEventListener("click",function(){
    try{ localStorage.setItem("cookie_ok","1"); }catch(e){}
    bar.classList.remove("show");
  });
})();
```

> 🔍 **Lección real**: en este proyecto existían el CSS y el JS pero **faltaba el HTML** → el script hacía `return` silencioso y la barra nunca aparecía. Siempre verificar los tres archivos.

### Persistencia

- `localStorage` en vez de cookie para el estado "aceptado" (más simple)
- La barra NO debe volver en cada visita tras aceptar

## 4. Enlaces legales en formularios

Todo formulario que envíe datos debe incluir:

```html
<p style="font-size:11px">Al enviar aceptas <a href="privacidad.html">privacidad</a> y <a href="terminos.html">términos</a>.</p>
```

- Modales de servicio
- Agendamiento / booking
- Cotizaciones

## 5. Footer legal

En el footer de **todas** las páginas:

```html
© 2026 <<Marca>> — <a href="privacidad.html">Privacidad</a> · <a href="terminos.html">Términos</a>
```

## 6. Meta robots para páginas legales y 404

- Legales: indexables (ayudan a transparencia y confianza)
- `404.html`: `<meta name="robots" content="noindex">`

## 7. Imprimir el aviso de cookies según herramientas

Si el sitio usa **solo** GA4 con medición anónima y sin publicidad → basta el aviso informativo (patrón de arriba).

Si en el futuro se agregan **cookies publicitarias, píxeles de Facebook Ads o remarketing** → avisar además con botón de "Aceptar / Rechazar" real y no cargar el píxel antes del aceptar (modo consent mode de Google).

## 8. Checklist legal antes de entregar

- [ ] `privacidad.html` completa y VERDADERA (coincide con las herramientas reales)
- [ ] `terminos.html` con identificación + garantía + jurisdicción
- [ ] Sección de cookies actualizada (si hay GA, mencionar GA)
- [ ] Barra de cookies visible en navegador (probar en pestaña anónima + localStorage limpio)
- [ ] Enlaces legales en todos los formularios
- [ ] Footer con ambos enlaces en todas las páginas
- [ ] Fecha de última actualización visible
- [ ] Teléfono/WhatsApp de contacto funcionando
