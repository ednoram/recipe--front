import { FC } from "react";

import { Layout } from "@/components";
import { useConfirmBeforeLeaving } from "@/hooks";
import { PostRecipeContainer } from "@/containers";

const PAGE_TITLE = "Post Recipe";
const PAGE_DESCRIPTION = "Post Recipe page";

const PostRecipe: FC = () => {
  useConfirmBeforeLeaving();

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <PostRecipeContainer />
    </Layout>
  );
};

export default PostRecipe;
