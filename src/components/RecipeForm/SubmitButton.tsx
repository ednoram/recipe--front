import { FC } from "react";
import { Router, useRouter } from "next/router";

import { deleteRecipe } from "@/lib";
import type { Recipe } from "@/types";
import { handleRouteChange } from "@/utils";
import { MY_ACCOUNT_ROUTE } from "@/constants";

import styles from "./RecipeForm.module.scss";

interface Props {
  recipe: Recipe | undefined;
  recipeID: string | undefined;
}

const SubmitButton: FC<Props> = ({ recipe, recipeID }) => {
  const router = useRouter();

  const handleDeleteRecipe = () => {
    if (confirm("Are you sure you want to delete recipe?")) {
      deleteRecipe(recipeID);

      Router.events.off("routeChangeStart", handleRouteChange);
      setTimeout(() => router.push(MY_ACCOUNT_ROUTE), 1000);
    }
  };

  return (
    <div className="flex_column_center">
      <button
        type="submit"
        name="submit button"
        className={styles.form__submit_button}
      >
        {recipe ? "Submit Changes" : "Post Recipe"}
      </button>
      {recipe && (
        <button
          type="button"
          name="delete recipe"
          onClick={handleDeleteRecipe}
          className={styles.form__delete_recipe_button}
        >
          Delete Recipe
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
