import { FC } from "react";

import { User } from "@/types";
import { getUsers } from "@/lib";
import { Layout } from "@/components";
import { FindUsersContainer } from "@/containers";

const PAGE_TITLE = "Find Users";
const PAGE_DESCRIPTION = "Find users page";

interface Props {
  users: User[];
}

const FindUsers: FC<Props> = ({ users }) => {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <FindUsersContainer users={users} />
    </Layout>
  );
};

export const getStaticProps = async (): Promise<
  { props: Props } | { notFound: boolean }
> => {
  try {
    const users = await getUsers();

    return {
      props: { users },
    };
  } catch {
    return { notFound: true };
  }
};

export default FindUsers;
