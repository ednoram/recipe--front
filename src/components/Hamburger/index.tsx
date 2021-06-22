import { useState, useEffect, FC } from "react";

import styles from "./Hamburger.module.scss";

interface Props {
  func?: () => void;
}

const Hamburger: FC<Props> = ({ func }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    func && func();
  };

  useEffect(() => {
    setTimeout(() => window.scroll(0, 0), 100);
  }, [isOpen]);

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.change : ""}`}
      onClick={handleClick}
    >
      <div className={styles.bar1}></div>
      <div className={styles.bar2}></div>
      <div className={styles.bar3}></div>
    </div>
  );
};

export default Hamburger;