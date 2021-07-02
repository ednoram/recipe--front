import { FC } from "react";
import Link from "next/link";

import { VerificationForm } from "@/components";

import styles from "./VerifyAccount.module.scss";
import { LOGIN_ROUTE } from "@/constants";

const VerifyAccount: FC = () => {
  return (
    <main>
      <section>
        <div className={styles.content}>
          <div className="form_container">
            <h1 className={styles.content__title}>Verify Account</h1>
            <p className={styles.content__message}>
              We{`'`}ve sent you an email. Please, check your inbox and verify
              your account. Then go to{" "}
              <Link href={LOGIN_ROUTE}>
                <a className="color-primary"> Log In page</a>
              </Link>{" "}
              and log in.
            </p>
            <VerificationForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerifyAccount;
