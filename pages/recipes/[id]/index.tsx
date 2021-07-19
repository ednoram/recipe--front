import { NextPage } from "next";

import { Layout } from "@/components";
import { processTitle } from "@/utils";
import { RecipeContainer } from "@/containers";
import { Recipe, RecipeComment } from "@/types";
import { getRecipeById, getRecipeComments } from "@/lib";

interface Props {
  recipe: Recipe;
  recipeComments: RecipeComment[];
}

const RecipePage: NextPage<Props> = ({ recipe, recipeComments }) => {
  const recipeTitle = processTitle(recipe.title);

  const PAGE_TITLE = `Recipe: ${recipeTitle}`;
  const PAGE_DESCRIPTION = "Recipe page";

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <RecipeContainer recipe={recipe} recipeComments={recipeComments} />
    </Layout>
  );
};

RecipePage.getInitialProps = async ({ query }) => {
  const id = String(query.id);

  const recipe = await getRecipeById(id);
  const recipeComments = await getRecipeComments(id);

  return { recipe, recipeComments };
};

export default RecipePage;
