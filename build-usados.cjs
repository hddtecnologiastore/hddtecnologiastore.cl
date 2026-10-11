const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'usados');
const outFile = path.join(__dirname, 'src', 'data', 'usados.json');

function normalizeFotos(item) {
  if (!Array.isArray(item.fotos)) return item;
  const flat = [];
  for (const foto of item.fotos) {
    if (!foto) continue;
    if (Array.isArray(foto.url)) {
      for (const u of foto.url) if (typeof u === 'string' && u) flat.push({ url: u });
    } else if (typeof foto.url === 'string' && foto.url) {
      flat.push({ url: foto.url });
    } else if (typeof foto === 'string' && foto) {
      flat.push({ url: foto });
    }
  }
  item.fotos = flat;
  return item;
}

const items = [];
if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
    try {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      items.push(normalizeFotos(JSON.parse(raw)));
    } catch (e) {
      console.warn('Skipping invalid JSON:', f, e.message);
    }
  }
}

fs.writeFileSync(outFile, JSON.stringify(items, null, 2), 'utf8');
console.log(`Merged ${items.length} notebook(s) into src/data/usados.json`);
