import { FC } from "react";
import Link from "next/link";

import { AuthForm } from "@/components";

import styles from "./LogIn.module.scss";
import { RECOVER_PASSWORD_ROUTE, VERIFY_ACCOUNT_ROUTE } from "@/constants";

const LogIn: FC = () => {
  return (
    <main>
      <section>
        <div className={`${styles.content} container`}>
          <h1 className={styles.content__title}>Log In</h1>
          <div className="form_container">
            <AuthForm />
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default LogIn;
