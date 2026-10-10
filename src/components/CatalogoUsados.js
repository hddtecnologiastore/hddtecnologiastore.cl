export async function cargarCatalogo() {
  const res = await fetch('/src/data/usados.json');
  const items = (await res.json()).filter(u => u.disponible);
  const grid = document.getElementById('catalogo-usados');
  grid.innerHTML = items.map(u => `
    <article class="usado-card">
      <img src="${u.fotos?.[0] || '/img/placeholder.jpg'}" alt="${u.titulo}" loading="lazy">
      <div class="card-body">
        <span class="etiqueta">${u.etiqueta}</span>
        <h3><a href="/usados/${u.slug}/">${u.titulo}</a></h3>
        <p class="precios"><strong>$${u.precio_nosotros.toLocaleString()}</strong></p>
        <p class="estado">${u.estado} · ${u.etiqueta}</p>
        <a class="btn-wa" href="https://wa.me/56961991725?text=${encodeURIComponent(u.whatsapp_msg)}" target="_blank">Consultar por WhatsApp</a>
      </div>
    </article>
  `).join('');
}