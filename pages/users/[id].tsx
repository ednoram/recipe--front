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

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: Props } | { notFound: boolean }> => {
  const users = await getUsers();

  const email = params.id;
  const user = users.find((user) => user.email === email);

  if (!user) {
    return { notFound: true };
  }

  const recipes = await getUserRecipes(email);

  return {
    props: { user, recipes },
  };
};

export default UserPage;
