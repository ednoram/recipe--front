import { Recipe, RecipeAction } from "@/types";
import { SET_RECIPES } from "@/store/reducers/recipes";

export const setRecipes = (recipes: Recipe[]): RecipeAction => ({
  type: SET_RECIPES,
  payload: {
    recipes: recipes,
  },
});
