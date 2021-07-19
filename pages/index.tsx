import { NextPage } from "next";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { HomeContainer } from "@/containers";

const PAGE_TITLE = "Home";
const PAGE_DESCRIPTION = "Home page";

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

HomePage.getInitialProps = async () => {
  const recipes = await getRecipes();

  return { recipes };
};

export default HomePage;
