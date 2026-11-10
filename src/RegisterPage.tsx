import React, { useEffect, useMemo, useState } from 'react';
import { RegistrationBackground } from './components/RegistrationBackground';
import { SakuraCanvas } from './components/SakuraCanvas';
import { CrimsonBrushButton } from './components/CrimsonBrushButton';
import { schoolNavigationList, schoolsConfigMap, type SchoolId } from './data/schoolsData';
import {
  PASS_DURATION_OPTIONS,
  type PassDurationId,
  type RegistrationSelection,
  generatePassReference,
  isValidMobileNumber,
  normalizeDigits,
} from './data/registrationConfig';

interface RegisterPageProps {
  initialSelection?: Partial<RegistrationSelection>;
  onBack?: () => void;
  onBackToSchools?: () => void;
  onNavigateHome?: () => void;
  onNavigateSchool?: (schoolId: SchoolId) => void;
}

const scrollInputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255, 249, 236, 0.88)',
  border: '1.5px solid rgba(102, 60, 26, 0.45)',
  borderRadius: '8px',
  padding: '10px 13px',
  color: '#1b0f07',
  fontSize: '0.92rem',
  fontWeight: 600,
  fontFamily: 'system-ui, -apple-system, sans-serif',
  outline: 'none',
  boxShadow: 'inset 0 1px 4px rgba(68, 38, 14, 0.1)',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
};

const scrollSelectStyle: React.CSSProperties = {
  ...scrollInputStyle,
  cursor: 'pointer',
  appearance: 'auto',
};

const scrollLabelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.76rem',
  color: '#5a2810',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  fontWeight: 800,
  marginBottom: '5px',
};

export const RegisterPage: React.FC<RegisterPageProps> = ({
  initialSelection,
  onBack,
  onBackToSchools,
  onNavigateHome: _onNavigateHome,
  onNavigateSchool: _onNavigateSchool,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToSchools) {
      onBackToSchools();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/events';
    }
  };

  // Read query params from URL if present
  const queryParams = useMemo(() => new URLSearchParams(window.location.search), []);

  const defaultSchoolId: SchoolId =
    initialSelection?.schoolId ||
    (queryParams.get('school') as SchoolId) ||
    'engineering';

  // School, Department, and Event selection states
  const [selectedSchoolId, setSelectedSchoolId] = useState<SchoolId>(() => {
    return schoolsConfigMap[defaultSchoolId] ? defaultSchoolId : 'engineering';
  });

  const activeSchoolConfig = schoolsConfigMap[selectedSchoolId] ?? schoolsConfigMap.engineering;

  const [selectedDeptId, setSelectedDeptId] = useState<string>(() => {
    const qDept = initialSelection?.deptId || queryParams.get('dept');
    if (qDept && activeSchoolConfig.departments.some((d) => d.id === qDept)) {
      return qDept;
    }
    return activeSchoolConfig.departments[0]?.id || '';
  });

  const activeDepartment = useMemo(() => {
    return (
      activeSchoolConfig.departments.find((d) => d.id === selectedDeptId) ||
      activeSchoolConfig.departments[0]
    );
  }, [activeSchoolConfig, selectedDeptId]);

  const findMatchingEventId = (dept: any, qEvt: string | null | undefined): string => {
    if (!dept || !dept.events || dept.events.length === 0) return '';
    if (!qEvt) return dept.events[0]?.id || '';
    const exactMatch = dept.events.find((e: any) => e.id.toLowerCase() === qEvt.toLowerCase());
    if (exactMatch) return exactMatch.id;
    try {
      const decoded = decodeURIComponent(qEvt).toLowerCase();
      const nameMatch = dept.events.find((e: any) => 
        e.name.toLowerCase().includes(decoded) ||
        decoded.includes(e.name.toLowerCase())
      );
      if (nameMatch) return nameMatch.id;
    } catch {}
    const num = parseInt(qEvt, 10);
    if (!isNaN(num)) {
      const idx = (num % 100) - 1;
      if (idx >= 0 && idx < dept.events.length) {
        return dept.events[idx].id;
      }
    }
    return dept.events[0]?.id || '';
  };

  const [selectedEventId, setSelectedEventId] = useState<string>(() => {
    const qEvt = initialSelection?.eventIds?.[0] || queryParams.get('event');
    return findMatchingEventId(activeDepartment, qEvt);
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qSchool = (initialSelection?.schoolId || params.get('school')) as SchoolId;
    if (qSchool && schoolsConfigMap[qSchool]) {
      setSelectedSchoolId(qSchool);
      const conf = schoolsConfigMap[qSchool];
      const qDept = initialSelection?.deptId || params.get('dept');
      const dept = conf.departments.find(d => d.id === qDept) || conf.departments[0];
      if (dept) {
        setSelectedDeptId(dept.id);
        const qEvt = initialSelection?.eventIds?.[0] || params.get('event');
        const evtId = findMatchingEventId(dept, qEvt);
        setSelectedEventId(evtId);
      }
    }
  }, [initialSelection]);

  const activeEvent = useMemo(() => {
    return (
      activeDepartment?.events.find((e) => e.id === selectedEventId) ||
      activeDepartment?.events[0]
    );
  }, [activeDepartment, selectedEventId]);

  // Keep URL parameters in sync so browser refresh or bookmarking never loses selection
  const syncUrlParams = (sch: string, dept: string, evt: string) => {
    const params = new URLSearchParams(window.location.search);
    if (sch) params.set('school', sch);
    if (dept) params.set('dept', dept);
    if (evt) params.set('event', evt);
    const newUrl = `/register?${params.toString()}`;
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState({}, '', newUrl);
    }
  };

  const handleSchoolChange = (newSchoolId: SchoolId) => {
    setSelectedSchoolId(newSchoolId);
    const newSchoolConfig = schoolsConfigMap[newSchoolId] ?? schoolsConfigMap.engineering;
    const firstDept = newSchoolConfig.departments[0];
    const newDeptId = firstDept?.id || '';
    const firstEvt = firstDept?.events[0];
    const newEvtId = firstEvt?.id || '';

    setSelectedDeptId(newDeptId);
    setSelectedEventId(newEvtId);
    syncUrlParams(newSchoolId, newDeptId, newEvtId);
  };

  const handleDeptChange = (newDeptId: string) => {
    setSelectedDeptId(newDeptId);
    const dept = activeSchoolConfig.departments.find((d) => d.id === newDeptId);
    const firstEvt = dept?.events[0];
    const newEvtId = firstEvt?.id || '';
    setSelectedEventId(newEvtId);
    syncUrlParams(selectedSchoolId, newDeptId, newEvtId);
  };

  const handleEventChange = (newEventId: string) => {
    setSelectedEventId(newEventId);
    syncUrlParams(selectedSchoolId, selectedDeptId, newEventId);
  };

  // Participant Form Details
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternateMobileNumber, setAlternateMobileNumber] = useState('');

  // Pass Selection
  const [selectedPass, setSelectedPass] = useState<PassDurationId>('2-days');
  const chosenPass = PASS_DURATION_OPTIONS.find((p) => p.id === selectedPass) ?? PASS_DURATION_OPTIONS[1];

  // Submission & Validation States
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedPassRef, setConfirmedPassRef] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  // Deep Link Indicator Banner (True if visitor came directly with event prefilled)
  const isDirectDeepLink = Boolean(queryParams.get('event') || initialSelection?.eventIds?.[0]);

  // Form Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Full Name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAddress.trim() || !emailRegex.test(emailAddress.trim())) {
      errors.emailAddress = 'Please enter a valid email address.';
    }

    if (!collegeName.trim() || collegeName.trim().length < 2) {
      errors.collegeName = 'College Name is required.';
    }

    if (!rollNumber.trim() || rollNumber.trim().length < 2) {
      errors.rollNumber = 'College Roll Number / Student ID is required.';
    }

    if (!isValidMobileNumber(mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid 10-digit primary mobile number.';
    }

    if (!isValidMobileNumber(alternateMobileNumber)) {
      errors.alternateMobileNumber = 'Please enter a valid 10-digit alternate mobile number.';
    } else if (
      normalizeDigits(mobileNumber).slice(-10) === normalizeDigits(alternateMobileNumber).slice(-10)
    ) {
      errors.alternateMobileNumber = 'Alternate mobile number must be different from primary mobile.';
    }

    if (!selectedSchoolId || !schoolsConfigMap[selectedSchoolId]) {
      errors.school = 'Please select a valid School.';
    }

    if (!selectedDeptId) {
      errors.department = 'Please select a Department.';
    }

    if (!selectedEventId) {
      errors.event = 'Please select a Competition Event.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorMessage = Object.values(errors)[0];
      setFormError(firstErrorMessage);
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      window.scrollTo({ top: 380, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Realistic processing delay for scroll inscription & pass sealing
    setTimeout(() => {
      const generatedRef = generatePassReference(selectedSchoolId, fullName || emailAddress);
      setConfirmedPassRef(generatedRef);
      setIsSubmitting(false);
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleCopyPassId = () => {
    navigator.clipboard?.writeText(confirmedPassRef).catch(() => undefined);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2400);
  };

  const handleResetForNew = () => {
    setIsConfirmed(false);
    setConfirmedPassRef('');
    setFullName('');
    setEmailAddress('');
    setCollegeName('');
    setRollNumber('');
    setMobileNumber('');
    setAlternateMobileNumber('');
    setFormError(null);
    setFieldErrors({});
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#1d0d16',
        color: '#f8ebcb',
        overflowX: 'hidden',
        paddingBottom: '4rem',
      }}
    >
      <RegistrationBackground />
      <SakuraCanvas />

      {/* Authentic Circular Japanese Back Button (Returns to Previous Page/Events, Never to Homepage) */}
      <div
        className="no-print"
        style={{
          position: 'fixed',
          top: '1.2rem',
          left: '1.2rem',
          zIndex: 50,
        }}
      >
        <button
          type="button"
          aria-label="Back to Previous Page"
          onClick={handleBack}
          style={{
            width: 'clamp(2.9rem, 8vw, 3.8rem)',
            height: 'clamp(2.9rem, 8vw, 3.8rem)',
            backgroundImage: "url('/svgs/registration/back.svg')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            filter: 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.75))',
            transition: 'transform 0.2s ease, filter 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.filter = 'drop-shadow(0 4px 14px rgba(242, 221, 124, 0.6))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.filter = 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.75))';
          }}
        />
      </div>

      {/* Centered Master Crest Above Scroll */}
      <section
        className="no-print"
        style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '2.4rem 1.5rem 0.5rem',
          textAlign: 'center',
        }}
      >
        <img
          src="/images/supragna_logo.png"
          alt="SUPRAGNA 2K27"
          style={{
            maxWidth: 'min(300px, 78vw)',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 6px 22px rgba(0, 0, 0, 0.85))',
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* Main Content Area: Seamless 3-Slice Royal Parchment Scroll */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div
          className="print-pass-only"
          style={{
            position: 'relative',
            maxWidth: '920px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {/* Scroll Backdrop Layers */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'drop-shadow(0 26px 55px rgba(0, 0, 0, 0.8))',
            }}
          >
            <img
              src="/images/scroll_top.png"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block', flexShrink: 0 }}
            />
            <div
              style={{
                flex: '1 1 auto',
                backgroundImage: 'url("/images/scroll_mid.png")',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                marginTop: '-1px',
                marginBottom: '-1px',
                minHeight: '40px',
              }}
            />
            <img
              src="/images/scroll_bottom.png"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block', flexShrink: 0 }}
            />
          </div>

          {/* Foreground Scroll Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: 'clamp(48px, 9.2vw, 94px) 13.8% clamp(54px, 9.5vw, 96px)',
              color: '#1f1209',
            }}
          >
            {/* Deep-Linked Pre-selected Event Banner */}
            {isDirectDeepLink && activeEvent && !isConfirmed && (
              <div
                style={{
                  background: 'rgba(139, 30, 21, 0.12)',
                  border: '1.5px solid rgba(139, 30, 21, 0.45)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginBottom: '1.3rem',
                  fontSize: '0.86rem',
                  color: '#4a170c',
                  textAlign: 'center',
                  fontWeight: 700,
                }}
              >
                Selected Competition:{' '}
                <span style={{ color: '#8b1e15' }}>{activeEvent.name}</span> •{' '}
                {activeSchoolConfig.name} ({activeDepartment?.name})
              </div>
            )}

            {isConfirmed ? (
              /* ======================================================== */
              /* CONFIRMED SEALED DELEGATE PASS RECEIPT VIEW               */
              /* ======================================================== */
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <div
                  style={{
                    display: 'inline-block',
                    border: '2.5px solid #961c14',
                    color: '#961c14',
                    borderRadius: '8px',
                    padding: '6px 18px',
                    fontFamily: "'Shojumaru', serif",
                    fontSize: '0.9rem',
                    letterSpacing: '0.12em',
                    transform: 'rotate(-2.5deg)',
                    background: 'rgba(150, 28, 20, 0.08)',
                    marginBottom: '1rem',
                  }}
                >
                  SEALED • {confirmedPassRef}
                </div>

                <h2
                  style={{
                    fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                    fontWeight: 400,
                    color: '#6b150e',
                    marginBottom: '0.5rem',
                  }}
                >
                  Delegate Registration Sealed
                </h2>

                <p
                  style={{
                    color: '#422512',
                    fontSize: '0.94rem',
                    maxWidth: '540px',
                    margin: '0 auto 1.4rem',
                    fontWeight: 600,
                  }}
                >
                  Your registration for SUPRAGNA 2K27 has been successfully verified. Please present your
                  Pass ID at the VRSEC reception desk on event day.
                </p>

                {/* Sealed Particulars Breakdown */}
                <div
                  style={{
                    background: 'rgba(255, 249, 236, 0.76)',
                    border: '1.5px solid rgba(92, 54, 24, 0.4)',
                    borderRadius: '10px',
                    padding: '1.2rem 1.4rem',
                    textAlign: 'left',
                    maxWidth: '580px',
                    margin: '0 auto 1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '9px',
                    fontSize: '0.9rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px dashed rgba(92, 54, 24, 0.3)',
                      paddingBottom: '6px',
                    }}
                  >
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Delegate Name</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07' }}>{fullName}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Email Address</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07' }}>{emailAddress}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>College / Institute</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07', textAlign: 'right' }}>
                      {collegeName}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Roll Number / ID</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07' }}>{rollNumber}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Primary Mobile</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07' }}>{mobileNumber}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Alternate Mobile</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07' }}>{alternateMobileNumber}</span>
                  </div>

                  <div
                    style={{
                      borderTop: '1px dashed rgba(92, 54, 24, 0.3)',
                      paddingTop: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Affiliated School</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07' }}>{activeSchoolConfig.name}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Department</span>
                    <span style={{ fontWeight: 800, color: '#1b0f07' }}>{activeDepartment?.name}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b4020', fontWeight: 700 }}>Selected Event</span>
                    <span style={{ fontWeight: 800, color: '#8b1e15' }}>{activeEvent?.name}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1.5px solid rgba(92, 54, 24, 0.35)',
                      paddingTop: '8px',
                      marginTop: '4px',
                    }}
                  >
                    <span style={{ color: '#6b150e', fontWeight: 800 }}>Festival Pass</span>
                    <span style={{ fontFamily: "'Shojumaru', serif", fontSize: '1.08rem', color: '#8b1e15' }}>
                      {chosenPass.title} — {chosenPass.priceLabel}
                    </span>
                  </div>
                </div>

                {/* Print & Action Buttons */}
                <div
                  className="no-print"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CrimsonBrushButton
                    label="Print / Save Pass (PDF)"
                    fullWidth={false}
                    onClick={() => window.print()}
                  />

                  <button
                    type="button"
                    onClick={handleCopyPassId}
                    style={{
                      background: 'rgba(92, 54, 24, 0.14)',
                      border: '1.5px solid #5c3618',
                      borderRadius: '8px',
                      padding: '12px 18px',
                      color: '#3a1d0a',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedId ? 'Pass ID Copied ✓' : `Copy ID: ${confirmedPassRef}`}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForNew}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(92, 54, 24, 0.45)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#4a2711',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                    }}
                  >
                    Register Another Delegate
                  </button>
                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* ACTIVE REGISTRATION FORM (AUTHENTIC DETAILS + CASCADING)  */
              /* ======================================================== */
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}
              >
                {/* SECTION 1: PARTICIPANT IDENTITY */}
                <section>
                  <div style={{ textAlign: 'center', marginBottom: '1.1rem' }}>
                    <h2
                      style={{
                        fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                        fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                        fontWeight: 400,
                        color: '#6e160f',
                        letterSpacing: '0.03em',
                        margin: 0,
                      }}
                    >
                      1. Delegate Particulars
                    </h2>
                    <p style={{ fontSize: '0.82rem', color: '#4d2b14', fontWeight: 600, marginTop: '3px' }}>
                      Enter your official credentials for certification and pass generation
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="register-two-col">
                      <div>
                        <label htmlFor="reg-name" style={scrollLabelStyle}>
                          Full Name *
                        </label>
                        <input
                          id="reg-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your complete official name"
                          style={{
                            ...scrollInputStyle,
                            borderColor: fieldErrors.fullName ? '#991b1b' : 'rgba(102, 60, 26, 0.45)',
                          }}
                        />
                        {fieldErrors.fullName && (
                          <div style={{ color: '#991b1b', fontSize: '0.74rem', marginTop: '4px', fontWeight: 700 }}>
                            {fieldErrors.fullName}
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="reg-email" style={scrollLabelStyle}>
                          Email Address *
                        </label>
                        <input
                          id="reg-email"
                          type="email"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder="e.g., student@college.edu.in"
                          style={{
                            ...scrollInputStyle,
                            borderColor: fieldErrors.emailAddress ? '#991b1b' : 'rgba(102, 60, 26, 0.45)',
                          }}
                        />
                        {fieldErrors.emailAddress && (
                          <div style={{ color: '#991b1b', fontSize: '0.74rem', marginTop: '4px', fontWeight: 700 }}>
                            {fieldErrors.emailAddress}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="register-two-col">
                      <div>
                        <label htmlFor="reg-college" style={scrollLabelStyle}>
                          College / University *
                        </label>
                        <input
                          id="reg-college"
                          type="text"
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          placeholder="e.g., V.R. Siddhartha Engineering College"
                          style={{
                            ...scrollInputStyle,
                            borderColor: fieldErrors.collegeName ? '#991b1b' : 'rgba(102, 60, 26, 0.45)',
                          }}
                        />
                        {fieldErrors.collegeName && (
                          <div style={{ color: '#991b1b', fontSize: '0.74rem', marginTop: '4px', fontWeight: 700 }}>
                            {fieldErrors.collegeName}
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="reg-roll" style={scrollLabelStyle}>
                          College Roll Number / Student ID *
                        </label>
                        <input
                          id="reg-roll"
                          type="text"
                          value={rollNumber}
                          onChange={(e) => setRollNumber(e.target.value)}
                          placeholder="e.g., 248W1A0501"
                          style={{
                            ...scrollInputStyle,
                            borderColor: fieldErrors.rollNumber ? '#991b1b' : 'rgba(102, 60, 26, 0.45)',
                          }}
                        />
                        {fieldErrors.rollNumber && (
                          <div style={{ color: '#991b1b', fontSize: '0.74rem', marginTop: '4px', fontWeight: 700 }}>
                            {fieldErrors.rollNumber}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="register-two-col">
                      <div>
                        <label htmlFor="reg-mobile" style={scrollLabelStyle}>
                          Mobile Number *
                        </label>
                        <input
                          id="reg-mobile"
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="10-digit primary mobile number"
                          style={{
                            ...scrollInputStyle,
                            borderColor: fieldErrors.mobileNumber ? '#991b1b' : 'rgba(102, 60, 26, 0.45)',
                          }}
                        />
                        {fieldErrors.mobileNumber && (
                          <div style={{ color: '#991b1b', fontSize: '0.74rem', marginTop: '4px', fontWeight: 700 }}>
                            {fieldErrors.mobileNumber}
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="reg-alt-mobile" style={scrollLabelStyle}>
                          Alternate Mobile Number *
                        </label>
                        <input
                          id="reg-alt-mobile"
                          type="tel"
                          value={alternateMobileNumber}
                          onChange={(e) => setAlternateMobileNumber(e.target.value)}
                          placeholder="10-digit alternate / emergency number"
                          style={{
                            ...scrollInputStyle,
                            borderColor: fieldErrors.alternateMobileNumber ? '#991b1b' : 'rgba(102, 60, 26, 0.45)',
                          }}
                        />
                        {fieldErrors.alternateMobileNumber && (
                          <div style={{ color: '#991b1b', fontSize: '0.74rem', marginTop: '4px', fontWeight: 700 }}>
                            {fieldErrors.alternateMobileNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Sumi-e Divider */}
                <div
                  style={{
                    height: '1.5px',
                    background: 'linear-gradient(90deg, transparent, rgba(102, 54, 22, 0.45), transparent)',
                  }}
                />

                {/* SECTION 2: ACADEMIC SCHOOL, DEPARTMENT & COMPETITION EVENT */}
                <section>
                  <div style={{ textAlign: 'center', marginBottom: '1.1rem' }}>
                    <h2
                      style={{
                        fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                        fontSize: 'clamp(1.15rem, 1.9vw, 1.45rem)',
                        fontWeight: 400,
                        color: '#6e160f',
                        letterSpacing: '0.03em',
                        margin: 0,
                      }}
                    >
                      2. Academic School & Competition Selection
                    </h2>
                    <p style={{ fontSize: '0.82rem', color: '#4d2b14', fontWeight: 600, marginTop: '3px' }}>
                      Choose or modify the school, department, and competition event you wish to contest in
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Select School */}
                    <div>
                      <label htmlFor="reg-school-select" style={scrollLabelStyle}>
                        Select Academic School *
                      </label>
                      <select
                        id="reg-school-select"
                        value={selectedSchoolId}
                        onChange={(e) => handleSchoolChange(e.target.value as SchoolId)}
                        style={scrollSelectStyle}
                      >
                        {schoolNavigationList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.shortName})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="register-two-col">
                      {/* Select Department */}
                      <div>
                        <label htmlFor="reg-dept-select" style={scrollLabelStyle}>
                          Select Department *
                        </label>
                        <select
                          id="reg-dept-select"
                          value={selectedDeptId}
                          onChange={(e) => handleDeptChange(e.target.value)}
                          style={scrollSelectStyle}
                        >
                          {activeSchoolConfig.departments.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.code} — {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Select Event */}
                      <div>
                        <label htmlFor="reg-event-select" style={scrollLabelStyle}>
                          Select Event / Tournament *
                        </label>
                        <select
                          id="reg-event-select"
                          value={selectedEventId}
                          onChange={(e) => handleEventChange(e.target.value)}
                          style={scrollSelectStyle}
                        >
                          {activeDepartment?.events.map((evt) => (
                            <option key={evt.id} value={evt.id}>
                              {evt.name} ({evt.category} • Prize: {evt.prizePool})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Active Selected Event Overview Card */}
                    {activeEvent && (
                      <div
                        style={{
                          background: 'rgba(255, 248, 234, 0.72)',
                          border: '1px solid rgba(139, 30, 21, 0.35)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.84rem',
                        }}
                      >
                        <div>
                          <strong style={{ color: '#8b1e15' }}>{activeEvent.name}</strong>
                          <span style={{ color: '#5c3618', marginLeft: '6px' }}>
                            ({activeEvent.schedule} • {activeEvent.venue})
                          </span>
                        </div>
                        <span
                          style={{
                            background: 'rgba(139, 30, 21, 0.12)',
                            color: '#8b1e15',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 700,
                          }}
                        >
                          Bounty: {activeEvent.prizePool}
                        </span>
                      </div>
                    )}
                  </div>
                </section>

                {/* Sumi-e Divider */}
                <div
                  style={{
                    height: '1.5px',
                    background: 'linear-gradient(90deg, transparent, rgba(102, 54, 22, 0.45), transparent)',
                  }}
                />

                {/* SECTION 3: FESTIVAL PASS SELECTION */}
                <section>
                  <div style={{ textAlign: 'center', marginBottom: '1.1rem' }}>
                    <h2
                      style={{
                        fontFamily: "'Shojumaru', 'Japan Ramen', 'Shippori Mincho', serif",
                        fontSize: 'clamp(1.15rem, 1.9vw, 1.45rem)',
                        fontWeight: 400,
                        color: '#6e160f',
                        letterSpacing: '0.03em',
                        margin: 0,
                      }}
                    >
                      3. Select Delegate Festival Pass
                    </h2>
                  </div>

                  <div className="register-two-col">
                    {PASS_DURATION_OPTIONS.map((plan) => {
                      const active = selectedPass === plan.id;
                      return (
                        <div
                          key={plan.id}
                          role="radio"
                          aria-checked={active}
                          tabIndex={0}
                          onClick={() => setSelectedPass(plan.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedPass(plan.id);
                            }
                          }}
                          style={{
                            position: 'relative',
                            background: active
                              ? 'rgba(255, 250, 238, 0.94)'
                              : 'rgba(255, 247, 228, 0.62)',
                            border: active
                              ? '2.5px solid #8b1e15'
                              : '1.5px solid rgba(102, 60, 26, 0.4)',
                            borderRadius: '11px',
                            padding: '1.1rem',
                            cursor: 'pointer',
                            boxShadow: active
                              ? '0 8px 22px rgba(139, 30, 21, 0.22)'
                              : '0 2px 8px rgba(68, 38, 14, 0.08)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {plan.badge && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '12px',
                                background: '#8b1e15',
                                color: '#fef5e1',
                                fontSize: '0.66rem',
                                fontWeight: 800,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                padding: '2px 8px',
                                borderRadius: '4px',
                              }}
                            >
                              {plan.badge}
                            </span>
                          )}

                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '0.45rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  border: `2px solid ${active ? '#8b1e15' : '#6b4020'}`,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {active && (
                                  <span
                                    style={{
                                      width: '9px',
                                      height: '9px',
                                      borderRadius: '50%',
                                      background: '#8b1e15',
                                    }}
                                  />
                                )}
                              </span>
                              <span
                                style={{
                                  fontFamily: "'DM Serif Text', serif",
                                  fontSize: '1.12rem',
                                  fontWeight: 700,
                                  color: '#221208',
                                }}
                              >
                                {plan.title}
                              </span>
                            </div>

                            <span
                              style={{
                                fontFamily: "'Shojumaru', serif",
                                fontSize: '1.25rem',
                                color: '#8b1e15',
                              }}
                            >
                              {plan.priceLabel}
                            </span>
                          </div>

                          <ul
                            style={{
                              margin: 0,
                              paddingLeft: '1.25rem',
                              fontSize: '0.78rem',
                              color: '#472a16',
                              lineHeight: 1.5,
                              fontWeight: 600,
                            }}
                          >
                            {plan.perks.map((perk, idx) => (
                              <li key={idx}>{perk}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Inline Error Alert */}
                {formError && (
                  <div
                    role="alert"
                    style={{
                      background: 'rgba(139, 30, 21, 0.14)',
                      border: '1.5px solid #961c14',
                      color: '#6b1009',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}
                  >
                    {formError}
                  </div>
                )}

                {/* Crimson Brush Submit Button */}
                <div style={{ textAlign: 'center', paddingTop: '0.4rem' }}>
                  <CrimsonBrushButton
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth={false}
                    label={
                      isSubmitting
                        ? 'Inscribing Scroll & Sealing Pass...'
                        : `Complete Registration • ${chosenPass.priceLabel}`
                    }
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="no-print"
          style={{
            marginTop: '3.2rem',
            background: 'linear-gradient(145deg, rgba(22, 15, 10, 0.93), rgba(14, 10, 7, 0.96))',
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
                Official Registration Portal • SUPRAGNA 2K27
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
    </div>
  );
};

export default RegisterPage;
