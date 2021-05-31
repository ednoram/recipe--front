import { useState, useRef, FC, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { MY_ACCOUNT_ROUTE } from "@/constants";
import type { MealType, Recipe } from "@/types";
import { selectUserData } from "@/store/selectors";
import { deleteRecipe, postRecipe, putRecipe } from "@/lib";

import InputsList from "./InputsList";
import styles from "./RecipeForm.module.scss";

interface Props {
  recipe?: Recipe;
  recipeID?: string;
}

const RecipeForm: FC<Props> = ({ recipe, recipeID }) => {
  const [imageURL, setImageURL] = useState<string>();
  const [ingredients, setIngredients] = useState<Array<string>>(
    recipe?.ingredients || []
  );
  const [summary, setSummary] = useState(recipe?.summary || "");
  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [steps, setSteps] = useState<Array<string>>(recipe?.steps || []);
  const [mealType, setMealType] = useState<MealType>(recipe?.mealType || "any");

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userData = useSelector(selectUserData);

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const image = URL.createObjectURL(file);
      setImageURL(image);
    }
  };

  const chooseFile = () => fileInputRef.current && fileInputRef.current.click();

  const cancel = () => {
    if (confirm("Are you sure you want to cancel?")) {
      router.back();
    }
  };

  const handleDeleteRecipe = () => {
    if (confirm("Are you sure you want to delete recipe?")) {
      deleteRecipe(recipeID);
      setTimeout(() => {
        router.push(MY_ACCOUNT_ROUTE);
      }, 1000);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Title cannot be empty");
    } else {
      const newRecipe = {
        steps,
        title,
        summary,
        mealType,
        ingredients,
        userEmail: userData.email,
      };

      recipe ? putRecipe(recipeID, newRecipe) : postRecipe(newRecipe);

      setTimeout(() => {
        router.back();
      }, 1000);
    }
  };

  const backgroundImageStyle = imageURL ? `URL(${imageURL})` : "";

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button
        type="button"
        name="cancel"
        onClick={cancel}
        className={styles.form__cancel_button}
      >
        Cancel
      </button>
      <div className={styles.form__grid}>
        <div>
          <div
            className={styles.form__image_div}
            style={{ backgroundImage: backgroundImageStyle }}
          />
          <div className="flex_center">
            <button
              type="button"
              name="choose file"
              onClick={chooseFile}
              className={styles.form__choose_image_button}
            >
              Choose Image
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={uploadImage}
          />
        </div>
        <div>
          <InputsList
            stepsState={[steps, setSteps]}
            titleState={[title, setTitle]}
            summaryState={[summary, setSummary]}
            mealTypeState={[mealType, setMealType]}
            ingredientsState={[ingredients, setIngredients]}
          />
        </div>
      </div>
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
    </form>
  );
};

export default RecipeForm;
