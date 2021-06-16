import { useState, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
  POST_RECIPE_ROUTE,
} from "@/constants";
import { useIsLoggedIn } from "@/hooks";
import { logoutUser } from "@/store/actions";

import styles from "./Header.module.scss";
import Hamburger from "../Hamburger";

const Header: FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  const { pathname } = router;

  const logout = () => {
    if (confirm("Are you sure you want to log out?")) {
      dispatch(logoutUser());
      router.push("/");
    }
  };

  const handleHamburgerClick = () => {
    const body = document.querySelector("body");

    if (body) {
      if (!menuIsOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "unset";
      }
    }

    setMenuIsOpen(!menuIsOpen);
  };

  const notLoggedInLinks = (
    <>
      <li>
        <Link href={LOGIN_ROUTE}>
          <a className={styles.content__nav_link}>
            {pathname === LOGIN_ROUTE ? <u>Log In</u> : "Log In"}
          </a>
        </Link>
      </li>
      <li>
        <Link href={REGISTER_ROUTE}>
          <a className={styles.content__nav_link}>
            {pathname === REGISTER_ROUTE ? <u>Register</u> : "Register"}
          </a>
        </Link>
      </li>
    </>
  );

  const loggedInLinks = (
    <>
      <li>
        <Link href={POST_RECIPE_ROUTE}>
          <a className={styles.content__nav_link}>
            {pathname === POST_RECIPE_ROUTE ? (
              <u>Post Recipe</u>
            ) : (
              "Post Recipe"
            )}
          </a>
        </Link>
      </li>
      <li>
        <Link href={MY_ACCOUNT_ROUTE}>
          <a className={styles.content__nav_link}>
            {pathname === MY_ACCOUNT_ROUTE ? <u>My Account</u> : "My Account"}
          </a>
        </Link>
      </li>
      <li>
        <button
          name="logout"
          onClick={logout}
          className={styles.content__logout_button}
        >
          Log Out
        </button>
      </li>
    </>
  );

  const navigation = (
    <nav>
      <ul className={styles.content__nav_list}>
        <li>
          <Link href="/">
            <a className={styles.content__nav_link}>
              {pathname === "/" ? <u>Home</u> : "Home"}
            </a>
          </Link>
        </li>
        {isLoggedIn ? loggedInLinks : notLoggedInLinks}
      </ul>
    </nav>
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
            <div className={styles.content__navigation}>{navigation}</div>
            <div className={styles.content__hamburger}>
              <Hamburger func={handleHamburgerClick} />
              <div
                className={`${styles.hamburger_menu} ${
                  menuIsOpen ? styles.hamburger_menu_open : ""
                }`}
              >
                {menuIsOpen && (
                  <div className={styles.hamburger_menu__content}>
                    {navigation}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
