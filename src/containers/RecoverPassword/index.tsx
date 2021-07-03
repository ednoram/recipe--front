import { FC } from "react";

import { AccountForm, SendEmailForm } from "@/components";

import styles from "./RecoverPassword.module.scss";

const RecoverPassword: FC = () => {
  return (
    <main>
      <section className={styles.content}>
        <h1 className={styles.content__title}>Recover Password</h1>
        <div className="form_container">
          <SendEmailForm recovery />
        </div>
        <div className={`${styles.content__password_form} form_container`}>
          <AccountForm recoverPassword />
        </div>
      </section>
    </main>
  );
};

export default RecoverPassword;
