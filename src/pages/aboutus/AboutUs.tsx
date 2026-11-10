import { useEffect, useRef, useState } from "react";
import styles from "./AboutUs.module.scss";
import Header from "/svgs/aboutus/header.svg";
import fan from "/svgs/aboutus/fan.webp";
import prev from "/svgs/aboutus/prev.svg";
import pause from "/svgs/aboutus/pause.svg";
import next from "/svgs/aboutus/next.svg";
import Reg from "/svgs/aboutus/reghead.svg";
import play from "/svgs/aboutus/play.svg";
import nextarr from "/svgs/aboutus/nextarr.svg";
import BackButton from "../components/backButton/BackButton";
import PlayButton from "/svgs/aboutus/borde.svg";
import aboutPageBG from "/images/aboutus/background.jpg";
import aboutPageBGMobile from "/images/aboutus/backg.webp";
import letter1 from "/svgs/aboutus/letter1.svg";
import letter2 from "/svgs/aboutus/letter2.svg";
import letter3 from "/svgs/aboutus/letter3.svg";
import letter4 from "/svgs/aboutus/letter4.svg";
import letter5 from "/svgs/aboutus/letter5.svg";
import letter6 from "/svgs/aboutus/letter6.svg";
import letter7 from "/svgs/aboutus/letter7.svg";
import letter8 from "/svgs/aboutus/letter8.svg";
import VideoMetaData from "./components/VideoMetaData";
import { Helmet } from "react-helmet";
import SocialLinks from "./components/SocialLinks/SocialLinks";
import AboutText from "./components/AboutText/AboutText";
import { useYouTubePlayer } from "./components/useYoutubePlayer/useYoutubePlayer";
import { useFanAnimation } from "./components/useFanAnimation/useFanAnimation";
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface AboutUsProps {
  isBackBtn?: boolean;
}

const icons = [
  letter1,
  letter2,
  letter3,
  letter4,
  letter5,
  letter6,
  letter7,
  letter8,
];

const videos = ["gS5u_DQRRFU"];
const mainVideoMetadata = {
  id: "gS5u_DQRRFU",
  title: "Official Theme Reveal | SUPRAGNA2K27",
  description:
    "SUPRAGNA2K27, the premier national-level techno-cultural and management festival of Siddhartha Academy of Higher Education (VRSEC). From hackathons to cultural spectacles—this is where brilliance begins.",
  uploadDate: "2026-09-24T14:00:55+05:30",
};
const iconImages: HTMLImageElement[] = icons.map((src) => {
  const img = new Image();
  img.src = src;
  img.alt = "Letters";
  return img;
});

const AboutUs = ({ isBackBtn = true }: AboutUsProps) => {
  const [embedActive, setEmbedActive] = useState(false);
  const AboutRef = useRef<HTMLDivElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const fan2Ref = useRef<HTMLImageElement>(null);
  const fan1Ref = useRef<HTMLImageElement>(null);

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 0.75) ")
      .matches
  );
const { isPlaying, nextVideo, prevVideo, togglePlayPause } = useYouTubePlayer(videos, playerContainerRef);
 useFanAnimation(fan1Ref, fan2Ref, isMobile, iconImages, styles);


  useEffect(() => {
    const handleResize = () =>
      setIsMobile(
        window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 0.75) ")
          .matches
      );

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>About Us | SUPRAGNA2K27</title>
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div
        className={styles.AboutContainer}
        ref={AboutRef}
        style={{
          backgroundImage: `url("${
            isMobile ? aboutPageBGMobile : aboutPageBG
          }")`,
        }}
      >
        <VideoMetaData
          videoId={mainVideoMetadata.id}
          title={mainVideoMetadata.title}
          description={mainVideoMetadata.description}
          uploadDate={mainVideoMetadata.uploadDate}
        />

        <div className={styles.header}>
          <img src={isMobile ? Reg : Header} alt="About Us" />
        </div>

        <div className={styles.content3D}>
          <div className={styles.wrapper}>
            <button onClick={prevVideo} className={styles.arr}>
              <img
                src={nextarr}
                className={styles.prevarr}
                width="100%"
                alt="Next Arrow"
              ></img>
            </button>
            <div className={styles.vid}>
              <div
                onClick={() => setEmbedActive(true)}
                role="button"
                tabIndex={0}
                aria-label="Play SUPRAGNA2K27 YouTube Video"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setEmbedActive(true);
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  zIndex: "20",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {embedActive ? (
                  <iframe
                    src="https://www.youtube.com/embed/gS5u_DQRRFU?autoplay=1&rel=0&modestbranding=1"
                    title="SUPRAGNA2K27 Official Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px",
                      border: "none",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px",
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url("https://img.youtube.com/vi/gS5u_DQRRFU/maxresdefault.jpg")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "grid",
                      placeItems: "center",
                      border: "2px solid rgba(212, 175, 55, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f2dd7c, #d4af37)",
                        boxShadow: "0 0 25px rgba(242, 221, 124, 0.8)",
                        display: "grid",
                        placeItems: "center",
                        color: "#1a130b",
                        fontSize: "26px",
                        paddingLeft: "4px",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      ▶
                    </div>
                  </div>
                )}
              </div>

              <img src={fan} alt="fan1" ref={fan1Ref} className={styles.fan1} />
              <img src={fan} alt="fan2" ref={fan2Ref} className={styles.fan2} />
            </div>

            <button onClick={nextVideo} className={styles.arr}>
              <img
                src={nextarr}
                className={styles.nextarr}
                width="100%"
                alt="Next Arrow"
              ></img>
            </button>

            <div className={styles.controls}>
              <div className={styles.a1}></div>
              <div className={styles.buttonContainer}>
                <img
                  src={PlayButton}
                  className={styles.background}
                  alt="Buttons"
                />
                <div className={styles.buttonGroup}>
                  <button onClick={prevVideo}>
                    <img
                      src={prev}
                      alt="Previous Button"
                      className={styles.btns1}
                    />
                  </button>
                  <div className={styles.a1}></div>
                  <button onClick={togglePlayPause}>
                    <img
                      src={isPlaying ? pause : play}
                      alt={isPlaying ? "Pause video" : "Play video"}
                      className={styles.btns2}
                    />
                  </button>
                  <div className={styles.a1}></div>
                  <button onClick={nextVideo}>
                    <img
                      src={next}
                      alt="Next Button"
                      className={styles.btns3}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AboutText isMobile={isMobile} />
        </div>
        <SocialLinks />
        {isBackBtn && <BackButton className={styles.aboutBB} />}
      </div>
    </div>
  );
};

export default AboutUs;
