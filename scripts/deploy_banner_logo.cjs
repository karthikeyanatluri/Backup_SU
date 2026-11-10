const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const imagesDir = path.resolve('public/images');
  const isolatedPng = path.join(imagesDir, 'supragna_banner_isolated.png');

  if (!fs.existsSync(isolatedPng)) {
    throw new Error('isolatedPng not found');
  }

  const pngBuf = fs.readFileSync(isolatedPng);

  // 1. Save supragna_logo_clean.png
  fs.writeFileSync(path.join(imagesDir, 'supragna_logo_clean.png'), pngBuf);

  // 2. Save supragna_logo_clean.webp
  const webpBuf = await sharp(pngBuf)
    .webp({ quality: 98, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(imagesDir, 'supragna_logo_clean.webp'), webpBuf);

  // 3. Save supragna_banner_isolated.webp
  fs.writeFileSync(path.join(imagesDir, 'supragna_banner_isolated.webp'), webpBuf);

  console.log('Saved all clean logo and banner formats successfully!');
}

run().catch(console.error);

