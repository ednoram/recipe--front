import { useState, FC } from "react";

import styles from "./Hamburger.module.scss";

interface Props {
  clickFunc?: () => void;
}

const Hamburger: FC<Props> = ({ clickFunc }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    clickFunc && clickFunc();
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.container} ${isOpen ? styles.change : ""}`}
    >
      <div className={styles.bar1}></div>
      <div className={styles.bar2}></div>
      <div className={styles.bar3}></div>
    </div>
  );
};

export default Hamburger;
