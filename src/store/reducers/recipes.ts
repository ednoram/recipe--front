import { Recipe } from "@/types";
import { blankRecipe } from "@/utils";

import { Action } from "@/store/actions/recipes";

export const ADD_RECIPE = "ADD_RECIPE";
export const SET_RECIPES = "SET_RECIPES";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";

interface State {
  recipes: Recipe[];
}

const recipesReducer = (
  state: State = { recipes: [] },
  { type, payload }: Action
): State => {
  const recipeIndex = state.recipes.indexOf(
    state.recipes.find((x) => x._id === payload.id) || blankRecipe
  );

  switch (type) {
    case SET_RECIPES:
      return payload.recipes ? { recipes: payload.recipes } : state;
    case ADD_RECIPE:
      return payload.recipe
        ? { recipes: [...state.recipes, payload.recipe] }
        : state;
    case REMOVE_RECIPE:
      return {
        recipes: [
          ...state.recipes.slice(0, recipeIndex),
          ...state.recipes.slice(recipeIndex + 1),
        ],
      };
    case UPDATE_RECIPE:
      return payload.recipe
        ? {
            recipes: [
              ...state.recipes.slice(0, recipeIndex),
              payload.recipe,
              ...state.recipes.slice(recipeIndex + 1),
            ],
          }
        : state;
    default:
      return state;
  }
};

export default recipesReducer;
