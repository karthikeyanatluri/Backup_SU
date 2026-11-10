import React from 'react';
import { SchoolFilterTab } from '../data/schoolsData';

interface SchoolHeroProps {
  schoolName: string;
  subtitle?: string;
  searchPlaceholder?: string;
  filterTabs: SchoolFilterTab[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const SchoolHero: React.FC<SchoolHeroProps> = ({
  schoolName,
  subtitle = 'Departments Directory',
  searchPlaceholder = 'Search departments or competitions...',
  filterTabs,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}) => {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 20,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem 1.5rem',
        textAlign: 'center',
      }}
    >
      {/* Official Master Supragna Emblem Logo */}
      <div style={{ marginBottom: '1.2rem' }}>
        <img
          src="/images/supragna_logo.png"
          alt="SUPRAGNA 2K27"
          style={{
            maxWidth: 'min(360px, 85vw)',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.8))',
          }}
        />
      </div>

      {/* Stately Title in Japanese Paint Brush Style */}
      <h1
        style={{
          fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
          fontSize: 'clamp(2.2rem, 4.2vw, 3.35rem)',
          fontWeight: 400,
          color: '#fef5e1',
          letterSpacing: '0.04em',
          lineHeight: 1.2,
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.92), 0 0 30px rgba(242, 221, 124, 0.25)',
          marginBottom: '0.6rem',
        }}
      >
        {schoolName}
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          marginBottom: '1.8rem',
        }}
      >
        <span style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
        <span
          style={{
            fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
            fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
            fontWeight: 400,
            color: '#f2dd7c',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
          }}
        >
          {subtitle}
        </span>
        <span style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
      </div>

      {/* Clean Search Input Container */}
      <div
        style={{
          maxWidth: '580px',
          margin: '0 auto 1.4rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            left: '14px',
            width: '18px',
            height: '18px',
            fill: '#d4af37',
            pointerEvents: 'none',
          }}
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          style={{
            width: '100%',
            background: 'rgba(24, 16, 11, 0.78)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '10px',
            padding: '11px 14px 11px 44px',
            color: '#f8ebcb',
            fontSize: '0.92rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            outline: 'none',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 0 12px rgba(242, 221, 124, 0.05)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#f2dd7c';
            e.target.style.boxShadow = '0 0 15px rgba(242, 221, 124, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(212, 175, 55, 0.4)';
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
          }}
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'none',
              border: 'none',
              color: '#c7bba8',
              cursor: 'pointer',
              fontSize: '1rem',
              padding: '4px',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Clean Category Filter Tabs */}
      {filterTabs.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                background:
                  activeFilter === tab.id
                    ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.32), rgba(192, 57, 43, 0.32))'
                    : 'rgba(22, 15, 10, 0.68)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: activeFilter === tab.id ? '1px solid #f2dd7c' : '1px solid rgba(212, 175, 55, 0.28)',
                color: activeFilter === tab.id ? '#f2dd7c' : '#d8cbba',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontFamily: "'Abhaya Libre', Georgia, serif",
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeFilter === tab.id ? '0 2px 10px rgba(242, 221, 124, 0.25)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== tab.id) {
                  e.currentTarget.style.borderColor = '#f2dd7c';
                  e.currentTarget.style.color = '#f8ebcb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== tab.id) {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                  e.currentTarget.style.color = '#c7bba8';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
