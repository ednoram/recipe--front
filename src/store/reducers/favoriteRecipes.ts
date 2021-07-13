export const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE";
export const SET_FAVORITE_RECIPES = "SET_FAVORITE_RECIPES";
export const REMOVE_FAVORITE_RECIPE = "REMOVE_FAVORITE_RECIPE";

interface State {
  recipeIds: string[];
}

export interface Action {
  type: string;
  payload: {
    recipeId?: string;
    recipeIds?: string[];
  };
}

const favoriteRecipesReducer = (
  state: State = { recipeIds: [] },
  { type, payload }: Action
): State | null => {
  switch (type) {
    case SET_FAVORITE_RECIPES:
      return payload.recipeIds
        ? {
            recipeIds: payload.recipeIds,
          }
        : state;
    case ADD_FAVORITE_RECIPE:
      return payload.recipeId
        ? {
            recipeIds: [...state.recipeIds, payload.recipeId],
          }
        : state;
    case REMOVE_FAVORITE_RECIPE:
      return {
        recipeIds: state.recipeIds.filter((id) => id !== payload.recipeId),
      };
    default:
      return state;
  }
};

export default favoriteRecipesReducer;
