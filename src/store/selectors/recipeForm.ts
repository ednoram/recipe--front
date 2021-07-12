import { MealType, State } from "@/types";

export const selectFormSummary = (state: State): string =>
  state.recipeForm.summary;

export const selectFormSteps = (state: State): string[] =>
  state.recipeForm.steps;

export const selectFormMealType = (state: State): MealType =>
  state.recipeForm.mealType;

export const selectFormImage = (state: State): File | null =>
  state.recipeForm.image;

export const selectFormIngredients = (state: State): string[] =>
  state.recipeForm.ingredients;

export const selectFormTitle = (state: State): string => state.recipeForm.title;
