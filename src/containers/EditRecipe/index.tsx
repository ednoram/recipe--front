import { FC } from "react";

import { Recipe } from "@/types";
import { RecipeForm } from "@/components";

import styles from "./EditRecipe.module.scss";

interface Props {
  recipe: Recipe;
  recipeID: string;
}

const EditRecipeContainer: FC<Props> = ({ recipe, recipeID }) => {
  return (
    <main>
      <section>
        <div className={`${styles.content} container`}>
          <h1 className={styles.content__title}>Edit Recipe</h1>
          <RecipeForm recipe={recipe} recipeID={recipeID} />
        </div>
      </section>
    </main>
  );
};

export default EditRecipeContainer;
