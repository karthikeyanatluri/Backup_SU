import React, { useEffect, useMemo, useState } from 'react';
import { CompetitionEvent, EngineeringDepartment } from '../data/engineeringDepartments';

interface DepartmentDetailModalProps {
  dept: EngineeringDepartment | null;
  schoolName?: string;
  onClose: () => void;
  onRegisterEvent?: (event: CompetitionEvent, dept: EngineeringDepartment) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  dept,
  schoolName = 'School of Engineering',
  onClose,
  onRegisterEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory('all');
  }, [dept?.id]);

  const categories = useMemo(() => {
    if (!dept) return ['all'];
    const unique = Array.from(new Set(dept.events.map((e) => e.category.toLowerCase())));
    return ['all', ...unique];
  }, [dept]);

  if (!dept) return null;

  const filteredEvents =
    selectedCategory === 'all'
      ? dept.events
      : dept.events.filter((e) => e.category.toLowerCase() === selectedCategory);

  const handleRegister = (event: CompetitionEvent) => {
    if (onRegisterEvent) {
      onRegisterEvent(event, dept);
    } else {
      setToastMessage(`Registration initiated for ${event.name}! Redirecting to portal...`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        background: 'rgba(9, 6, 4, 0.88)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          background: 'linear-gradient(145deg, #1f150f, #150e09)',
          border: '1.5px solid #d4af37',
          borderRadius: '14px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), inset 0 0 25px rgba(242, 221, 124, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Top Header Bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #1a100a, #38120e, #5a1814, #38120e, #1a100a)',
            borderBottom: '1px solid rgba(242, 221, 124, 0.4)',
            padding: '1.2rem 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid #f2dd7c',
                color: '#f2dd7c',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              {dept.code}
            </span>

            <span
              style={{
                fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif",
                color: '#f2dd7c',
                fontSize: '1.05rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
              }}
            >
              {dept.japaneseName}
            </span>

            <div>
              <h2
                style={{
                  fontFamily: "'DM Serif Text', 'Abhaya Libre', serif",
                  fontSize: '1.5rem',
                  color: '#f8ebcb',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {dept.name}
              </h2>
              <div style={{ fontSize: '0.78rem', color: '#d4af37', marginTop: '2px' }}>
                {dept.domain} • {schoolName}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(242, 221, 124, 0.5)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#f2dd7c',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c0392b';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.color = '#f2dd7c';
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          style={{
            padding: '1.4rem 1.6rem',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 85px)',
          }}
        >
          {/* Department Meta Information Banner */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
              marginBottom: '1.4rem',
              background: 'rgba(12, 8, 6, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '8px',
              padding: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', color: '#d4af37', textTransform: 'uppercase' }}>
                Research Hub
              </span>
              <div style={{ color: '#f8ebcb', fontWeight: 600, fontSize: '0.86rem', marginTop: '2px' }}>
                {dept.flagshipLab}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#d4af37', textTransform: 'uppercase' }}>
                Total Department Prize Pool
              </span>
              <div style={{ color: '#f2dd7c', fontWeight: 800, fontSize: '1.1rem', marginTop: '2px' }}>
                {dept.totalPrizePool}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#d4af37', textTransform: 'uppercase' }}>
                Faculty Mentor
              </span>
              <div style={{ color: '#f8ebcb', fontSize: '0.86rem', marginTop: '2px' }}>
                {dept.facultyMentor}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#d4af37', textTransform: 'uppercase' }}>
                Student Lead
              </span>
              <div style={{ color: '#f8ebcb', fontSize: '0.86rem', marginTop: '2px' }}>
                {dept.studentLead.name} ({dept.studentLead.phone})
              </div>
            </div>
          </div>

          {/* Department Motto */}
          <div
            style={{
              padding: '0.7rem 1rem',
              background: 'rgba(212, 175, 55, 0.08)',
              borderLeft: '3px solid #f2dd7c',
              borderRadius: '4px',
              marginBottom: '1.4rem',
              fontStyle: 'italic',
              color: '#e0d5bb',
              fontSize: '0.92rem',
            }}
          >
            "{dept.tagline}"
          </div>

          {/* Filter Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
              paddingBottom: '0.8rem',
              marginBottom: '1.2rem',
            }}
          >
            <h3
              style={{
                fontFamily: "'DM Serif Text', serif",
                fontSize: '1.2rem',
                color: '#f8ebcb',
                margin: 0,
              }}
            >
              Competitions & Events ({filteredEvents.length})
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? '#d4af37' : 'rgba(20, 14, 10, 0.7)',
                    color: selectedCategory === cat ? '#120c08' : '#c7bba8',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                  }}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Toast Message */}
          {toastMessage && (
            <div
              style={{
                background: 'linear-gradient(135deg, #27ae60, #219653)',
                color: '#fff',
                padding: '9px 14px',
                borderRadius: '6px',
                marginBottom: '1rem',
                fontSize: '0.86rem',
                fontWeight: 600,
              }}
            >
              ✓ {toastMessage}
            </div>
          )}

          {/* Event Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'rgba(22, 15, 11, 0.85)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '10px',
                  padding: '1.2rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          border: '1px solid #f2dd7c',
                          color: '#f2dd7c',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        {evt.category}
                      </span>
                      {evt.highlightBadge && (
                        <span
                          style={{
                            background: 'rgba(192, 57, 43, 0.25)',
                            border: '1px solid #c0392b',
                            color: '#ff8da1',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                          }}
                        >
                          {evt.highlightBadge}
                        </span>
                      )}
                    </div>

                    <h4
                      style={{
                        fontFamily: "'DM Serif Text', serif",
                        fontSize: '1.25rem',
                        color: '#f8ebcb',
                        margin: 0,
                      }}
                    >
                      {evt.name}
                    </h4>
                  </div>

                  <div
                    style={{
                      background: 'rgba(12, 8, 6, 0.9)',
                      border: '1px solid #f2dd7c',
                      borderRadius: '6px',
                      padding: '5px 12px',
                      textAlign: 'right',
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', color: '#c7bba8', textTransform: 'uppercase' }}>
                      Prize Pool
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f2dd7c' }}>
                      {evt.prizePool}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.84rem', color: '#f2dd7c', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                  {evt.tagline}
                </div>

                <p style={{ color: '#c7bba8', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                  {evt.about}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    padding: '7px 10px',
                    background: 'rgba(10, 7, 5, 0.6)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: '#e0d5bb',
                    marginBottom: '0.8rem',
                  }}
                >
                  <span>📍 <strong>Venue:</strong> {evt.venue}</span>
                  <span>⏰ <strong>Schedule:</strong> {evt.schedule}</span>
                  <span>👥 <strong>Team:</strong> {evt.teamSize}</span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.76rem', color: '#d4af37', fontWeight: 700, marginBottom: '4px' }}>
                    Competition Guidelines:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#a89f91', fontSize: '0.8rem', lineHeight: 1.55 }}>
                    {evt.rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                    borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                    paddingTop: '0.7rem',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: '#958776' }}>
                    Coordinators:{' '}
                    {evt.coordinators.map((c, i) => (
                      <span key={i} style={{ color: '#f8ebcb', marginRight: '6px' }}>
                        {c.name} ({c.contact})
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRegister(evt)}
                    style={{
                      background: 'linear-gradient(135deg, #c0392b, #8b1e15)',
                      border: '1px solid #f2dd7c',
                      borderRadius: '6px',
                      padding: '7px 18px',
                      color: '#f8ebcb',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    Register for Event →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
