import { FC } from "react";

import { Layout } from "@/components";
import { DeleteAccountContainer } from "@/containers";

const PAGE_TITLE = "Delete Account";
const PAGE_DESCRIPTION = "Delete Account page";

const DeleteAccount: FC = () => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <DeleteAccountContainer />
    </Layout>
  );
};

export default DeleteAccount;
