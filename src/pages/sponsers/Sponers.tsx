import styles from "./Sponsers.module.scss";
import background from "/images/mediaPartners/bg1.jpg";
import heading from "/svgs/sponsors/sponsorsHead.svg";
import Back from "/svgs/registration/back.svg";
import { useContext } from "react";
import { navContext } from "../../App";

import nexusTitle from "/images/sponsors/dummy/nexus_title.svg";
import aetherLogo from "/images/sponsors/dummy/aether.svg";
import quantumLogo from "/images/sponsors/dummy/quantum.svg";
import synapseLogo from "/images/sponsors/dummy/synapse.svg";
import sonicwaveLogo from "/images/sponsors/dummy/sonicwave.svg";
import cyberpulseLogo from "/images/sponsors/dummy/cyberpulse.svg";
import novadriveLogo from "/images/sponsors/dummy/novadrive.svg";
import zenithLogo from "/images/sponsors/dummy/zenith.svg";
import sentinelLogo from "/images/sponsors/dummy/sentinel.svg";
import vanguardLogo from "/images/sponsors/dummy/vanguard.svg";
import horizonLogo from "/images/sponsors/dummy/horizon.svg";
import voltixLogo from "/images/sponsors/dummy/voltix.svg";
import omnibotixLogo from "/images/sponsors/dummy/omnibotix.svg";
import studioprismLogo from "/images/sponsors/dummy/studioprism.svg";
import komorebiLogo from "/images/sponsors/dummy/komorebi.svg";
import threadcraftLogo from "/images/sponsors/dummy/threadcraft.svg";

interface SponsorItem {
  head: string;
  img: string;
  name: string;
  link: string;
}

const sponsors: {
  title: SponsorItem | null;
  otherSponsers: SponsorItem[];
} = {
  title: {
    head: "Title Partner",
    img: nexusTitle,
    name: "Nexus Innovations",
    link: "#",
  },
  otherSponsers: [
    {
      head: "Diamond Partner",
      img: aetherLogo,
      name: "Aether Cloud Systems",
      link: "#",
    },
    {
      head: "Official Technology Partner",
      img: quantumLogo,
      name: "Quantum Dynamics",
      link: "#",
    },
    {
      head: "Official AI Research Partner",
      img: synapseLogo,
      name: "Synapse AI Works",
      link: "#",
    },
    {
      head: "Official Audio Partner",
      img: sonicwaveLogo,
      name: "SonicWave Audio Labs",
      link: "#",
    },
    {
      head: "Official Gaming Partner",
      img: cyberpulseLogo,
      name: "CyberPulse Interactive",
      link: "#",
    },
    {
      head: "Official Mobility Partner",
      img: novadriveLogo,
      name: "Nova Mobility",
      link: "#",
    },
    {
      head: "Official Beverage Partner",
      img: zenithLogo,
      name: "Zenith Refreshments",
      link: "#",
    },
    {
      head: "Official Cybersecurity Partner",
      img: sentinelLogo,
      name: "Sentinel Defense Systems",
      link: "#",
    },
    {
      head: "Official Media Partner",
      img: vanguardLogo,
      name: "Vanguard Media Network",
      link: "#",
    },
    {
      head: "Official Education Partner",
      img: horizonLogo,
      name: "Horizon Learning",
      link: "#",
    },
    {
      head: "Official Energy Partner",
      img: voltixLogo,
      name: "Voltix Energy Solutions",
      link: "#",
    },
    {
      head: "Official Robotics Partner",
      img: omnibotixLogo,
      name: "OmniBotix Automation",
      link: "#",
    },
    {
      head: "Creative Design Partner",
      img: studioprismLogo,
      name: "Studio Prism",
      link: "#",
    },
    {
      head: "Official Community Partner",
      img: komorebiLogo,
      name: "Komorebi Labs",
      link: "#",
    },
    {
      head: "Official Merchandise Partner",
      img: threadcraftLogo,
      name: "ThreadCraft Studio",
      link: "#",
    },
  ],
};

const Sponsors = () => {
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
        <button onClick={backButtonHandler} className={styles.backBtn} aria-label="Back to Home">
          <img src={Back} alt="Back Button" />
        </button>
        <div className={styles.buttonWrapper}></div>

        <div className={styles.backgroundImage}>
          <img src={background} alt="background image" draggable={false} />
        </div>

        <div className={styles.heading}>
          <img src={heading} alt="SUPRAGNA2K27 Sponsors" draggable={false} />
        </div>
        <div className={styles.sponsors}>
          {sponsors.title && (
            <div className={styles.titleSponsor}>
              <div className={styles.head}>{sponsors.title.head}</div>
              <div className={styles.titleSponsImage}>
                <img
                  src={sponsors.title.img}
                  alt={sponsors.title.name}
                  draggable={false}
                />
              </div>
              <div className={`${styles.titleSponsName} ${styles.sponsName}`}>
                {sponsors.title.name}
              </div>
            </div>
          )}

          <div className={styles.otherSponsors}>
            {sponsors.otherSponsers.map((sponsor, index) => (
              <div className={styles.otherSponsor} key={index}>
                <div
                  className={
                    sponsor.head
                      ? styles.head
                      : `${styles.head} ${styles.other}`
                  }
                >
                  {sponsor.head}
                </div>

                <div
                  className={`${styles.otherSponsImage} ${styles.sponsImage}`}
                >
                  <img
                    src={sponsor.img}
                    alt={sponsor.name}
                    draggable={false}
                  />
                </div>
                <div
                  className={`${styles.otherSponsName} ${styles.sponsName}`}
                >
                  {sponsor.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
