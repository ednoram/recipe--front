import { FC } from "react";

import { Layout } from "@/components";
import { RegisterContainer } from "@/containers";

const PAGE_TITLE = "Register";
const PAGE_DESCRIPTION = "Register Page";

const Register: FC = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <RegisterContainer />
    </Layout>
  );
};

export default Register;
