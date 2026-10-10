// CarruselUsados.js — Inserta en <head> o como módulo
class CarruselUsados extends HTMLElement {
  async connectedCallback() {
    const res = await fetch('/src/data/usados.json');
    const items = (await res.json()).filter(u => u.disponible).slice(0, 4);
    this.innerHTML = `
      <div class="carrusel-track" role="list">
        ${items.map(u => this.card(u)).join('')}
      </div>
    `;
    this.addSwipe();
  }
  card(u) {
    const ahorro = u.precio_mercado ? Math.round((1 - u.precio_nosotros/u.precio_mercado)*100) : 0;
    const img = u.fotos?.[0]?.url || '/img/placeholder-notebook.jpg';
    const e = u.especificaciones || {};
    const specs = [
      e.procesador,
      e.ram,
      e.almacenamiento
    ].filter(Boolean);
    return `
      <article class="usado-card" role="listitem">
        <img src="${img}" alt="${u.titulo}" loading="lazy" />
        <div class="card-body">
          <span class="etiqueta">${u.etiqueta}</span>
          <h3 class="titulo-nb">${u.titulo}</h3>
          <p class="precios">
            ${u.precio_mercado ? `<span class="precio-ref">$${u.precio_mercado.toLocaleString()}</span>` : ''}
            <span class="precio-nosotros">$${u.precio_nosotros.toLocaleString()}</span>
            ${ahorro > 0 ? `<span class="ahorro">-${ahorro}%</span>` : ''}
          </p>
          ${specs.length ? `<ul class="specs-mini">${specs.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
          <a class="btn-wa" href="https://wa.me/56961991725?text=${encodeURIComponent(u.whatsapp_msg)}" target="_blank">
            Consultar por WhatsApp
          </a>
          <a class="btn-ver" href="/ficha.html?id=${u.id}">Ver ficha completa →</a>
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