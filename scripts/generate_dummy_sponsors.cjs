const fs = require('fs');
const path = require('path');

const dummyDir = path.resolve(__dirname, '../public/images/sponsors/dummy');
if (!fs.existsSync(dummyDir)) {
  fs.mkdirSync(dummyDir, { recursive: true });
}

const titleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120" fill="none">
  <defs>
    <linearGradient id="grad-nexus-title" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE066" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <filter id="glow-nexus-title" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g transform="translate(25, 15)" filter="url(#glow-nexus-title)">
    <polygon points="45,15 75,32 75,70 45,87 15,70 15,32" stroke="url(#grad-nexus-title)" stroke-width="5" fill="none"/>
    <circle cx="45" cy="51" r="12" fill="url(#grad-nexus-title)"/>
    <line x1="45" y1="15" x2="45" y2="39" stroke="#FFE066" stroke-width="3"/>
    <line x1="75" y1="70" x2="56" y2="57" stroke="#FFE066" stroke-width="3"/>
    <line x1="15" y1="70" x2="34" y2="57" stroke="#FFE066" stroke-width="3"/>
  </g>
  <g transform="translate(125, 32)">
    <text x="0" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="3">
      NEXUS INNOVATIONS
    </text>
    <text x="2" y="56" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#F59E0B" letter-spacing="4.5" opacity="0.95">
      GLOBAL TECH &amp; ENTERPRISE VENTURES
    </text>
  </g>
</svg>`;

fs.writeFileSync(path.join(dummyDir, 'nexus_title.svg'), titleSvg, 'utf8');

const sponsors = [
  {
    id: 'nexus',
    name: 'NEXUS INNOVATIONS',
    sub: 'GLOBAL TECH & VENTURES',
    accent1: '#FFD700',
    accent2: '#FFA500',
    icon: '<polygon points="30,10 50,22 50,48 30,60 10,48 10,22" stroke="url(#grad-nexus)" stroke-width="4" fill="none"/><circle cx="30" cy="35" r="8" fill="url(#grad-nexus)"/><line x1="30" y1="10" x2="30" y2="27" stroke="#FFD700" stroke-width="2"/><line x1="50" y1="48" x2="37" y2="39" stroke="#FFD700" stroke-width="2"/><line x1="10" y1="48" x2="23" y2="39" stroke="#FFD700" stroke-width="2"/>'
  },
  {
    id: 'aether',
    name: 'AETHER CLOUD',
    sub: 'NEXT-GEN INFRASTRUCTURE',
    accent1: '#00F0FF',
    accent2: '#7000FF',
    icon: '<path d="M15,45 Q15,30 30,30 Q35,15 50,25 Q65,20 65,35 Q75,38 75,48 Q75,55 60,55 L20,55 Q15,55 15,45 Z" stroke="url(#grad-aether)" stroke-width="3.5" fill="none"/><circle cx="42" cy="38" r="4" fill="#00F0FF"/>'
  },
  {
    id: 'quantum',
    name: 'QUANTUM DYNAMICS',
    sub: 'COMPUTING & SYSTEMS',
    accent1: '#60A5FA',
    accent2: '#3B82F6',
    icon: '<ellipse cx="40" cy="35" rx="28" ry="10" transform="rotate(30 40 35)" stroke="url(#grad-quantum)" stroke-width="3" fill="none"/><ellipse cx="40" cy="35" rx="28" ry="10" transform="rotate(-30 40 35)" stroke="url(#grad-quantum)" stroke-width="3" fill="none"/><circle cx="40" cy="35" r="6" fill="#60A5FA"/>'
  },
  {
    id: 'synapse',
    name: 'SYNAPSE AI WORKS',
    sub: 'INTELLIGENCE LABS',
    accent1: '#EC4899',
    accent2: '#8B5CF6',
    icon: '<circle cx="25" cy="20" r="6" fill="#EC4899"/><circle cx="55" cy="22" r="5" fill="#8B5CF6"/><circle cx="40" cy="42" r="7" fill="url(#grad-synapse)"/><circle cx="20" cy="52" r="5" fill="#EC4899"/><circle cx="60" cy="50" r="6" fill="#8B5CF6"/><line x1="25" y1="20" x2="40" y2="42" stroke="#EC4899" stroke-width="2"/><line x1="55" y1="22" x2="40" y2="42" stroke="#8B5CF6" stroke-width="2"/><line x1="20" y1="52" x2="40" y2="42" stroke="#EC4899" stroke-width="2"/><line x1="60" y1="50" x2="40" y2="42" stroke="#8B5CF6" stroke-width="2"/>'
  },
  {
    id: 'sonicwave',
    name: 'SONICWAVE AUDIO',
    sub: 'ACOUSTIC LABS',
    accent1: '#10B981',
    accent2: '#06B6D4',
    icon: '<rect x="15" y="25" width="5" height="20" rx="2.5" fill="url(#grad-sonicwave)"/><rect x="25" y="15" width="5" height="40" rx="2.5" fill="url(#grad-sonicwave)"/><rect x="35" y="8" width="5" height="54" rx="2.5" fill="#10B981"/><rect x="45" y="18" width="5" height="34" rx="2.5" fill="url(#grad-sonicwave)"/><rect x="55" y="28" width="5" height="14" rx="2.5" fill="url(#grad-sonicwave)"/>'
  },
  {
    id: 'cyberpulse',
    name: 'CYBERPULSE GAMING',
    sub: 'INTERACTIVE ENTERTAINMENT',
    accent1: '#F59E0B',
    accent2: '#EF4444',
    icon: '<polygon points="40,12 62,25 62,48 40,60 18,48 18,25" stroke="url(#grad-cyberpulse)" stroke-width="3" fill="none"/><path d="M28,32 L34,32 M31,29 L31,35" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/><circle cx="48" cy="31" r="2" fill="#EF4444"/><circle cx="52" cy="35" r="2" fill="#F59E0B"/>'
  },
  {
    id: 'novadrive',
    name: 'NOVA MOBILITY',
    sub: 'ELECTRIC PROPULSION',
    accent1: '#38BDF8',
    accent2: '#818CF8',
    icon: '<path d="M15,45 Q30,15 65,22 Q40,32 60,52 Q35,42 15,45 Z" fill="url(#grad-novadrive)"/>'
  },
  {
    id: 'zenith',
    name: 'ZENITH REFRESH',
    sub: 'BEVERAGE LABS',
    accent1: '#34D399',
    accent2: '#10B981',
    icon: '<polygon points="40,10 47,28 65,30 50,42 55,60 40,49 25,60 30,42 15,30 33,28" stroke="url(#grad-zenith)" stroke-width="2.5" fill="none"/><circle cx="40" cy="35" r="5" fill="#34D399"/>'
  },
  {
    id: 'sentinel',
    name: 'SENTINEL DEFENSE',
    sub: 'CYBERSECURITY CORP',
    accent1: '#6366F1',
    accent2: '#4338CA',
    icon: '<path d="M40,12 L60,20 L60,38 Q60,54 40,62 Q20,54 20,38 L20,20 Z" stroke="url(#grad-sentinel)" stroke-width="3.5" fill="none"/><path d="M33,36 L38,42 L48,30" stroke="#818CF8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
  },
  {
    id: 'vanguard',
    name: 'VANGUARD MEDIA',
    sub: 'GLOBAL NETWORK',
    accent1: '#F43F5E',
    accent2: '#FB7185',
    icon: '<polygon points="25,15 60,35 25,55" stroke="url(#grad-vanguard)" stroke-width="3.5" fill="none"/><polygon points="32,25 50,35 32,45" fill="url(#grad-vanguard)"/>'
  },
  {
    id: 'horizon',
    name: 'HORIZON LEARNING',
    sub: 'EDTECH INITIATIVE',
    accent1: '#FBBF24',
    accent2: '#D97706',
    icon: '<path d="M15,42 Q40,25 65,42 L65,48 Q40,31 15,48 Z" fill="url(#grad-horizon)"/><circle cx="40" cy="24" r="8" fill="#FBBF24"/>'
  },
  {
    id: 'voltix',
    name: 'VOLTIX ENERGY',
    sub: 'CLEANTECH SOLUTIONS',
    accent1: '#FACC15',
    accent2: '#EAB308',
    icon: '<polygon points="42,10 22,35 38,35 32,60 54,32 38,32" fill="url(#grad-voltix)"/>'
  },
  {
    id: 'omnibotix',
    name: 'OMNIBOTIX',
    sub: 'ROBOTICS & AUTOMATION',
    accent1: '#2DD4BF',
    accent2: '#0EA5E9',
    icon: '<rect x="22" y="20" width="36" height="30" rx="6" stroke="url(#grad-omnibotix)" stroke-width="3.5" fill="none"/><circle cx="32" cy="35" r="4" fill="#2DD4BF"/><circle cx="48" cy="35" r="4" fill="#0EA5E9"/><line x1="40" y1="10" x2="40" y2="20" stroke="#2DD4BF" stroke-width="3"/><circle cx="40" cy="8" r="3" fill="#2DD4BF"/>'
  },
  {
    id: 'studioprism',
    name: 'STUDIO PRISM',
    sub: 'CREATIVE DESIGN HOUSE',
    accent1: '#C084FC',
    accent2: '#F472B6',
    icon: '<polygon points="40,12 65,55 15,55" stroke="url(#grad-studioprism)" stroke-width="3" fill="none"/><polygon points="40,26 55,52 25,52" fill="url(#grad-studioprism)" opacity="0.5"/>'
  },
  {
    id: 'komorebi',
    name: 'KOMOREBI LABS',
    sub: 'COMMUNITY COLLECTIVE',
    accent1: '#E879F9',
    accent2: '#A855F7',
    icon: '<circle cx="40" cy="35" r="22" stroke="url(#grad-komorebi)" stroke-width="3" fill="none"/><path d="M22,35 A18,18 0 0,1 58,35" stroke="#E879F9" stroke-width="2.5" fill="none"/><circle cx="40" cy="24" r="4" fill="#E879F9"/>'
  },
  {
    id: 'threadcraft',
    name: 'THREADCRAFT',
    sub: 'APPAREL & MERCHANDISE',
    accent1: '#FB923C',
    accent2: '#EA580C',
    icon: '<polygon points="40,12 60,35 40,58 20,35" stroke="url(#grad-threadcraft)" stroke-width="3.5" fill="none"/><circle cx="40" cy="35" r="6" fill="url(#grad-threadcraft)"/>'
  }
];

sponsors.forEach(s => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 85" width="340" height="85" fill="none">
  <defs>
    <linearGradient id="grad-${s.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${s.accent1}" />
      <stop offset="100%" stop-color="${s.accent2}" />
    </linearGradient>
    <filter id="glow-${s.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g transform="translate(10, 8)" filter="url(#glow-${s.id})">
    ${s.icon}
  </g>
  <g transform="translate(90, 20)">
    <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" letter-spacing="1.5">
      ${s.name}
    </text>
    <text x="1" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="9" font-weight="700" fill="${s.accent1}" letter-spacing="2.5" opacity="0.95">
      ${s.sub}
    </text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(dummyDir, s.id + '.svg'), svg, 'utf8');
});

console.log('Successfully generated title and ' + sponsors.length + ' dummy sponsor SVG logos in ' + dummyDir);
