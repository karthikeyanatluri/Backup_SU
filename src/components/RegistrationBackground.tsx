import React from 'react';

/**
 * Exclusive background for the SUPRAGNA 2K27 /register page featuring the coral sunset
 * Mount Fuji, golden lake reflection, and blooming cherry blossom canopy.
 * Remaining school directory pages preserve their dark Sumi-e background untouched.
 */
export const RegistrationBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#1d0d16',
      }}
    >
      {/* Registration Exclusive Fuji Sunset & Sakura Artwork */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/images/registration_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.92,
        }}
      />

      {/* Subtle Dusk Edge Framing for Center Scroll Contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(24, 10, 16, 0.08) 32%, rgba(16, 6, 12, 0.45) 100%)',
        }}
      />
    </div>
  );
};
