import { useState, useRef, useMemo, FC, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

import { MY_ACCOUNT_ROUTE } from "@/constants";
import type { MealType, Recipe } from "@/types";
import { deleteRecipe, postRecipe, patchRecipe, postImage } from "@/lib";

import InputsList from "./InputsList";
import styles from "./RecipeForm.module.scss";
import { getImageURL } from "@/utils";

interface Props {
  recipe?: Recipe;
  recipeID?: string;
}

const RecipeForm: FC<Props> = ({ recipe, recipeID }) => {
  const [image, setImage] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<Array<string>>(
    recipe?.ingredients || []
  );
  const [title, setTitle] = useState(recipe?.title || "");
  const [summary, setSummary] = useState(recipe?.summary || "");
  const [steps, setSteps] = useState<Array<string>>(recipe?.steps || []);
  const [mealType, setMealType] = useState<MealType>(recipe?.mealType || "any");

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size > 1024 * 1024 * 5) {
        alert("File is too big!");
      } else {
        const file = e.target.files[0];
        setImage(file);
      }
    }
  };

  const clickFileInput = () =>
    fileInputRef.current && fileInputRef.current.click();

  const cancel = () => {
    if (confirm("Are you sure you want to cancel?")) {
      router.back();
    }
  };

  const handleDeleteRecipe = () => {
    if (confirm("Are you sure you want to delete recipe?")) {
      deleteRecipe(recipeID);
      setTimeout(() => router.push(MY_ACCOUNT_ROUTE), 1000);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Title cannot be empty");
    } else {
      const formData = new FormData();
      formData.append("image", image || "");

      const imagePath = image ? await postImage(formData) : "";

      const newRecipe = {
        steps,
        title,
        summary,
        mealType,
        imagePath,
        ingredients,
      };

      recipe ? patchRecipe(recipeID, newRecipe) : postRecipe(newRecipe);

      setTimeout(() => router.back(), 1000);
    }
  };

  const backgroundImageStyle = useMemo(() => {
    if (!image) {
      return recipe?.imagePath ? getImageURL(recipe.imagePath) : "";
    } else {
      return `url(${URL.createObjectURL(image)})`;
    }
  }, [image]);

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      encType="multipart/form-data"
    >
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
              name="select image"
              onClick={clickFileInput}
              className={styles.form__select_image_button}
            >
              Select Image
            </button>
          </div>
          <input
            type="file"
            name="image"
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
