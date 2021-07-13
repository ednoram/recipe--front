import { FC } from "react";
import Link from "next/link";

import { AuthForm } from "@/components";
import { useIsLoggedIn } from "@/hooks";
import { RECOVER_PASSWORD_ROUTE, VERIFY_ACCOUNT_ROUTE } from "@/constants";

import styles from "./LogIn.module.scss";

const LogIn: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section>
        <div className={styles.content}>
          <div className="form_container">
            <h1 className={styles.content__title}>Log In</h1>
            <AuthForm />
            {!isLoggedIn && (
              <>
                <div className="flex_center">
                  <Link href={RECOVER_PASSWORD_ROUTE}>
                    <a className={styles.content__link}>Forgot Password</a>
                  </Link>
                </div>
                <div className="flex_center">
                  <Link href={VERIFY_ACCOUNT_ROUTE}>
                    <a className={styles.content__link}>Verify Account</a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LogIn;
