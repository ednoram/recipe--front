import { FC } from "react";

import { Recipe } from "@/types";
import { RecipeForm } from "@/components";

import styles from "./EditRecipe.module.scss";

interface Props {
  recipe: Recipe;
  recipeId: string;
}

const EditRecipeContainer: FC<Props> = ({ recipe, recipeId }) => {
  return (
    <main>
      <section>
        <div className="container">
          <div className={styles.content}>
            <h1 className={styles.content__title}>Edit Recipe</h1>
            <RecipeForm recipe={recipe} recipeId={recipeId} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditRecipeContainer;
