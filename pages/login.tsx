import { NextPage } from "next";

import { Layout } from "@/components";
import { LogInContainer } from "@/containers";

const PAGE_TITLE = "Log In";
const PAGE_DESCRIPTION = "Log In page";

const LogInPage: NextPage = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <LogInContainer />
    </Layout>
  );
};

export default LogInPage;
