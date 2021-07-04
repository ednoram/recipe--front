import { useState, FC, useEffect } from "react";
import Link from "next/link";

import { Hamburger } from "@/components";

import Navigation from "./Navigation";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const handleHamburgerClick = () => {
    const body = document.querySelector("body");

    if (body?.style) {
      if (!menuIsOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "unset";
      }
    }

    setMenuIsOpen(!menuIsOpen);
    setTimeout(() => window.scroll(0, 0), 150);
  };

  useEffect(() => {
    return () => {
      const body = document.querySelector("body");
      if (body?.style.overflow) {
        body.style.overflow = "unset";
      }
    };
  }, []);

  const hamburger = (
    <div className={styles.content__hamburger}>
      <Hamburger clickFunc={handleHamburgerClick} />
      <div
        className={`${styles.hamburger_menu} ${
          menuIsOpen ? styles.hamburger_menu_open : ""
        }`}
      >
        {menuIsOpen && (
          <div className={styles.hamburger_menu__content}>
            <Navigation />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <header>
      <div className={styles.content}>
        <div className="container">
          <div className="flex_space_between">
            <Link href="/">
              <a className={styles.content__logo_Link}>
                <h3 className={styles.content__logo_text}>Recipe</h3>
              </a>
            </Link>
            <div className={styles.content__navigation}>
              <Navigation />
            </div>
            {hamburger}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
