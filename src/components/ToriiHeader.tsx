import React from 'react';
import { sound } from '../utils/audio';

interface ToriiHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortMode?: 'name' | 'code';
  setSortMode?: (mode: 'name' | 'code') => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  isSoundMuted: boolean;
  toggleSound: () => void;
}

export const ToriiHeader: React.FC<ToriiHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  isSoundMuted,
  toggleSound,
}) => {
  const filterOptions = [
    { id: 'all', label: 'All Gates (6)', kanji: '全門' },
    { id: 'software', label: 'AI & Software (CSE, AI)', kanji: '電脳' },
    { id: 'circuits', label: 'Circuits & Robotics (ECE, EEE)', kanji: '機電' },
    { id: 'core', label: 'Core Infrastructure (CE, ME)', kanji: '基盤' },
  ];

  return (
    <header style={{ position: 'relative', width: '100%', zIndex: 20 }}>
      {/* Top Banner Ribbon */}
      <div
        style={{
          background: 'linear-gradient(90deg, #1c0e0b, #451515, #852222, #451515, #1c0e0b)',
          borderBottom: '1px solid rgba(242, 221, 124, 0.4)',
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: '#f8ebcb',
          fontFamily: "'Shippori Mincho', serif",
          letterSpacing: '0.08em',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#f2dd7c' }}>❖</span>
          <span>SIDDHARTHA ACADEMY OF HIGHER EDUCATION (VRSEC)</span>
          <span style={{ color: '#d4af37', opacity: 0.6 }}>|</span>
          <span style={{ color: '#ffb7c5' }}>SUPRAGNA 2K27 NATIONAL TECHNO-CULTURAL FESTIVAL</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => {
              toggleSound();
              sound.playBambooTap();
            }}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              padding: '2px 8px',
              color: isSoundMuted ? '#8e8071' : '#f2dd7c',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title="Toggle Oriental Chimes"
          >
            <span>{isSoundMuted ? '🔇' : '🎐'}</span>
            <span>{isSoundMuted ? 'Audio Off' : 'Audio On'}</span>
          </button>
          <span style={{ color: '#f2dd7c', fontWeight: 'bold' }}>ESTD. 1977</span>
        </div>
      </div>

      {/* Grand Torii Architectural Gate & Plaque Frame */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '2rem 1.5rem 1rem',
          textAlign: 'center',
        }}
      >
        {/* Left Swaying Paper Lantern (Chōchin / 提灯) */}
        <div
          className="animate-lantern-left"
          style={{
            position: 'absolute',
            left: '3%',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Wire */}
          <div style={{ width: '2px', height: '35px', background: '#d4af37' }} />
          {/* Lantern Body */}
          <div
            style={{
              width: '42px',
              height: '65px',
              background: 'radial-gradient(ellipse at 50% 50%, #ff6b6b 0%, #c0392b 70%, #781d13 100%)',
              borderRadius: '21px / 28px',
              border: '1px solid #f2dd7c',
              boxShadow: '0 0 25px rgba(231, 76, 60, 0.6), inset 0 0 10px rgba(242, 221, 124, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f8ebcb',
              fontSize: '1rem',
              fontWeight: 900,
              fontFamily: "'Shippori Mincho', serif",
              writingMode: 'vertical-rl',
            }}
          >
            祭
          </div>
          {/* Tassel */}
          <div style={{ width: '4px', height: '16px', background: '#d4af37', marginTop: '2px' }} />
        </div>

        {/* Right Swaying Paper Lantern */}
        <div
          className="animate-lantern-right"
          style={{
            position: 'absolute',
            right: '3%',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '2px', height: '35px', background: '#d4af37' }} />
          <div
            style={{
              width: '42px',
              height: '65px',
              background: 'radial-gradient(ellipse at 50% 50%, #ff6b6b 0%, #c0392b 70%, #781d13 100%)',
              borderRadius: '21px / 28px',
              border: '1px solid #f2dd7c',
              boxShadow: '0 0 25px rgba(231, 76, 60, 0.6), inset 0 0 10px rgba(242, 221, 124, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f8ebcb',
              fontSize: '1rem',
              fontWeight: 900,
              fontFamily: "'Shippori Mincho', serif",
              writingMode: 'vertical-rl',
            }}
          >
            技
          </div>
          <div style={{ width: '4px', height: '16px', background: '#d4af37', marginTop: '2px' }} />
        </div>

        {/* Traditional Torii Curved Kasagi (Top Beam) */}
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            marginBottom: '1rem',
          }}
        >
          {/* Curved Vermilion Beam SVG */}
          <svg width="340" height="42" viewBox="0 0 340 42" fill="none">
            <path
              d="M 10,36 Q 170,18 330,36 L 338,20 Q 170,0 2,20 Z"
              fill="url(#toriiBeam)"
            />
            <path
              d="M 2,20 L 10,36 L 25,36 L 15,20 Z"
              fill="#f2dd7c"
            />
            <path
              d="M 338,20 L 330,36 L 315,36 L 325,20 Z"
              fill="#f2dd7c"
            />
            <defs>
              <linearGradient id="toriiBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#781d13" />
                <stop offset="15%" stopColor="#c0392b" />
                <stop offset="50%" stopColor="#e74c3c" />
                <stop offset="85%" stopColor="#c0392b" />
                <stop offset="100%" stopColor="#781d13" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Title & Subtitles */}
        <h1
          style={{
            fontFamily: "'Shippori Mincho', 'Abhaya Libre Extrabold', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900,
            color: '#f8ebcb',
            letterSpacing: '0.04em',
            lineHeight: 1.15,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 35px rgba(242, 221, 124, 0.35)',
            marginBottom: '0.4rem',
          }}
        >
          SCHOOL OF ENGINEERING
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '1rem',
          }}
        >
          <span style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
          <span
            style={{
              fontFamily: "'Japan Ramen', 'Shippori Mincho', serif",
              fontSize: '1.25rem',
              color: '#d4af37',
              letterSpacing: '0.18em',
            }}
          >
            工学部 • DEPARTMENTS SHOWCASE
          </span>
          <span style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
        </div>

        {/* Interactive Control Console: Search Input */}
        <div
          style={{
            maxWidth: '680px',
            margin: '1.2rem auto 0',
            background: 'linear-gradient(135deg, rgba(30, 22, 17, 0.94), rgba(18, 13, 10, 0.98))',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            borderRadius: '14px',
            padding: '0.8rem 1.2rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(242, 221, 124, 0.05)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Live Search Input with Kanji Accent */}
          <div
            style={{
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '12px',
                color: '#d4af37',
                fontFamily: "'Shippori Mincho', serif",
                fontSize: '1rem',
                pointerEvents: 'none',
              }}
            >
              探
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search departments, events, or keywords..."
              style={{
                width: '100%',
                background: 'rgba(10, 7, 5, 0.7)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '8px',
                padding: '10px 12px 10px 38px',
                color: '#f8ebcb',
                fontSize: '0.9rem',
                fontFamily: 'system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f2dd7c';
                e.target.style.boxShadow = '0 0 12px rgba(242, 221, 124, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#8e8071',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Department Filter Category Chips */}
        <div
          style={{
            maxWidth: '1100px',
            margin: '1rem auto 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setActiveFilter(opt.id);
                sound.playKotoChime(587.33);
              }}
              style={{
                background:
                  activeFilter === opt.id
                    ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(142, 68, 173, 0.3))'
                    : 'rgba(25, 18, 14, 0.8)',
                border:
                  activeFilter === opt.id
                    ? '1px solid #f2dd7c'
                    : '1px solid rgba(212, 175, 55, 0.25)',
                color: activeFilter === opt.id ? '#f2dd7c' : '#c7bba8',
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: "'Shippori Mincho', serif",
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ opacity: 0.7, fontSize: '0.7rem' }}>{opt.kanji}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
