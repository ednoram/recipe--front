import { FC } from "react";

import { Layout } from "@/components";
import { VerifyAccountContainer } from "@/containers";

const PAGE_TITLE = "Verify Account";
const PAGE_DESCRIPTION = "Account verification page";

const VerifyAccount: FC = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <VerifyAccountContainer />
    </Layout>
  );
};

export default VerifyAccount;
