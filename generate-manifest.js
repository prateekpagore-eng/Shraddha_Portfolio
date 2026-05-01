const fs = require('fs');
const path = require('path');

const exts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

function scanDir(dirName, outFile, exclude) {
  const dir = path.join(__dirname, dirName);
  const out = path.join(__dirname, outFile);
  let files = [];
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir)
      .filter(f =>
        exts.has(path.extname(f).toLowerCase()) &&
        !f.startsWith('.') &&
        !(exclude || []).includes(f)
      )
      .sort()
      .map(f => dirName + '/' + f);
  }
  fs.writeFileSync(out, JSON.stringify(files, null, 2));
  console.log(outFile + ' written with', files.length, 'images');
}

scanDir('AFK detour images', 'afk-manifest.json');
scanDir('playground-images', 'playground-manifest.json', ['thumbnail.png']);
