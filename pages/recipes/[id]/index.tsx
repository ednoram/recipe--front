import { FC } from "react";

import { Layout } from "@/components";
import { processTitle } from "@/utils";
import { RecipeContainer } from "@/containers";
import { Recipe, RecipeComment } from "@/types";
import { getRecipeById, getRecipeComments } from "@/lib";

interface Props {
  recipe: Recipe;
  recipeComments: RecipeComment[];
}

const RecipePage: FC<Props> = ({ recipe, recipeComments }) => {
  const recipeTitle = processTitle(recipe.title);

  const PAGE_TITLE = `Recipe: ${recipeTitle}`;
  const PAGE_DESCRIPTION = "Recipe page";

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <RecipeContainer recipe={recipe} recipeComments={recipeComments} />
    </Layout>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: Props } | { notFound: boolean }> => {
  try {
    const recipe = await getRecipeById(params.id);
    const recipeComments = await getRecipeComments(params.id);

    return {
      props: {
        recipe,
        recipeComments,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default RecipePage;
