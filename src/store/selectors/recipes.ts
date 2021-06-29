import { Recipe, State } from "@/types";

export const selectRecipes = (state: State): Recipe[] => state.recipes.recipes;
