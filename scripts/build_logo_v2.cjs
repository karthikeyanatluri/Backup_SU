const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgContent = `<svg width="1350" height="280" viewBox="0 0 1350 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Radiant Metallic Gold Gradients -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8D6" />
      <stop offset="30%" stop-color="#F5DF7C" />
      <stop offset="70%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#9A7B1C" />
    </linearGradient>

    <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="35%" stop-color="#FBF0D2" />
      <stop offset="75%" stop-color="#E2B74A" />
      <stop offset="100%" stop-color="#B88A22" />
    </linearGradient>

    <linearGradient id="whiteSilver" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#F7F3EE" />
      <stop offset="100%" stop-color="#D8CEC2" />
    </linearGradient>

    <linearGradient id="dragonFlame" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E53935" />
      <stop offset="50%" stop-color="#F2DD7C" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>

    <!-- Deep Contrast Shadow Filter -->
    <filter id="logoGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.9" />
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#F2DD7C" flood-opacity="0.35" />
    </filter>
  </defs>

  <g filter="url(#logoGlow)">
    <!-- ==================== DRAGON & EMBLEM "S" ==================== -->
    <g id="dragon-emblem" transform="translate(45, 20)">
      <!-- Dragon Cloud Whisps Behind S -->
      <path d="M60,35 Q85,15 115,24 Q135,32 142,50 Q148,65 135,78 Q122,88 105,86" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round" opacity="0.6" />
      <path d="M30,170 Q12,190 35,210 Q55,220 85,215 Q115,208 135,222" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />

      <!-- Dragon Body Looping Gracefully around the S spine -->
      <path d="M115,32 C145,18 168,40 155,70 C145,92 110,102 96,118 C82,134 78,154 90,170 C106,192 136,194 150,182 C164,170 166,148 160,136" 
            fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
      
      <!-- Dragon Dorsal Spines -->
      <path d="M125,25 L132,14 L136,27 L148,16 L150,30 L162,23 L158,38 L170,36 L162,50 L172,52 L160,65 L168,72 L154,80 L160,88 L144,92" 
            fill="none" stroke="#FFF5C0" stroke-width="2.5" stroke-linejoin="round" />

      <!-- Dragon Tail Sweep -->
      <path d="M90,170 C72,190 52,208 26,208 C14,209 5,202 8,190 C12,178 26,174 40,180 C60,190 85,186 100,170" 
            fill="url(#goldGrad)" opacity="0.85" />
      <path d="M25,208 Q12,218 0,215 Q10,205 22,202" fill="url(#dragonFlame)" />

      <!-- STYLIZED LETTER "S" -->
      <path d="M138,46 C138,34 126,22 100,22 C72,22 50,38 50,62 C50,84 68,98 92,108 C122,120 144,136 144,168 C144,200 115,220 80,220 C46,220 30,204 28,184 L48,180 C50,194 62,204 82,204 C102,204 120,192 120,170 C120,146 100,132 76,120 C50,108 30,92 30,60 C30,28 56,4 98,4 C132,4 156,24 158,50 Z" 
            fill="url(#whiteSilver)" stroke="#0E0C09" stroke-width="1.5" />

      <!-- Inner S Highlight Contour -->
      <path d="M98,12 C122,12 142,26 144,46 L130,47 C128,34 116,24 98,24 C76,24 62,36 62,52 C62,68 76,78 96,88 C126,102 134,120 134,145" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2.5" opacity="0.9" />

      <!-- DRAGON HEAD -->
      <g id="dragon-head" transform="translate(102, 10)">
        <path d="M20,25 C28,20 38,16 50,20 C58,23 64,30 60,36 C56,42 45,42 35,40 C26,38 18,42 15,36 Z" 
              fill="url(#goldGrad)" stroke="#FFFFFF" stroke-width="1" />
        <path d="M22,22 C20,12 14,2 4,-4 C10,4 12,12 16,18" 
              fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" />
        <path d="M16,18 C10,12 3,6 -4,2 C3,8 7,14 10,18" 
              fill="none" stroke="#FFF5C0" stroke-width="2" stroke-linecap="round" />
        <path d="M26,21 C28,10 33,-2 43,-10 C37,-1 35,8 31,18" 
              fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" />
        <!-- Whiskers -->
        <path d="M42,36 C54,40 68,48 78,62 C68,54 55,48 44,44" 
              fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        <path d="M36,40 C48,48 60,62 66,78 C59,65 48,54 38,46" 
              fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-linecap="round" />
        <!-- Eye -->
        <ellipse cx="32" cy="27" rx="3.2" ry="2" fill="#E53935" />
        <circle cx="32" cy="27" r="1.1" fill="#FFFFFF" />
        <!-- Fang -->
        <polygon points="42,38 46,44 40,41" fill="#FFFFFF" />
      </g>
    </g>

    <!-- ==================== UPRAGNA WORDMARK ==================== -->
    <g id="wordmark-upragna" transform="translate(235, 48)">
      <!-- U -->
      <path d="M0,20 L16,20 L16,100 C16,122 30,136 50,136 C70,136 84,122 84,100 L84,20 L100,20 L100,32 L86,32 L86,100 C86,128 68,146 50,146 C32,146 14,128 14,100 L14,32 L0,32 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- P -->
      <path d="M116,20 L156,20 C180,20 196,33 196,57 C196,81 180,94 156,94 L132,94 L132,134 L146,134 L146,146 L104,146 L104,134 L116,134 Z M132,32 L132,82 L154,82 C171,82 180,72 180,57 C180,42 171,32 154,32 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- R -->
      <path d="M210,20 L250,20 C274,20 290,33 290,56 C290,72 278,85 262,91 L294,134 L308,134 L308,146 L274,146 L244,100 L226,100 L226,134 L238,134 L238,146 L198,146 L198,134 L210,134 Z M226,32 L226,88 L248,88 C265,88 274,79 274,60 C274,42 265,32 248,32 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- A -->
      <path d="M350,20 L364,20 L406,134 L418,134 L418,146 L384,146 L384,134 L394,134 L382,100 L334,100 L322,134 L332,134 L332,146 L294,146 L294,134 L306,134 Z M357,36 L338,88 L378,88 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- G -->
      <path d="M485,50 L470,55 C464,37 452,27 432,27 C406,27 387,46 387,83 C387,120 406,138 434,138 C456,138 471,127 475,104 L440,104 L440,92 L490,92 L490,130 L480,130 C476,138 466,146 455,149 C448,151 441,152 432,152 C395,152 368,125 368,83 C368,41 394,14 432,14 C459,14 479,27 485,50 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- N -->
      <path d="M504,20 L525,20 L572,114 L572,32 L561,32 L561,20 L589,20 L589,32 L587,32 L587,142 L569,142 L520,42 L520,130 L531,130 L531,146 L492,146 L492,130 L504,130 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- A -->
      <path d="M638,20 L652,20 L694,134 L706,134 L706,146 L672,146 L672,134 L682,134 L670,100 L622,100 L610,134 L620,134 L620,146 L582,146 L582,134 L594,134 Z M645,36 L626,88 L666,88 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
    </g>

    <!-- ==================== 2K27 WORDMARK (INLINE & GLORIOUS) ==================== -->
    <g id="wordmark-2k27" transform="translate(970, 48)">
      <!-- 2 -->
      <path d="M0,45 C0,26 16,14 36,14 C56,14 70,26 70,44 C70,62 55,78 35,96 L16,114 L16,120 L68,120 L72,105 L76,105 L76,146 L0,146 L0,134 L32,104 C54,84 64,70 64,48 C64,32 52,24 36,24 C20,24 10,32 6,48 Z" 
            fill="url(#goldText)" stroke="#1A1510" stroke-width="1.3" />
      <!-- K -->
      <path d="M85,20 L99,20 L99,75 L136,20 L155,20 L155,30 L145,30 L113,76 L148,134 L160,134 L160,146 L138,146 L108,95 L99,108 L99,134 L110,134 L110,146 L74,146 L74,134 L85,134 Z M99,32 L99,134 Z" 
            fill="url(#goldText)" stroke="#1A1510" stroke-width="1.3" />
      <!-- 2 -->
      <path d="M168,45 C168,26 184,14 204,14 C224,14 238,26 238,44 C238,62 223,78 203,96 L184,114 L184,120 L236,120 L240,105 L244,105 L244,146 L168,146 L168,134 L200,104 C222,84 232,70 232,48 C232,32 220,24 204,24 C188,24 178,32 174,48 Z" 
            fill="url(#goldText)" stroke="#1A1510" stroke-width="1.3" />
      <!-- 7 -->
      <path d="M248,20 L310,20 L310,32 L274,146 L254,146 L288,34 L248,34 Z" 
            fill="url(#goldText)" stroke="#1A1510" stroke-width="1.3" />
    </g>

    <!-- ==================== SUBTITLE & JAPANESE ORNAMENT ==================== -->
    <g id="tagline" transform="translate(675, 235)">
      <!-- Golden Framing Line Left -->
      <line x1="-580" y1="0" x2="-260" y2="0" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.8" />
      <polygon points="-252,0 -246,-4 -240,0 -246,4" fill="#F2DD7C" />
      <circle cx="-246" cy="0" r="1.5" fill="#1C1610" />

      <!-- Centered Subtitle Text -->
      <text x="0" y="5" font-family="'Shippori Mincho', 'Abhaya Libre', 'Georgia', serif" font-size="15" 
            font-weight="bold" letter-spacing="9" fill="#F8EECD" text-anchor="middle">
        NATIONAL TECHNO-CULTURAL FESTIVAL
      </text>

      <!-- Golden Framing Line Right -->
      <polygon points="240,0 246,-4 252,0 246,4" fill="#F2DD7C" />
      <circle cx="246" cy="0" r="1.5" fill="#1C1610" />
      <line x1="260" y1="0" x2="580" y2="0" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.8" />
    </g>
  </g>
</svg>`;

async function build() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const svgPath = path.join(imagesDir, 'supragna_logo_dragon.svg');
  const pngPath = path.join(imagesDir, 'supragna_logo_clean.png');
  const webpPath = path.join(imagesDir, 'supragna_logo_clean.webp');

  fs.writeFileSync(svgPath, svgContent, 'utf8');
  console.log('Saved SVG to:', svgPath);

  const buf = Buffer.from(svgContent);

  const pngBuf = await sharp(buf)
    .resize(1350, 280)
    .png()
    .toBuffer();
  fs.writeFileSync(pngPath, pngBuf);
  console.log('Saved PNG to:', pngPath);

  const webpBuf = await sharp(buf)
    .resize(1350, 280)
    .webp({ quality: 95 })
    .toBuffer();
  fs.writeFileSync(webpPath, webpBuf);
  console.log('Saved WebP to:', webpPath);
}

build().catch(console.error);

