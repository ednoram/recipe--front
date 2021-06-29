import { Recipe } from "@/types";

export const SET_RECIPES = "SET_RECIPES";

interface State {
  recipes: Recipe[];
}

interface Payload {
  recipes: Recipe[];
}

const recipesReducer = (
  state: State = { recipes: [] },
  { type, payload }: { type: string; payload: Payload }
): State => {
  switch (type) {
    case SET_RECIPES:
      return { recipes: payload.recipes };
    default:
      return state;
  }
};

export default recipesReducer;
