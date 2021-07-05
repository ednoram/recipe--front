import { FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import EditIcon from "public/edit-icon.svg";

import { Recipe } from "@/types";
import { useIsLoggedIn } from "@/hooks";
import { RecipeList } from "@/components";
import { selectRecipes, selectUserData } from "@/store/selectors";
import { EDIT_ACCOUNT_ROUTE, POST_RECIPE_ROUTE } from "@/constants";

import styles from "./MyAccount.module.scss";

const MyAccount: FC = () => {
  const recipes = useSelector(selectRecipes);
  const user = useSelector(selectUserData);

  const isLoggedIn = useIsLoggedIn();

  const myRecipes: Recipe[] =
    recipes && recipes.filter((recipe: Recipe) => recipe.email === user?.email);

  const loggedInSections = (
    <>
      <section>
        <div className="container">
          <h1 className={styles.content__title}>My Account</h1>
          <Link href={EDIT_ACCOUNT_ROUTE}>
            <a className="color-primary">
              <EditIcon className={styles.content__edit_icon} />
              Edit Account
            </a>
          </Link>
          <div className={styles.content__account_info}>
            <h2 className="color-primary">{user?.name}</h2>
            <p className={styles.content__email}>{user?.email}</p>
          </div>
          <Link href={POST_RECIPE_ROUTE}>
            <a className={styles.content__post_recipe_link}>Post Recipe</a>
          </Link>
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
  );

  const notLoggedInSection = (
    <section>
      <div className="container">
        <h1 className={styles.content__title}>My Account</h1>
        <p className="auth_problem_p">You are not logged in</p>
      </div>
    </section>
  );

  return (
    <main className={styles.content}>
      {isLoggedIn ? loggedInSections : notLoggedInSection}
    </main>
  );
};

export default MyAccount;
