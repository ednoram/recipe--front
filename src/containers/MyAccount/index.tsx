import { FC } from "react";
import { useSelector } from "react-redux";

import type { Recipe } from "@/types";
import { useIsLoggedIn } from "@/hooks";
import { RecipeList } from "@/components";
import { selectRecipes, selectUserData } from "@/store/selectors";

import styles from "./MyAccount.module.scss";

const MyAccount: FC = () => {
  const recipes = useSelector(selectRecipes);
  const userData = useSelector(selectUserData);

  const isLoggedIn = useIsLoggedIn();

  const myRecipes: Array<Recipe> =
    recipes &&
    recipes.filter((recipe: Recipe) => recipe.email === userData?.email);

  return isLoggedIn ? (
    <main className={styles.container}>
      <section>
        <div className="container">
          <h1 className={styles.container__title}>My Account</h1>
          <div>
            <h2 className="color-primary">{userData?.name}</h2>
            <p>{userData?.email}</p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className={styles.container__my_recipes}>
            <h2 className="color-primary">My Recipes</h2>
            <RecipeList recipes={myRecipes} />
          </div>
        </div>
      </section>
    </main>
  ) : (
    <main>
      <section>
        <div className="container">
          <p className="auth_problem_p">You are not logged in</p>
        </div>
      </section>
    </main>
  );
};

export default MyAccount;
