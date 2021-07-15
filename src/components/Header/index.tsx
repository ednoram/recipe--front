import { useState, FC, useEffect } from "react";
import Link from "next/link";

import { Hamburger } from "@/components";

import Navigation from "./Navigation";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";

const Header: FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setMenuIsOpen(false);
  }, [router]);

  useEffect(() => {
    if (menuIsOpen) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  }, [menuIsOpen]);

  useEffect(() => {
    return () => enableHtmlScroll();
  }, []);

  const disableHtmlScroll = () => {
    const body = document.querySelector("body");

    if (body?.style) {
      body.style.position = "fixed";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    }
  };

  const enableHtmlScroll = () => {
    const body = document.querySelector("body");

    if (body?.style) {
      body.style.position = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }
  };

  const hamburger = (
    <div className={styles.content__hamburger}>
      <Hamburger menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div
        className={`${styles.hamburger_menu} ${
          menuIsOpen ? styles.hamburger_menu_open : ""
        }`}
      >
        {menuIsOpen && <Navigation />}
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
            <div className={styles.content__nav_container}>
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
