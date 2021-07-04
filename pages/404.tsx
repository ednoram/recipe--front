import { FC } from "react";

import { Layout } from "@/components";
import { Custom404Container } from "@/containers";

const PAGE_TITLE = "404 Not Found";
const PAGE_DESCRIPTION = "Page not found";

const Custom404: FC = () => {
  return (
    <Layout empty title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Custom404Container />
    </Layout>
  );
};

export default Custom404;
