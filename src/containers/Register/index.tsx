import { FC } from "react";

import { AuthForm } from "@/components";

import styles from "./Register.module.scss";

const Register: FC = () => {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <h1 className={styles.container__title}>Register</h1>
          <AuthForm register />
        </div>
      </section>
    </main>
  );
};

export default Register;
