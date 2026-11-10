const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const eventsDir = path.resolve(__dirname, '../public/images/events');
const cleanDir = path.join(eventsDir, 'clean_base');
const fontPath = path.resolve(__dirname, '../public/fonts/japanRamen.woff2');
const fontB64 = fs.readFileSync(fontPath).toString('base64');

function buildSVG(width, height, content) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @font-face {
          font-family: 'Japan Ramen';
          src: url('data:font/woff2;base64,${fontB64}') format('woff2');
        }
        .japan-title {
          font-family: 'Japan Ramen', 'Impact', sans-serif;
          font-weight: 900;
          fill: #FFFFFF;
          stroke: #0a0a0a;
          stroke-width: 8px;
          paint-order: stroke fill;
          stroke-linejoin: round;
          stroke-linecap: round;
          text-anchor: middle;
          dominant-baseline: central;
        }
      </style>
      <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.9"/>
      </filter>
    </defs>
    <g filter="url(#textGlow)">
      ${content}
    </g>
  </svg>
  `;
}

async function renderItem(baseName, outName, width, height, content, isPng = false) {
  const baseImgPath = path.join(cleanDir, baseName + '.png');
  const outImgPath = path.join(eventsDir, outName);

  const baseBuf = fs.readFileSync(baseImgPath);
  const svg = buildSVG(width, height, content);
  const svgBuf = Buffer.from(svg);

  let pipeline = sharp(baseBuf).composite([{ input: svgBuf, top: 0, left: 0 }]);
  if (isPng) {
    const buf = await pipeline.png().toBuffer();
    fs.writeFileSync(outImgPath, buf);
  } else {
    const buf = await pipeline.webp({ quality: 95 }).toBuffer();
    fs.writeFileSync(outImgPath, buf);
  }
  console.log(`Rendered aligned: ${outName}`);
}

async function run() {
  // 1. photography.webp (592 x 741) -> MANAGEMENT (Center Fan Blade - Perfectly Centered, Single Line)
  await renderItem('photography', 'photography.webp', 592, 741, `
    <text x="296" y="140" class="japan-title" font-size="44" letter-spacing="3.5">MANAGEMENT</text>
  `);

  // PhotographyMobile.webp (545 x 516)
  await renderItem('PhotographyMobile', 'PhotographyMobile.webp', 545, 516, `
    <text x="272" y="130" class="japan-title" font-size="40" letter-spacing="2.5">MANAGEMENT</text>
  `);

  // 2. drama.webp (627 x 596) -> ENGINEERING (Bottom-Left Fan Blade - Symmetrical with Law at y=535)
  await renderItem('drama', 'drama.webp', 627, 596, `
    <text x="335" y="535" class="japan-title" font-size="46" letter-spacing="2.5">ENGINEERING</text>
  `);

  // DramaMobile.webp (467 x 686)
  await renderItem('DramaMobile', 'DramaMobile.webp', 467, 686, `
    <text x="235" y="550" class="japan-title" font-size="40" letter-spacing="2">ENGINEERING</text>
  `);

  // 3. music.webp (809 x 866) -> SCIENCE (Top-Left Fan Blade - Symmetrical with Commerce)
  await renderItem('music', 'music.webp', 809, 866, `
    <g transform="translate(565, 595) rotate(-38)">
      <text x="0" y="0" class="japan-title" font-size="46" letter-spacing="3">SCIENCE</text>
    </g>
  `);

  // MusicMobile.webp (523 x 516)
  await renderItem('MusicMobile', 'MusicMobile.webp', 523, 516, `
    <text x="325" y="55" class="japan-title" font-size="44" letter-spacing="2.5">SCIENCE</text>
  `);

  // 4. dance.webp (809 x 871) -> COMMERCE (Top-Right Fan Blade - Symmetrical with Computing)
  await renderItem('dance', 'dance.webp', 809, 871, `
    <g transform="translate(265, 575) rotate(38)">
      <text x="0" y="0" class="japan-title" font-size="46" letter-spacing="3">COMMERCE</text>
    </g>
  `);

  // DanceMobile.webp (468 x 670)
  await renderItem('DanceMobile', 'DanceMobile.webp', 468, 670, `
    <text x="290" y="145" class="japan-title" font-size="46" letter-spacing="2.5">COMMERCE</text>
  `);

  // 5. misc.webp (627 x 605) -> LAW (Bottom-Right Fan Blade - Symmetrical with Engineering at y=535)
  await renderItem('misc', 'misc.webp', 627, 605, `
    <text x="200" y="535" class="japan-title" font-size="56" letter-spacing="4">LAW</text>
  `);

  // MiscMobile.png (400 x 433)
  await renderItem('MiscMobile', 'MiscMobile.png', 400, 433, `
    <text x="300" y="50" class="japan-title" font-size="52" letter-spacing="4">LAW</text>
  `, true);

  console.log('All event blades aligned and rendered with precision!');
}

run().catch(console.error);
