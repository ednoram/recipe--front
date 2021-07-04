import { FC } from "react";

import PhoneIcon from "public/phone-icon.svg";
import EmailIcon from "public/email-icon.svg";
import GitHubIcon from "public/github-icon.svg";
import LinkedInIcon from "public/linkedin-icon.svg";

import styles from "./ContactUs.module.scss";

const ContactUs: FC = () => {
  return (
    <div className={`${styles.content} container`}>
      <h2 className="color-primary">Contact Us</h2>
      <div className={styles.content__contact_us_grid}>
        <div className={styles.content__contact_us_item}>
          <PhoneIcon className={styles.content__contact_us_icon} />
          <div>
            <h3 className={styles.content__contact_us_subtitle}>
              Phone Number
            </h3>
            <a className="color-black" href="tel:0037455210014">
              +374 552100014
            </a>
          </div>
        </div>
        <div className={styles.content__contact_us_item}>
          <EmailIcon className={styles.content__contact_us_icon} />
          <div>
            <h3 className={styles.content__contact_us_subtitle}>
              Email Address
            </h3>
            <a className="color-black" href="mailto:e.noramirian@gmail.com">
              e.noramirian@gmail.com
            </a>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default ContactUs;
