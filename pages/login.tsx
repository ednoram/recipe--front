import { FC } from "react";

import { Layout } from "@/components";
import { LogInContainer } from "@/containers";

const PAGE_TITLE = "Log In";
const PAGE_DESCRIPTION = "Log In Page";

const LogInPage: FC = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <LogInContainer />
    </Layout>
  );
};

export default LogInPage;
