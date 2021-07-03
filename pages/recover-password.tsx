import { FC } from "react";

import { Layout } from "@/components";
import { RecoverPasswordContainer } from "@/containers";

const PAGE_TITLE = "Recover Password";
const PAGE_DESCRIPTION = "Password recovery page";

const RecoverPassword: FC = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <RecoverPasswordContainer />
    </Layout>
  );
};

export default RecoverPassword;
