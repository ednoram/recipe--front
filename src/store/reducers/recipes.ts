import { Recipe } from "@/types";
import { blankRecipe } from "@/utils";

export const ADD_RECIPE = "ADD_RECIPE";
export const SET_RECIPES = "SET_RECIPES";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";

interface State {
  recipes: Recipe[];
}

interface Payload {
  id: string;
  recipe: Recipe;
  recipes: Recipe[];
}

const recipesReducer = (
  state: State = { recipes: [] },
  { type, payload }: { type: string; payload: Payload }
): State => {
  const recipeIndex = state.recipes.indexOf(
    state.recipes.find((x) => x._id === payload.id) || blankRecipe
  );

  switch (type) {
    case SET_RECIPES:
      return { recipes: payload.recipes };
    case ADD_RECIPE:
      return { recipes: [...state.recipes, payload.recipe] };
    case REMOVE_RECIPE:
      return {
        recipes: [
          ...state.recipes.slice(0, recipeIndex),
          ...state.recipes.slice(recipeIndex + 1),
        ],
      };
    case UPDATE_RECIPE:
      return {
        recipes: [
          ...state.recipes.slice(0, recipeIndex),
          payload.recipe,
          ...state.recipes.slice(recipeIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export default recipesReducer;
