import { FC } from "react";

import { useIsLoggedIn } from "@/hooks";
import { SendEmailForm } from "@/components";

import styles from "./RecoverPassword.module.scss";

const RecoverPassword: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  const mainContent = isLoggedIn ? (
    <p className="auth_problem_p">You are logged in</p>
  ) : (
    <>
      <p className={styles.content__info_p}>
        Enter your email and we{`'`}ll send you a link to reset your password.
      </p>
      <SendEmailForm recovery />
    </>
  );

  return (
    <main>
      <section className={styles.content}>
        <div className="form_container">
          <h1 className={styles.content__title}>Recover Password</h1>
          {mainContent}
        </div>
      </section>
    </main>
  );
};

export default RecoverPassword;
