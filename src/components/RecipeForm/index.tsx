import { FC, FormEvent, useEffect } from "react";
import { Router, useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  postImage,
  postRecipe,
  patchRecipe,
  setFormTitle,
  setFormSteps,
  setFormSummary,
  clearRecipeForm,
  setFormMealType,
  setFormIngredients,
} from "@/store/actions";
import {
  selectFormTitle,
  selectFormImage,
  selectFormSteps,
  selectFormSummary,
  selectFormMealType,
  selectFormIngredients,
} from "@/store/selectors";
import { Recipe } from "@/types";
import { handleRouteChange } from "@/utils";

import FormGrid from "./FormGrid";
import SubmitButton from "./SubmitButton";
import styles from "./RecipeForm.module.scss";

interface Props {
  recipe?: Recipe;
  recipeID?: string;
}

const RecipeForm: FC<Props> = ({ recipe, recipeID }) => {
  const image = useSelector(selectFormImage);
  const title = useSelector(selectFormTitle);
  const steps = useSelector(selectFormSteps);
  const summary = useSelector(selectFormSummary);
  const mealType = useSelector(selectFormMealType);
  const ingredients = useSelector(selectFormIngredients);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect((): (() => void) => {
    dispatch(clearRecipeForm());
    insertExistingData();

    return () => dispatch(clearRecipeForm());
  }, []);

  const insertExistingData = () => {
    if (recipe) {
      recipe.ingredients.length > 0 &&
        dispatch(setFormIngredients(recipe.ingredients));
      recipe.title && dispatch(setFormTitle(recipe.title));
      recipe.summary && dispatch(setFormSummary(recipe.summary));
      recipe.mealType && dispatch(setFormMealType(recipe.mealType));
      recipe.steps.length > 0 && dispatch(setFormSteps(recipe.steps));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Title can not be empty");
      return;
    }

    const formData = new FormData();
    formData.append("image", image || "");

    const imagePath = image ? await postImage(formData) : "";

    const newRecipe = {
      steps,
      mealType,
      imagePath,
      ingredients,
      title: title.trim(),
      summary: summary.trim(),
    };

    window.onbeforeunload = null;
    Router.events.off("routeChangeStart", handleRouteChange);

    if (recipe) {
      dispatch(patchRecipe(recipeID, newRecipe));
    } else {
      dispatch(postRecipe(newRecipe));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      encType="multipart/form-data"
    >
      <button
        type="button"
        name="Cancel"
        onClick={() => router.back()}
        className={styles.form__cancel_button}
      >
        Cancel
      </button>
      <FormGrid recipe={recipe} />
      <SubmitButton recipe={recipe} recipeID={recipeID} />
    </form>
  );
};

export default RecipeForm;
