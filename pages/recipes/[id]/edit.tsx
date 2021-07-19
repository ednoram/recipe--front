import { FC } from "react";

import { Recipe } from "@/types";
import { Layout } from "@/components";
import { getRecipeById } from "@/lib";
import { processTitle } from "@/utils";
import { useConfirmBeforeLeaving } from "@/hooks";
import { EditRecipeContainer } from "@/containers";

interface Props {
  recipe: Recipe;
  recipeID: string;
}

const EditRecipePage: FC<Props> = ({ recipe, recipeID }) => {
  useConfirmBeforeLeaving();

  const recipeTitle = processTitle(recipe.title);

  const PAGE_TITLE = `Edit Recipe: ${recipeTitle}`;
  const PAGE_DESCRIPTION = "Edit Recipe page";

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <EditRecipeContainer recipe={recipe} recipeID={recipeID} />
    </Layout>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: Props } | { notFound: boolean }> => {
  const recipe: Recipe = await getRecipeById(params.id);

  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      recipe,
      recipeID: params.id,
    },
  };
};

export default EditRecipePage;
