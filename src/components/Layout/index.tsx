import { FC, ReactNode } from "react";
import Head from "next/head";

import styles from "./Layout.module.scss";

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
}

const Layout: FC<Props> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Layout;
