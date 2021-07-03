import { FC } from "react";

import { useIsLoggedIn } from "@/hooks";
import { AccountForm, SendEmailForm } from "@/components";

import styles from "./RecoverPassword.module.scss";

const RecoverPassword: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section className={styles.content}>
        <h1 className={styles.content__title}>Recover Password</h1>
        {isLoggedIn ? (
          <p className="auth_problem_p">You are logged in</p>
        ) : (
          <>
            <div className="form_container">
              <SendEmailForm recovery />
            </div>
            <div className={`${styles.content__password_form} form_container`}>
              <AccountForm recoverPassword />
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default RecoverPassword;
