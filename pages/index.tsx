import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { setRecipes } from "@/store/actions";
import { HomeContainer } from "@/containers";

const PAGE_TITLE = "Home";
const PAGE_DESCRIPTION = "Home page";

interface Props {
  recipes: Recipe[];
}

const HomePage: FC<Props> = ({ recipes }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRecipes(recipes));
  }, []);

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <HomeContainer />
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

export default HomePage;
