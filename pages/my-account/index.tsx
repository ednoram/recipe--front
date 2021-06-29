import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";

import { Recipe } from "@/types";
import { getRecipes } from "@/lib";
import { Layout } from "@/components";
import { setRecipes } from "@/store/actions";
import { MyAccountContainer } from "@/containers";

const PAGE_TITLE = "My Account";
const PAGE_DESCRIPTION = "My Account page";

interface Props {
  recipes: Recipe[];
}

const MyAccount: FC<Props> = ({ recipes }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRecipes(recipes));
  }, []);

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <MyAccountContainer />
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

export default MyAccount;
