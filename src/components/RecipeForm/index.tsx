import { useState, useRef, useMemo, FC, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

import { getImageURL } from "@/utils";
import { MY_ACCOUNT_ROUTE } from "@/constants";
import type { MealType, Recipe } from "@/types";
import { postRecipe, patchRecipe, postImage } from "@/lib";

import InputsList from "./InputsList";
import SubmitButton from "./SubmitButton";
import styles from "./RecipeForm.module.scss";

interface Props {
  recipe?: Recipe;
  recipeID?: string;
}

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

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
      const file = e.target.files[0];

      if (file && !ACCEPTED_FILE_TYPES.includes(file.type)) {
        alert(
          `File type must be one of these: ${ACCEPTED_FILE_TYPES.join(", ")}.`
        );
        return;
      }

      if (file.size > 1024 * 1024 * 5) {
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
        mealType,
        imagePath,
        ingredients,
        title: title.trim(),
        summary: summary.trim(),
      };

      recipe ? patchRecipe(recipeID, newRecipe) : postRecipe(newRecipe);

      setTimeout(() => router.push(MY_ACCOUNT_ROUTE), 1000);
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
            className="hidden"
            ref={fileInputRef}
            onChange={uploadImage}
            accept={ACCEPTED_FILE_TYPES.join(", ")}
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
      <SubmitButton recipe={recipe} recipeID={recipeID} />
    </form>
  );
};

export default RecipeForm;
