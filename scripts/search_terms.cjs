const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'scripts') continue;
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, filelist);
    } else if (/\.(js|jsx|ts|tsx|json|html|css|scss|md)$/.test(file)) {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const terms = ['oasis', 'whispers of edo', '53rd', 'netapp', 'snapchat', 'bits got latent'];
const allFiles = walk('.');
let foundCount = 0;

for (const f of allFiles) {
  if (f.includes('package-lock.json')) continue;
  const content = fs.readFileSync(f, 'utf8');
  for (const term of terms) {
    const re = new RegExp(term, 'gi');
    let match;
    while ((match = re.exec(content)) !== null) {
      console.log('Found ' + term + ' in ' + f + ': ' + content.substring(Math.max(0, match.index - 30), Math.min(content.length, match.index + 50)).replace(/\n/g, ' '));
      foundCount++;
    }
  }
}
console.log('Total found:', foundCount);
