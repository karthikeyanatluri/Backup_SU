import React, { useState } from 'react';
import { SchoolId, schoolNavigationList } from '../data/schoolsData';

interface FestivalNavbarProps {
  onBack?: () => void;
  backLabel?: string;
  schoolTitle?: string;
  activeSchoolId?: SchoolId;
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateSchools?: () => void;
  onNavigateSchool?: (schoolId: SchoolId) => void;
  onOpenRegister?: () => void;
}

export const FestivalNavbar: React.FC<FestivalNavbarProps> = ({
  onBack,
  backLabel = 'Back',
  schoolTitle = 'School of Engineering',
  activeSchoolId,
  onNavigateHome,
  onNavigateAbout,
  onNavigateSchools,
  onNavigateSchool,
  onOpenRegister,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <nav
      style={{
        position: 'relative',
        zIndex: 40,
        width: '100%',
        background: 'linear-gradient(180deg, rgba(18, 12, 8, 0.96) 0%, rgba(18, 12, 8, 0.82) 80%, transparent 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        padding: '0.8rem 1.6rem',
      }}
    >
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Left: Back button (if available) + Logo + School / Festival Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(242, 221, 124, 0.4)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#f2dd7c',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Abhaya Libre', Georgia, serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.25)';
                e.currentTarget.style.borderColor = '#f2dd7c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(242, 221, 124, 0.4)';
              }}
            >
              <img src="/svgs/back.svg" alt="" style={{ width: '14px', height: '14px', filter: 'brightness(1.5)' }} />
              <span>{backLabel}</span>
            </button>
          )}

          {/* Master Supragna Logo (Clicking ALWAYS redirects to Homepage) */}
          <div
            onClick={handleLogoClick}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            title="Go to Homepage"
          >
            <img
              src="/images/supragna_logo.png"
              alt="SUPRAGNA 2K27"
              style={{
                height: '52px',
                width: 'auto',
                maxWidth: '210px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 12px rgba(0, 0, 0, 0.8))',
              }}
            />

            <div style={{ borderLeft: '1px solid rgba(212, 175, 55, 0.3)', paddingLeft: '12px' }}>
              <div
                style={{
                  fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                  fontSize: '0.98rem',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  color: '#fef5e1',
                  lineHeight: 1.2,
                }}
              >
                {schoolTitle}
              </div>
              <div
                style={{
                  fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                  fontSize: '0.66rem',
                  fontWeight: 400,
                  color: '#d4af37',
                  letterSpacing: '0.04em',
                  marginTop: '2px',
                }}
              >
                Siddhartha Academy of Higher Education
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right: Desktop Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          {/* Quick links on desktop */}
          <div className="navbar-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {onNavigateHome && (
              <button
                type="button"
                onClick={onNavigateHome}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ded1bb',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  fontFamily: "'Abhaya Libre', Georgia, serif",
                  cursor: 'pointer',
                  padding: '6px 8px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f2dd7c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ded1bb')}
              >
                Home
              </button>
            )}

            {onNavigateAbout && (
              <button
                type="button"
                onClick={onNavigateAbout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ded1bb',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  fontFamily: "'Abhaya Libre', Georgia, serif",
                  cursor: 'pointer',
                  padding: '6px 8px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f2dd7c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ded1bb')}
              >
                About
              </button>
            )}

            {onNavigateSchools && (
              <button
                type="button"
                onClick={onNavigateSchools}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ded1bb',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  fontFamily: "'Abhaya Libre', Georgia, serif",
                  cursor: 'pointer',
                  padding: '6px 8px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f2dd7c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ded1bb')}
              >
                All Schools
              </button>
            )}
          </div>

          {/* Schools Directory Dropdown */}
          {onNavigateSchool && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{
                  background: dropdownOpen ? 'rgba(212, 175, 55, 0.22)' : 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(242, 221, 124, 0.4)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  color: '#f2dd7c',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Abhaya Libre', Georgia, serif",
                  letterSpacing: '0.03em',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.22)';
                  e.currentTarget.style.borderColor = '#f2dd7c';
                }}
                onMouseLeave={(e) => {
                  if (!dropdownOpen) {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(242, 221, 124, 0.4)';
                  }
                }}
              >
                <span>Schools Directory</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                >
                  ▼
                </span>
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    minWidth: '240px',
                    background: 'linear-gradient(145deg, rgba(26, 18, 12, 0.98), rgba(16, 11, 8, 0.99))',
                    border: '1px solid rgba(212, 175, 55, 0.45)',
                    borderRadius: '10px',
                    boxShadow: '0 14px 35px rgba(0, 0, 0, 0.85)',
                    padding: '6px',
                    zIndex: 50,
                  }}
                >
                  {schoolNavigationList.map((school) => {
                    const isActive = school.id === activeSchoolId;
                    return (
                      <a
                        key={school.id}
                        href={school.route}
                        onClick={(e) => {
                          e.preventDefault();
                          setDropdownOpen(false);
                          onNavigateSchool(school.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          color: isActive ? '#f2dd7c' : '#e6d8be',
                          background: isActive ? 'rgba(212, 175, 55, 0.16)' : 'transparent',
                          fontSize: '0.86rem',
                          fontFamily: "'Abhaya Libre', Georgia, serif",
                          fontWeight: isActive ? 700 : 500,
                          textDecoration: 'none',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span>{school.name}</span>
                        {isActive && <span style={{ color: '#f2dd7c', fontSize: '0.75rem' }}>●</span>}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Prominent Navbar Register Button */}
          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              style={{
                background: 'linear-gradient(135deg, #c0392b, #8b1e15)',
                border: '1px solid #f2dd7c',
                borderRadius: '8px',
                padding: '6px 14px',
                color: '#fef5e1',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Abhaya Libre', Georgia, serif",
                letterSpacing: '0.04em',
                boxShadow: '0 2px 10px rgba(192, 57, 43, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(192, 57, 43, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(192, 57, 43, 0.4)';
              }}
            >
              <span>Register Now</span>
              <span>✦</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(242, 221, 124, 0.4)',
              borderRadius: '6px',
              padding: '6px 10px',
              color: '#f2dd7c',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'none', // Controlled via CSS media query
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: '10px',
            background: 'rgba(26, 18, 12, 0.98)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {onNavigateHome && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#f8ebcb',
                padding: '6px 10px',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Home
            </button>
          )}
          {onNavigateSchools && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSchools();
              }}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#f8ebcb',
                padding: '6px 10px',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              All Schools Hub
            </button>
          )}
          {schoolNavigationList.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSchool?.(s.id);
              }}
              style={{
                textAlign: 'left',
                background: activeSchoolId === s.id ? 'rgba(212, 175, 55, 0.15)' : 'none',
                border: 'none',
                color: activeSchoolId === s.id ? '#f2dd7c' : '#ded1bb',
                padding: '6px 10px',
                fontSize: '0.86rem',
                cursor: 'pointer',
              }}
            >
              {s.name}
            </button>
          ))}
          {onOpenRegister && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              style={{
                background: 'linear-gradient(135deg, #c0392b, #8b1e15)',
                border: '1px solid #f2dd7c',
                color: '#fef5e1',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginTop: '6px',
              }}
            >
              Register Now ✦
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default FestivalNavbar;
