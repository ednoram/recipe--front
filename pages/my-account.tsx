import { FC } from "react";

import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import type { Recipe } from "@/types";
import { MyAccountContainer } from "@/containers";

const PAGE_TITLE = "My Account";
const PAGE_DESCRIPTIOn = "My Account page";

interface Props {
  recipes: Array<Recipe>;
}

const MyAccount: FC<Props> = ({ recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTIOn}>
      <MyAccountContainer recipes={recipes} />
    </Layout>
  );
};

export const getStaticProps = async (): Promise<
  { props: Props } | { notFound: boolean }
> => {
  try {
    const recipes: Array<Recipe> = await getRecipes();

    return {
      props: { recipes },
    };
  } catch {
    return { notFound: true };
  }
};

export default MyAccount;
