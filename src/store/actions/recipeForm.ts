import { MealType } from "@/types";
import {
  Action,
  ADD_FORM_STEP,
  SET_FORM_IMAGE,
  SET_FORM_STEPS,
  SET_FORM_TITLE,
  SET_FORM_SUMMARY,
  REMOVE_FORM_STEP,
  CLEAR_RECIPE_FORM,
  SET_FORM_MEAL_TYPE,
  ADD_FORM_INGREDIENT,
  SET_FORM_INGREDIENTS,
  REMOVE_FORM_INGREDIENT,
} from "@/store/reducers/recipeForm";
import { createAction } from "@/utils";

export const clearRecipeForm = (): Action =>
  createAction(CLEAR_RECIPE_FORM, {});

export const addFormStep = (step: string): Action =>
  createAction(ADD_FORM_STEP, { step });

export const setFormImage = (image: File): Action =>
  createAction(SET_FORM_IMAGE, { image });

export const setFormTitle = (title: string): Action =>
  createAction(SET_FORM_TITLE, { title });

export const removeFormStep = (index: number): Action =>
  createAction(REMOVE_FORM_STEP, { index });

export const setFormSteps = (steps: string[]): Action =>
  createAction(SET_FORM_STEPS, { steps });

export const setFormSummary = (summary: string): Action =>
  createAction(SET_FORM_SUMMARY, { summary });

export const setFormIngredients = (ingredients: string[]): Action =>
  createAction(SET_FORM_INGREDIENTS, { ingredients });

export const setFormMealType = (mealType: MealType): Action =>
  createAction(SET_FORM_MEAL_TYPE, { mealType });

export const removeFormIngredient = (index: number): Action =>
  createAction(REMOVE_FORM_INGREDIENT, { index });

export const addFormIngredient = (ingredient: string): Action =>
  createAction(ADD_FORM_INGREDIENT, { ingredient });
