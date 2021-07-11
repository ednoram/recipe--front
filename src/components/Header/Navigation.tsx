import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import {
  POST_ROUTE,
  LOGIN_ROUTE,
  USERS_ROUTE,
  RECIPES_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
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
        <Link href={POST_ROUTE}>
          <a className={styles.content__nav_link}>
            {pathname === POST_ROUTE ? <u>Post</u> : "Post"}
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
        <li>
          <Link href={RECIPES_ROUTE}>
            <a className={styles.content__nav_link}>
              {pathname === RECIPES_ROUTE ? <u>Discover</u> : "Discover"}
            </a>
          </Link>
        </li>
        <li>
          <Link href={USERS_ROUTE}>
            <a className={styles.content__nav_link}>
              {pathname === USERS_ROUTE ? <u>Users</u> : "Users"}
            </a>
          </Link>
        </li>
        {links}
      </ul>
    </nav>
  );
};

export default Navigation;
