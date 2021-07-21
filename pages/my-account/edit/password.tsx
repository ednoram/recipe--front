import { NextPage } from "next";

import { Layout } from "@/components";
import { ChangePasswordContainer } from "@/containers";

const PAGE_TITLE = "Change Password";
const PAGE_DESCRIPTION = "Change Password page";

const ChangePassword: NextPage = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ChangePasswordContainer />
    </Layout>
  );
};

export default ChangePassword;
