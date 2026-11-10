import styles from "./MediaPartners.module.scss";
import background from "/images/mediaPartners/bg1.jpg";
import heading from "/svgs/mediaPartners/mediaHead.svg";
import Back from "/svgs/registration/back.svg";
import { useContext } from "react";
import { navContext } from "../../App";
import bronx from "/images/mediaPartners/Bronx.webp";
import zack from "/images/mediaPartners/Zack.webp";
import kanika from "/images/mediaPartners/Kanika.webp";
import jhoom from "/images/mediaPartners/Jhoom.webp";
import captures from "/images/mediaPartners/Captures.png";
import sarcaster from "/images/mediaPartners/Sarcaaster.webp";
import inglu from "/images/mediaPartners/Inglu.webp";

interface MediaPartnerItem {
  head: string;
  img: string;
  name: string;
  link: string;
}

const mediaPatners: MediaPartnerItem[] = [
  {
    head: "Video & Streaming Partner",
    img: jhoom,
    name: "Video & Streaming Hub",
    link: "#",
  },
  {
    head: "Creative Content Partner",
    img: kanika,
    name: "Creative Content Guild",
    link: "#",
  },
  {
    head: "Campus Broadcast Partner",
    img: zack,
    name: "Campus Broadcast Lab",
    link: "#",
  },
  {
    head: "Official Coverage Bureau",
    img: captures,
    name: "Official Press Bureau",
    link: "#",
  },
  {
    head: "Official Outreach Partner",
    img: inglu,
    name: "Student Media Circle",
    link: "#",
  },
  {
    head: "Talent & Arts Panel",
    img: sarcaster,
    name: "Talent & Arts Bureau",
    link: "#",
  },
  {
    head: "Digital Media Partner",
    img: bronx,
    name: "Digital Media Network",
    link: "#",
  },
];

const MediaPatners = () => {
  const { goToPage } = useContext(navContext);

  const backButtonHandler = () => {
    goToPage?.("/");
  };

  return (
    <>
      <div
        className={styles.Wrapper}
        style={{
          opacity: 1,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <button onClick={backButtonHandler} className={styles.backBtn}>
          <img src={Back} alt="Back Button" />
        </button>
        <div className={styles.backgroundImage}>
          <img src={background} alt="background image" draggable={false} />
        </div>

        <div className={styles.heading}>
          <img src={heading} alt="heading" draggable={false} />
        </div>
        <div className={styles.mediaPatners}>
          <div className={styles.otherMediaPatners}>
            {mediaPatners.map((mediaPatner, index) => (
              <a
                key={index}
                href={mediaPatner.link}
                target={mediaPatner.link === "#" ? undefined : "_blank"}
                rel={mediaPatner.link === "#" ? undefined : "noopener noreferrer"}
                onClick={mediaPatner.link === "#" ? (e) => e.preventDefault() : undefined}
                draggable={false}
              >
                <div className={styles.mediaPatner}>
                  {mediaPatner.head != "" && (
                    <div className={styles.head}>{mediaPatner.head}</div>
                  )}
                  <div className={styles.patnersImage}>
                    <img
                      src={mediaPatner.img}
                      alt={mediaPatner.name}
                      draggable={false}
                    />
                  </div>
                  <div className={styles.patnersName}>{mediaPatner.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaPatners;
