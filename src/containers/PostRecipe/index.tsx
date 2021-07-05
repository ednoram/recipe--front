import { FC } from "react";

import { useIsLoggedIn } from "@/hooks";
import { RecipeForm } from "@/components";

import styles from "./PostRecipe.module.scss";

const PostRecipe: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section>
        {isLoggedIn ? (
          <div className={styles.content}>
            <div className="container">
              <h1 className={styles.content__title}>Post Recipe</h1>
              <RecipeForm />
            </div>
          </div>
        ) : (
          <p className="auth_problem_p">You are not logged in</p>
        )}
      </section>
    </main>
  );
};

export default PostRecipe;
