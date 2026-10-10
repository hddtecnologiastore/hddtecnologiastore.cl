const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'usados');
const outFile = path.join(__dirname, 'src', 'data', 'usados.json');

const items = [];
if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
    try {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      items.push(JSON.parse(raw));
    } catch (e) {
      console.warn('Skipping invalid JSON:', f, e.message);
    }
  }
}

fs.writeFileSync(outFile, JSON.stringify(items, null, 2), 'utf8');
console.log(`Merged ${items.length} notebook(s) into src/data/usados.json`);
