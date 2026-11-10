import styles from "../../AboutUs.module.scss";
import instaicon from "/svgs/aboutus/instaicon.svg";
import xicon from "/svgs/aboutus/xicon.svg";
import linkedin from "/svgs/aboutus/linkedin.svg";
import yticon from "/svgs/aboutus/yticon.svg";

const SocialLinks = () => (
  <div className={styles.social}>
    <a href="https://www.linkedin.com/school/siddhartha-academy/posts/" target="_blank" rel="noopener noreferrer" aria-label="Official LinkedIn"><img src={linkedin} alt="LinkedIn" /></a>
    <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube (Coming Soon)"><img src={yticon} alt="YouTube" /></a>
    <a href="https://x.com/supragna_2k27" target="_blank" rel="noopener noreferrer" aria-label="Official X (@supragna_2k27)"><img src={xicon} alt="X" /></a>
    <a href="https://www.instagram.com/supragna_2k27?rpxt=MXFqMnd3N2xhYnZvaw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src={instaicon} alt="Instagram" /></a>
  </div>
);

export default SocialLinks;
