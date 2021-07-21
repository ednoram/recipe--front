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

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: Props } | { notFound: boolean }> => {
  try {
    const recipe: Recipe = await getRecipeById(params.id);

    return {
      props: {
        recipe,
        recipeId: params.id,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default EditRecipePage;
