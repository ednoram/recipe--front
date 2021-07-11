import { FC } from "react";

import { SendEmailForm } from "@/components";

import styles from "./VerifyAccount.module.scss";

const VerifyAccount: FC = () => {
  return (
    <main>
      <section>
        <div className={styles.content}>
          <div className="form_container">
            <h1 className={styles.content__title}>Verify Account</h1>
            <p className={styles.content__message}>
              We{`'`}ve sent you an email. Please, check your inbox and verify
              your account.
            </p>
            <SendEmailForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerifyAccount;
