import { FC } from "react";
import Link from "next/link";

import {
  MY_ACCOUNT_ROUTE,
  DELETE_ACCOUNT_ROUTE,
  CHANGE_PASSWORD_ROUTE,
} from "@/constants";
import { useIsLoggedIn } from "@/hooks";
import { AccountForm } from "@/components";

import styles from "./EditAccount.module.scss";

const EditAccount: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section className={styles.content}>
        <div className="container">
          {isLoggedIn && (
            <Link href={MY_ACCOUNT_ROUTE}>
              <a className={styles.content__back_link}>← My Account</a>
            </Link>
          )}
          <h1 className={styles.content__title}>Edit Account</h1>
          {isLoggedIn ? (
            <div className="form_container">
              <AccountForm />
              <div className="flex_center">
                <Link href={CHANGE_PASSWORD_ROUTE}>
                  <a className={styles.content__password_link}>
                    Change Password
                  </a>
                </Link>
              </div>
              <div className="flex_center">
                <Link href={DELETE_ACCOUNT_ROUTE}>
                  <a className={styles.content__delete_link}>Delete Account</a>
                </Link>
              </div>
            </div>
          ) : (
            <p className="auth_problem_p">You are not logged in</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default EditAccount;
