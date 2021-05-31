import { FC } from "react";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.container}>
      <p>Recipe App by @ednoram</p>
    </footer>
  );
};

export default Footer;
