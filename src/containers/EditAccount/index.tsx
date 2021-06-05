import { FC } from "react";
import Link from "next/link";

import { useIsLoggedIn } from "@/hooks";
import { AccountForm } from "@/components";
import { MY_ACCOUNT_ROUTE } from "@/constants";

import styles from "./EditAccount.module.scss";

const EditAccount: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section className={styles.content}>
        <div className="container">
          <h1 className={styles.content__title}>Edit Account</h1>
          {isLoggedIn ? (
            <div className="form_container">
              <Link href={MY_ACCOUNT_ROUTE}>
                <a className={styles.content__back_link}>← My Account</a>
              </Link>
              <AccountForm />
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
