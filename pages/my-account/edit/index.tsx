import { NextPage } from "next";

import { Layout } from "@/components";
import { EditAccountContainer } from "@/containers";

const PAGE_TITLE = "Edit Account";
const PAGE_DESCRIPTION = "Edit Account page";

const EditAccount: NextPage = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <EditAccountContainer />
    </Layout>
  );
};

export default EditAccount;
