import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { CompetitionEvent, DepartmentItem } from './data/engineeringDepartments';
import { RegistrationSelection } from './data/registrationConfig';
import { SchoolId, schoolsConfigMap } from './data/schoolsData';
import './styles/theme.css';

// Code-split / Lazy-load route components for optimal performance
const Homepage = lazy(() => import('./components/Homepage'));
const SchoolsHubPage = lazy(() => import('./components/SchoolsHubPage'));
const EngineeringDepartmentsPage = lazy(() => import('./EngineeringDepartmentsPage'));
const ScienceDepartmentsPage = lazy(() => import('./ScienceDepartmentsPage'));
const ManagementDepartmentsPage = lazy(() => import('./ManagementDepartmentsPage'));
const ArtsCommerceDepartmentsPage = lazy(() => import('./ArtsCommerceDepartmentsPage'));
const LawDepartmentsPage = lazy(() => import('./LawDepartmentsPage'));
const RegisterPage = lazy(() => import('./RegisterPage'));

type ActiveRoute = 'home' | 'about' | 'schools' | SchoolId | 'register';

function resolveRouteFromLocation(): ActiveRoute {
  const hash = (window.location.hash.replace(/^#\/?/, '')).toLowerCase();
  const rawPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  const path = rawPath || hash;

  if (path.includes('register')) return 'register';
  if (path.includes('about')) return 'about';
  if (path === 'schools' || hash === 'schools') return 'schools';
  if (path.includes('science')) return 'science';
  if (path.includes('management')) return 'management';
  if (path.includes('arts') || path.includes('commerce')) return 'arts-commerce';
  if (path.includes('law')) return 'law';
  if (path.includes('engineering')) return 'engineering';
  if (!path || path === 'home' || hash === 'home') return 'home';

  return 'home';
}

function resolveInitialPrefillFromUrl(): Partial<RegistrationSelection> | undefined {
  const params = new URLSearchParams(window.location.search);
  const school = params.get('school') as SchoolId | null;
  const dept = params.get('dept');
  const event = params.get('event');

  if (school || dept || event) {
    return {
      schoolId: school || undefined,
      deptId: dept || undefined,
      eventIds: event ? [event] : undefined,
    };
  }
  return undefined;
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<ActiveRoute>(() => resolveRouteFromLocation());
  const [registerPrefill, setRegisterPrefill] = useState<Partial<RegistrationSelection> | undefined>(
    () => resolveInitialPrefillFromUrl()
  );

  // Sync state with browser Back/Forward (popstate) and hash changes
  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(resolveRouteFromLocation());
      setRegisterPrefill(resolveInitialPrefillFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update document title and canonical meta dynamically
  useEffect(() => {
    if (activeRoute === 'home' || activeRoute === 'about') {
      document.title = 'SUPRAGNA 2K27 | National Techno-Cultural & Management Festival | VRSEC';
    } else if (activeRoute === 'schools') {
      document.title = 'Academic Schools Directory | SUPRAGNA 2K27 | Siddhartha Academy of Higher Education';
    } else if (activeRoute === 'register') {
      document.title = 'Event Registration Portal | SUPRAGNA 2K27 | Siddhartha Academy of Higher Education';
    } else {
      const school = schoolsConfigMap[activeRoute];
      document.title = `${school?.name || 'School'} | SUPRAGNA 2K27 | Siddhartha Academy of Higher Education`;
    }
  }, [activeRoute]);

  // Handle in-page smooth anchor scrolling when navigating to 'about'
  useEffect(() => {
    if (activeRoute === 'about') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeRoute]);

  const navigateToHome = useCallback(() => {
    if (window.location.pathname !== '/' || window.location.search) {
      window.history.pushState({}, '', '/');
    }
    setActiveRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToAbout = useCallback(() => {
    if (window.location.pathname !== '/#about') {
      window.history.pushState({}, '', '/#about');
    }
    setActiveRoute('home');
    setTimeout(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const navigateToSchools = useCallback(() => {
    if (window.location.pathname !== '/schools' || window.location.search) {
      window.history.pushState({}, '', '/schools');
    }
    setActiveRoute('schools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToSchool = useCallback((schoolId: SchoolId) => {
    const targetRoute = schoolsConfigMap[schoolId].route;
    if (window.location.pathname !== targetRoute || window.location.search) {
      window.history.pushState({}, '', targetRoute);
    }
    setActiveRoute(schoolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToRegister = useCallback((prefill?: Partial<RegistrationSelection>) => {
    setRegisterPrefill(prefill);
    const params = new URLSearchParams();
    if (prefill?.schoolId) params.set('school', prefill.schoolId);
    if (prefill?.deptId) params.set('dept', prefill.deptId);
    if (prefill?.eventIds?.[0]) params.set('event', prefill.eventIds[0]);
    const query = params.toString();
    const targetUrl = query ? `/register?${query}` : '/register';

    if (window.location.pathname + window.location.search !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    setActiveRoute('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Bridge between Department Modal Event selection and Registration
  const createSelectEventHandler = useCallback(
    (schoolId: SchoolId) => (event: CompetitionEvent, dept: DepartmentItem) => {
      navigateToRegister({
        schoolId,
        deptId: dept.id,
        eventIds: [event.id],
      });
    },
    [navigateToRegister]
  );

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#120c08',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f2dd7c',
            fontFamily: "'Shojumaru', 'Japan Ramen', serif",
            gap: '12px',
          }}
        >
          <div style={{ fontSize: '1.8rem' }}>⛩️</div>
          <div style={{ fontSize: '1.1rem', letterSpacing: '0.08em' }}>
            Entering Supragna 2K27 Pavilions...
          </div>
        </div>
      }
    >
      {activeRoute === 'home' || activeRoute === 'about' ? (
        <Homepage
          onNavigateSchool={navigateToSchool}
          onNavigateSchools={navigateToSchools}
          onNavigateRegister={() => navigateToRegister()}
          onNavigateAbout={navigateToAbout}
        />
      ) : activeRoute === 'schools' ? (
        <SchoolsHubPage
          onBackToHome={navigateToHome}
          onNavigateSchool={navigateToSchool}
          onOpenRegister={() => navigateToRegister()}
        />
      ) : activeRoute === 'register' ? (
        <RegisterPage
          initialSelection={registerPrefill}
          onNavigateHome={navigateToHome}
          onNavigateSchool={navigateToSchool}
          onBackToSchools={navigateToSchools}
        />
      ) : activeRoute === 'science' ? (
        <ScienceDepartmentsPage
          onBackToSchools={navigateToSchools}
          onNavigateHome={navigateToHome}
          onNavigateSchools={navigateToSchools}
          onNavigateSchool={navigateToSchool}
          onOpenRegister={() => navigateToRegister({ schoolId: 'science' })}
          onSelectEvent={createSelectEventHandler('science')}
        />
      ) : activeRoute === 'management' ? (
        <ManagementDepartmentsPage
          onBackToSchools={navigateToSchools}
          onNavigateHome={navigateToHome}
          onNavigateSchools={navigateToSchools}
          onNavigateSchool={navigateToSchool}
          onOpenRegister={() => navigateToRegister({ schoolId: 'management' })}
          onSelectEvent={createSelectEventHandler('management')}
        />
      ) : activeRoute === 'arts-commerce' ? (
        <ArtsCommerceDepartmentsPage
          onBackToSchools={navigateToSchools}
          onNavigateHome={navigateToHome}
          onNavigateSchools={navigateToSchools}
          onNavigateSchool={navigateToSchool}
          onOpenRegister={() => navigateToRegister({ schoolId: 'arts-commerce' })}
          onSelectEvent={createSelectEventHandler('arts-commerce')}
        />
      ) : activeRoute === 'law' ? (
        <LawDepartmentsPage
          onBackToSchools={navigateToSchools}
          onNavigateHome={navigateToHome}
          onNavigateSchools={navigateToSchools}
          onNavigateSchool={navigateToSchool}
          onOpenRegister={() => navigateToRegister({ schoolId: 'law' })}
          onSelectEvent={createSelectEventHandler('law')}
        />
      ) : (
        /* Default: School of Engineering */
        <EngineeringDepartmentsPage
          onBackToSchools={navigateToSchools}
          onNavigateHome={navigateToHome}
          onNavigateSchools={navigateToSchools}
          onNavigateSchool={navigateToSchool}
          onOpenRegister={() => navigateToRegister({ schoolId: 'engineering' })}
          onSelectEvent={createSelectEventHandler('engineering')}
        />
      )}
    </Suspense>
  );
}
