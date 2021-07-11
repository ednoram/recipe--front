export const SEND_EMAIL = "SEND_EMAIL";
export const SET_USER_DATA = "SET_USER_DATA";
export const REGISTER_USER = "REGISTER_USER";
export const ADD_FAVORITE_RECIPE = "ADD_FAVORITE_RECIPE";
export const REMOVE_FAVORITE_RECIPE = "REMOVE_FAVORITE_RECIPE";

interface State {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  favoriteRecipes?: string[];
}

interface Action {
  type: string;
  payload: {
    data: State | null;
    recipeId: string;
  };
}

const userReducer = (
  state: State | null = null,
  { type, payload }: Action
): State | null => {
  switch (type) {
    case SET_USER_DATA:
      return payload.data;
    case ADD_FAVORITE_RECIPE:
      return state?.favoriteRecipes
        ? {
            ...state,
            favoriteRecipes: [
              ...state.favoriteRecipes,
              String(payload.recipeId),
            ],
          }
        : state;
    case REMOVE_FAVORITE_RECIPE:
      return state?.favoriteRecipes
        ? {
            ...state,
            favoriteRecipes: [
              ...state.favoriteRecipes.filter((x) => x !== payload.recipeId),
            ],
          }
        : state;
    default:
      return state;
  }
};

export default userReducer;
