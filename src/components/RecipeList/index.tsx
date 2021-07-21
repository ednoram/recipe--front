import { FC } from "react";

import { Recipe } from "@/types";
import { sortRecipes } from "@/utils";
import { useFetchFavoriteRecipes } from "@/hooks";

import RecipeItem from "./RecipeItem";
import styles from "./RecipeList.module.scss";

interface Props {
  recipes: Recipe[];
}

const RecipeList: FC<Props> = ({ recipes }) => {
  const sortedRecipes = sortRecipes(recipes);

  useFetchFavoriteRecipes();

  return !sortedRecipes || sortedRecipes.length < 1 ? (
    <p className={styles.nothing_was_found}>Nothing was found</p>
  ) : (
    <ul className={styles.list}>
      {sortedRecipes.map((recipe) => (
        <li key={recipe._id}>
          <RecipeItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
