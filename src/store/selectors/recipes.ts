import { Recipe, State } from "@/types";

export const selectRecipes = (state: State): Array<Recipe> =>
  state.recipes.recipes;
