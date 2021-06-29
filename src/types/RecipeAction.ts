import { Recipe } from "@/types";

interface RecipeAction {
  type: string;
  payload: { recipes: Recipe[] };
}

export default RecipeAction;
