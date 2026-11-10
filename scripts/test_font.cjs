const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const fontPath = path.resolve('public/fonts/japanRamen.woff2');
const fontB64 = fs.readFileSync(fontPath).toString('base64');

const svg = `
<svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Japan Ramen';
        src: url('data:font/woff2;base64,${fontB64}') format('woff2');
      }
      .japanese-text {
        font-family: 'Japan Ramen', 'Impact', sans-serif;
        font-size: 52px;
        font-weight: 900;
        fill: #FFFFFF;
        stroke: #000000;
        stroke-width: 8px;
        paint-order: stroke fill;
        stroke-linejoin: round;
        stroke-linecap: round;
      }
    </style>
  </defs>
  <text x="250" y="80" class="japanese-text" text-anchor="middle">MANAGE</text>
  <text x="250" y="150" class="japanese-text" text-anchor="middle">MENT</text>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile('scripts/test_font.png')
  .then(() => console.log('Rendered test_font.png successfully!'))
  .catch(console.error);

