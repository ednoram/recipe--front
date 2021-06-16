import { FC } from "react";

import { AuthForm } from "@/components";

import styles from "./Register.module.scss";

const Register: FC = () => {
  return (
    <main>
      <section>
        <div className={`${styles.content} container`}>
          <h1 className={styles.content__title}>Register</h1>
          <div className="form_container">
            <AuthForm register />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
