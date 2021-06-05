import { FC } from "react";

import { Layout } from "@/components";
import { ChangePasswordContainer } from "@/containers";

const PAGE_TITLE = "Change Password";
const PAGE_DESCRIPTION = "Change Password page";

const ChangePassword: FC = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <ChangePasswordContainer />
    </Layout>
  );
};

export default ChangePassword;
