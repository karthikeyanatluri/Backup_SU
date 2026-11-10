const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const items = [
  {
    name: 'gallery_IMG_3953.webp',
    title: 'National Hackathon',
    cat: 'TECH FESTIVAL',
    sub: '24-Hour Code, Build & Ship Marathon',
    kanji: '創',
    color1: '#0B132B',
    color2: '#1C2541',
    accent: '#00E5FF',
    icon: `<path d="M-40,-30 L-80,0 L-40,30 M40,-30 L80,0 L40,30 M15,-40 L-15,40" stroke="#00E5FF" stroke-width="8" stroke-linecap="round" fill="none"/>`
  },
  {
    name: 'gallery_3K2A0022.webp',
    title: 'RoboWars Championship',
    cat: 'ROBOTICS',
    sub: 'High-Torque Combat & Autonomous Rovers',
    kanji: '技',
    color1: '#1F110B',
    color2: '#3D1C06',
    accent: '#FF6B00',
    icon: `<rect x="-50" y="-45" width="100" height="90" rx="15" stroke="#FF6B00" stroke-width="7" fill="none"/>
           <circle cx="-22" cy="-10" r="10" fill="#FF6B00"/><circle cx="22" cy="-10" r="10" fill="#FF6B00"/>
           <line x1="-25" y1="20" x2="25" y2="20" stroke="#FF6B00" stroke-width="6" stroke-linecap="round"/>
           <line x1="0" y1="-45" x2="0" y2="-65" stroke="#FF6B00" stroke-width="6"/>
           <circle cx="0" cy="-68" r="8" fill="#FFB703"/>`
  },
  {
    name: 'gallery__H4A0455.webp',
    title: 'Battle of the Bands',
    cat: 'LIVE MUSIC',
    sub: 'High-Voltage Rock & Electric Stage',
    kanji: '響',
    color1: '#1A0B2E',
    color2: '#2D124D',
    accent: '#D946EF',
    icon: `<path d="M-30,40 L-10,-20 L0,-50 L20,-50 L10,-20 L30,40 C30,60 -30,60 -30,40 Z" stroke="#D946EF" stroke-width="6" fill="none"/>
           <circle cx="0" cy="20" r="12" fill="#D946EF"/>
           <line x1="0" y1="-50" x2="0" y2="10" stroke="#D946EF" stroke-width="4"/>`
  },
  {
    name: 'gallery_IMG_4225.webp',
    title: 'Classical & Fusion Dance',
    cat: 'CULTURAL ARTS',
    sub: 'Elegance, Rhythm & Choreography',
    kanji: '舞',
    color1: '#260814',
    color2: '#4A0E27',
    accent: '#F43F5E',
    icon: `<circle cx="0" cy="-45" r="14" fill="#F43F5E"/>
           <path d="M0,-30 Q-25,0 -40,30 M0,-30 Q25,0 40,30 M0,-30 L0,20 L-25,65 M0,20 L25,65" stroke="#F43F5E" stroke-width="6" stroke-linecap="round" fill="none"/>`
  },
  {
    name: 'gallery__H4A3519.webp',
    title: 'AI & Neural Tech Summit',
    cat: 'INTELLIGENCE',
    sub: 'Machine Learning & LLM Showcase',
    kanji: '智',
    color1: '#07162C',
    color2: '#0F2A4A',
    accent: '#38BDF8',
    icon: `<circle cx="0" cy="0" r="18" fill="#38BDF8"/>
           <circle cx="-50" cy="-30" r="10" fill="#38BDF8"/><circle cx="50" cy="-30" r="10" fill="#38BDF8"/>
           <circle cx="-45" cy="35" r="10" fill="#38BDF8"/><circle cx="45" cy="35" r="10" fill="#38BDF8"/>
           <line x1="0" y1="0" x2="-50" y2="-30" stroke="#38BDF8" stroke-width="4"/>
           <line x1="0" y1="0" x2="50" y2="-30" stroke="#38BDF8" stroke-width="4"/>
           <line x1="0" y1="0" x2="-45" y2="35" stroke="#38BDF8" stroke-width="4"/>
           <line x1="0" y1="0" x2="45" y2="35" stroke="#38BDF8" stroke-width="4"/>`
  },
  {
    name: 'gallery_DSC00199.webp',
    title: 'Autonomous Drone League',
    cat: 'AERONAUTICS',
    sub: 'High-Speed FPV Racing & Obstacles',
    kanji: '翔',
    color1: '#081D1B',
    color2: '#113A36',
    accent: '#2DD4BF',
    icon: `<circle cx="0" cy="0" r="14" fill="#2DD4BF"/>
           <line x1="-50" y1="-30" x2="50" y2="30" stroke="#2DD4BF" stroke-width="5"/>
           <line x1="-50" y1="30" x2="50" y2="-30" stroke="#2DD4BF" stroke-width="5"/>
           <ellipse cx="-50" cy="-30" rx="20" ry="7" stroke="#2DD4BF" stroke-width="3" fill="none"/>
           <ellipse cx="50" cy="30" rx="20" ry="7" stroke="#2DD4BF" stroke-width="3" fill="none"/>
           <ellipse cx="-50" cy="30" rx="20" ry="7" stroke="#2DD4BF" stroke-width="3" fill="none"/>
           <ellipse cx="50" cy="-30" rx="20" ry="7" stroke="#2DD4BF" stroke-width="3" fill="none"/>`
  },
  {
    name: 'gallery__H4A3369.webp',
    title: 'Annual PhotoSalon',
    cat: 'PHOTOGRAPHY',
    sub: 'Fine-Art Prints & Creative Exposure',
    kanji: '光',
    color1: '#1F180A',
    color2: '#3D3114',
    accent: '#EAB308',
    icon: `<rect x="-55" y="-35" width="110" height="80" rx="10" stroke="#EAB308" stroke-width="6" fill="none"/>
           <circle cx="0" cy="5" r="24" stroke="#EAB308" stroke-width="6" fill="none"/>
           <circle cx="0" cy="5" r="10" fill="#EAB308"/>
           <rect x="-20" y="-48" width="40" height="13" rx="3" fill="#EAB308"/>`
  },
  {
    name: 'gallery__H4A0022.webp',
    title: 'Acoustic Sunset Serenade',
    cat: 'CAMPUS UNPLUGGED',
    sub: 'Harmonious Melodies & Sunset Vocals',
    kanji: '音',
    color1: '#261208',
    color2: '#47210E',
    accent: '#FB923C',
    icon: `<path d="M-30,-20 L-30,30 A15,15 0 1,1 -45,15 L-45,-20 Z M20,-35 L20,15 A15,15 0 1,1 5,0 L5,-35 Z" fill="#FB923C"/>
           <path d="M-30,-15 L20,-30 L20,-15 L-30,0 Z" fill="#FB923C"/>`
  },
  {
    name: 'gallery_3K2A0863.webp',
    title: 'Street Dance & Cypher',
    cat: 'URBAN BEATS',
    sub: 'Popping, Locking & B-Boy Battles',
    kanji: '躍',
    color1: '#160B29',
    color2: '#2B1452',
    accent: '#A855F7',
    icon: `<circle cx="0" cy="-45" r="14" fill="#A855F7"/>
           <path d="M0,-30 L0,15 L-35,40 M0,15 L35,50 M-45,-15 L0,-15 L45,-35" stroke="#A855F7" stroke-width="6" stroke-linecap="round" fill="none"/>`
  },
  {
    name: 'gallery__H4A0035.webp',
    title: 'Design Thinking Studio',
    cat: 'CAMPUS HUB',
    sub: 'Multidisciplinary Student Innovation',
    kanji: '和',
    color1: '#0B221B',
    color2: '#134033',
    accent: '#10B981',
    icon: `<circle cx="-25" cy="-10" r="22" stroke="#10B981" stroke-width="5" fill="none"/>
           <circle cx="25" cy="-10" r="22" stroke="#10B981" stroke-width="5" fill="none"/>
           <circle cx="0" cy="25" r="22" stroke="#10B981" stroke-width="5" fill="none"/>`
  },
  {
    name: 'gallery__H4A3316.webp',
    title: 'Cyber Defense CTF',
    cat: 'SECURITY',
    sub: 'Binary Exploitation & Cryptography',
    kanji: '盾',
    color1: '#061922',
    color2: '#0D3143',
    accent: '#06B6D4',
    icon: `<path d="M0,-50 L45,-25 L45,15 C45,45 0,65 0,65 C0,65 -45,45 -45,15 L-45,-25 Z" stroke="#06B6D4" stroke-width="6" fill="none"/>
           <circle cx="0" cy="5" r="12" fill="#06B6D4"/>
           <line x1="0" y1="17" x2="0" y2="32" stroke="#06B6D4" stroke-width="5"/>`
  },
  {
    name: 'gallery__H4A3296.webp',
    title: 'Eastern Symphony Night',
    cat: 'ORCHESTRAL',
    sub: 'Violins, Flutes & Grand Harmonies',
    kanji: '雅',
    color1: '#1F1A08',
    color2: '#3D3410',
    accent: '#FBBF24',
    icon: `<path d="M-25,-40 C-25,-10 25,-10 25,-40 M-20,0 C-20,30 20,30 20,0 M0,-50 L0,50" stroke="#FBBF24" stroke-width="5" fill="none"/>`
  },
  {
    name: 'gallery_0H4A2800.webp',
    title: 'IoT & Smart Hardware',
    cat: 'PROTOTYPING',
    sub: 'Sensors, Edge Computing & Circuits',
    kanji: '器',
    color1: '#081D26',
    color2: '#103748',
    accent: '#38BDF8',
    icon: `<rect x="-40" y="-40" width="80" height="80" rx="8" stroke="#38BDF8" stroke-width="5" fill="none"/>
           <rect x="-20" y="-20" width="40" height="40" fill="#38BDF8"/>
           <line x1="-55" y1="-20" x2="-40" y2="-20" stroke="#38BDF8" stroke-width="4"/>
           <line x1="-55" y1="0" x2="-40" y2="0" stroke="#38BDF8" stroke-width="4"/>
           <line x1="-55" y1="20" x2="-40" y2="20" stroke="#38BDF8" stroke-width="4"/>
           <line x1="40" y1="-20" x2="55" y2="-20" stroke="#38BDF8" stroke-width="4"/>
           <line x1="40" y1="0" x2="55" y2="0" stroke="#38BDF8" stroke-width="4"/>
           <line x1="40" y1="20" x2="55" y2="20" stroke="#38BDF8" stroke-width="4"/>`
  },
  {
    name: 'gallery_3K2A1046.webp',
    title: 'EDM Star Arena',
    cat: 'PRO NIGHT',
    sub: 'Live DJ Sets, Lasers & Bass Drops',
    kanji: '熱',
    color1: '#260B20',
    color2: '#4A153E',
    accent: '#EC4899',
    icon: `<circle cx="-30" cy="15" r="22" stroke="#EC4899" stroke-width="5" fill="none"/>
           <circle cx="30" cy="15" r="22" stroke="#EC4899" stroke-width="5" fill="none"/>
           <path d="M-30,-7 C-30,-40 30,-40 30,-7" stroke="#EC4899" stroke-width="6" fill="none"/>`
  },
  {
    name: 'gallery__MG_0552.webp',
    title: 'Theatrical Stage Play',
    cat: 'DRAMATICS',
    sub: 'Spotlight Dramas & Expressive Acting',
    kanji: '劇',
    color1: '#240A0A',
    color2: '#451414',
    accent: '#EF4444',
    icon: `<path d="M-45,-30 C-45,30 0,55 0,55 C0,55 45,30 45,-30 Z" stroke="#EF4444" stroke-width="5" fill="none"/>
           <circle cx="-18" cy="-10" r="6" fill="#EF4444"/><circle cx="18" cy="-10" r="6" fill="#EF4444"/>
           <path d="M-18,22 Q0,35 18,22" stroke="#EF4444" stroke-width="5" fill="none"/>`
  },
  {
    name: 'gallery_DSC00072.webp',
    title: 'Lenscraft Masterclass',
    cat: 'PORTRAITURE',
    sub: 'Lighting, Composition & Studio Craft',
    kanji: '鏡',
    color1: '#1F1607',
    color2: '#3D2B0E',
    accent: '#D97706',
    icon: `<circle cx="0" cy="0" r="45" stroke="#D97706" stroke-width="6" fill="none"/>
           <circle cx="0" cy="0" r="20" stroke="#D97706" stroke-width="4" fill="none"/>
           <line x1="-30" y1="-30" x2="-14" y2="-14" stroke="#D97706" stroke-width="4"/>
           <line x1="30" y1="-30" x2="14" y2="-14" stroke="#D97706" stroke-width="4"/>
           <line x1="30" y1="30" x2="14" y2="14" stroke="#D97706" stroke-width="4"/>
           <line x1="-30" y1="30" x2="-14" y2="14" stroke="#D97706" stroke-width="4"/>`
  },
  {
    name: 'gallery_0H4A2749.webp',
    title: 'DevSprint Open Source',
    cat: 'SOFTWARE SPRINT',
    sub: 'Collaborative Open Source Coding',
    kanji: '拓',
    color1: '#071A24',
    color2: '#0F3447',
    accent: '#0284C7',
    icon: `<circle cx="0" cy="35" r="12" fill="#0284C7"/>
           <circle cx="-35" cy="-25" r="12" fill="#0284C7"/>
           <circle cx="35" cy="-25" r="12" fill="#0284C7"/>
           <path d="M0,23 L0,-5 C0,-20 -35,-5 -35,-13 M0,-5 C0,-20 35,-5 35,-13" stroke="#0284C7" stroke-width="5" fill="none"/>`
  },
  {
    name: 'gallery__MG_8684.webp',
    title: 'Percussion & Heavy Riffs',
    cat: 'DRUM & GUITAR',
    sub: 'High-Impact Rhythm & Instrumental Solos',
    kanji: '鼓',
    color1: '#26130B',
    color2: '#472415',
    accent: '#F97316',
    icon: `<ellipse cx="0" cy="-25" rx="45" ry="18" stroke="#F97316" stroke-width="5" fill="none"/>
           <path d="M-45,-25 L-35,35 C-35,50 35,50 35,35 L45,-25" stroke="#F97316" stroke-width="5" fill="none"/>
           <line x1="-30" y1="-50" x2="-5" y2="-25" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>
           <line x1="30" y1="-50" x2="5" y2="-25" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>`
  },
  {
    name: 'gallery_3K2A9949.webp',
    title: 'Heritage & Folk Dance',
    cat: 'TRADITIONAL ARTS',
    sub: 'Vibrant Costumes, Heritage & Drums',
    kanji: '華',
    color1: '#260B12',
    color2: '#471422',
    accent: '#FB7185',
    icon: `<circle cx="0" cy="-45" r="12" fill="#FB7185"/>
           <path d="M-40,50 Q-20,0 0,-25 Q20,0 40,50 C20,55 -20,55 -40,50 Z" stroke="#FB7185" stroke-width="5" fill="none"/>
           <path d="M-45,-10 Q0,-35 45,-10" stroke="#FB7185" stroke-width="4" fill="none"/>`
  },
  {
    name: 'gallery_3K2A0013.webp',
    title: 'Spatial Computing Lab',
    cat: 'VR & AR TECH',
    sub: 'Virtual Reality & Mixed Reality Demos',
    kanji: '虚',
    color1: '#110D29',
    color2: '#231B52',
    accent: '#818CF8',
    icon: `<rect x="-50" y="-25" width="100" height="50" rx="15" stroke="#818CF8" stroke-width="6" fill="none"/>
           <circle cx="-25" cy="0" r="14" fill="#818CF8"/><circle cx="25" cy="0" r="14" fill="#818CF8"/>
           <line x1="-50" y1="0" x2="-65" y2="0" stroke="#818CF8" stroke-width="5"/>
           <line x1="50" y1="0" x2="65" y2="0" stroke="#818CF8" stroke-width="5"/>`
  },
  {
    name: 'gallery__H4A9619.webp',
    title: 'Student Organizing Council',
    cat: 'CAMPUS LEADERSHIP',
    sub: 'The Visionaries Behind Supragna 2K27',
    kanji: '力',
    color1: '#0B1C1A',
    color2: '#163834',
    accent: '#34D399',
    icon: `<circle cx="0" cy="-35" r="12" fill="#34D399"/>
           <circle cx="-35" cy="-20" r="10" fill="#34D399"/>
           <circle cx="35" cy="-20" r="10" fill="#34D399"/>
           <path d="M-20,25 C-20,5 20,5 20,25 M-50,35 C-50,20 -20,20 -20,35 M20,35 C20,20 50,20 50,35" stroke="#34D399" stroke-width="5" stroke-linecap="round" fill="none"/>`
  },
  {
    name: 'gallery__MG_7912.webp',
    title: 'Night Drone Choreography',
    cat: 'AERIAL LIGHT SHOW',
    sub: 'Luminous Constellations in the Sky',
    kanji: '星',
    color1: '#0A1224',
    color2: '#142347',
    accent: '#60A5FA',
    icon: `<circle cx="0" cy="-30" r="5" fill="#60A5FA"/><circle cx="-40" cy="-10" r="5" fill="#60A5FA"/>
           <circle cx="40" cy="-10" r="5" fill="#60A5FA"/><circle cx="-25" cy="30" r="5" fill="#60A5FA"/>
           <circle cx="25" cy="30" r="5" fill="#60A5FA"/>
           <line x1="0" y1="-30" x2="-40" y2="-10" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4"/>
           <line x1="-40" y1="-10" x2="-25" y2="30" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4"/>
           <line x1="-25" y1="30" x2="25" y2="30" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4"/>
           <line x1="25" y1="30" x2="40" y2="-10" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4"/>
           <line x1="40" y1="-10" x2="0" y2="-30" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4"/>`
  },
  {
    name: 'gallery__MG_0266.webp',
    title: 'Vocal Harmony & Solos',
    cat: 'WESTERN & CARNATIC',
    sub: 'Mesmerizing Solos & Choral Arrangements',
    kanji: '唄',
    color1: '#240F1E',
    color2: '#471E3B',
    accent: '#F472B6',
    icon: `<rect x="-18" y="-45" width="36" height="55" rx="18" stroke="#F472B6" stroke-width="5" fill="none"/>
           <line x1="-18" y1="-25" x2="18" y2="-25" stroke="#F472B6" stroke-width="3"/>
           <path d="M-28,-20 C-28,25 28,25 28,-20" stroke="#F472B6" stroke-width="5" fill="none"/>
           <line x1="0" y1="25" x2="0" y2="50" stroke="#F472B6" stroke-width="5"/>
           <line x1="-20" y1="50" x2="20" y2="50" stroke="#F472B6" stroke-width="5" stroke-linecap="round"/>`
  },
  {
    name: 'gallery__MG_0028.webp',
    title: 'Digital Arts & Creative Canvas',
    cat: 'FINE ARTS',
    sub: 'Speed Painting, 3D Sculpting & Exhibits',
    kanji: '画',
    color1: '#1F1B0B',
    color2: '#3D3516',
    accent: '#FBBF24',
    icon: `<path d="M-40,30 C-50,-20 0,-45 35,-30 C55,-15 50,25 20,40 C0,50 -30,45 -40,30 Z" stroke="#FBBF24" stroke-width="5" fill="none"/>
           <circle cx="-15" cy="-10" r="7" fill="#FBBF24"/><circle cx="10" cy="-15" r="7" fill="#FBBF24"/>
           <circle cx="25" cy="5" r="7" fill="#FBBF24"/><circle cx="5" cy="22" r="7" fill="#FBBF24"/>`
  },
  {
    name: 'gallery_0H4A2729.webp',
    title: 'Grand Valedictory Ceremony',
    cat: 'AWARDS NIGHT',
    sub: 'Trophies, Honors & Festival Finale',
    kanji: '栄',
    color1: '#261808',
    color2: '#472D0F',
    accent: '#E5A93C',
    icon: `<path d="M-35,-45 L35,-45 L25,10 C25,30 0,35 0,35 C0,35 -25,30 -25,10 Z" stroke="#E5A93C" stroke-width="5" fill="none"/>
           <path d="M-35,-30 C-55,-30 -50,-5 -30,-5 M35,-30 C55,-30 50,-5 30,-5" stroke="#E5A93C" stroke-width="5" fill="none"/>
           <line x1="0" y1="35" x2="0" y2="55" stroke="#E5A93C" stroke-width="5"/>
           <rect x="-25" y="55" width="50" height="12" rx="3" fill="#E5A93C"/>`
  }
];

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function generateSVG(item, width, height) {
  const isPortrait = height > width;
  const iconY = isPortrait ? height * 0.40 : height * 0.42;
  const titleY = isPortrait ? height * 0.70 : height * 0.74;
  const subY = isPortrait ? height * 0.75 : height * 0.81;
  const titleSize = isPortrait ? Math.round(width * 0.058) : Math.round(width * 0.042);
  const subSize = isPortrait ? Math.round(width * 0.030) : Math.round(width * 0.024);
  const catSize = isPortrait ? Math.round(width * 0.026) : Math.round(width * 0.020);

  const titleEsc = escapeXml(item.title.toUpperCase());
  const subEsc = escapeXml(item.sub);
  const catEsc = escapeXml(item.cat);

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stop-color="${item.color2}"/>
        <stop offset="100%" stop-color="${item.color1}"/>
      </radialGradient>
      <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="50%" stop-color="#FFF3D4"/>
        <stop offset="100%" stop-color="#E5A93C"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>

    <!-- Subtle Japanese Circles -->
    <circle cx="${width/2}" cy="${iconY}" r="${Math.min(width, height)*0.32}" stroke="rgba(255,255,255,0.04)" stroke-width="2" fill="none"/>
    <circle cx="${width/2}" cy="${iconY}" r="${Math.min(width, height)*0.22}" stroke="${item.accent}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.3" fill="none"/>
    <circle cx="${width/2}" cy="${iconY}" r="${Math.min(width, height)*0.16}" stroke="rgba(229,169,60,0.15)" stroke-width="1" fill="none"/>

    <!-- Large Background Kanji Watermark -->
    <text x="${width/2}" y="${iconY + (isPortrait ? 80 : 60)}" font-family="'Noto Serif JP', 'Cinzel Decorative', 'Times New Roman', serif" font-size="${Math.min(width, height)*0.55}" font-weight="900" fill="rgba(255,255,255,0.04)" text-anchor="middle" dominant-baseline="middle">${item.kanji}</text>

    <!-- Glowing Central Icon -->
    <g transform="translate(${width/2}, ${iconY}) scale(${isPortrait ? 1.4 : 1.2})" filter="url(#glow)">
      ${item.icon}
    </g>

    <!-- Corner Accents (Japanese Edo Frame) -->
    <g stroke="#E5A93C" stroke-width="2" fill="none" opacity="0.6">
      <path d="M 25 50 L 25 25 L 50 25"/>
      <path d="M ${width-25} 50 L ${width-25} 25 L ${width-50} 25"/>
      <path d="M 25 ${height-50} L 25 ${height-25} L 50 ${height-25}"/>
      <path d="M ${width-25} ${height-50} L ${width-25} ${height-25} L ${width-50} ${height-25}"/>
    </g>

    <!-- Top Badge (Category) -->
    <g transform="translate(${width/2}, ${isPortrait ? 75 : 55})">
      <rect x="-110" y="-18" width="220" height="36" rx="18" fill="rgba(0,0,0,0.4)" stroke="${item.accent}" stroke-width="1.5"/>
      <text x="0" y="4" font-family="'Cinzel', 'Cinzel Decorative', 'Cinzel-Regular', 'Times New Roman', serif" font-size="${catSize}" font-weight="700" fill="${item.accent}" text-anchor="middle" letter-spacing="3">${catEsc}</text>
    </g>

    <!-- Bottom Content Card -->
    <g transform="translate(${width/2}, 0)">
      <!-- Main Title -->
      <text x="0" y="${titleY}" font-family="'Cinzel', 'Cinzel Decorative', 'Cinzel-Regular', 'Times New Roman', serif" font-size="${titleSize}" font-weight="700" fill="url(#goldText)" text-anchor="middle" letter-spacing="2">
        ${titleEsc}
      </text>

      <!-- Subtitle -->
      <text x="0" y="${subY}" font-family="'Space Grotesk', 'CabinetGrotesk-Regular', sans-serif" font-size="${subSize}" font-weight="400" fill="rgba(255,255,255,0.75)" text-anchor="middle" letter-spacing="1">
        ${subEsc}
      </text>

      <!-- Festival Tagline -->
      <text x="0" y="${height - (isPortrait ? 40 : 30)}" font-family="'Cinzel', 'Cinzel Decorative', 'Times New Roman', serif" font-size="${isPortrait ? 13 : 11}" font-weight="600" fill="rgba(229,169,60,0.7)" text-anchor="middle" letter-spacing="4">
        SUPRAGNA2K27 • NATIONAL TECHNO-CULTURAL FEST
      </text>
    </g>
  </svg>
  `;
}

async function run() {
  const galleryDir = path.join(__dirname, '..', 'public', 'images', 'gallery');
  const respDir = path.join(galleryDir, 'responsive');

  if (!fs.existsSync(respDir)) {
    fs.mkdirSync(respDir, { recursive: true });
  }

  for (const item of items) {
    const mainFile = path.join(galleryDir, item.name);
    let origWidth = 900;
    let origHeight = 1350;

    if (fs.existsSync(mainFile)) {
      try {
        const fileBuf = fs.readFileSync(mainFile);
        const meta = await sharp(fileBuf).metadata();
        origWidth = meta.width || 900;
        origHeight = meta.height || 1350;
      } catch (err) {
        console.warn(`Could not read metadata for ${item.name}`, err);
      }
    }

    const svg = generateSVG(item, origWidth, origHeight);
    const svgBuffer = Buffer.from(svg);

    // Render to buffers first, then write safely with fs.writeFileSync
    const mainWebpBuf = await sharp(svgBuffer).webp({ quality: 90 }).toBuffer();
    fs.writeFileSync(mainFile, mainWebpBuf);

    const baseName = item.name.replace('.webp', '');

    // Write 800w
    const w800 = origWidth >= 800 ? 800 : origWidth;
    const h800 = Math.round(origHeight * (w800 / origWidth));
    const webp800Buf = await sharp(svgBuffer).resize(w800, h800).webp({ quality: 85 }).toBuffer();
    fs.writeFileSync(path.join(respDir, `${baseName}-800.webp`), webp800Buf);

    // Write 400w
    const w400 = origWidth >= 400 ? 400 : origWidth;
    const h400 = Math.round(origHeight * (w400 / origWidth));
    const webp400Buf = await sharp(svgBuffer).resize(w400, h400).webp({ quality: 80 }).toBuffer();
    fs.writeFileSync(path.join(respDir, `${baseName}-400.webp`), webp400Buf);

    console.log(`Generated: ${item.name} (${origWidth}x${origHeight}) -> 800w, 400w`);
  }

  // Also generate photog white logo and black logo for gallery footer
  const logoWhiteSvg = `
  <svg width="900" height="506" viewBox="0 0 900 506" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(450, 200)">
      <circle cx="0" cy="0" r="70" stroke="#FFFFFF" stroke-width="6" fill="none"/>
      <circle cx="0" cy="0" r="32" stroke="#FFFFFF" stroke-width="4" fill="none"/>
      <circle cx="0" cy="0" r="14" fill="#FFFFFF"/>
      <rect x="-80" y="-55" width="160" height="110" rx="14" stroke="#FFFFFF" stroke-width="6" fill="none"/>
      <rect x="-30" y="-72" width="60" height="18" rx="4" fill="#FFFFFF"/>
    </g>
    <text x="450" y="340" font-family="'Cinzel', 'Times New Roman', serif" font-size="34" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="6">SUPRAGNA MEDIA &amp; PHOTOGRAPHY</text>
    <text x="450" y="380" font-family="'Cinzel', 'Times New Roman', serif" font-size="18" font-weight="500" fill="#E5A93C" text-anchor="middle" letter-spacing="8">OFFICIAL FESTIVAL ARCHIVES</text>
  </svg>`;

  const logoBlackSvg = logoWhiteSvg.replace(/#FFFFFF/g, '#0B0E14');

  const whitePngBuf = await sharp(Buffer.from(logoWhiteSvg))
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(galleryDir, 'photog white logo.png'), whitePngBuf);

  const blackPngBuf = await sharp(Buffer.from(logoBlackSvg))
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(galleryDir, 'photog black logo.png'), blackPngBuf);

  console.log('Generated gallery footer logos.');
}

run().catch(console.error);
