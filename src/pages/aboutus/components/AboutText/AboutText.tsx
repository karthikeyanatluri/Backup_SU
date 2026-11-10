import styles from"../../AboutUs.module.scss"
import abtus from "/svgs/aboutus/abtus.svg";
import aboutTextBG from "/images/aboutus/abtbck.webp";

interface AboutTextProps {
  isMobile: boolean;
}

const AboutText = ({ isMobile }: AboutTextProps) => (
  <div className={styles.abt}>
    <div
      className={styles.aboutback}
      style={{ backgroundImage: isMobile ? "none" : `url("${aboutTextBG}")` }}
    >
      <p>
        SUPRAGNA2K27, the premier national-level techno-cultural and
        management festival of Siddhartha Academy of Higher Education (VRSEC),
        is a vibrant celebration of talent, intellect, and innovation.
        Bringing together thousands of brilliant minds from across the nation,
        it features high-stakes engineering hackathons, robotics tournaments,
        management conclaves, moot courts, and dazzling cultural showcases.
        Step into the world of SUPRAGNA2K27, where boundless potential meets
        creative excellence.
      </p>
    </div>
    <div className={styles.abtus}>
      <img src={abtus} alt="ABOUT US" />
      <h3>ABOUT US</h3>
    </div>
  </div>
);

export default AboutText;
