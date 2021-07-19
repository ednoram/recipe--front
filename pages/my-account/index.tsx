import { FC } from "react";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { MyAccountContainer } from "@/containers";

const PAGE_TITLE = "My Account";
const PAGE_DESCRIPTION = "My Account page";

interface Props {
  recipes: Recipe[];
}

const MyAccount: FC<Props> = ({ recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <MyAccountContainer recipes={recipes} />
    </Layout>
  );
};

export const getServerSideProps = async (): Promise<
  { props: Props } | { notFound: boolean }
> => {
  const recipes = await getRecipes();

  if (!recipes) {
    return { notFound: true };
  }

  return {
    props: { recipes },
  };
};

export default MyAccount;
