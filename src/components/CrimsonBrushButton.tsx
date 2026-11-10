import React, { useState } from 'react';

interface CrimsonBrushButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Hand-crafted dry-brush vermilion calligraphy CTA inspired by the SUPRAGNA 2K27 crest banner.
 */
export const CrimsonBrushButton: React.FC<CrimsonBrushButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = true,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: fullWidth ? '100%' : 'auto',
        minWidth: '240px',
        padding: '15px 34px',
        border: 'none',
        background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transform: hovered && !disabled ? 'translateY(-2px) scale(1.012)' : 'none',
        transition: 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.25s ease',
        filter: hovered && !disabled
          ? 'drop-shadow(0 8px 24px rgba(192, 57, 43, 0.65)) drop-shadow(0 0 12px rgba(242, 221, 124, 0.35))'
          : 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.75))',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Multi-layered dry-brush vermilion ink stroke SVG */}
      <svg
        viewBox="0 0 420 76"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="crimsonStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6c130d" />
            <stop offset="28%" stopColor="#b0271d" />
            <stop offset="68%" stopColor="#cb3728" />
            <stop offset="100%" stopColor="#7a150e" />
          </linearGradient>
        </defs>
        {/* Underlying gold bristle aura */}
        <path
          d="M22,18 C95,9 305,7 398,17 L414,25 L392,35 L410,48 L385,61 C280,68 110,69 24,59 L6,50 L25,39 L9,26 Z"
          fill="rgba(242, 221, 124, 0.32)"
          transform="translate(0, 1.5)"
        />
        {/* Primary organic crimson brushstroke */}
        <path
          d="M20,16 C100,8 310,6 396,15 L416,22 L390,34 L412,47 L384,60 C275,68 105,67 22,58 L4,49 L24,38 L8,25 Z"
          fill="url(#crimsonStrokeGrad)"
        />
        {/* Secondary dry brush sweep */}
        <path
          d="M42,22 C135,17 290,18 378,24 L366,52 C270,57 125,56 44,51 Z"
          fill={hovered ? 'rgba(255, 115, 85, 0.22)' : 'rgba(255, 255, 255, 0.05)'}
        />
        {/* Ink spatter dots */}
        <circle cx="14" cy="14" r="2.2" fill="#b0271d" />
        <circle cx="406" cy="60" r="2.4" fill="#b0271d" />
        <circle cx="399" cy="12" r="1.5" fill="#f2dd7c" opacity="0.65" />
      </svg>

      <span
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
          fontSize: 'clamp(1.02rem, 1.4vw, 1.2rem)',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: '#fef5e1',
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
        }}
      >
        {label}
      </span>
    </button>
  );
};
