import { FC } from "react";

import { Layout } from "@/components";

import styles from "./Home.module.scss";

const Home: FC = () => {
  return (
    <Layout title="Home Page" description="Home Page">
      <h1 className={styles.title}>Home</h1>
    </Layout>
  );
};

export default Home;
