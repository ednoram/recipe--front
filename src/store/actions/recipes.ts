import {
  ADD_RECIPE,
  SET_RECIPES,
  UPDATE_RECIPE,
  REMOVE_RECIPE,
} from "@/store/reducers/recipes";
import { Dispatch, Recipe } from "@/types";
import { API, MY_ACCOUNT_ROUTE, RECIPE_ROUTE } from "@/constants";

interface Action {
  type: string;
  payload: {
    id?: string;
    recipe?: Recipe;
    recipes?: Recipe[];
  };
}

export const setRecipes = (recipes: Recipe[]): Action => ({
  type: SET_RECIPES,
  payload: { recipes },
});

export const addRecipe = (recipe: Recipe): Action => ({
  type: ADD_RECIPE,
  payload: { recipe },
});

export const updateRecipe = (recipe: Recipe): Action => ({
  type: UPDATE_RECIPE,
  payload: { recipe },
});

export const removeRecipe = (id: string): Action => ({
  type: REMOVE_RECIPE,
  payload: { id },
});

export const postRecipe =
  (recipe: Recipe) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/api/recipes", { ...recipe, token });

      dispatch(addRecipe(data));
      location.href = `${RECIPE_ROUTE}/${data._id}`;
    } catch {
      alert("Something went wrong");
    }
  };

export const patchRecipe =
  (id: string | undefined, recipe: Recipe) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.patch(`/api/recipes/${id}`, {
        ...recipe,
        token,
      });

      dispatch(updateRecipe(data));
      location.href = `${RECIPE_ROUTE}/${data._id}`;
    } catch (err) {
      alert("Something went wrong");
    }
  };

export const deleteRecipe =
  (id: string | undefined) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.delete(`/api/recipes/${id}`, {
        data: { token },
      });

      dispatch(removeRecipe(data._id));
      location.href = MY_ACCOUNT_ROUTE;
    } catch {
      alert("Something went wrong");
    }
  };
