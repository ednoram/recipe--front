import { FC } from "react";

import PhoneIcon from "@/assets/phone-icon.svg";
import EmailIcon from "@/assets/email-icon.svg";
import GitHubIcon from "@/assets/github-icon.svg";
import LinkedInIcon from "@/assets/linkedin-icon.svg";

import styles from "./ContactUs.module.scss";

const ContactUs: FC = () => {
  const phonePart = (
    <div className={styles.content__contact_us_item}>
      <PhoneIcon className={styles.content__contact_us_icon} />
      <div>
        <h3 className={styles.content__contact_us_subtitle}>Phone Number</h3>
        <a className="color-black" href="tel:0037455210014">
          +374 55 210014
        </a>
      </div>
    </div>
  );

  const emailPart = (
    <div className={styles.content__contact_us_item}>
      <EmailIcon className={styles.content__contact_us_icon} />
      <div>
        <h3 className={styles.content__contact_us_subtitle}>Email Address</h3>
        <a className="color-black" href="mailto:e.noramirian@gmail.com">
          e.noramirian@gmail.com
        </a>
      </div>
    </div>
  );

  const linkedInPart = (
    <div className={styles.content__contact_us_item}>
      <LinkedInIcon className={styles.content__contact_us_icon} />
      <div>
        <h3 className={styles.content__contact_us_subtitle}>LinkedIn</h3>
        <a
          target="_blank"
          rel="noreferrer"
          className="color-black"
          href="https://www.linkedin.com/in/edward-noramirian/"
        >
          @edward-noramirian
        </a>
      </div>
    </div>
  );

  const gitHubPart = (
    <div className={styles.content__contact_us_item}>
      <GitHubIcon className={styles.content__contact_us_icon} />
      <div>
        <h3 className={styles.content__contact_us_subtitle}>GitHub</h3>
        <a
          target="_blank"
          rel="noreferrer"
          className="color-black"
          href="https://github.com/ednoram"
        >
          @ednoram
        </a>
      </div>
    </div>
  );

  return (
    <div className={styles.content}>
      <div className="container">
        <h2 className="color-primary">Contact Us</h2>
        <div className={styles.content__contact_us_grid}>
          {phonePart}
          {emailPart}
          {linkedInPart}
          {gitHubPart}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
