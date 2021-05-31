import { FC } from "react";

import { AuthForm } from "@/components";

import styles from "./LogIn.module.scss";

const LogIn: FC = () => {
  return (
    <main>
      <section className={styles.container}>
        <h1 className={styles.container__title}>Log In</h1>
        <AuthForm />
      </section>
    </main>
  );
};

export default LogIn;
