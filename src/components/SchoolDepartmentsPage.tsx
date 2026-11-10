import React, { useMemo, useState } from 'react';
import { CompetitionEvent, DepartmentItem } from '../data/engineeringDepartments';
import { SchoolId, SchoolPageConfig, schoolNavigationList } from '../data/schoolsData';
import { SupragnaBackground } from './SupragnaBackground';
import { SakuraCanvas } from './SakuraCanvas';
import { FestivalNavbar } from './FestivalNavbar';
import { SchoolHero } from './SchoolHero';
import { DepartmentCard } from './DepartmentCard';
import { DepartmentDetailModal } from './DepartmentDetailModal';

export interface SchoolPageProps {
  onBackToSchools?: () => void;
  onNavigateHome?: () => void;
  onNavigateSchools?: () => void;
  onNavigateSchool?: (schoolId: SchoolId) => void;
  onOpenRegister?: () => void;
  onSelectEvent?: (event: CompetitionEvent, dept: DepartmentItem) => void;
}

interface SchoolDepartmentsPageProps extends SchoolPageProps {
  config: SchoolPageConfig;
}

export const SchoolDepartmentsPage: React.FC<SchoolDepartmentsPageProps> = ({
  config,
  onBackToSchools,
  onNavigateHome,
  onNavigateSchools,
  onNavigateSchool,
  onOpenRegister,
  onSelectEvent,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<DepartmentItem | null>(null);

  const displayedDepartments = useMemo(() => {
    let list = [...config.departments];

    if (activeFilter !== 'all') {
      const tab = config.filterTabs.find((t) => t.id === activeFilter);
      if (tab?.matchIds && tab.matchIds.length > 0) {
        list = list.filter((d) => tab.matchIds!.includes(d.id));
      }
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
  }, [config.departments, config.filterTabs, searchQuery, activeFilter]);

  const isSingleCard = displayedDepartments.length === 1;

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
      {/* Master Artwork Background & Vignette */}
      <SupragnaBackground />

      {/* Constant Formal Falling Sakura Petals Behind Cards */}
      <SakuraCanvas />

      {/* Official Top Festival Navigation Bar */}
      <FestivalNavbar
        schoolTitle={config.name}
        activeSchoolId={config.id}
        onNavigateHome={onNavigateHome}
        onNavigateSchools={onNavigateSchools}
        onNavigateSchool={onNavigateSchool}
        onOpenRegister={onOpenRegister}
        onBack={onBackToSchools}
        backLabel="All Schools"
      />

      {/* Hero Header: Logo, School Title, Search & Filter Controls */}
      <SchoolHero
        schoolName={config.name}
        searchPlaceholder={config.searchPlaceholder}
        filterTabs={config.filterTabs}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Main Content Area */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1380px',
          margin: '1.5rem auto 0',
          padding: '0 1.5rem',
        }}
      >
        {displayedDepartments.length > 0 ? (
          <div
            style={
              isSingleCard
                ? {
                    maxWidth: '660px',
                    margin: '0 auto',
                  }
                : {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
                    gap: '1.8rem',
                  }
            }
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
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '3.5rem 1.5rem',
              background: 'rgba(20, 14, 10, 0.75)',
              border: '1px dashed rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
            }}
          >
            <h3
              style={{
                fontFamily: "'DM Serif Text', serif",
                fontSize: '1.3rem',
                color: '#f8ebcb',
                marginBottom: '0.5rem',
              }}
            >
              No Department Matched Your Query
            </h3>
            <p style={{ color: '#958776', fontSize: '0.88rem', marginBottom: '1rem' }}>
              No results found for "{searchQuery}". Try another keyword or reset the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              style={{
                background: 'linear-gradient(135deg, #c0392b, #8b1e15)',
                border: '1px solid #f2dd7c',
                color: '#f8ebcb',
                padding: '6px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: "'Abhaya Libre', serif",
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Institution Info Footer Card */}
        <footer
          style={{
            marginTop: '3.5rem',
            background: 'linear-gradient(145deg, rgba(22, 15, 10, 0.95), rgba(14, 10, 7, 0.98))',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '12px',
            padding: '1.8rem 2rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              paddingBottom: '0.8rem',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  color: '#fef5e1',
                  margin: 0,
                }}
              >
                {config.name} • SUPRAGNA 2K27
              </h3>
              <div
                style={{
                  fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                  fontSize: '0.74rem',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  color: '#d4af37',
                  marginTop: '4px',
                }}
              >
                Siddhartha Academy of Higher Education (VRSEC)
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#c7bba8' }}>
              National Level Techno-Cultural & Management Festival
            </div>
          </div>

          {onNavigateSchool && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                fontSize: '0.82rem',
              }}
            >
              <span style={{ color: '#d4af37', fontWeight: 600 }}>School Pages:</span>
              {schoolNavigationList.map((school) => {
                const isActive = school.id === config.id;
                return (
                  <a
                    key={school.id}
                    href={school.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateSchool(school.id);
                    }}
                    style={{
                      color: isActive ? '#f2dd7c' : '#c7bba8',
                      fontWeight: isActive ? 700 : 400,
                      textDecoration: isActive ? 'underline' : 'none',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                    }}
                  >
                    {school.name}
                  </a>
                );
              })}
              {onOpenRegister && (
                <a
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenRegister();
                  }}
                  style={{
                    color: '#f2dd7c',
                    fontWeight: 700,
                    textDecoration: 'none',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(242, 221, 124, 0.35)',
                    background: 'rgba(192, 57, 43, 0.18)',
                    marginLeft: '4px',
                  }}
                >
                  Registration Portal →
                </a>
              )}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.8rem',
              color: '#958776',
            }}
          >
            <div>Kanuru, Vijayawada, Andhra Pradesh - 520007</div>
            <div>Official Portal: https://supragna2k27.in</div>
          </div>
        </footer>
      </main>

      {/* Department Detail Modal */}
      <DepartmentDetailModal
        dept={selectedDept}
        schoolName={config.name}
        onClose={() => setSelectedDept(null)}
        onRegisterEvent={onSelectEvent}
      />
    </div>
  );
};
