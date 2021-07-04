import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
  POST_RECIPE_ROUTE,
  DISCOVER_RECIPES_ROUTE,
} from "@/constants";
import { useIsLoggedIn } from "@/hooks";
import { logoutUser } from "@/store/actions";

import styles from "./Header.module.scss";

const Navigation: FC = () => {
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

  const loggedInLinks = (
    <>
      <li>
        <Link href={DISCOVER_RECIPES_ROUTE}>
          <a className={styles.content__nav_link}>
            {pathname === DISCOVER_RECIPES_ROUTE ? <u>Discover</u> : "Discover"}
          </a>
        </Link>
      </li>
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
          name="Log Out"
          onClick={logout}
          className={styles.content__logout_button}
        >
          Log Out
        </button>
      </li>
    </>
  );

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

  const links = isLoggedIn ? loggedInLinks : notLoggedInLinks;

  return (
    <nav>
      <ul className={styles.content__nav_list}>
        <li>
          <Link href="/">
            <a className={styles.content__nav_link}>
              {pathname === "/" ? <u>Home</u> : "Home"}
            </a>
          </Link>
        </li>
        {links}
      </ul>
    </nav>
  );
};

export default Navigation;
