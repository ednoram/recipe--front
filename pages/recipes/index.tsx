import { NextPage } from "next";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { DiscoverRecipesContainer } from "@/containers";

const PAGE_TITLE = "Discover Recipes";
const PAGE_DESCRIPTION = "Discover Recipes Page";

interface Props {
  recipes: Recipe[];
}

const DiscoverRecipes: NextPage<Props> = ({ recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <DiscoverRecipesContainer recipes={recipes} />
    </Layout>
  );
};

DiscoverRecipes.getInitialProps = async () => {
  const recipes = await getRecipes();

  return { recipes };
};

export default DiscoverRecipes;
