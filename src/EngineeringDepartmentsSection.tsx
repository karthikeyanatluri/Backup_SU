import React, { useState, useMemo } from 'react';
import {
  engineeringDepartmentsData,
  EngineeringDepartment,
  CompetitionEvent,
} from './data/engineeringDepartments';
import { SupragnaBackground } from './components/SupragnaBackground';
import { SakuraCanvas } from './components/SakuraCanvas';
import { DepartmentCard } from './components/DepartmentCard';
import { DepartmentDetailModal } from './components/DepartmentDetailModal';

interface EngineeringDepartmentsSectionProps {
  onBackToSchools?: () => void;
  onSelectEvent?: (event: CompetitionEvent, dept: EngineeringDepartment) => void;
}

/**
 * Drop-in component for Supragna2K27Events Level 2 (School of Engineering Departments).
 * - 6 Engineering Departments in strict alphabetical order:
 *   1. Artificial Intelligence & Data Science (AI)
 *   2. Civil Engineering (CE)
 *   3. Computer Science & Engineering (CSE)
 *   4. Electrical & Electronics Engineering (EEE)
 *   5. Electronics & Communication Engineering (ECE)
 *   6. Mechanical Engineering (ME)
 * - Authentic Supragna 2K27 visual palette: textured parchment, gold trim, crimson accents.
 * - Zero Japanese text, standard modern layout.
 */
export const EngineeringDepartmentsSection: React.FC<EngineeringDepartmentsSectionProps> = ({
  onBackToSchools,
  onSelectEvent,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<EngineeringDepartment | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Departments (7)' },
    { id: 'software', label: 'Computing & AI (AI, CSE)' },
    { id: 'circuits', label: 'Circuits & Instrumentation (ECE, EEE, EIE)' },
    { id: 'core', label: 'Core Infrastructure (CE, ME)' },
  ];

  const displayedDepartments = useMemo(() => {
    let list = [...engineeringDepartmentsData];

    if (activeFilter === 'software') {
      list = list.filter((d) => d.id === 'ai' || d.id === 'cse');
    } else if (activeFilter === 'circuits') {
      list = list.filter((d) => d.id === 'ece' || d.id === 'eee' || d.id === 'eie');
    } else if (activeFilter === 'core') {
      list = list.filter((d) => d.id === 'ce' || d.id === 'me');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          d.domain.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q) ||
          d.events.some((e) => e.name.toLowerCase().includes(q) || e.about.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => a.alphabeticalOrder - b.alphabeticalOrder);

    return list;
  }, [searchQuery, activeFilter]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#120c08',
        color: '#f8ebcb',
        padding: '1.5rem 1.2rem 4rem',
        overflowX: 'hidden',
      }}
    >
      <SupragnaBackground />
      <SakuraCanvas />

      {/* Top Bar with Clear Back Button */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          position: 'relative',
          zIndex: 25,
        }}
      >
        {onBackToSchools && (
          <button
            onClick={onBackToSchools}
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(242, 221, 124, 0.4)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: '#f2dd7c',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Abhaya Libre', Georgia, serif",
              transition: 'all 0.2s',
            }}
          >
            <img src="/svgs/back.svg" alt="" style={{ width: '14px', height: '14px', filter: 'brightness(1.5)' }} />
            <span>Back to Schools</span>
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#d4af37' }}>
          <span>School of Engineering • 7 Departments</span>
        </div>
      </div>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '1100px', margin: '0 auto 2rem', position: 'relative', zIndex: 20 }}>
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

        <h2
          style={{
            fontFamily: "'DM Serif Text', 'Abhaya Libre', serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            color: '#f8ebcb',
            fontWeight: 700,
            marginBottom: '0.4rem',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          Engineering Departments
        </h2>

        {/* Search & Domain Filter Bar */}
        <div
          style={{
            maxWidth: '560px',
            margin: '1.2rem auto 1rem',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search departments or competitions..."
            style={{
              width: '100%',
              background: 'rgba(24, 16, 11, 0.78)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#f8ebcb',
              fontSize: '0.9rem',
              outline: 'none',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
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
                fontSize: '0.95rem',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
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
                padding: '5px 14px',
                borderRadius: '16px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: '1.8rem',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {displayedDepartments.map((dept, idx) => (
          <DepartmentCard
            key={dept.id}
            dept={dept}
            index={idx}
            onSelect={(selected) => setSelectedDept(selected)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <DepartmentDetailModal
        dept={selectedDept}
        onClose={() => setSelectedDept(null)}
        onRegisterEvent={onSelectEvent}
      />
    </div>
  );
};

export default EngineeringDepartmentsSection;
