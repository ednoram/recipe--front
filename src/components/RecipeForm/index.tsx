import { useState, FC, FormEvent } from "react";
import { Router, useRouter } from "next/router";

import { MealTypeType, Recipe } from "@/types";
import { handleRouteChange } from "@/utils";
import { postRecipe, patchRecipe, postImage } from "@/store/actions";

import FormGrid from "./FormGrid";
import SubmitButton from "./SubmitButton";
import styles from "./RecipeForm.module.scss";

interface Props {
  recipe?: Recipe;
  recipeID?: string;
}

const RecipeForm: FC<Props> = ({ recipe, recipeID }) => {
  const [image, setImage] = useState<File | null>(null);
  const [mealType, setMealType] = useState<MealTypeType>(
    recipe?.mealType || "any"
  );
  const [ingredients, setIngredients] = useState<string[]>(
    recipe?.ingredients || []
  );
  const [title, setTitle] = useState(recipe?.title || "");
  const [summary, setSummary] = useState(recipe?.summary || "");
  const [steps, setSteps] = useState<string[]>(recipe?.steps || []);

  const router = useRouter();

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

    if (recipe) {
      await patchRecipe(recipeID, newRecipe);
      router.push(`/recipe/${recipeID}`);
    } else {
      const { _id } = await postRecipe(newRecipe);
      router.push(`/recipe/${_id}`);
    }

    Router.events.off("routeChangeStart", handleRouteChange);
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
      <FormGrid
        recipe={recipe}
        stepsState={[steps, setSteps]}
        titleState={[title, setTitle]}
        imageState={[image, setImage]}
        summaryState={[summary, setSummary]}
        mealTypeState={[mealType, setMealType]}
        ingredientsState={[ingredients, setIngredients]}
      />
      <SubmitButton recipe={recipe} recipeID={recipeID} />
    </form>
  );
};

export default RecipeForm;
