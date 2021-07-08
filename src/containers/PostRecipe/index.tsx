import { FC } from "react";

import { useIsLoggedIn } from "@/hooks";
import { RecipeForm } from "@/components";

import styles from "./PostRecipe.module.scss";

const PostRecipe: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main>
      <section>
        <div className={styles.content}>
          <div className="container">
            <h1 className={styles.content__title}>Post Recipe</h1>
            {isLoggedIn ? (
              <RecipeForm />
            ) : (
              <p className="auth_problem_p">You are not logged in</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostRecipe;
