import { NextPage } from "next";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { MyAccountContainer } from "@/containers";

const PAGE_TITLE = "My Account";
const PAGE_DESCRIPTION = "My Account page";

interface Props {
  recipes: Recipe[];
}

const MyAccount: NextPage<Props> = ({ recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <MyAccountContainer recipes={recipes} />
    </Layout>
  );
};

MyAccount.getInitialProps = async () => {
  const recipes = await getRecipes();

  return { recipes };
};

export default MyAccount;
