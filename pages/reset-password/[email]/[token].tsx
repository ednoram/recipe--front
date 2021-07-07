import { FC } from "react";

import { Layout } from "@/components";
import { ResetPasswordContainer } from "@/containers";

const PAGE_TITLE = "Reset Password";
const PAGE_DESCRIPTION = "Reset Password page";

const ResetPassword: FC = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ResetPasswordContainer />
    </Layout>
  );
};

export default ResetPassword;
