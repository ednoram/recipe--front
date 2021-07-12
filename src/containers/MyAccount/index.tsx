import { useState, FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import EditIcon from "public/edit-icon.svg";

import { Recipe } from "@/types";
import { RecipeList } from "@/components";
import { selectUserData } from "@/store/selectors";
import { createEmptyRecipe, sortRecipes } from "@/utils";
import { EDIT_ACCOUNT_ROUTE, POST_ROUTE } from "@/constants";

import styles from "./MyAccount.module.scss";
import { useIsLoggedIn } from "@/hooks";

interface Props {
  recipes: Recipe[];
}

const MyAccount: FC<Props> = ({ recipes }) => {
  const [myRecipesLimit, setMyRecipesLimit] = useState(4);
  const [favRecipesLimit, setFavRecipesLimit] = useState(4);

  const isLoggedIn = useIsLoggedIn();
  const user = useSelector(selectUserData);

  const myRecipes: Recipe[] =
    recipes &&
    sortRecipes(
      recipes.filter((recipe: Recipe) => recipe.email === user?.email)
    );

  const favRecipes: Recipe[] = user?.favoriteRecipes
    ? sortRecipes(
        user.favoriteRecipes.map(
          (id) => recipes.find(({ _id }) => _id === id) || createEmptyRecipe(id)
        )
      )
    : [];

  const topSection = (
    <section>
      <div className="container">
        <h1 className={styles.content__title}>My Account</h1>
        <div className={styles.content__account_info}>
          <Link href={EDIT_ACCOUNT_ROUTE}>
            <a className="color-primary">
              <EditIcon className={styles.content__edit_icon} />
              Edit Account
            </a>
          </Link>
          <h2 className={styles.content__user_name}>{user?.name}</h2>
          <p className={styles.content__email}>{user?.email}</p>
        </div>
        <Link href={POST_ROUTE}>
          <a className={styles.content__post_recipe_link}>Post Recipe</a>
        </Link>
      </div>
    </section>
  );

  return (
    <main className={styles.content}>
      {isLoggedIn ? (
        <>
          {topSection}
          <section>
            <div className="container">
              <div className={styles.content__my_recipes}>
                <h2 className="color-primary">
                  My Recipes ({myRecipes.length})
                </h2>
                <RecipeList recipes={myRecipes.slice(0, myRecipesLimit)} />
                <div className="flex_center">
                  {myRecipesLimit < myRecipes.length && (
                    <button
                      name="Show more"
                      className={styles.content__show_more_button}
                      onClick={() => setMyRecipesLimit(myRecipesLimit + 4)}
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className={styles.content__favorite_recipes}>
                <h2 className="color-primary">
                  Favorite Recipes ({favRecipes.length})
                </h2>
                <RecipeList recipes={favRecipes.slice(0, favRecipesLimit)} />
                {favRecipesLimit < favRecipes.length && (
                  <div className="flex_center">
                    <button
                      name="Show more"
                      className={styles.content__show_more_button}
                      onClick={() => setFavRecipesLimit(favRecipesLimit + 4)}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section>
          <div className="container">
            <h1 className={styles.content__title}>My Account</h1>
            <p className="auth_problem_p">You are not logged in</p>
          </div>
        </section>
      )}
    </main>
  );
};

export default MyAccount;
