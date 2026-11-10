import React from 'react';

export const SupragnaBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#160f0a',
      }}
    >
      {/* Master Samurai, Dragon & Mt. Fuji Parchment Artwork (Dulled by additional 15%) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/images/samurai_dragon_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.60, // Dulled by 15% from 0.70
          filter: 'brightness(0.80)', // Slightly muted luminance
        }}
      />

      {/* Atmospheric Gradient Wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(16, 11, 7, 0.12) 25%, rgba(14, 9, 6, 0.32) 70%, rgba(10, 7, 4, 0.56) 100%)',
        }}
      />
    </div>
  );
};
