import { FC } from "react";
import Link from "next/link";

import { useIsLoggedIn } from "@/hooks";
import { AccountForm } from "@/components";
import { EDIT_ACCOUNT_ROUTE } from "@/constants";

import styles from "./ChangePassword.module.scss";

const ChangePassword: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section className={styles.content}>
        <div className="form_container">
          {isLoggedIn && (
            <Link href={EDIT_ACCOUNT_ROUTE}>
              <a className={styles.content__back_link}>← Edit Account</a>
            </Link>
          )}
          <h1 className={styles.content__title}>Change Password</h1>
          {isLoggedIn ? (
            <AccountForm changePassword />
          ) : (
            <p className="auth_problem_p">You are not logged in</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ChangePassword;
