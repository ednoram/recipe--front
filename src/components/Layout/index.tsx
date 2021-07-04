import { FC, ReactNode } from "react";
import Head from "next/head";

import { Header, Footer } from "@/components";

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
}

const Layout: FC<Props> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title} | Recipe</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
