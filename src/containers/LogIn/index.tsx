import { FC } from "react";

import { AuthForm } from "@/components";

import styles from "./LogIn.module.scss";

const LogIn: FC = () => {
  return (
    <main>
      <section>
        <div className={`${styles.content} container`}>
          <h1 className={styles.content__title}>Log In</h1>
          <div className="form_container">
            <AuthForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LogIn;
