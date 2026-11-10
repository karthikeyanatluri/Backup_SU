import React from 'react';

export const DragonBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Ambient Gradient Voids */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '70vw',
          height: '60vh',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          right: '5%',
          width: '60vw',
          height: '50vh',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(circle, rgba(231, 76, 60, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Mythic Serpentine Eastern Dragon Watermark Vector */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          opacity: 0.18,
          mixBlendMode: 'screen',
        }}
      >
        <defs>
          <linearGradient id="dragonGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f2dd7c" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e74c3c" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="pearlGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#f2dd7c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d63031" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dragon Undulating Spine Path */}
        <path
          d="M 120,780 C 260,650 320,840 500,720 C 680,600 640,400 820,380 C 1000,360 1140,520 1260,420 C 1380,320 1340,160 1220,120 C 1100,80 980,180 940,240 C 900,300 940,380 900,440 C 860,500 740,480 660,560 C 580,640 600,720 480,780 Z"
          stroke="url(#dragonGoldGrad)"
          strokeWidth="3"
          strokeDasharray="12 6"
        />

        {/* Dragon Spine Dorsal Fins (Dorsal spikes) */}
        {Array.from({ length: 24 }).map((_, i) => {
          const t = i / 24;
          const x = 200 + t * 900 + Math.sin(t * 10) * 80;
          const y = 650 - t * 450 + Math.cos(t * 8) * 70;
          return (
            <polygon
              key={i}
              points={`${x},${y} ${x + 14},${y - 28} ${x + 28},${y}`}
              fill="#d4af37"
              opacity="0.25"
            />
          );
        })}

        {/* Dragon Head & Horns (Silhouetted at top right) */}
        <g transform="translate(1180, 110) scale(0.9)">
          {/* Dragon Snout and Jaws */}
          <path
            d="M 0,40 Q -40,20 -80,45 Q -120,70 -100,95 Q -60,110 0,90 Q 40,70 0,40 Z"
            stroke="#f2dd7c"
            strokeWidth="3"
            fill="rgba(212, 175, 55, 0.08)"
          />
          {/* Whiskers flowing in the wind */}
          <path
            d="M -80,60 C -140,50 -200,90 -260,70"
            stroke="#f2dd7c"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M -70,75 C -130,90 -180,140 -240,150"
            stroke="#f2dd7c"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Stag Antler Horns */}
          <path
            d="M -10,35 C 10,-20 40,-60 80,-80 M 35,-35 C 30,-60 45,-90 55,-110 M 50,-10 C 80,-30 110,-40 130,-50"
            stroke="#f2dd7c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Fierce Glowing Dragon Eye */}
          <circle cx="-50" cy="55" r="7" fill="#ef4444" />
          <circle cx="-50" cy="55" r="3" fill="#fff" />
          <circle cx="-50" cy="55" r="14" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
        </g>

        {/* The Flaming Sacred Pearl of Wisdom (Hōju / 宝珠) */}
        <g transform="translate(940, 150)">
          <circle cx="0" cy="0" r="32" fill="url(#pearlGlow)" />
          {/* Sacred Flames Wrapping the Pearl */}
          <path
            d="M -20,25 C -40,0 -25,-35 0,-50 C 25,-35 40,0 20,25 C 0,45 -20,25 -20,25 Z"
            stroke="#f2dd7c"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Traditional Kumomon (雲文) Asian Clouds */}
        <g fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.35">
          {/* Cloud 1 */}
          <path d="M 180,240 Q 220,200 260,240 T 340,240 T 400,280 Q 400,320 340,320 L 220,320 Q 170,320 180,240 Z" />
          <circle cx="280" cy="270" r="12" />
          <circle cx="240" cy="275" r="8" />

          {/* Cloud 2 */}
          <path d="M 1120,720 Q 1160,680 1200,720 T 1280,720 T 1340,760 Q 1340,800 1280,800 L 1160,800 Q 1110,800 1120,720 Z" />

          {/* Cloud 3 */}
          <path d="M 680,820 Q 720,780 760,820 T 840,820 T 900,860 Q 900,900 840,900 L 720,900 Q 670,900 680,820 Z" />
        </g>
      </svg>
    </div>
  );
};
