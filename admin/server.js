const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PROJECT_DIR = path.resolve(__dirname, '..');
const PRODUCTOS_FILE = path.join(PROJECT_DIR, 'productos.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2,8) + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 8 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Solo imágenes'));
    cb(null, true);
  }
});

const app = express();
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

function loadProducts() {
  try { return JSON.parse(fs.readFileSync(PRODUCTOS_FILE, 'utf8')); }
  catch { return []; }
}

function saveProducts(data) {
  fs.writeFileSync(PRODUCTOS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'producto';
}

app.get('/api/productos', (req, res) => res.json(loadProducts()));

app.delete('/api/productos/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  const productos = loadProducts();
  if (idx < 0 || idx >= productos.length) return res.status(404).json({ error: 'Producto no encontrado' });
  const removed = productos.splice(idx, 1)[0];
  if (removed.img) {
    removed.img.split('|').forEach(f => {
      const fp = path.join(PROJECT_DIR, f);
      if (f && fs.existsSync(fp)) fs.unlinkSync(fp);
    });
  }
  saveProducts(productos);
  res.json({ ok: true });
});

app.post('/api/producto', upload.array('images', 8), (req, res) => {
  const nombre = (req.body.nombre || '').trim();
  if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
  const slug = slugify(nombre);
  const productos = loadProducts();
  const imgPrevias = (req.body.existingImages || '').split('|').filter(Boolean);

  const nuevas = [];
  if (req.files) {
    req.files.forEach((f, i) => {
      const ext = path.extname(f.originalname);
      const destName = `${slug}-${Date.now()}-${i}${ext}`;
      const destPath = path.join(PROJECT_DIR, destName);
      try {
        fs.copyFileSync(f.path, destPath);
        nuevas.push(destName);
        fs.unlinkSync(f.path);
      } catch (e) { console.error('Error copiando:', e); }
    });
  }

  const imgsFinal = [...imgPrevias, ...nuevas];

  if (req.body.index !== undefined && req.body.index !== '') {
    const idx = parseInt(req.body.index);
    if (idx >= 0 && idx < productos.length) {
      const old = productos[idx];
      if (old.img) {
        old.img.split('|').forEach(f => {
          if (f && !imgPrevias.includes(f)) {
            const fp = path.join(PROJECT_DIR, f);
            if (fs.existsSync(fp)) fs.unlinkSync(fp);
          }
        });
      }
      productos[idx] = {
        img: imgsFinal.join('|'),
        nombre,
        especificaciones: JSON.parse(req.body.especificaciones || '[]'),
        descripcion: (req.body.descripcion || '').trim(),
        precioTransferencia: (req.body.precioTransferencia || '').trim(),
        precioTarjeta: (req.body.precioTarjeta || '').trim(),
        wa: (req.body.wa || '').trim()
      };
    }
  } else {
    productos.push({
      img: imgsFinal.join('|'),
      nombre,
      especificaciones: JSON.parse(req.body.especificaciones || '[]'),
      descripcion: (req.body.descripcion || '').trim(),
      precioTransferencia: (req.body.precioTransferencia || '').trim(),
      precioTarjeta: (req.body.precioTarjeta || '').trim(),
      wa: (req.body.wa || '').trim()
    });
  }
  saveProducts(productos);
  res.json({ ok: true });
});

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin - HDD Tecnologia Store</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; color: #1e293b; }
header { background: linear-gradient(135deg,#0a1628,#1a2a4a); color: white; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.3rem; display: flex; align-items: center; gap: 10px; }
header h1 i { color: #2563eb; }
header .info { color: #94a3b8; font-size: .8rem; }
.container { max-width: 960px; margin: 0 auto; padding: 24px 16px; }
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border: none; border-radius: 8px; font-size: .9rem; font-weight: 600; cursor: pointer; text-decoration: none; transition: all .2s; }
.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover { background: #1d4ed8; }
.btn-danger { background: #ef4444; color: white; }
.btn-danger:hover { background: #dc2626; }
.btn-secondary { background: #e2e8f0; color: #475569; }
.btn-secondary:hover { background: #cbd5e1; }
.btn-sm { padding: 6px 12px; font-size: .8rem; }
.card { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.1); padding: 24px; margin-bottom: 20px; }
.card h2 { font-size: 1.1rem; margin-bottom: 16px; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: .85rem; font-weight: 600; color: #475569; margin-bottom: 4px; }
.form-group input, .form-group textarea { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: .9rem; transition: border .2s; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }
.form-group textarea { resize: vertical; min-height: 80px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.esp-item { display: flex; gap: 8px; margin-bottom: 8px; }
.esp-item input { flex: 1; }
.image-rows { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.img-row { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; }
.img-row img { width: 56px; height: 56px; object-fit: cover; border-radius: 6px; background: #f1f5f9; }
.img-row .name { flex: 1; font-size: .85rem; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.producto-card { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #e2e8f0; }
.producto-card:last-child { border-bottom: none; }
.producto-card .thumb { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; background: #e2e8f0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #94a3b8; }
.producto-card .info { flex: 1; min-width: 0; }
.producto-card .info h3 { font-size: .95rem; margin-bottom: 4px; }
.producto-card .info p { font-size: .8rem; color: #64748b; }
.producto-card .info .imgs { display: flex; gap: 4px; margin-top: 4px; flex-wrap: wrap; }
.producto-card .info .imgs img { width: 36px; height: 36px; object-fit: cover; border-radius: 4px; }
.producto-card .info .precios { font-size: .75rem; color: #94a3b8; margin-top: 4px; }
.producto-card .actions { display: flex; gap: 6px; align-items: flex-start; }
.toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; border-radius: 8px; color: white; font-weight: 600; font-size: .9rem; z-index: 1000; opacity: 0; transform: translateY(20px); transition: all .3s; }
.toast.show { opacity: 1; transform: translateY(0); }
.toast.success { background: #16a34a; }
.toast.error { background: #ef4444; }
.vacio { color: #94a3b8; text-align: center; padding: 20px; }
@media(max-width:600px){ .form-row { grid-template-columns: 1fr; } }
@media print { header { display: none; } }
</style>
</head>
<body>
<header>
  <h1><i class="fas fa-laptop"></i> Admin - Catálogo de Equipos</h1>
  <span class="info">Los productos se guardan en <strong>productos.json</strong> y las fotos se copian automáticamente</span>
</header>
<div class="container">
  <div class="card">
    <h2 id="formTitle"><i class="fas fa-plus-circle"></i> Nuevo Producto</h2>
    <form id="productForm" enctype="multipart/form-data">
      <input type="hidden" id="editIndex">
      <div class="form-row">
        <div class="form-group">
          <label>Nombre del equipo *</label>
          <input type="text" id="nombre" required placeholder="Ej: Lenovo ThinkPad T480">
        </div>
        <div class="form-group">
          <label>WhatsApp (texto, opcional)</label>
          <input type="text" id="wa" placeholder="Hola%2C%20quiero%20consultar%20por...">
        </div>
      </div>
      <div class="form-group">
        <label>Descripción *</label>
        <textarea id="descripcion" required placeholder="Describe el equipo..."></textarea>
      </div>
      <div class="form-group">
        <label>Especificaciones <button type="button" class="btn btn-secondary btn-sm" onclick="addEsp()"><i class="fas fa-plus"></i> Agregar</button></label>
        <div id="espList"></div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Precio Transferencia / Efectivo</label>
          <input type="text" id="precioTransferencia" placeholder="$219.990">
        </div>
        <div class="form-group">
          <label>Precio Débito / Crédito</label>
          <input type="text" id="precioTarjeta" placeholder="$249.990">
        </div>
      </div>
      <div class="form-group">
        <label>Fotos (máx. 8)</label>
        <input type="file" id="fileInput" accept="image/*" multiple style="display:none">
        <div id="imgList"></div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('fileInput').click()" style="margin-top:8px;"><i class="fas fa-camera"></i> Agregar fotos</button>
        <input type="hidden" id="existingImages">
      </div>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button type="submit" class="btn btn-primary" id="submitBtn"><i class="fas fa-save"></i> Guardar Producto</button>
        <button type="button" class="btn btn-secondary" onclick="resetForm()"><i class="fas fa-times"></i> Cancelar</button>
      </div>
    </form>
  </div>
  <div class="card">
    <h2><i class="fas fa-list"></i> Productos (<span id="productCount">0</span>)</h2>
    <div id="productList"></div>
  </div>
</div>
<div class="toast" id="toast"></div>

<script>
let newFiles = [];
let espId = 0;

function load() {
  fetch('/api/productos').then(r=>r.json()).then(lista => {
    const el = document.getElementById('productList');
    document.getElementById('productCount').textContent = lista.length;
    if (!lista.length) { el.innerHTML = '<div class="vacio">No hay productos aún</div>'; return; }
    el.innerHTML = lista.map((p,i) => {
      const imgs = p.img ? p.img.split('|') : [];
      const first = imgs[0] || '';
      return '<div class="producto-card">' +
        (first ? '<img class="thumb" src="/' + first + '" alt="">' : '<div class="thumb"><i class="fas fa-laptop"></i></div>') +
        '<div class="info">' +
        '<h3>' + esc(p.nombre) + '</h3>' +
        '<p>' + esc(p.descripcion.substring(0,80)) + (p.descripcion.length>80?'...':'') + '</p>' +
        (imgs.length>1 ? '<div class="imgs">' + imgs.map(f => '<img src="/'+f+'">').join('') + '</div>' : '') +
        '<div class="precios">Transf: ' + esc(p.precioTransferencia) + ' | Tarj: ' + esc(p.precioTarjeta) + '</div>' +
        '</div>' +
        '<div class="actions">' +
        '<button class="btn btn-primary btn-sm" onclick="edit('+i+')"><i class="fas fa-edit"></i></button>' +
        '<button class="btn btn-danger btn-sm" onclick="del('+i+')"><i class="fas fa-trash"></i></button>' +
        '</div></div>';
    }).join('');
  });
}

function esc(s) { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

function toast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast ' + type + ' show';
  setTimeout(() => t.classList.remove('show'), 3000);
}

function addEsp(val) {
  const id = 'esp_' + (espId++);
  const div = document.getElementById('espList');
  const item = document.createElement('div'); item.className = 'esp-item'; item.id = id;
  item.innerHTML = '<input type="text" class="esp-input" placeholder="Ej: 16GB RAM" value="' + esc(val||'') + '"><button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>';
  div.appendChild(item);
}
function getEsps() { return Array.from(document.querySelectorAll('.esp-input')).map(i=>i.value).filter(v=>v.trim()); }

function renderImgs() {
  const el = document.getElementById('imgList');
  const existing = document.getElementById('existingImages').value.split('|').filter(Boolean);
  el.innerHTML = '';
  existing.forEach((f,i) => {
    const row = document.createElement('div'); row.className = 'img-row';
    row.innerHTML = '<img src="/'+f+'"><span class="name">'+f+'</span><button type="button" class="btn btn-danger btn-sm" onclick="removeExisting('+i+')"><i class="fas fa-times"></i></button>';
    el.appendChild(row);
  });
  newFiles.forEach((f,i) => {
    const row = document.createElement('div'); row.className = 'img-row';
    row.innerHTML = '<img src="'+URL.createObjectURL(f)+'"><span class="name">'+f.name+'</span><button type="button" class="btn btn-danger btn-sm" onclick="removeNewFile('+i+')"><i class="fas fa-times"></i></button>';
    el.appendChild(row);
  });
}

function removeExisting(idx) {
  const arr = document.getElementById('existingImages').value.split('|').filter(Boolean);
  arr.splice(idx,1);
  document.getElementById('existingImages').value = arr.join('|');
  renderImgs();
}
function removeNewFile(idx) { newFiles.splice(idx,1); renderImgs(); }

document.getElementById('fileInput').addEventListener('change', function() {
  const existing = document.getElementById('existingImages').value.split('|').filter(Boolean).length;
  const maxNew = 8 - existing - newFiles.length;
  Array.from(this.files).slice(0, maxNew).forEach(f => newFiles.push(f));
  renderImgs();
  this.value = '';
});

function resetForm() {
  document.getElementById('editIndex').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('precioTransferencia').value = '';
  document.getElementById('precioTarjeta').value = '';
  document.getElementById('wa').value = '';
  document.getElementById('existingImages').value = '';
  document.getElementById('espList').innerHTML = '';
  document.getElementById('formTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Nuevo Producto';
  document.getElementById('submitBtn').innerHTML = '<i class="fas fa-save"></i> Guardar Producto';
  newFiles = [];
  renderImgs();
  addEsp();
}

document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  if (!nombre) { toast('El nombre es obligatorio', 'error'); return; }
  const fd = new FormData();
  fd.append('nombre', nombre);
  fd.append('descripcion', document.getElementById('descripcion').value.trim());
  fd.append('especificaciones', JSON.stringify(getEsps()));
  fd.append('precioTransferencia', document.getElementById('precioTransferencia').value.trim());
  fd.append('precioTarjeta', document.getElementById('precioTarjeta').value.trim());
  fd.append('wa', document.getElementById('wa').value.trim());
  fd.append('existingImages', document.getElementById('existingImages').value);
  const idx = document.getElementById('editIndex').value;
  if (idx) fd.append('index', idx);
  newFiles.forEach(f => fd.append('images', f));
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('submitBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
  fetch('/api/producto', { method: 'POST', body: fd }).then(r=>r.json()).then(r => {
    if (r.ok) { toast('Producto guardado!', 'success'); resetForm(); load(); }
    else toast('Error: ' + (r.error||'desconocido'), 'error');
  }).catch(() => toast('Error de conexión', 'error'))
  .finally(() => { document.getElementById('submitBtn').disabled = false; document.getElementById('submitBtn').innerHTML = '<i class="fas fa-save"></i> Guardar Producto'; });
});

function edit(idx) {
  fetch('/api/productos').then(r=>r.json()).then(lista => {
    const p = lista[idx]; if (!p) return;
    document.getElementById('editIndex').value = idx;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('descripcion').value = p.descripcion;
    document.getElementById('precioTransferencia').value = p.precioTransferencia;
    document.getElementById('precioTarjeta').value = p.precioTarjeta;
    document.getElementById('wa').value = p.wa || '';
    document.getElementById('existingImages').value = p.img || '';
    document.getElementById('espList').innerHTML = '';
    (p.especificaciones||[]).forEach(e => addEsp(e));
    if (!p.especificaciones || !p.especificaciones.length) addEsp();
    document.getElementById('formTitle').innerHTML = '<i class="fas fa-edit"></i> Editar: ' + esc(p.nombre.substring(0,40));
    document.getElementById('submitBtn').innerHTML = '<i class="fas fa-save"></i> Actualizar Producto';
    newFiles = []; renderImgs();
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

function del(idx) {
  if (!confirm('Eliminar este producto?')) return;
  fetch('/api/productos/'+idx, {method:'DELETE'}).then(r=>r.json()).then(r => {
    if (r.ok) { toast('Eliminado', 'success'); load(); }
    else toast('Error al eliminar', 'error');
  });
}

addEsp(); load();
</script>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin HDD corriendo en http://localhost:${PORT}`);
  console.log(`Directorio del proyecto: ${PROJECT_DIR}`);
});
