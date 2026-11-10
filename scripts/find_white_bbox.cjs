const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function findWhiteBBox(filePath) {
  const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  let count = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = info.channels === 4 ? data[idx+3] : 255;
      if (r > 220 && g > 220 && b > 220 && a > 200) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        count++;
      }
    }
  }
  return { minX, maxX, minY, maxY, count, width: info.width, height: info.height };
}

async function run() {
  const dir = path.join(__dirname, '..', 'public', 'images', 'events');
  const files = [
    'drama.webp', 'DramaMobile.webp',
    'music.webp', 'MusicMobile.webp',
    'photography.webp', 'PhotographyMobile.webp',
    'dance.webp', 'DanceMobile.webp',
    'misc.webp', 'MiscMobile.png'
  ];

  for (const f of files) {
    const res = await findWhiteBBox(path.join(dir, f));
    console.log(f, `${res.width}x${res.height}`, `x: ${res.minX}..${res.maxX}, y: ${res.minY}..${res.maxY} (pixels: ${res.count})`);
  }
}

run().catch(console.error);

