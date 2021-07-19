import { FC } from "react";

import { useIsLoggedIn } from "@/hooks";
import { RecipeForm } from "@/components";

import styles from "./PostRecipe.module.scss";

const PostRecipe: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  const mainContent = isLoggedIn ? (
    <RecipeForm />
  ) : (
    <p className="auth_problem_p">You are not logged in</p>
  );

  return (
    <main>
      <section>
        <div className={styles.content}>
          <div className="container">
            <h1 className={styles.content__title}>Post Recipe</h1>
            {mainContent}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostRecipe;
