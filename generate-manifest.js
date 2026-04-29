const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'AFK detour images');
const out = path.join(__dirname, 'afk-manifest.json');

const exts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

let files = [];
if (fs.existsSync(dir)) {
  files = fs.readdirSync(dir)
    .filter(f => exts.has(path.extname(f).toLowerCase()) && !f.startsWith('.'))
    .sort()
    .map(f => 'AFK detour images/' + f);
}

fs.writeFileSync(out, JSON.stringify(files, null, 2));
console.log('afk-manifest.json written with', files.length, 'images');
