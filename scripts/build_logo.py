import re
import os
import subprocess
from PIL import Image

svg_content = '''<svg width="900" height="260" viewBox="0 0 900 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Radiant Metallic Gold Gradients -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C0" />
      <stop offset="35%" stop-color="#F2DD7C" />
      <stop offset="70%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#997A15" />
    </linearGradient>

    <linearGradient id="whiteSilver" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="60%" stop-color="#F4EFEA" />
      <stop offset="100%" stop-color="#DCD0C0" />
    </linearGradient>

    <linearGradient id="dragonFlame" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E53935" />
      <stop offset="50%" stop-color="#F2DD7C" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>

    <!-- Subtle Glow Filter -->
    <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.8" />
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#F2DD7C" flood-opacity="0.3" />
    </filter>
  </defs>

  <g filter="url(#logoGlow)">
    <!-- ==================== DRAGON & EMBLEM "S" ==================== -->
    <g id="dragon-emblem" transform="translate(18, 10)">
      <!-- Dragon Aura / Cloud Wisps Behind -->
      <path d="M75,32 Q95,15 125,25 Q145,32 155,50 Q162,65 150,78 Q138,90 120,88" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round" opacity="0.6" />
      <path d="M40,175 Q20,195 45,215 Q65,225 95,220 Q125,212 145,228" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />

      <!-- Dragon Serpentine Body (Looping gracefully around the letter S) -->
      <!-- Upper Body Loop -->
      <path d="M125,32 C155,20 178,42 165,72 C155,95 120,105 105,120 C90,135 85,155 98,172 C115,195 145,198 160,185 C175,172 178,150 172,138" 
            fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
      
      <!-- Dragon Dorsal Spines / Mane Flames -->
      <path d="M135,26 L142,15 L146,28 L158,18 L160,32 L172,25 L168,40 L180,38 L172,52 L182,55 L170,68 L178,75 L164,82 L170,92 L154,95" 
            fill="none" stroke="#FFF5C0" stroke-width="2.5" stroke-linejoin="round" />

      <!-- Dragon Tail Sweep (Lower artistic calligraphic flourish) -->
      <path d="M98,172 C80,192 60,210 32,212 C18,213 8,205 12,192 C16,180 32,175 48,182 C70,192 95,188 112,172" 
            fill="url(#goldGrad)" opacity="0.85" />
      <path d="M30,212 Q15,222 2,220 Q12,210 25,206" fill="url(#dragonFlame)" />

      <!-- STYLIZED LETTER "S" (Bold, Chiseled, Elegant Architecture) -->
      <!-- Upper Top Serifs & Arc -->
      <path d="M148,46 C148,34 135,22 108,22 C78,22 55,38 55,62 C55,84 75,98 100,108 C132,120 156,136 156,168 C156,202 125,224 88,224 C52,224 35,206 32,185 L54,180 C56,196 68,206 90,206 C112,206 132,194 132,170 C132,145 110,132 84,120 C56,108 34,92 34,60 C34,28 62,4 106,4 C142,4 168,24 170,52 Z" 
            fill="url(#whiteSilver)" stroke="#0E0C09" stroke-width="1.5" />

      <!-- Inner S Highlight Contour -->
      <path d="M106,12 C132,12 152,26 154,46 L138,47 C136,34 124,24 106,24 C82,24 67,36 67,52 C67,68 82,78 104,88 C136,102 146,120 146,145" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2.5" opacity="0.9" />

      <!-- DRAGON HEAD (Fierce, Noble, Japanese Ryū Profile) -->
      <g id="dragon-head" transform="translate(112, 10)">
        <!-- Snout & Upper Jaw -->
        <path d="M22,25 C30,20 42,16 54,20 C62,23 68,30 65,36 C60,42 48,42 38,40 C28,38 20,42 16,36 Z" 
              fill="url(#goldGrad)" stroke="#FFFFFF" stroke-width="1" />
        <!-- Horns / Antlers (Traditional Eastern Dragon) -->
        <path d="M24,22 C22,12 15,2 5,-4 C12,4 14,12 18,18" 
              fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" />
        <path d="M18,18 C12,12 4,6 -4,2 C4,8 8,14 12,18" 
              fill="none" stroke="#FFF5C0" stroke-width="2" stroke-linecap="round" />
        <path d="M28,21 C30,10 36,-2 46,-10 C40,-1 38,8 34,18" 
              fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" />
        <!-- Whiskers (Dynamic sweeping ribbons) -->
        <path d="M46,36 C58,40 74,48 85,62 C74,54 60,48 48,44" 
              fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        <path d="M40,40 C52,48 66,62 72,78 C65,65 52,54 42,46" 
              fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-linecap="round" />
        <!-- Lower Jaw & Beard -->
        <path d="M25,41 C32,44 42,46 48,44 C42,48 35,54 28,52 C22,50 20,44 25,41 Z" 
              fill="#D4AF37" />
        <path d="M28,52 C32,60 38,68 45,72 C38,67 32,60 27,53" 
              fill="none" stroke="#FFF5C0" stroke-width="2" stroke-linecap="round" />
        <!-- Glowing Eye -->
        <ellipse cx="34" cy="27" rx="3.5" ry="2.2" fill="#E53935" />
        <circle cx="34" cy="27" r="1.2" fill="#FFFFFF" />
        <!-- Tooth / Fang -->
        <polygon points="46,38 50,44 44,41" fill="#FFFFFF" />
      </g>
    </g>

    <!-- ==================== MAIN WORDMARK: UPRAGNA ==================== -->
    <g id="wordmark-upragna" transform="translate(225, 42)">
      <!-- U -->
      <path d="M0,18 L16,18 L16,105 C16,128 32,142 54,142 C76,142 92,128 92,105 L92,18 L108,18 L108,30 L94,30 L94,105 C94,136 74,154 54,154 C34,154 14,136 14,105 L14,30 L0,30 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- P -->
      <path d="M125,18 L168,18 C194,18 212,32 212,58 C212,84 194,98 168,98 L142,98 L142,140 L156,140 L156,152 L112,152 L112,140 L125,140 Z M142,32 L142,84 L166,84 C184,84 194,74 194,58 C194,42 184,32 166,32 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- R -->
      <path d="M228,18 L272,18 C298,18 315,32 315,56 C315,74 302,88 285,94 L318,140 L334,140 L334,152 L298,152 L266,104 L245,104 L245,140 L258,140 L258,152 L215,152 L215,140 L228,140 Z M245,32 L245,90 L270,90 C288,90 298,80 298,61 C298,42 288,32 270,32 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- A -->
      <path d="M380,18 L395,18 L440,140 L452,140 L452,152 L415,152 L415,140 L425,140 L412,104 L362,104 L349,140 L360,140 L360,152 L320,152 L320,140 L332,140 Z M387,36 L366,92 L408,92 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- G -->
      <path d="M525,52 L508,58 C502,38 488,28 466,28 C438,28 418,48 418,86 C418,124 438,144 468,144 C492,144 508,132 512,108 L475,108 L475,96 L530,96 L530,136 L518,136 C514,144 504,152 492,155 C484,157 476,158 466,158 C426,158 398,130 398,86 C398,42 426,14 466,14 C495,14 518,28 525,52 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- N -->
      <path d="M545,18 L568,18 L618,118 L618,32 L606,32 L606,18 L636,18 L636,32 L634,32 L634,148 L615,148 L562,44 L562,136 L574,136 L574,152 L532,152 L532,136 L545,136 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
      <!-- A -->
      <path d="M690,18 L705,18 L750,140 L762,140 L762,152 L725,152 L725,140 L735,140 L722,104 L672,104 L659,140 L670,140 L670,152 L630,152 L630,140 L642,140 Z M697,36 L676,92 L718,92 Z" 
            fill="url(#whiteSilver)" stroke="#1A1510" stroke-width="1.2" />
    </g>

    <!-- ==================== FESTIVAL EDITION: 2K27 ==================== -->
    <g id="edition-2k27" transform="translate(685, 25)">
      <!-- Calligraphic Golden Badge / Stamp -->
      <rect x="0" y="2" width="180" height="42" rx="6" fill="#1C1610" stroke="url(#goldGrad)" stroke-width="2" />
      <path d="M6,6 L174,6 M6,40 L174,40" stroke="url(#goldGrad)" stroke-width="0.8" stroke-dasharray="4 2" opacity="0.6" />
      
      <!-- 2K27 Text -->
      <text x="90" y="32" font-family="'Cinzel', 'Ibarra Real Nova', 'Times New Roman', serif" font-weight="900" font-size="30" 
            letter-spacing="5" fill="url(#goldGrad)" text-anchor="middle" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))">
        2K27
      </text>

      <!-- Corner Accents -->
      <circle cx="6" cy="6" r="2" fill="#F2DD7C" />
      <circle cx="174" cy="6" r="2" fill="#F2DD7C" />
      <circle cx="6" cy="40" r="2" fill="#F2DD7C" />
      <circle cx="174" cy="40" r="2" fill="#F2DD7C" />
    </g>

    <!-- ==================== SUBTITLE & JAPANESE MON ACCENT ==================== -->
    <g id="tagline" transform="translate(230, 218)">
      <!-- Golden Framing Line with Center Diamond -->
      <line x1="0" y1="2" x2="200" y2="2" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.8" />
      <polygon points="208,2 214,-3 220,2 214,7" fill="#F2DD7C" />
      <circle cx="214" cy="2" r="1.5" fill="#1C1610" />
      <polygon points="428,2 434,-3 440,2 434,7" fill="#F2DD7C" />
      <circle cx="434" cy="2" r="1.5" fill="#1C1610" />
      <line x1="448" y1="2" x2="648" y2="2" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.8" />

      <!-- Subtitle Text -->
      <text x="324" y="5" font-family="'Shippori Mincho', 'Abhaya Libre', 'Georgia', serif" font-size="13" 
            font-weight="bold" letter-spacing="6" fill="#F5E8C7" text-anchor="middle">
        NATIONAL TECHNO-CULTURAL FESTIVAL
      </text>
    </g>
  </g>
</svg>
'''

with open('D:/SU2/oasis-2025-web-main/public/images/supragna_logo_dragon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
print('Master SVG saved to public/images/supragna_logo_dragon.svg')

