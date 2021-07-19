import { NextPage } from "next";

import { Layout } from "@/components";
import { User, Recipe } from "@/types";
import { processTitle } from "@/utils";
import { UserContainer } from "@/containers";
import { getUsers, getUserRecipes } from "@/lib";

interface Props {
  user: User | null;
  recipes: Recipe[];
}

const UserPage: NextPage<Props> = ({ user, recipes }) => {
  const PAGE_TITLE = `User: ${processTitle(user?.name || "")}`;
  const PAGE_DESCRIPTION = "User page";

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <UserContainer user={user} recipes={recipes} />
    </Layout>
  );
};

UserPage.getInitialProps = async ({ query }) => {
  const users = await getUsers();

  const email = String(query.id);
  const user = users.find((user) => user.email === email) || null;

  const recipes = await getUserRecipes(email);

  return { user, recipes };
};

export default UserPage;
