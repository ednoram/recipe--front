import { FC } from "react";
import Link from "next/link";

import { useIsLoggedIn } from "@/hooks";
import { AccountForm } from "@/components";
import { EDIT_ACCOUNT_ROUTE } from "@/constants";

import styles from "./DeleteAccount.module.scss";

const DeleteAccount: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section className={styles.content}>
        <div className="container">
          <h1 className={styles.content__title}>Delete Account</h1>
          {isLoggedIn ? (
            <div className="form_container">
              <Link href={EDIT_ACCOUNT_ROUTE}>
                <a className={styles.content__back_link}>← Edit Account</a>
              </Link>
              <AccountForm deleteAccount />
            </div>
          ) : (
            <p className="auth_problem_p">You are not logged in</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default DeleteAccount;
