import { Recipe } from "@/types";

export const ADD_RECIPE = "ADD_RECIPE";
export const SET_RECIPES = "SET_RECIPES";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";

interface State {
  recipes: Recipe[];
}

const recipesReducer = (
  state: State = { recipes: [] },
  { type }: { type: string }
): State => {
  switch (type) {
    default:
      return state;
  }
};

export default recipesReducer;
