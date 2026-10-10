export async function mostrarFicha(slug) {
  const res = await fetch('/src/data/usados.json');
  const items = await res.json();
  const u = items.find(x => x.slug === slug);
  if (!u) return location.href = '/usados.html';

  const ficha = document.getElementById('ficha-usado');
  ficha.hidden = false;
  document.getElementById('catalogo-usados').hidden = true;

  const specs = u.especificaciones || {};
  const sw = u.software_recomendado || [];

  ficha.innerHTML = `
    <article class="ficha-usado">
      <div class="ficha-top">
        <div class="galeria">
          <img id="img-main" src="${u.fotos?.[0] || '/img/placeholder.jpg'}" alt="${u.titulo}">
          <div class="thumbs">
            ${u.fotos.map((f,i)=>`<img src="${f}" data-idx="${i}" alt="Foto ${i+1}" loading="lazy">`).join('')}
          </div>
        </div>
        <aside class="resumen-cta">
          <span class="badge etiqueta">${u.etiqueta}</span>
          <span class="badge estado">${u.estado}</span>
          <h1>${u.titulo}</h1>
          <div class="precios">
            <strong class="precio-nuestro">$${u.precio_nosotros.toLocaleString()}</strong>
            ${u.precio_mercado ? `<span class="precio-mercado">$${u.precio_mercado.toLocaleString()}</span><span class="ahorro">-${Math.round((1-u.precio_nosotros/u.precio_mercado)*100)}%</span>` : ''}
          </div>
          <p class="resumen">${u.resumen}</p>
          <div class="confianza">
            <span>✅ Probado y verificado</span>
            <span>🛡️ Garantía 60 días</span>
            <span>📍 Retiro en Ñuñoa</span>
            <span>💬 Pago en local</span>
          </div>
          <a class="btn-wa-grande" href="https://wa.me/56961991725?text=${encodeURIComponent(u.whatsapp_msg)}" target="_blank">
            💬 Consultar por WhatsApp
          </a>
          <p class="disclaimer">Fotos reales del equipo exacto. Estado honesto, sin sorpresas.</p>
        </aside>
      </div>

      <div class="ficha-bottom">
        <section class="specs">
          <h2>Especificaciones Técnicas</h2>
          <dl>
            ${Object.entries(specs).map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}
          </dl>
          <p class="condicion">${u.condicion_detalle}</p>
        </section>

        <aside class="extras">
          ${u.software_recomendado?.length ? `
            <section class="software-rec">
              <h2>💡 Software recomendado para este equipo</h2>
              <ul>
                ${u.software_recomendado.map(s=>`<li><strong>${s.nombre}</strong> (${s.categoria}) — ${s.por_que}</li>`).join('')}
              </ul>
            </section>` : ''}
          <section class="confianza-extra">
            <h2>🛡️ Por qué comprar acá</h2>
            <ul>
              <li>20 años de experiencia · 1435 órdenes · 122 reseñas 5.0</li>
              <li>Diagnóstico honesto: te decimos lo bueno y lo malo</li>
              <li>Fotos reales del equipo exacto que recibes</li>
              <li>Prueba en local sin compromiso antes de pagar</li>
              <li>Garantía 60 días por escrito</li>
            </ul>
            <a href="https://g.page/hdd-tecnologia?review" target="_blank" class="btn-reseñas">Ver reseñas en Google Maps →</a>
          </section>
        </aside>
      </div>
    </article>
  `;

  // Swipe galería
  const main = ficha.querySelector('#img-main');
  ficha.querySelectorAll('.thumbs img').forEach(t => t.addEventListener('click', () => main.src = t.src));
  let sx=0, sl=0;
  const thumbs = ficha.querySelector('.thumbs');
  thumbs.addEventListener('touchstart', e=>{ sx=e.touches[0].pageX - thumbs.offsetLeft; sl=thumbs.scrollLeft; },{passive:true});
  thumbs.addEventListener('touchmove', e=>{ const x=e.touches[0].pageX - thumbs.offsetLeft; thumbs.scrollLeft=sl-(x-sx)*2; },{passive:true});
}