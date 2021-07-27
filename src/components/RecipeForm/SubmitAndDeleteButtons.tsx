import { FC, Dispatch, SetStateAction } from "react";
import { Router } from "next/router";
import { useDispatch } from "react-redux";

import { Recipe } from "@/types";
import { handleRouteChange } from "@/utils";
import { deleteRecipe } from "@/store/actions";

import styles from "./RecipeForm.module.scss";

interface Props {
  loading: boolean;
  recipe: Recipe | undefined;
  recipeId: string | undefined;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const SubmitAndDeleteButtons: FC<Props> = ({
  recipe,
  loading,
  recipeId,
  setLoading,
}) => {
  const dispatch = useDispatch();

  const handleDeleteRecipe = () => {
    if (confirm("Are you sure you want to delete recipe?")) {
      dispatch(deleteRecipe(recipeId, setLoading));

      window.onbeforeunload = null;
      Router.events.off("routeChangeStart", handleRouteChange);
    }
  };

  const deleteButton = recipe && (
    <button
      type="button"
      disabled={loading}
      name="Delete Recipe"
      onClick={handleDeleteRecipe}
      className={styles.form__delete_recipe_button}
    >
      Delete Recipe
    </button>
  );

  return (
    <div className="flex_column_center">
      <button
        type="submit"
        name="Submit"
        disabled={loading}
        className={styles.form__submit_button}
      >
        {recipe ? "Submit Changes" : "Post Recipe"}
      </button>
      {deleteButton}
    </div>
  );
};

export default SubmitAndDeleteButtons;
