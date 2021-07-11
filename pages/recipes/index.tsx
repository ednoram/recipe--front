import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { setRecipes } from "@/store/actions";
import { DiscoverRecipesContainer } from "@/containers";

const PAGE_TITLE = "Discover Recipes";
const PAGE_DESCRIPTION = "Discover Recipes Page";

interface Props {
  recipes: Recipe[];
}

const DiscoverRecipes: FC<Props> = ({ recipes }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRecipes(recipes));
  }, []);

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <DiscoverRecipesContainer />
    </Layout>
  );
};

export const getStaticProps = async (): Promise<
  { props: Props } | { notFound: boolean }
> => {
  try {
    const recipes = await getRecipes();

    return {
      props: { recipes },
    };
  } catch {
    return { notFound: true };
  }
};

export default DiscoverRecipes;
