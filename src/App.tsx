import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, createContext, lazy, Suspense, useCallback, startTransition } from "react";

const Homepage = lazy(() => import("./Supragna2K27Home"));
const Registration = lazy(() => import("./pages/registration/Registration"));
const DoorTransition = lazy(() => import("./pages/components/page-transition/DoorTransition"));
const AboutUs = lazy(() => import("./pages/aboutus/AboutUs"));
const Contact = lazy(() => import("./pages/contact/ContactPage"));
const ComingSoon = lazy(() => import("./pages/comingSoon/ComingSoon"));

import useCanonicalUrl from "./UseCanonicalUrl";

const Events = lazy(() => import("./pages/events/Supragna2K27Events"));
const SchoolsHub = lazy(() => import("./components/SchoolsHubPage").then(m => ({ default: m.SchoolsHubPage })));
const EngineeringPage = lazy(() => import("./EngineeringDepartmentsPage"));
const SciencePage = lazy(() => import("./ScienceDepartmentsPage"));
const ManagementPage = lazy(() => import("./ManagementDepartmentsPage"));
const ArtsCommercePage = lazy(() => import("./ArtsCommerceDepartmentsPage"));
const LawPage = lazy(() => import("./LawDepartmentsPage"));

const routeImports = {
  aboutus: () => import("./pages/aboutus/AboutUs"),
  contact: () => import("./pages/contact/ContactPage"),
  comingSoon: () => import("./pages/comingSoon/ComingSoon"),
  events: () => import("./pages/events/Supragna2K27Events"),
  register: () => import("./pages/registration/Registration"),
  brochure: () => import("./pages/brochure/Brochure"),
  sponsors: () => import("./pages/sponsers/Sponers"),
  mediaPartners: () => import("./pages/mediaPartners/MediaPartners"),
  gallery: () => import("./pages/gallery/Gallery"),
  schools: () => import("./components/SchoolsHubPage").then(m => ({ default: m.SchoolsHubPage })),
  "school-of-engineering": () => import("./EngineeringDepartmentsPage"),
  "school-of-science": () => import("./ScienceDepartmentsPage"),
  "school-of-management": () => import("./ManagementDepartmentsPage"),
  "school-of-arts-and-commerce": () => import("./ArtsCommerceDepartmentsPage"),
  "school-of-law": () => import("./LawDepartmentsPage"),
};

const routeCache = new Map<string, Promise<unknown>>();
function preloadRoute(path: string) {
  const cleanPath = path.split("?")[0].replace(/^\/|\/$/g, "");
  const key = cleanPath as keyof typeof routeImports;
  if (!(key in routeImports)) return Promise.resolve();
  if (!routeCache.has(key)) routeCache.set(key, routeImports[key]().catch(error => {routeCache.delete(key); throw error}));
  return routeCache.get(key)!;
}

export const navContext = createContext<{ goToPage?: (page: string) => void; preloadPage?: (page: string) => void }>(
  {}
);

const Brochure = lazy(() => import("./pages/brochure/Brochure"));
const Sponsors = lazy(() => import("./pages/sponsers/Sponers"));
const MediaPatners = lazy(() => import("./pages/mediaPartners/MediaPartners"));
const Gallery = lazy(() => import("./pages/gallery/Gallery"));

export default function App() {
  useCanonicalUrl("https://supragna2k27.in");
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    startAnimation?: boolean;
  }

  const pageList = [
    "home",
    "register",
    "events",
    "aboutus",
    "contact",
    "brochure",
    "sponsors",
    "mediaPartners",
    "gallery",
    "schools",
    "school-of-engineering",
    "school-of-science",
    "school-of-management",
    "school-of-arts-and-commerce",
    "school-of-law",
  ];

  const [currentPage, setCurrentPage] = useState<
    (typeof pageList)[number] | "comingSoon"
  >(() => {
    const rawPath = location.pathname.split("?")[0].replace(/^\/|\/$/g, "");
    return rawPath === ""
      ? "home"
      : pageList.includes(rawPath)
      ? (rawPath as (typeof pageList)[number])
      : "comingSoon";
  });

  const [routeError, setRouteError] = useState(false);

  const [doorPhase, setDoorPhase] = useState<
    "idle" | "closing" | "waiting" | "opening"
  >("idle");
  const [doorPLPercentageLoaded, setDoorPLPercentageLoaded] =
    useState<number>(0);

  const isPreloading = false;
  const nextRoute = useRef<string | null>(null);

  useEffect(() => {
    const rawPath = location.pathname.split("?")[0].replace(/^\/|\/$/g, "");
    setCurrentPage(
      rawPath === ""
        ? "home"
        : pageList.includes(rawPath)
        ? (rawPath as typeof currentPage)
        : "comingSoon"
    );
  }, [location.pathname]);

  const handleDoorsClosed = useCallback(async () => {
    const target = nextRoute.current;
    if (!target) return;
    setDoorPhase("waiting");
    try {
      await preloadRoute(target);
      startTransition(() => navigate(target, {state:{startAnimation:true}}));
      requestAnimationFrame(() => requestAnimationFrame(() => setDoorPhase("opening")));
    } catch {
      setRouteError(true);
      setDoorPhase("opening");
    }
    setDoorPLPercentageLoaded(100);
  }, [navigate]);

  const handleDoorsOpened = useCallback(() => {
    setDoorPhase("idle");
    nextRoute.current = null;
    setDoorPLPercentageLoaded(0);
  }, []);

  const goToPage = (path: string) => {
    const cleanPath = path.split("?")[0];
    if (doorPhase !== "idle") return;
    if (location.pathname === cleanPath) {
      if (path.includes("?") && location.search !== path.slice(path.indexOf("?"))) {
        navigate(path);
      }
      return;
    }
    setRouteError(false);
    void preloadRoute(path).catch(() => {});
    nextRoute.current = path;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void preloadRoute(path).then(() => startTransition(() => navigate(path))).catch(() => setRouteError(true));
    } else setDoorPhase("closing");
  };

  return (
    <navContext.Provider value={{ goToPage, preloadPage: path => {void preloadRoute(path).catch(() => {})} }}>
      {routeError && <div className="route-error" role="alert">This page could not load. <button onClick={() => window.location.reload()}>Reload</button><button onClick={() => {setRouteError(false); setDoorPhase("idle"); nextRoute.current = null; navigate("/")}}>Home</button></div>}
      {doorPhase !== "idle" && <Suspense fallback={null}><DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        percentageLoaded={doorPLPercentageLoaded}
        targetPageRef={nextRoute}
      /></Suspense>}
      <Suspense fallback={<div className="page-loading" role="status">Loading…</div>}>
      <h1 style={{ display: "none" }}>SUPRAGNA2K27</h1>

      {!isPreloading && currentPage === "home" && (
        <Homepage goToPage={goToPage} />
      )}

      {!isPreloading && currentPage === "register" && (
        <Registration
          goToPage={goToPage}
          startAnimation={
            (location.state as LocationState)?.startAnimation || false
          }
        />
      )}

      {!isPreloading && currentPage === "events" && <Events />}

      {!isPreloading && currentPage === "schools" && (
        <SchoolsHub
          onBackToHome={() => goToPage("/")}
          onNavigateSchool={(id) =>
            goToPage(
              id === "arts-commerce"
                ? "/school-of-arts-and-commerce"
                : `/school-of-${id}`
            )
          }
          onOpenRegister={() => goToPage("/register")}
        />
      )}

      {!isPreloading && currentPage === "school-of-engineering" && (
        <EngineeringPage
          onNavigateHome={() => goToPage("/")}
          onNavigateSchools={() => goToPage("/schools")}
          onNavigateSchool={(id) =>
            goToPage(
              id === "arts-commerce"
                ? "/school-of-arts-and-commerce"
                : `/school-of-${id}`
            )
          }
          onBackToSchools={() => goToPage("/schools")}
          onOpenRegister={() => goToPage("/register?school=engineering")}
          onSelectEvent={(evt, dept) =>
            goToPage(`/register?school=engineering&dept=${dept.id}&event=${encodeURIComponent(evt.name)}`)
          }
        />
      )}

      {!isPreloading && currentPage === "school-of-science" && (
        <SciencePage
          onNavigateHome={() => goToPage("/")}
          onNavigateSchools={() => goToPage("/schools")}
          onNavigateSchool={(id) =>
            goToPage(
              id === "arts-commerce"
                ? "/school-of-arts-and-commerce"
                : `/school-of-${id}`
            )
          }
          onBackToSchools={() => goToPage("/schools")}
          onOpenRegister={() => goToPage("/register?school=science")}
          onSelectEvent={(evt, dept) =>
            goToPage(`/register?school=science&dept=${dept.id}&event=${encodeURIComponent(evt.name)}`)
          }
        />
      )}

      {!isPreloading && currentPage === "school-of-management" && (
        <ManagementPage
          onNavigateHome={() => goToPage("/")}
          onNavigateSchools={() => goToPage("/schools")}
          onNavigateSchool={(id) =>
            goToPage(
              id === "arts-commerce"
                ? "/school-of-arts-and-commerce"
                : `/school-of-${id}`
            )
          }
          onBackToSchools={() => goToPage("/schools")}
          onOpenRegister={() => goToPage("/register?school=management")}
          onSelectEvent={(evt, dept) =>
            goToPage(`/register?school=management&dept=${dept.id}&event=${encodeURIComponent(evt.name)}`)
          }
        />
      )}

      {!isPreloading && currentPage === "school-of-arts-and-commerce" && (
        <ArtsCommercePage
          onNavigateHome={() => goToPage("/")}
          onNavigateSchools={() => goToPage("/schools")}
          onNavigateSchool={(id) =>
            goToPage(
              id === "arts-commerce"
                ? "/school-of-arts-and-commerce"
                : `/school-of-${id}`
            )
          }
          onBackToSchools={() => goToPage("/schools")}
          onOpenRegister={() => goToPage("/register?school=arts-commerce")}
          onSelectEvent={(evt, dept) =>
            goToPage(`/register?school=arts-commerce&dept=${dept.id}&event=${encodeURIComponent(evt.name)}`)
          }
        />
      )}

      {!isPreloading && currentPage === "school-of-law" && (
        <LawPage
          onNavigateHome={() => goToPage("/")}
          onNavigateSchools={() => goToPage("/schools")}
          onNavigateSchool={(id) =>
            goToPage(
              id === "arts-commerce"
                ? "/school-of-arts-and-commerce"
                : `/school-of-${id}`
            )
          }
          onBackToSchools={() => goToPage("/schools")}
          onOpenRegister={() => goToPage("/register?school=law")}
          onSelectEvent={(evt, dept) =>
            goToPage(`/register?school=law&dept=${dept.id}&event=${encodeURIComponent(evt.name)}`)
          }
        />
      )}

      {!isPreloading && currentPage === "aboutus" && <AboutUs />}
      {!isPreloading && currentPage === "contact" && <Contact />}
      {!isPreloading && currentPage === "brochure" && <Brochure />}
      {!isPreloading && currentPage === "gallery" && <Gallery />}
      {!isPreloading && currentPage === "comingSoon" && <ComingSoon />}
      {!isPreloading && currentPage === "sponsors" && <Sponsors />}
      {!isPreloading && currentPage === "mediaPartners" && <MediaPatners />}
    </Suspense>
    </navContext.Provider>
  );
}
