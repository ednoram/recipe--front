import { NextPage } from "next";

import { Recipe } from "@/types";
import { Layout } from "@/components";
import { getRecipeById } from "@/lib";
import { processTitle } from "@/utils";
import { useConfirmBeforeLeaving } from "@/hooks";
import { EditRecipeContainer } from "@/containers";

interface Props {
  recipe: Recipe;
  recipeId: string;
}

const EditRecipePage: NextPage<Props> = ({ recipe, recipeId }) => {
  useConfirmBeforeLeaving();

  const recipeTitle = processTitle(recipe.title);

  const PAGE_TITLE = `Edit Recipe: ${recipeTitle}`;
  const PAGE_DESCRIPTION = "Edit Recipe page";

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <EditRecipeContainer recipe={recipe} recipeId={recipeId} />
    </Layout>
  );
};

EditRecipePage.getInitialProps = async ({ query }) => {
  const recipeId = String(query.id);

  const recipe = await getRecipeById(recipeId);

  return { recipe, recipeId };
};

export default EditRecipePage;
