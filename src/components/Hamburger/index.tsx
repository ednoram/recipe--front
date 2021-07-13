import { FC } from "react";

import styles from "./Hamburger.module.scss";

interface Props {
  menuIsOpen: boolean;
  clickFunc?: () => void;
  setMenuIsOpen: (arg: boolean) => void;
}

const Hamburger: FC<Props> = ({ menuIsOpen, setMenuIsOpen, clickFunc }) => {
  const handleClick = () => {
    setMenuIsOpen(!menuIsOpen);
    clickFunc && clickFunc();
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.container} ${menuIsOpen ? styles.change : ""}`}
    >
      <div className={styles.bar1}></div>
      <div className={styles.bar2}></div>
      <div className={styles.bar3}></div>
    </div>
  );
};

export default Hamburger;
