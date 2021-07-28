import { NextPage } from "next";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { HomeContainer } from "@/containers";

const PAGE_TITLE = "Home";
const PAGE_DESCRIPTION = "Discover recipes. Share your own recipes.";

interface Props {
  recipes: Recipe[];
}

const HomePage: NextPage<Props> = ({ recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <HomeContainer recipes={recipes} />
    </Layout>
  );
};

export const getServerSideProps = async (): Promise<
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

export default HomePage;
