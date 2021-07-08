import { FC } from "react";
import { Router } from "next/router";
import { useDispatch } from "react-redux";

import { Recipe } from "@/types";
import { handleRouteChange } from "@/utils";
import { deleteRecipe } from "@/store/actions";

import styles from "./RecipeForm.module.scss";

interface Props {
  recipe: Recipe | undefined;
  recipeID: string | undefined;
}

const SubmitButton: FC<Props> = ({ recipe, recipeID }) => {
  const dispatch = useDispatch();

  const handleDeleteRecipe = () => {
    if (confirm("Are you sure you want to delete recipe?")) {
      dispatch(deleteRecipe(recipeID));

      window.onbeforeunload = null;
      Router.events.off("routeChangeStart", handleRouteChange);
    }
  };

  return (
    <div className="flex_column_center">
      <button
        type="submit"
        name="Submit"
        className={styles.form__submit_button}
      >
        {recipe ? "Submit Changes" : "Post Recipe"}
      </button>
      {recipe && (
        <button
          type="button"
          name="Delete Recipe"
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
