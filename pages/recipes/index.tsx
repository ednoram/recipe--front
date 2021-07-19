import { FC } from "react";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { DiscoverRecipesContainer } from "@/containers";

const PAGE_TITLE = "Discover Recipes";
const PAGE_DESCRIPTION = "Discover Recipes Page";

interface Props {
  recipes: Recipe[];
}

const DiscoverRecipes: FC<Props> = ({ recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <DiscoverRecipesContainer recipes={recipes} />
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

export default DiscoverRecipes;
