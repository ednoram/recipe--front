import { FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import type { Recipe } from "@/types";
import { useIsLoggedIn } from "@/hooks";
import { RecipeList } from "@/components";
import { EDIT_ACCOUNT_ROUTE } from "@/constants";
import { selectRecipes, selectUserData } from "@/store/selectors";

import styles from "./MyAccount.module.scss";

const MyAccount: FC = () => {
  const recipes = useSelector(selectRecipes);
  const userData = useSelector(selectUserData);

  const isLoggedIn = useIsLoggedIn();

  const myRecipes: Array<Recipe> =
    recipes &&
    recipes.filter((recipe: Recipe) => recipe.email === userData?.email);

  return (
    <main className={styles.content}>
      {isLoggedIn ? (
        <>
          <section>
            <div className="container">
              <h1 className={styles.content__title}>My Account</h1>
              <Link href={EDIT_ACCOUNT_ROUTE}>
                <a className="color-primary">Edit Account</a>
              </Link>
              <div className={styles.content__account_info}>
                <h2 className="color-primary">{userData?.name}</h2>
                <p className={styles.content__email}>{userData?.email}</p>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className={styles.content__my_recipes}>
                <h2 className="color-primary">My Recipes</h2>
                <RecipeList recipes={myRecipes} />
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className={styles.content__favorite_recipes}>
                <h2 className="color-primary">Favorite Recipes</h2>
                <RecipeList recipes={recipes} favorites />
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="container">
          <h1 className={styles.content__title}>My Account</h1>
          <p className="auth_problem_p">You are not logged in</p>
        </div>
      )}
    </main>
  );
};

export default MyAccount;
