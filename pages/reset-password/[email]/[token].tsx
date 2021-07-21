import { NextPage } from "next";

import { Layout } from "@/components";
import { ResetPasswordContainer } from "@/containers";

const PAGE_TITLE = "Reset Password";
const PAGE_DESCRIPTION = "Reset Password page";

const ResetPassword: NextPage = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ResetPasswordContainer />
    </Layout>
  );
};

export default ResetPassword;
