import { FC } from "react";

import { Layout } from "@/components";
import type { User, Recipe } from "@/types";
import { UserContainer } from "@/containers";
import { getRecipes, getUsers } from "@/lib";

const PAGE_TITLE = "Recipe";
const PAGE_DESCRIPTION = "Recipe page";

interface Props {
  user: User;
  recipes: Array<Recipe>;
}

const UserPage: FC<Props> = ({ user, recipes }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <UserContainer user={user} recipes={recipes} />
    </Layout>
  );
};

export const getStaticPaths = async (): Promise<{
  paths: { params: { id: string } }[];
  fallback: boolean;
}> => {
  const users = await getUsers();
  const emails = users.map((user: { email: string }) => user.email);

  const paths = emails.map((email) => ({
    params: {
      id: email,
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
    const users = await getUsers();
    const recipes = await getRecipes();

    const email = params.id;
    const user = users.find((user) => user.email === email);

    return user
      ? {
          props: { user, recipes },
        }
      : { notFound: true };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default UserPage;
