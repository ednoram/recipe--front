import { useState, FC } from "react";
import Link from "next/link";

import { sortRecipes } from "@/utils";
import { User, Recipe } from "@/types";
import { RecipeList } from "@/components";
import { USERS_ROUTE } from "@/constants";

import styles from "./User.module.scss";

interface Props {
  user: User | null;
  recipes: Recipe[];
}

const UserPage: FC<Props> = ({ user, recipes }) => {
  const [recipeListLimit, setRecipeListLimit] = useState(4);

  const sortedRecipes = sortRecipes(recipes);

  const visibleRecipes = sortedRecipes.slice(0, recipeListLimit);

  return user ? (
    <main className={styles.content}>
      <section>
        <div className="container">
          <Link href={USERS_ROUTE}>
            <a className="color-primary">← Users</a>
          </Link>
          <h1 className={styles.content__title}>{user.name}</h1>
          <p className={styles.content__email}>{user.email}</p>
        </div>
      </section>
      <section className={styles.content__recipes_section}>
        <div className="container">
          <h2 className="color-primary">Recipes ({recipes.length})</h2>
          <RecipeList recipes={visibleRecipes} />
          <div className="flex_center">
            {recipeListLimit < recipes.length && (
              <button
                name="Show more"
                className={styles.content__show_more_button}
                onClick={() => setRecipeListLimit(recipeListLimit + 4)}
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  ) : (
    <></>
  );
};

export default UserPage;
