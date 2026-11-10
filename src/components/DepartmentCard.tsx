import React, { useState } from 'react';
import { EngineeringDepartment } from '../data/engineeringDepartments';

interface DepartmentCardProps {
  dept: EngineeringDepartment;
  onSelect: (dept: EngineeringDepartment) => void;
  index: number;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ dept, onSelect }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(dept)}
      style={{
        position: 'relative',
        zIndex: 5,
        borderRadius: '16px',
        cursor: 'pointer',
        backgroundColor: '#120c08',
        border: `1.5px solid ${isHovered ? '#f2dd7c' : 'rgba(212, 175, 55, 0.3)'}`,
        boxShadow: isHovered
          ? '0 18px 45px rgba(0, 0, 0, 0.92), 0 0 35px rgba(242, 221, 124, 0.35)'
          : '0 10px 28px rgba(0, 0, 0, 0.75), 0 0 16px rgba(212, 175, 55, 0.12)',
        transform: isHovered ? 'translateY(-6px) scale(1.015)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '360px',
        padding: '4rem 3.4rem 3.4rem 3.4rem',
        overflow: 'hidden',
      }}
    >
      {/* Master Gilded Japanese Landscape Frame Element (Dulled by 15%) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/images/department_frame.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: isHovered ? 0.96 : 0.85,
          filter: isHovered ? 'brightness(0.96)' : 'brightness(0.85)',
          transition: 'opacity 0.35s ease, filter 0.35s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Center Field: Department Name in Authentic Japanese Art Paint Brush Style */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
          paddingTop: '0.5rem',
          paddingBottom: '1.2rem',
        }}
      >
        <h2
          style={{
            fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
            fontSize: 'clamp(1.78rem, 2.6vw, 2.35rem)', // Reduced by 15% for optimal proportion
            color: '#fef5e1',
            lineHeight: 1.25,
            margin: 0,
            fontWeight: 400,
            letterSpacing: '0.04em',
            textShadow: '0 3px 18px rgba(0, 0, 0, 0.95), 0 0 25px rgba(242, 221, 124, 0.25)',
            transition: 'color 0.25s ease, text-shadow 0.25s ease',
          }}
        >
          {dept.name}
        </h2>
      </div>

      {/* Bottom Action CTA Button (zIndex: 2) */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isHovered
              ? 'linear-gradient(135deg, #c0392b, #8b1e15)'
              : 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(36, 24, 16, 0.9))',
            border: `1.5px solid ${isHovered ? '#f2dd7c' : 'rgba(212, 175, 55, 0.45)'}`,
            borderRadius: '7px',
            padding: '11px 18px',
            color: '#f8ebcb',
            fontSize: '0.94rem',
            fontWeight: 700,
            fontFamily: "'Abhaya Libre', Georgia, serif",
            letterSpacing: '0.05em',
            transition: 'all 0.25s ease',
            boxShadow: isHovered ? '0 4px 18px rgba(192, 57, 43, 0.45)' : 'none',
          }}
        >
          <span>Explore Events ({dept.events.length})</span>
          <span
            style={{
              transform: isHovered ? 'translateX(4px)' : 'none',
              transition: 'transform 0.2s',
              color: '#f2dd7c',
              fontSize: '0.96rem',
            }}
          >
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};
