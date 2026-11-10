import React, { useEffect, useState } from 'react';
import { FestivalNavbar } from './FestivalNavbar';
import { SupragnaBackground } from './SupragnaBackground';
import { SakuraCanvas } from './SakuraCanvas';
import { CrimsonBrushButton } from './CrimsonBrushButton';
import { SchoolId, schoolNavigationList, schoolsConfigMap } from '../data/schoolsData';
import { PASS_DURATION_OPTIONS } from '../data/registrationConfig';

interface HomepageProps {
  onNavigateSchool: (schoolId: SchoolId) => void;
  onNavigateSchools: () => void;
  onNavigateRegister: () => void;
  onNavigateAbout?: () => void;
}

// Official festival kickoff date: February 19, 2027
const FESTIVAL_START_DATE = new Date('2027-02-19T09:00:00+05:30').getTime();

export const Homepage: React.FC<HomepageProps> = ({
  onNavigateSchool,
  onNavigateSchools,
  onNavigateRegister,
}) => {
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = FESTIVAL_START_DATE - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Visual Artwork Background */}
      <SupragnaBackground />

      {/* Atmospheric Falling Sakura Petals */}
      <SakuraCanvas />

      {/* Unified Festival Navigation */}
      <FestivalNavbar
        schoolTitle="National Festival"
        onNavigateSchool={onNavigateSchool}
        onOpenRegister={onNavigateRegister}
      />

      {/* ======================================================== */}
      {/* HERO SECTION: Crest, Title, Dates, Countdown & CTAs       */}
      {/* ======================================================== */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(2rem, 5vw, 4.5rem) 1.5rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Floating Japanese Torii Lantern Accent */}
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
            marginBottom: '1.2rem',
            fontFamily: "'Abhaya Libre', Georgia, serif",
          }}
        >
          <span>⛩️</span>
          <span>Siddhartha Academy of Higher Education (VRSEC)</span>
          <span>⛩️</span>
        </div>

        {/* Master SUPRAGNA 2K27 Dragon Emblem */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <img
            src="/images/supragna_logo.png"
            alt="SUPRAGNA 2K27"
            style={{
              width: '100%',
              maxWidth: 'min(580px, 88vw)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 25px rgba(242, 221, 124, 0.2))',
            }}
          />
        </div>

        {/* Subtitle / Grand Headline */}
        <h1
          style={{
            fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
            fontSize: 'clamp(1.4rem, 3.2vw, 2.4rem)',
            color: '#fef5e1',
            letterSpacing: '0.04em',
            margin: '0.5rem 0 0.8rem',
            lineHeight: 1.25,
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
          }}
        >
          National Level Techno-Cultural & Management Festival
        </h1>

        <p
          style={{
            fontFamily: "'Abhaya Libre', Georgia, serif",
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: '#d4af37',
            maxWidth: '780px',
            lineHeight: 1.6,
            margin: '0 0 1.8rem',
          }}
        >
          Uniting the Five Imperial Academies in an extraordinary celebration of technological mastery,
          creative arts, judicial excellence, and visionary management.
        </p>

        {/* Festival Date Plaque */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(38, 26, 17, 0.92), rgba(20, 14, 9, 0.96))',
            border: '1.5px solid #d4af37',
            borderRadius: '10px',
            padding: '8px 24px',
            color: '#f8ebcb',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            fontFamily: "'Shojumaru', 'Japan Ramen', serif",
            marginBottom: '2rem',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(242, 221, 124, 0.1)',
          }}
        >
          FEBRUARY 19 – 20, 2027 • VIJAYAWADA
        </div>

        {/* ======================================================== */}
        {/* COUNTDOWN TIMER PLAQUES                                  */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(8px, 2.5vw, 20px)',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { label: 'Days', value: timeLeft.days, jp: '日' },
            { label: 'Hours', value: timeLeft.hours, jp: '時' },
            { label: 'Minutes', value: timeLeft.minutes, jp: '分' },
            { label: 'Seconds', value: timeLeft.seconds, jp: '秒' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: 'linear-gradient(145deg, rgba(30, 20, 14, 0.94), rgba(18, 12, 8, 0.98))',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                borderRadius: '10px',
                padding: '10px 16px',
                minWidth: 'clamp(68px, 14vw, 92px)',
                textAlign: 'center',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.75)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Shojumaru', 'Japan Ramen', serif",
                  fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                  color: '#f2dd7c',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#a89a84',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* PRIMARY CALL TO ACTIONS (REGISTER NOW & EXPLORE SCHOOLS) */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {/* Prominent Crimson Brush Register Button */}
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <CrimsonBrushButton
              label="Register Now ✦"
              onClick={onNavigateRegister}
              fullWidth={true}
            />
          </div>

          {/* Golden Torii Explore Schools Button */}
          <button
            type="button"
            onClick={onNavigateSchools}
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(120, 85, 20, 0.4))',
              border: '1.5px solid #f2dd7c',
              borderRadius: '8px',
              padding: '14px 28px',
              color: '#fef5e1',
              fontFamily: "'Shojumaru', 'Japan Ramen', serif",
              fontSize: '1.05rem',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.7)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(242, 221, 124, 0.35), rgba(160, 115, 30, 0.6))';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(120, 85, 20, 0.4))';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span>Explore All Schools</span>
            <span style={{ color: '#f2dd7c' }}>→</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* SECTION: THE 5 SCHOOLS GATEWAY DIRECTORY                 */}
      {/* ======================================================== */}
      <section
        id="schools"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1380px',
          margin: '3rem auto 0',
          padding: '0 1.5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
          <div
            style={{
              color: '#d4af37',
              fontSize: '0.84rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '6px',
            }}
          >
            Explore Arenas & Competitions
          </div>
          <h2
            style={{
              fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
              fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
              color: '#fef5e1',
              margin: 0,
            }}
          >
            The Five Imperial Schools
          </h2>
          <p
            style={{
              color: '#b5a691',
              fontSize: '0.92rem',
              maxWidth: '640px',
              margin: '8px auto 0',
            }}
          >
            Select any school below to discover its specialized departments, flagship tournaments, and cash prize pools.
          </p>
        </div>

        {/* 5 Schools Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '1.6rem',
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
                  border: '1.5px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '12px',
                  padding: '1.6rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.28s ease',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#f2dd7c';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 14px 35px rgba(212, 175, 55, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.7)';
                }}
              >
                <div>
                  {/* School Badge & Acronym */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid #f2dd7c',
                        color: '#f2dd7c',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {config.shortName}
                    </span>

                    <span
                      style={{
                        color: '#a89a84',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {config.departments.length} Departments
                    </span>
                  </div>

                  {/* School Title */}
                  <h3
                    style={{
                      fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                      fontSize: '1.25rem',
                      color: '#fef5e1',
                      margin: '0 0 0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {config.name}
                  </h3>

                  {/* Department Tags Preview */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      margin: '0.8rem 0 1.2rem',
                    }}
                  >
                    {config.departments.slice(0, 4).map((d) => (
                      <span
                        key={d.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(212, 175, 55, 0.2)',
                          color: '#ded1bb',
                          fontSize: '0.74rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {d.code} - {d.name.split(' ')[0]}
                      </span>
                    ))}
                    {config.departments.length > 4 && (
                      <span style={{ fontSize: '0.72rem', color: '#d4af37', alignSelf: 'center' }}>
                        +{config.departments.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                    paddingTop: '0.9rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <span style={{ color: '#d4af37', fontSize: '0.82rem', fontWeight: 600 }}>
                    ⚡ {totalEvents} Competitions
                  </span>
                  <span
                    style={{
                      color: '#f2dd7c',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Explore Departments →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION: ABOUT THE FESTIVAL                              */}
      {/* ======================================================== */}
      <section
        id="about"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '4.5rem auto 0',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(26, 17, 12, 0.94), rgba(15, 10, 6, 0.98))',
            border: '1.5px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '14px',
            padding: 'clamp(1.8rem, 4vw, 3rem)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  color: '#d4af37',
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                About Supragna 2K27
              </div>
              <h2
                style={{
                  fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                  fontSize: 'clamp(1.45rem, 2.5vw, 2.1rem)',
                  color: '#fef5e1',
                  margin: '0 0 1rem',
                  lineHeight: 1.3,
                }}
              >
                The Spirit of Mastery & Innovation
              </h2>
              <p style={{ color: '#d5c7b3', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Organized by the prestigious <strong>Siddhartha Academy of Higher Education (VRSEC)</strong>,
                SUPRAGNA 2K27 is a benchmark national inter-collegiate symposium bringing together thousands of
                aspiring engineers, scientists, managers, advocates, and creative thinkers across the country.
              </p>
              <p style={{ color: '#d5c7b3', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                With state-of-the-art hackathons, paper symposiums, robotics battlegrounds, moot court trials,
                corporate strategy leagues, and cultural showcases, SUPRAGNA 2K27 provides an unmatched platform
                for students to push their boundaries and earn national acclaim.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  style={{
                    background: 'linear-gradient(135deg, #c0392b, #8b1e15)',
                    border: '1px solid #f2dd7c',
                    color: '#fef5e1',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(192, 57, 43, 0.4)',
                  }}
                >
                  Register as Delegate →
                </button>
                <button
                  type="button"
                  onClick={onNavigateSchools}
                  style={{
                    background: 'rgba(212, 175, 55, 0.14)',
                    border: '1px solid rgba(242, 221, 124, 0.4)',
                    color: '#f2dd7c',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                >
                  Explore Events
                </button>
              </div>
            </div>

            {/* Festival Metrics Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.2rem',
              }}
            >
              {[
                { number: '5', label: 'Academic Schools', sub: 'Engineering, Science, Mgmt, Arts, Law' },
                { number: '18+', label: 'Specialized Depts', sub: 'Frontier technological domains' },
                { number: '50+', label: 'Competitions', sub: 'Hackathons, Robo-wars, Moot Courts' },
                { number: '₹15L+', label: 'Prize Bounty', sub: 'Cash rewards & merit citations' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(18, 12, 8, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '10px',
                    padding: '1.2rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Shojumaru', 'Japan Ramen', serif",
                      fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                      color: '#f2dd7c',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      color: '#fef5e1',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      marginBottom: '4px',
                    }}
                  >
                    {stat.label}
                  </div>
                  <div style={{ color: '#9d8e7d', fontSize: '0.74rem' }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION: FESTIVAL PASSES OVERVIEW                        */}
      {/* ======================================================== */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '4.5rem auto 0',
          padding: '0 1.5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              color: '#d4af37',
              fontSize: '0.84rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '6px',
            }}
          >
            Access Passes
          </div>
          <h2
            style={{
              fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
              fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
              color: '#fef5e1',
              margin: 0,
            }}
          >
            Choose Your Delegate Pass
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '1.8rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {PASS_DURATION_OPTIONS.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: 'linear-gradient(145deg, rgba(28, 19, 13, 0.95), rgba(16, 11, 7, 0.98))',
                border: plan.badge ? '2px solid #d4af37' : '1.5px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '12px',
                padding: '1.8rem',
                position: 'relative',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '18px',
                    background: 'linear-gradient(135deg, #c0392b, #8b1e15)',
                    border: '1px solid #f2dd7c',
                    color: '#fef5e1',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 12px',
                    borderRadius: '4px',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div>
                <h3
                  style={{
                    fontFamily: "'Shojumaru', 'Japan Ramen', serif",
                    fontSize: '1.25rem',
                    color: '#fef5e1',
                    margin: '0 0 0.4rem',
                  }}
                >
                  {plan.title}
                </h3>
                <div
                  style={{
                    fontFamily: "'Shojumaru', 'Japan Ramen', serif",
                    fontSize: '1.8rem',
                    color: '#f2dd7c',
                    marginBottom: '1.2rem',
                  }}
                >
                  {plan.priceLabel}
                </div>

                <ul
                  style={{
                    paddingLeft: '1.2rem',
                    color: '#ded1bb',
                    fontSize: '0.86rem',
                    lineHeight: 1.6,
                    margin: '0 0 1.5rem',
                  }}
                >
                  {plan.perks.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={onNavigateRegister}
                style={{
                  width: '100%',
                  background: plan.badge
                    ? 'linear-gradient(135deg, #c0392b, #8b1e15)'
                    : 'rgba(212, 175, 55, 0.16)',
                  border: plan.badge ? '1px solid #f2dd7c' : '1px solid rgba(242, 221, 124, 0.4)',
                  color: '#fef5e1',
                  borderRadius: '8px',
                  padding: '12px',
                  fontFamily: "'Shojumaru', 'Japan Ramen', serif",
                  fontSize: '0.92rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Register For Pass →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* INSTITUTION FOOTER                                       */}
      {/* ======================================================== */}
      <footer
        style={{
          marginTop: '5rem',
          background: 'linear-gradient(145deg, rgba(22, 15, 10, 0.95), rgba(14, 10, 7, 0.98))',
          borderTop: '1px solid rgba(212, 175, 55, 0.3)',
          padding: '2.5rem 1.5rem 1.8rem',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src="/images/supragna_logo.png"
                alt="SUPRAGNA 2K27"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontFamily: "'Shojumaru', serif", fontSize: '1.05rem', color: '#fef5e1' }}>
                  SUPRAGNA 2K27
                </div>
                <div style={{ fontSize: '0.78rem', color: '#d4af37' }}>
                  Siddhartha Academy of Higher Education (VRSEC)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={onNavigateSchools}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ded1bb',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                All Schools
              </button>
              <button
                onClick={onNavigateRegister}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f2dd7c',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                  textDecoration: 'underline',
                }}
              >
                Register Now
              </button>
              <a
                href="https://x.com/supragna_2k27"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official X (@supragna_2k27)"
                style={{
                  color: '#f2dd7c',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(242, 221, 124, 0.35)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#f2dd7c';
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(242, 221, 124, 0.35)';
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                }}
              >
                <span>𝕏</span> @supragna_2k27
              </a>
              <a
                href="https://www.linkedin.com/school/siddhartha-academy/posts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official LinkedIn - Siddhartha Academy"
                style={{
                  color: '#ded1bb',
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 8px',
                }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/supragna_2k27?rpxt=MXFqMnd3N2xhYnZvaw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official Instagram"
                style={{
                  color: '#ded1bb',
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 8px',
                }}
              >
                Instagram
              </a>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(212, 175, 55, 0.15)',
              paddingTop: '1.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.8rem',
              color: '#8f8373',
            }}
          >
            <div>Kanuru, Vijayawada, Andhra Pradesh - 520007</div>
            <div>© 2027 SUPRAGNA • Siddhartha Academy of Higher Education. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

