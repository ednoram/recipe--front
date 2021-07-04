import { FC, ReactNode } from "react";
import Head from "next/head";

import { Header, Footer } from "@/components";

interface Props {
  title: string;
  empty?: boolean;
  description: string;
  children?: ReactNode;
}

const Layout: FC<Props> = ({ title, description, empty, children }) => {
  return (
    <>
      <Head>
        <title>{title} | Recipe</title>
        <meta name="description" content={description} />
      </Head>
      {!empty && <Header />}
      {children}
      {!empty && <Footer />}
    </>
  );
};

export default Layout;
