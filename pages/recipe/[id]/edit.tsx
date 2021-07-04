import { FC } from "react";

import { Layout } from "@/components";
import { Path, Recipe } from "@/types";
import { processTitle } from "@/utils";
import { useConfirmBeforeLeaving } from "@/hooks";
import { getRecipes, getRecipeById } from "@/lib";
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

export const getStaticPaths = async (): Promise<{
  paths: Path[];
  fallback: boolean;
}> => {
  const recipes = await getRecipes();

  const paths = recipes.map(({ _id }) => ({
    params: { id: _id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: Props } | { notFound: boolean }> => {
  try {
    const recipe: Recipe = await getRecipeById(params.id);

    return {
      props: { recipe, recipeID: params.id },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default EditRecipePage;
