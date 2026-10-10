// CarruselUsados.js — Inserta en <head> o como módulo
class CarruselUsados extends HTMLElement {
  async connectedCallback() {
    const res = await fetch('/src/data/usados.json');
    const items = (await res.json()).filter(u => u.disponible).slice(0, 4);
    this.innerHTML = `
      <section class="carrusel-usados">
        <h2>Notebooks Reacondicionados Destacados</h2>
        <div class="carrusel-track" role="list">
          ${items.map(u => this.card(u)).join('')}
        </div>
      </section>
    `;
    this.addSwipe();
  }
  card(u) {
    const ahorro = u.precio_mercado ? Math.round((1 - u.precio_nosotros/u.precio_mercado)*100) : 0;
    const img = u.fotos?.[0] || '/img/placeholder-notebook.jpg';
    return `
      <article class="usado-card" role="listitem">
        <img src="${img}" alt="${u.titulo}" loading="lazy" />
        <div class="card-body">
          <span class="etiqueta">${u.etiqueta}</span>
          <h3>${u.titulo}</h3>
          <p class="precios">
            <strong>$${u.precio_nosotros.toLocaleString()}</strong>
            ${u.precio_mercado ? `<span class="tachado">$${u.precio_mercado.toLocaleString()}</span> <span class="ahorro">-${Math.round((1-u.precio_nosotros/u.precio_mercado)*100)}%</span>` : ''}
          </p>
          <p class="resumen">${u.resumen}</p>
          <a class="btn-wa" href="https://wa.me/56961991725?text=${encodeURIComponent(u.whatsapp_msg)}" target="_blank">
            Consultar por WhatsApp
          </a>
          <a class="btn-ver" href="/usados/${u.slug}/">Ver ficha completa →</a>
        </div>
      </article>
    `;
  }
  addSwipe() {
    const track = this.querySelector('.carrusel-track');
    let startX = 0, scrollLeft = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].pageX - track.offsetLeft; scrollLeft = track.scrollLeft; }, {passive: true});
    track.addEventListener('touchmove', e => { const x = e.touches[0].pageX - track.offsetLeft; track.scrollLeft = scrollLeft - (x - startX) * 2; }, {passive: true});
  }
}
customElements.define('carrusel-usados', CarruselUsados);