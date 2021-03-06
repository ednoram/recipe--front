import { AccountForm } from "@/components";
import { useIsLoggedIn } from "@/hooks";
import { FC } from "react";

import styles from "./ResetPassword.module.scss";

const ResetPassword: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  const mainContent = isLoggedIn ? (
    <p className="auth_problem_p">You are logged in.</p>
  ) : (
    <AccountForm resetPassword />
  );

  return (
    <main className={styles.content}>
      <section>
        <div className="form_container">
          <h1 className={styles.content__title}>Reset Password</h1>
          {mainContent}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
