import { FC } from "react";

import { Layout } from "@/components";
import { Recipe, Path } from "@/types";
import { RecipeContainer } from "@/containers";
import { getRecipes, getRecipeById } from "@/lib";

const PAGE_TITLE = "Recipe";
const PAGE_DESCRIPTION = "Recipe page";

interface Props {
  recipe: Recipe;
}

const RecipePage: FC<Props> = ({ recipe }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <RecipeContainer recipe={recipe} />
    </Layout>
  );
};

export const getStaticPaths = async (): Promise<{
  paths: Path[];
  fallback: boolean;
}> => {
  const recipes = await getRecipes();

  const paths = recipes.map(({ _id }) => ({
    params: {
      id: _id,
    },
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
      props: { recipe },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default RecipePage;
