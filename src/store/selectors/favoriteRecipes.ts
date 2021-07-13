import { State } from "@/types";

export const selectFavoriteRecipes = (state: State): string[] =>
  state.favoriteRecipes.recipeIds;
