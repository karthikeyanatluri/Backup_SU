import React from 'react';
import { FestivalNavbar } from './FestivalNavbar';
import { SupragnaBackground } from './SupragnaBackground';
import { SakuraCanvas } from './SakuraCanvas';
import { SchoolId, schoolNavigationList, schoolsConfigMap } from '../data/schoolsData';

interface SchoolsHubPageProps {
  onBackToHome: () => void;
  onNavigateSchool: (schoolId: SchoolId) => void;
  onOpenRegister: () => void;
}

export const SchoolsHubPage: React.FC<SchoolsHubPageProps> = ({
  onBackToHome,
  onNavigateSchool,
  onOpenRegister,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#120c08',
        color: '#f8ebcb',
        overflowX: 'hidden',
        paddingBottom: '4rem',
      }}
    >
      <SupragnaBackground />
      <SakuraCanvas />

      {/* Top Navbar */}
      <FestivalNavbar
        schoolTitle="Academic Schools"
        onBack={onBackToHome}
        onNavigateSchool={onNavigateSchool}
        onOpenRegister={onOpenRegister}
      />

      {/* Hero Header */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2.5rem 1.5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(242, 221, 124, 0.4)',
            borderRadius: '20px',
            padding: '4px 16px',
            color: '#f2dd7c',
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          <span>⛩️</span>
          <span>Supragna 2K27 Academic Directory</span>
          <span>⛩️</span>
        </div>

        <h1
          style={{
            fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
            fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
            color: '#fef5e1',
            margin: '0 0 0.8rem',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
          }}
        >
          The Five Imperial Schools
        </h1>

        <p
          style={{
            fontFamily: "'Abhaya Libre', Georgia, serif",
            fontSize: '1.1rem',
            color: '#d4af37',
            maxWidth: '720px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}
        >
          Select a school to explore its department pavilions, discover flagship hackathons & competitions,
          and register directly for events.
        </p>
      </header>

      {/* 5 Schools Detailed Showcase Grid */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
            gap: '2rem',
          }}
        >
          {schoolNavigationList.map((school) => {
            const config = schoolsConfigMap[school.id];
            const totalEvents = config.departments.reduce((acc, d) => acc + d.events.length, 0);

            return (
              <div
                key={school.id}
                onClick={() => onNavigateSchool(school.id)}
                style={{
                  position: 'relative',
                  background: 'linear-gradient(145deg, rgba(28, 19, 13, 0.94), rgba(16, 11, 7, 0.98))',
                  border: '1.5px solid rgba(212, 175, 55, 0.38)',
                  borderRadius: '14px',
                  padding: '1.8rem 2rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.28s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#f2dd7c';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(212, 175, 55, 0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.38)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.75)';
                }}
              >
                <div>
                  {/* Top Bar */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                      paddingBottom: '0.8rem',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(212, 175, 55, 0.16)',
                        border: '1px solid #f2dd7c',
                        color: '#f2dd7c',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {config.shortName}
                    </span>

                    <span style={{ color: '#d4af37', fontSize: '0.86rem', fontWeight: 600 }}>
                      ⚡ {config.departments.length} Departments • {totalEvents} Events
                    </span>
                  </div>

                  {/* School Name */}
                  <h2
                    style={{
                      fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                      fontSize: '1.45rem',
                      color: '#fef5e1',
                      margin: '0 0 0.8rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {config.name}
                  </h2>

                  {/* Department Chips */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '1.4rem',
                    }}
                  >
                    {config.departments.map((dept) => (
                      <span
                        key={dept.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(212, 175, 55, 0.25)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.78rem',
                          color: '#ded1bb',
                        }}
                      >
                        <strong>{dept.code}</strong> — {dept.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                    paddingTop: '1rem',
                  }}
                >
                  <span style={{ color: '#a89a84', fontSize: '0.82rem' }}>
                    Siddhartha Academy of Higher Education
                  </span>

                  <span
                    style={{
                      color: '#f2dd7c',
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    Explore Pavilions →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SchoolsHubPage;

