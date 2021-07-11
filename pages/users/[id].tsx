import { FC } from "react";

import { Layout } from "@/components";
import { User, Recipe } from "@/types";
import { processTitle } from "@/utils";
import { UserContainer } from "@/containers";
import { getUsers, getUserRecipes } from "@/lib";

interface Props {
  user: User;
  recipes: Recipe[];
}

const UserPage: FC<Props> = ({ user, recipes }) => {
  const PAGE_TITLE = `User: ${processTitle(user.name)}`;
  const PAGE_DESCRIPTION = "User page";

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

    const email = params.id;
    const user = users.find((user) => user.email === email);

    const recipes = await getUserRecipes(email);

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
