import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";
import useOverlayStore from "./utils/store";
import LandingRevamp from "./pages/landingRevamp/LandingRevamp";
import { Helmet } from "react-helmet";
import BreadCrumb from "./pages/components/breadCrumb/BreadCrumb";
import bgMusic from "/sounds/bg-music2.mp3";
import { useRef } from "react";

export default function Supragna2K27Home({
  goToPage,
}: {
  goToPage: (path: string) => void;
}) {
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
    ],
  };
  const removeGif = useOverlayStore((state) => state.removeGif);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  };
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };
  return (
    <div>
      <Helmet>
        <title>SUPRAGNA2K27 | National Techno-Cultural & Management Festival</title>
        <meta
          name="description"
          content="The official website of SUPRAGNA2K27. The premier national-level techno-cultural and management festival of Siddhartha Academy of Higher Education (VRSEC)."
        />
        <link rel="canonical" href="https://supragna2k27.in/" />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="SUPRAGNA2K27 | National Techno-Cultural & Management Festival"
        />
        <meta
          property="og:description"
          content="The official website of SUPRAGNA2K27. The premier national-level techno-cultural and management festival of Siddhartha Academy of Higher Education (VRSEC)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supragna2k27.in/" />
        <meta
          property="og:image"
          content="https://supragna2k27.in/logo2.png"
        />
        <meta property="og:site_name" content="SUPRAGNA2K27" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="SUPRAGNA2K27 | National Techno-Cultural & Management Festival"
        />
        <meta
          name="twitter:description"
          content="The premier national-level techno-cultural and management festival of Siddhartha Academy of Higher Education (VRSEC)."
        />
        <meta
          name="twitter:image"
          content="https://supragna2k27.in/logo2.png"
        />
        <meta name="twitter:url" content="https://x.com/supragna_2k27" />
        <meta name="twitter:site" content="@supragna_2k27" />
        <meta name="twitter:creator" content="@supragna_2k27" />
      </Helmet>
      <BreadCrumb data={breadcrumbJsonLd} />
      <div
        style={
          removeGif ? { display: "none" } : { zIndex: 50, position: "relative" }
        }
      >
        <DrawingPreloader onEnter={playMusic} />
      </div>
      <audio
        preload="none"
        src={bgMusic}
        loop
        ref={(el) => {
          audioRef.current = el;
          if (el) el.volume = 0.2;
        }}
      />
      <div style={{ zIndex: 100, position: "relative" }}>
        <LandingRevamp
          goToPage={goToPage}
          onToggle={toggleMusic}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
}

