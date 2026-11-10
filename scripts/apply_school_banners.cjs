const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'images', 'events');
const backupDir = path.join(dir, 'backup');

function createBannerSVG(width, height, innerSVG) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF5C0"/>
        <stop offset="50%" stop-color="#F2DD7C"/>
        <stop offset="100%" stop-color="#997A15"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.95"/>
      </filter>
    </defs>
    ${innerSVG}
  </svg>`;
}

async function processImage(fileName, width, height, innerSVG, isPng = false) {
  const srcFile = path.join(backupDir, fileName);
  const dstFile = path.join(dir, fileName);

  const baseBuf = fs.readFileSync(srcFile);
  const svg = createBannerSVG(width, height, innerSVG);
  const svgBuf = Buffer.from(svg);

  let pipeline = sharp(baseBuf).composite([{ input: svgBuf, top: 0, left: 0 }]);
  if (isPng) {
    const out = await pipeline.png().toBuffer();
    fs.writeFileSync(dstFile, out);
  } else {
    const out = await pipeline.webp({ quality: 95 }).toBuffer();
    fs.writeFileSync(dstFile, out);
  }
  console.log('Updated:', fileName);
}

async function run() {
  // 1. drama.webp (627 x 596) - School of Engineering
  await processImage('drama.webp', 627, 596, `
    <g filter="url(#shadow)" transform="translate(60, 485)">
      <rect x="0" y="0" width="507" height="95" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <rect x="4" y="4" width="499" height="87" rx="6" fill="none" stroke="rgba(242, 221, 124, 0.3)" stroke-width="1" stroke-dasharray="6 3"/>
      <circle cx="12" cy="12" r="3" fill="#F2DD7C"/>
      <circle cx="495" cy="12" r="3" fill="#F2DD7C"/>
      <circle cx="12" cy="83" r="3" fill="#F2DD7C"/>
      <circle cx="495" cy="83" r="3" fill="#F2DD7C"/>
      <text x="253" y="50" font-family="'Cinzel', 'Japan Ramen', 'Times New Roman', serif" font-weight="900" font-size="34" letter-spacing="5" fill="#FFFFFF" stroke="#000" stroke-width="1.5" text-anchor="middle">ENGINEERING</text>
      <text x="253" y="78" font-family="'Cinzel', serif" font-weight="700" font-size="14" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF ENGINEERING</text>
    </g>
  `);

  // DramaMobile.webp (467 x 686)
  await processImage('DramaMobile.webp', 467, 686, `
    <g filter="url(#shadow)" transform="translate(25, 475)">
      <rect x="0" y="0" width="417" height="95" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <text x="208" y="50" font-family="'Cinzel', serif" font-weight="900" font-size="30" letter-spacing="4" fill="#FFFFFF" text-anchor="middle">ENGINEERING</text>
      <text x="208" y="78" font-family="'Cinzel', serif" font-weight="700" font-size="13" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF ENGINEERING</text>
    </g>
  `);

  // 2. music.webp (809 x 866) - School of Computing & Science
  await processImage('music.webp', 809, 866, `
    <g filter="url(#shadow)" transform="translate(505, 665) rotate(-42)">
      <rect x="-245" y="-48" width="490" height="96" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <rect x="-241" y="-44" width="482" height="88" rx="6" fill="none" stroke="rgba(242, 221, 124, 0.3)" stroke-width="1" stroke-dasharray="6 3"/>
      <circle cx="-233" cy="-36" r="3" fill="#F2DD7C"/>
      <circle cx="233" cy="-36" r="3" fill="#F2DD7C"/>
      <circle cx="-233" cy="36" r="3" fill="#F2DD7C"/>
      <circle cx="233" cy="36" r="3" fill="#F2DD7C"/>
      <text x="0" y="3" font-family="'Cinzel', 'Japan Ramen', serif" font-weight="900" font-size="32" letter-spacing="4" fill="#FFFFFF" stroke="#000" stroke-width="1.5" text-anchor="middle">COMPUTING</text>
      <text x="0" y="30" font-family="'Cinzel', serif" font-weight="700" font-size="13" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF COMPUTING &amp; SCIENCE</text>
    </g>
  `);

  // MusicMobile.webp (523 x 516)
  await processImage('MusicMobile.webp', 523, 516, `
    <g filter="url(#shadow)" transform="translate(20, 15)">
      <rect x="0" y="0" width="483" height="85" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <text x="241" y="46" font-family="'Cinzel', serif" font-weight="900" font-size="28" letter-spacing="4" fill="#FFFFFF" text-anchor="middle">COMPUTING</text>
      <text x="241" y="70" font-family="'Cinzel', serif" font-weight="700" font-size="12" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF COMPUTING &amp; SCIENCE</text>
    </g>
  `);

  // 3. photography.webp (592 x 741) - School of Management Studies
  await processImage('photography.webp', 592, 741, `
    <g filter="url(#shadow)" transform="translate(46, 68)">
      <rect x="0" y="0" width="500" height="150" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <rect x="4" y="4" width="492" height="142" rx="6" fill="none" stroke="rgba(242, 221, 124, 0.3)" stroke-width="1" stroke-dasharray="6 3"/>
      <circle cx="12" cy="12" r="3" fill="#F2DD7C"/>
      <circle cx="488" cy="12" r="3" fill="#F2DD7C"/>
      <circle cx="12" cy="138" r="3" fill="#F2DD7C"/>
      <circle cx="488" cy="138" r="3" fill="#F2DD7C"/>
      <text x="250" y="65" font-family="'Cinzel', 'Japan Ramen', serif" font-weight="900" font-size="38" letter-spacing="5" fill="#FFFFFF" stroke="#000" stroke-width="1.5" text-anchor="middle">MANAGEMENT</text>
      <text x="250" y="110" font-family="'Cinzel', serif" font-weight="700" font-size="15" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF MANAGEMENT STUDIES</text>
    </g>
  `);

  // PhotographyMobile.webp (545 x 516)
  await processImage('PhotographyMobile.webp', 545, 516, `
    <g filter="url(#shadow)" transform="translate(25, 45)">
      <rect x="0" y="0" width="495" height="110" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <text x="247" y="55" font-family="'Cinzel', serif" font-weight="900" font-size="32" letter-spacing="4" fill="#FFFFFF" text-anchor="middle">MANAGEMENT</text>
      <text x="247" y="90" font-family="'Cinzel', serif" font-weight="700" font-size="13" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF MANAGEMENT STUDIES</text>
    </g>
  `);

  // 4. dance.webp (809 x 871) - School of Commerce & Arts
  await processImage('dance.webp', 809, 871, `
    <g filter="url(#shadow)" transform="translate(340, 620) rotate(42)">
      <rect x="-245" y="-48" width="490" height="96" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <rect x="-241" y="-44" width="482" height="88" rx="6" fill="none" stroke="rgba(242, 221, 124, 0.3)" stroke-width="1" stroke-dasharray="6 3"/>
      <circle cx="-233" cy="-36" r="3" fill="#F2DD7C"/>
      <circle cx="233" cy="-36" r="3" fill="#F2DD7C"/>
      <circle cx="-233" cy="36" r="3" fill="#F2DD7C"/>
      <circle cx="233" cy="36" r="3" fill="#F2DD7C"/>
      <text x="0" y="3" font-family="'Cinzel', 'Japan Ramen', serif" font-weight="900" font-size="32" letter-spacing="4" fill="#FFFFFF" stroke="#000" stroke-width="1.5" text-anchor="middle">COMMERCE</text>
      <text x="0" y="30" font-family="'Cinzel', serif" font-weight="700" font-size="13" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF COMMERCE &amp; ARTS</text>
    </g>
  `);

  // DanceMobile.webp (468 x 670)
  await processImage('DanceMobile.webp', 468, 670, `
    <g filter="url(#shadow)" transform="translate(20, 65)">
      <rect x="0" y="0" width="428" height="95" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <text x="214" y="50" font-family="'Cinzel', serif" font-weight="900" font-size="30" letter-spacing="4" fill="#FFFFFF" text-anchor="middle">COMMERCE</text>
      <text x="214" y="78" font-family="'Cinzel', serif" font-weight="700" font-size="13" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF COMMERCE &amp; ARTS</text>
    </g>
  `);

  // 5. misc.webp (627 x 605) - School of Law
  await processImage('misc.webp', 627, 605, `
    <g filter="url(#shadow)" transform="translate(15, 485)">
      <rect x="0" y="0" width="380" height="95" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <rect x="4" y="4" width="372" height="87" rx="6" fill="none" stroke="rgba(242, 221, 124, 0.3)" stroke-width="1" stroke-dasharray="6 3"/>
      <circle cx="12" cy="12" r="3" fill="#F2DD7C"/>
      <circle cx="368" cy="12" r="3" fill="#F2DD7C"/>
      <circle cx="12" cy="83" r="3" fill="#F2DD7C"/>
      <circle cx="368" cy="83" r="3" fill="#F2DD7C"/>
      <text x="190" y="50" font-family="'Cinzel', 'Japan Ramen', serif" font-weight="900" font-size="36" letter-spacing="5" fill="#FFFFFF" stroke="#000" stroke-width="1.5" text-anchor="middle">LAW</text>
      <text x="190" y="78" font-family="'Cinzel', serif" font-weight="700" font-size="14" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF LAW</text>
    </g>
  `);

  // MiscMobile.png (400 x 433)
  await processImage('MiscMobile.png', 400, 433, `
    <g filter="url(#shadow)" transform="translate(15, 15)">
      <rect x="0" y="0" width="370" height="85" rx="8" fill="#120D09" stroke="url(#goldBorder)" stroke-width="2.5"/>
      <text x="185" y="46" font-family="'Cinzel', serif" font-weight="900" font-size="30" letter-spacing="4" fill="#FFFFFF" text-anchor="middle">LAW</text>
      <text x="185" y="72" font-family="'Cinzel', serif" font-weight="700" font-size="13" letter-spacing="3" fill="#F2DD7C" text-anchor="middle">SCHOOL OF LAW</text>
    </g>
  `, true);

  console.log('All event blade images updated with official School names!');
}

run().catch(console.error);

