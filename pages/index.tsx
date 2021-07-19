import { FC } from "react";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { HomeContainer } from "@/containers";

const PAGE_TITLE = "Home";
const PAGE_DESCRIPTION = "Home page";

interface Props {
  recipes: Recipe[];
}

const HomePage: FC<Props> = ({ recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <HomeContainer recipes={recipes} />
    </Layout>
  );
};

export const getServerSideProps = async (): Promise<
  { props: Props } | { notFound: boolean }
> => {
  const recipes = await getRecipes();

  if (!recipes) {
    return { notFound: true };
  }

  return {
    props: { recipes },
  };
};

export default HomePage;
