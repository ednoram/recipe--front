import type { Recipe } from "@/types";

interface RecipeAction {
  type: string;
  payload: { recipes: Array<Recipe> };
}

export default RecipeAction;
