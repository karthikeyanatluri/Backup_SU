import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import gsap from "gsap";
import styles from "./Events.module.scss";

import EventBack from "/svgs/events/eventsback.svg";
import Text from "/images/events/text.png";
import TextMobile from "/images/events/TextMobile.png";
import dance from "/images/events/dance.webp";
import drama from "/images/events/drama.webp";
import dramaMobile from "/images/events/DramaMobile.webp";
import music from "/images/events/music.webp";
import misc from "/images/events/misc.webp";
import photography from "/images/events/photography.webp";
import danceMobile from "/images/events/DanceMobile.webp";
import musicMobile from "/images/events/MusicMobile.webp";
import miscMobile from "/images/events/MiscMobile.png";
import photographyMobile from "/images/events/PhotographyMobile.webp";

import Back from "/images/events/backg.webp";
import MobileBack from "/images/events/evenback.webp";
import cl1 from "/svgs/events/cl1.svg";
import cl2 from "/svgs/events/cl2.svg";
import topright from "/svgs/events/topright.svg";
import Star from "/svgs/events/star.svg";
import Star2 from "/svgs/events/star.svg";
import BackButton from "../components/backButton/BackButton";
import BreadCrumb from "../components/breadCrumb/BreadCrumb";
import FlyingIcons from "./components/FlyingIcons/FlyingIcons";
import { navContext } from "../../App";

import {
  schoolsData,
  type School,
  type Department,
} from "../../utils/supragna2k27Data";

interface SchoolFanImage {
  school: School;
  src: string;
  mobileSrc: string;
  className: string;
  viewBox: string;
  points: string;
  mobileViewBox: string;
  mobilePoints: string;
}

const rotationAngles = [-30, -135, -185, -225, -305];

const Supragna2K27Events: React.FC = () => {
  const { goToPage } = React.useContext(navContext);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 1.45)").matches
  );
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // View state: "schools" (original fan) -> "departments" -> "events"
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const [showFan, setShowFan] = useState(true);
  const [foldFan, setFoldFan] = useState(false);

  const eventContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const v = "?v=2k27_schools_v8";
  // Map 5 official schools to 5 original fan illustrations with pixel-exact hit polygons
  const fanImages: SchoolFanImage[] = [
    {
      school: schoolsData[0], // School of Engineering
      src: `${drama}${v}`,
      mobileSrc: `${dramaMobile}${v}`,
      className: styles.quizzes,
      viewBox: "0 0 627 596",
      points: "0,0 0,595 563,594 626,420",
      mobileViewBox: "0 0 467 686",
      mobilePoints: "466,14 349,0 0,540 66,684 466,502",
    },
    {
      school: schoolsData[1], // School of Science
      src: `${music}${v}`,
      mobileSrc: `${musicMobile}${v}`,
      className: styles.music,
      viewBox: "0 0 809 866",
      points: "0,0 0,301 442,683 417,705 440,742 488,722 652,864 808,751 528,0",
      mobileViewBox: "0 0 523 516",
      mobilePoints: "522,1 1,1 1,423 191,515",
    },
    {
      school: schoolsData[2], // School of Management
      src: `${photography}${v}`,
      mobileSrc: `${photographyMobile}${v}`,
      className: styles.photography,
      viewBox: "0 0 592 741",
      points: "1,0 181,740 404,740 590,0",
      mobileViewBox: "0 0 545 516",
      mobilePoints: "0,94 0,515 522,515 288,154 394,152 396,110 260,110 189,1",
    },
    {
      school: schoolsData[3], // School of Arts & Commerce
      src: `${dance}${v}`,
      mobileSrc: `${danceMobile}${v}`,
      className: styles.dance,
      viewBox: "0 0 809 871",
      points: "808,0 285,0 0,753 160,870 381,680 428,704 455,669 429,639 774,339 808,275",
      mobileViewBox: "0 0 468 670",
      mobilePoints: "67,0 2,145 341,669 467,669 467,182",
    },
    {
      school: schoolsData[4], // School of Law
      src: `${misc}${v}`,
      mobileSrc: `${miscMobile}${v}`,
      className: styles.misc,
      viewBox: "0 0 627 605",
      points: "626,4 0,426 61,583 626,583",
      mobileViewBox: "0 0 400 433",
      mobilePoints: "398,0 247,25 242,71 0,181 0,250 398,431",
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 1200px) and (max-aspect-ratio: 1.45)"
    );
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const hoverTweens = useRef<(gsap.core.Tween | null)[]>([]);

  // GSAP Hover Animations on School Fan Cards
  useEffect(() => {
    if (!canHover || !showFan) return;

    imageRefs.current.forEach((img, i) => {
      if (!img) return;

      hoverTweens.current[i] = gsap.to(img, {
        scale: 1.05,
        filter: "saturate(1.5) drop-shadow(0 0 25px rgba(242, 221, 124, 0.6))",
        duration: 0.25,
        ease: "power1.out",
        paused: true,
        startAt: { filter: "saturate(1)" },
      });
    });

    return () => {
      hoverTweens.current.forEach((t) => t?.kill());
    };
  }, [canHover, showFan]);

  // Handle clicking a school card -> Triggers original GSAP folding fan animation
  const handleSchoolClick = (school: School) => {
    setSelectedSchool(school);
    setFoldFan(true);

    hoverTweens.current.forEach((t) => t?.pause(0));

    imageRefs.current.forEach((img) => {
      if (!img) return;
      gsap.killTweensOf(img);
      img.style.filter = "saturate(1)";
      img.style.scale = "1";
    });

    const mm = gsap.matchMedia();

    // MOBILE FAN FOLDING ANIMATION
    mm.add("(max-width: 1200px) and (max-aspect-ratio: 1.45)", () => {
      const mobileOrder = [1, 0, 4, 3, 2];
      requestAnimationFrame(() => {
        mobileOrder.forEach((originalIndex, orderIndex) => {
          const imgEl = imageRefs.current[originalIndex];
          if (!imgEl) return;

          const rect = imgEl.getBoundingClientRect();
          const rec = eventContainerRef.current?.getBoundingClientRect();
          const origin = rec
            ? { x: rec.left - rect.left, y: rec.top + rec.height / 2 - rect.top }
            : { x: 0, y: 0 };

          gsap.killTweensOf(imgEl);
          gsap.set(imgEl, { scale: 1 });
          imgEl.style.transformOrigin = `${origin.x}px ${origin.y}px`;

          gsap.to(imgEl, {
            rotate: rotationAngles[orderIndex],
            duration: 1.5,
            scaleX: [1, 2].includes(originalIndex) ? 0.2 : 1,
            scaleY: [0, 3, 4].includes(originalIndex) ? 0.2 : 1,
            ease: "power2.inOut",
          });
        });
      });
    });

    // DESKTOP FAN FOLDING ANIMATION
    mm.add("(min-width: 1201px), (min-aspect-ratio: 1.46)", () => {
      requestAnimationFrame(() => {
        fanImages.forEach((_, i) => {
          const imgEl = imageRefs.current[i];
          if (!imgEl) return;

          const rect = imgEl.getBoundingClientRect();
          const rec = eventContainerRef.current?.getBoundingClientRect();
          const origin = rec
            ? { x: rec.left + rec.width / 2 - rect.left, y: rec.bottom - rect.top }
            : { x: 0, y: 0 };

          gsap.killTweensOf(imgEl);
          gsap.set(imgEl, { scale: 1 });
          imgEl.style.transformOrigin = `${origin.x}px ${origin.y}px`;
          imgEl.style.pointerEvents = "none";

          gsap.to(imgEl, {
            rotate: rotationAngles[i],
            duration: 1.4,
            scaleX: [1, 2, 3].includes(i) ? 0.2 : 1,
            scaleY: [0, 4].includes(i) ? 0.2 : 1,
            ease: "power2.inOut",
          });
        });
      });
    });

    // Transition to departments after animation plays
    setTimeout(() => {
      setShowFan(false);
    }, 1200);
  };

  // Back to Schools (unfolds the fan and resets state)
  const handleBackToSchools = () => {
    setShowFan(true);
    setFoldFan(false);
    setSelectedSchool(null);
    setSelectedDept(null);

    // Reset image transforms
    imageRefs.current.forEach((img) => {
      if (!img) return;
      gsap.killTweensOf(img);
      gsap.set(img, { clearProps: "all" });
      img.style.pointerEvents = "auto";
    });
  };

  // Back to Departments from Events view
  const handleBackToDepartments = () => {
    setSelectedDept(null);
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://supragna2k27.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: "https://supragna2k27.in/events",
      },
      ...(selectedSchool
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: selectedSchool.name,
              item: `https://supragna2k27.in/events#${selectedSchool.id}`,
            },
          ]
        : []),
      ...(selectedDept
        ? [
            {
              "@type": "ListItem",
              position: 4,
              name: selectedDept.name,
              item: `https://supragna2k27.in/events#${selectedDept.id}`,
            },
          ]
        : []),
    ],
  };

  // Radial-angular geometric detector for 100% reliable Japanese fan blade interactions
  const [hoveredFanIndex, setHoveredFanIndex] = useState<number | null>(null);

  const getFanIndexFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = eventContainerRef.current?.getBoundingClientRect();
    if (!rect) return -1;
    const pivotX = rect.left + rect.width * 0.5;
    const pivotY = rect.bottom;
    const dx = e.clientX - pivotX;
    const dy = pivotY - e.clientY;
    if (dy < 0) return -1;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle >= 0 && angle < 36) return 4; // School of Law
    if (angle >= 36 && angle < 74) return 3; // School of Arts & Commerce
    if (angle >= 74 && angle < 106) return 2; // School of Management
    if (angle >= 106 && angle < 144) return 1; // School of Science
    if (angle >= 144 && angle <= 180) return 0; // School of Engineering
    return -1;
  };

  const handleFanContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (foldFan) return;
    const idx = getFanIndexFromEvent(e);
    if (idx >= 0 && idx < schoolsData.length) {
      handleSchoolClick(schoolsData[idx]);
    }
  };

  const handleFanMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || foldFan) return;
    const idx = getFanIndexFromEvent(e);
    if (idx !== hoveredFanIndex) {
      if (hoveredFanIndex !== null) {
        hoverTweens.current[hoveredFanIndex]?.reverse();
      }
      if (idx !== -1) {
        hoverTweens.current[idx]?.play();
      }
      setHoveredFanIndex(idx !== -1 ? idx : null);
    }
  };

  const handleFanMouseLeave = () => {
    if (hoveredFanIndex !== null) {
      hoverTweens.current[hoveredFanIndex]?.reverse();
      setHoveredFanIndex(null);
    }
  };

  return (
    <div
      className={styles.eventsmaincontainer}
      ref={eventContainerRef}
      style={{ backgroundImage: `url("${EventBack}")` }}
    >
      <Helmet>
        <title>
          {selectedDept
            ? `${selectedDept.name} | ${selectedSchool?.name || "Events"} | SUPRAGNA2K27`
            : selectedSchool
            ? `${selectedSchool.name} | Events | SUPRAGNA2K27`
            : "Events & Competitions | SUPRAGNA2K27"}
        </title>
        <meta
          name="description"
          content="Explore the premier schools and departments at SUPRAGNA2K27 national festival: Engineering, Science, Management, Commerce, and Law."
        />
        <link rel="canonical" href="https://supragna2k27.in/events" />
      </Helmet>

      <BreadCrumb data={breadcrumbJsonLd} />

      {/* ============================================================== */}
      {/* LEVEL 1: ALL SCHOOLS (ORIGINAL ANIMATED FAN INTERACTION)       */}
      {/* ============================================================== */}
      {showFan && (
        <div
          className={styles.eventscontainer}
          onClick={handleFanContainerClick}
          onMouseMove={handleFanMouseMove}
          onMouseLeave={handleFanMouseLeave}
          style={{ cursor: "pointer" }}
        >
          <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 1000 }}>
            <BackButton className={styles.aboutBB} />
          </div>

          <h2 style={{ display: "none" }}>Schools | SUPRAGNA2K27</h2>

          {fanImages.map((fanItem, i) => (
            <div
              key={fanItem.school.id}
              className={`${fanItem.className} ${
                foldFan ? `${styles.fold} ${styles.folding}` : ""
              }`}
              style={{
                position: "absolute",
                pointerEvents: "none",
              }}
              title={`Click to explore ${fanItem.school.name}`}
            >
              <img
                src={isMobile && fanItem.mobileSrc ? fanItem.mobileSrc : fanItem.src}
                alt={fanItem.school.name}
                data-nosnippet
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}

          {/* Authentic pristine Events Title Logo */}
          <img
            src={isMobile ? TextMobile : Text}
            alt="Events"
            data-nosnippet
            className={styles.text}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* LEVEL 2 & 3: DEPARTMENTS & EVENTS (PRESERVING ORIGINAL STYLING)*/}
      {/* ============================================================== */}
      {!showFan && selectedSchool && (
        <div
          style={{
            position: "relative",
            width: "100vw",
            minHeight: "100svh",
            backgroundImage: `url("${isMobile ? MobileBack : Back}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflowY: "auto",
            zIndex: 20,
          }}
        >
          {/* Japanese Atmospheric Clouds & Borders */}
          <img src={cl1} alt="Clouds" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 1, opacity: 0.8 }} />
          <img src={cl2} alt="Clouds" style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none", zIndex: 1, opacity: 0.8 }} />
          <img src={topright} alt="Borders" style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none", zIndex: 2 }} />
          <img src={topright} alt="Borders" style={{ position: "absolute", bottom: 0, left: 0, transform: "rotate(180deg)", pointerEvents: "none", zIndex: 2 }} />
          <FlyingIcons icons={[Star, Star2]} />

          {/* Top Bar with Clear Back Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "1rem 1rem" : "1.8rem 2.5rem",
              position: "relative",
              zIndex: 30,
            }}
          >
            <BackButton
              className={styles.aboutBB}
              onClick={selectedDept ? handleBackToDepartments : handleBackToSchools}
            />

            <div style={{ textAlign: "center", flex: 1, padding: "0 1rem" }}>
              <div
                style={{
                  fontFamily: "'Japan Ramen', serif",
                  color: "#f2dd7c",
                  fontSize: isMobile ? "1.1rem" : "1.8rem",
                  letterSpacing: "0.1em",
                  textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                }}
              >
                {selectedSchool.name}
              </div>
              <div
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  color: "#d4af37",
                  fontSize: isMobile ? "0.75rem" : "0.95rem",
                  letterSpacing: "0.12em",
                }}
              >
                {selectedDept
                  ? `${selectedDept.name} • Competitions`
                  : `Select Department (${selectedSchool.departments.length} Departments)`}
              </div>
            </div>

            {/* Switch to another school button */}
            <button
              onClick={handleBackToSchools}
              style={{
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(30, 24, 18, 0.8))",
                border: "1px solid #f2dd7c",
                color: "#f2dd7c",
                padding: isMobile ? "6px 10px" : "8px 16px",
                borderRadius: "4px",
                fontFamily: "'Shippori Mincho', serif",
                fontSize: isMobile ? "0.7rem" : "0.85rem",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              ⇄ Change School
            </button>
          </div>

          {/* ========================================================== */}
          {/* LEVEL 2: DEPARTMENTS GRID FOR SELECTED SCHOOL              */}
          {/* ========================================================== */}
          {!selectedDept && (
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: isMobile ? "1rem 1rem 3rem" : "1.5rem 2.5rem 4rem",
                position: "relative",
                zIndex: 25,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: isMobile ? "1rem" : "1.6rem",
                }}
              >
                {selectedSchool.departments.map((dept, index) => (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedDept(dept);
                    }}
                    style={{
                      background: "linear-gradient(135deg, rgba(32, 25, 19, 0.92), rgba(18, 14, 10, 0.96))",
                      border: "1px solid rgba(212, 175, 55, 0.45)",
                      borderRadius: "10px",
                      padding: "1.4rem",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(242, 221, 124, 0.05)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.6rem",
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(212, 175, 55, 0.15)",
                            border: "1px solid #f2dd7c",
                            color: "#f2dd7c",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontFamily: "'Japan Ramen', serif",
                          }}
                        >
                          {dept.code}
                        </span>
                        <span style={{ fontSize: "1.4rem" }}>{dept.icon}</span>
                      </div>

                      <h3
                        style={{
                          color: "#f5efe6",
                          fontFamily: "'Shippori Mincho', serif",
                          fontSize: "1.2rem",
                          marginBottom: "0.4rem",
                          lineHeight: "1.3",
                        }}
                      >
                        {dept.name}
                      </h3>

                      <p
                        style={{
                          color: "#c7bba8",
                          fontSize: "0.85rem",
                          lineHeight: "1.5",
                          marginBottom: "1rem",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {dept.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                        paddingTop: "0.8rem",
                        color: "#f2dd7c",
                        fontSize: "0.85rem",
                        fontFamily: "'Shippori Mincho', serif",
                      }}
                    >
                      <span>{dept.events.length} Events & Competitions</span>
                      <span>Explore →</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* LEVEL 3: DEPARTMENT DUMMY EVENTS SHOWCASE (CLEAN CARDS)     */}
          {/* ========================================================== */}
          {selectedDept && (
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: isMobile ? "0.5rem 1rem 3rem" : "1rem 2.5rem 4rem",
                position: "relative",
                zIndex: 25,
              }}
            >
              {/* Department Overview Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(36, 28, 20, 0.95), rgba(20, 15, 11, 0.98))",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  borderRadius: "12px",
                  padding: isMobile ? "1.2rem" : "1.6rem 2rem",
                  marginBottom: "2rem",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(242, 221, 124, 0.05)",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "1.6rem" }}>{selectedDept.icon}</span>
                    <span
                      style={{
                        background: "rgba(212, 175, 55, 0.15)",
                        border: "1px solid #f2dd7c",
                        color: "#f2dd7c",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        fontFamily: "'Japan Ramen', serif",
                      }}
                    >
                      {selectedDept.code}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Shippori Mincho', serif",
                        color: "#d4af37",
                        fontSize: "0.9rem",
                      }}
                    >
                      {selectedDept.japaneseName}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Shippori Mincho', serif",
                      color: "#f5efe6",
                      fontSize: isMobile ? "1.3rem" : "1.7rem",
                      margin: "0 0 0.4rem 0",
                    }}
                  >
                    {selectedDept.name}
                  </h3>
                  <p
                    style={{
                      color: "#f2dd7c",
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      fontStyle: "italic",
                      margin: "0 0 0.4rem 0",
                    }}
                  >
                    "{selectedDept.tagline}"
                  </p>
                  <p
                    style={{
                      color: "#c7bba8",
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      margin: 0,
                      maxWidth: "750px",
                    }}
                  >
                    {selectedDept.description}
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(10, 8, 6, 0.6)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "8px",
                    padding: "0.8rem 1.4rem",
                    textAlign: "center",
                    alignSelf: isMobile ? "stretch" : "center",
                    minWidth: "160px",
                  }}
                >
                  <div style={{ color: "#d4af37", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Total Events
                  </div>
                  <div style={{ fontFamily: "'Japan Ramen', serif", color: "#f2dd7c", fontSize: "1.8rem" }}>
                    {selectedDept.events.length}
                  </div>
                  <div style={{ color: "#a89f91", fontSize: "0.75rem" }}>
                    Competitions Active
                  </div>
                </div>
              </div>

              {/* Dummy Events Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))",
                  gap: isMobile ? "1.2rem" : "1.8rem",
                }}
              >
                {selectedDept.events.map((event, index) => {
                  const typeColors: Record<string, { bg: string; border: string; text: string }> = {
                    Technical: { bg: "rgba(56, 189, 248, 0.15)", border: "#38bdf8", text: "#7dd3fc" },
                    Management: { bg: "rgba(250, 204, 21, 0.15)", border: "#facc15", text: "#fde047" },
                    Cultural: { bg: "rgba(244, 63, 94, 0.15)", border: "#f43f5e", text: "#fda4af" },
                    Spot: { bg: "rgba(168, 85, 247, 0.15)", border: "#a855f7", text: "#d8b4fe" },
                  };
                  const badge = typeColors[event.type] || typeColors.Technical;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        background: "linear-gradient(145deg, rgba(28, 22, 17, 0.95), rgba(16, 12, 9, 0.98))",
                        border: "1px solid rgba(212, 175, 55, 0.4)",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.75), inset 0 0 15px rgba(242, 221, 124, 0.04)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div>
                        {/* Event Card Header: Type Badge & Prize Pool */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "0.8rem",
                          }}
                        >
                          <span
                            style={{
                              background: badge.bg,
                              border: `1px solid ${badge.border}`,
                              color: badge.text,
                              padding: "3px 10px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            {event.type}
                          </span>

                          <span
                            style={{
                              background: "rgba(212, 175, 55, 0.15)",
                              border: "1px solid #f2dd7c",
                              color: "#f2dd7c",
                              padding: "3px 10px",
                              borderRadius: "4px",
                              fontSize: "0.85rem",
                              fontWeight: 800,
                              fontFamily: "'Shippori Mincho', serif",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            🏆 {event.prizePool}
                          </span>
                        </div>

                        {/* Event Title */}
                        <h4
                          style={{
                            color: "#fbf6ee",
                            fontFamily: "'Shippori Mincho', serif",
                            fontSize: isMobile ? "1.2rem" : "1.35rem",
                            margin: "0 0 0.3rem 0",
                            lineHeight: "1.3",
                          }}
                        >
                          {event.name}
                        </h4>

                        {/* Tagline */}
                        <div
                          style={{
                            color: "#f2dd7c",
                            fontSize: "0.85rem",
                            fontStyle: "italic",
                            marginBottom: "0.8rem",
                          }}
                        >
                          {event.tagline}
                        </div>

                        {/* Description */}
                        <p
                          style={{
                            color: "#c7bba8",
                            fontSize: "0.85rem",
                            lineHeight: "1.5",
                            marginBottom: "1rem",
                            fontFamily: "system-ui, sans-serif",
                          }}
                        >
                          {event.about || event.description}
                        </p>

                        {/* Event Meta Details Grid */}
                        <div
                          style={{
                            background: "rgba(10, 8, 6, 0.55)",
                            border: "1px solid rgba(212, 175, 55, 0.2)",
                            borderRadius: "8px",
                            padding: "0.75rem 0.9rem",
                            marginBottom: "1.2rem",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "0.6rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          <div>
                            <div style={{ color: "#a89f91", fontSize: "0.7rem", textTransform: "uppercase" }}>
                              🏛️ Organized By
                            </div>
                            <div style={{ color: "#e8dfd1", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {event.club_name}
                            </div>
                          </div>

                          <div>
                            <div style={{ color: "#a89f91", fontSize: "0.7rem", textTransform: "uppercase" }}>
                              📍 Venue
                            </div>
                            <div style={{ color: "#e8dfd1", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {event.venue}
                            </div>
                          </div>

                          <div>
                            <div style={{ color: "#a89f91", fontSize: "0.7rem", textTransform: "uppercase" }}>
                              ⏰ Schedule
                            </div>
                            <div style={{ color: "#e8dfd1", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {event.schedule}
                            </div>
                          </div>

                          <div>
                            <div style={{ color: "#a89f91", fontSize: "0.7rem", textTransform: "uppercase" }}>
                              👥 Format
                            </div>
                            <div style={{ color: "#e8dfd1", fontWeight: 600 }}>
                              Team / Solo (2-4)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Button */}
                      <a
                        href={`/register?school=${selectedSchool?.id || 'engineering'}&dept=${selectedDept?.id || ''}&event=${encodeURIComponent(event.name)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const target = `/register?school=${selectedSchool?.id || 'engineering'}&dept=${selectedDept?.id || ''}&event=${encodeURIComponent(event.name)}`;
                          if (goToPage) {
                            goToPage(target);
                          } else {
                            window.location.href = target;
                          }
                        }}
                        style={{
                          display: "block",
                          textAlign: "center",
                          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(40, 30, 20, 0.9))",
                          border: "1px solid #f2dd7c",
                          color: "#f2dd7c",
                          padding: "10px",
                          borderRadius: "6px",
                          fontFamily: "'Shippori Mincho', serif",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, rgba(242, 221, 124, 0.4), rgba(60, 45, 30, 0.95))";
                          e.currentTarget.style.boxShadow = "0 0 15px rgba(242, 221, 124, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(40, 30, 20, 0.9))";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Register for Event →
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Supragna2K27Events;
