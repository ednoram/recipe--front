import {
  ADD_RECIPE,
  SET_RECIPES,
  UPDATE_RECIPE,
  REMOVE_RECIPE,
} from "@/store/reducers/recipes";
import { createAction } from "@/utils";
import { Dispatch, Recipe } from "@/types";
import { API, MY_ACCOUNT_ROUTE, RECIPES_ROUTE } from "@/constants";

interface Action {
  type: string;
}

export const addRecipe = (): Action => createAction(ADD_RECIPE, {});
export const setRecipes = (): Action => createAction(SET_RECIPES, {});
export const updateRecipe = (): Action => createAction(UPDATE_RECIPE, {});
export const removeRecipe = (): Action => createAction(REMOVE_RECIPE, {});

export const postRecipe =
  (recipe: Recipe) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/api/recipes", { ...recipe, token });

      dispatch(addRecipe());
      location.href = `${RECIPES_ROUTE}/${data._id}`;
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

      dispatch(updateRecipe());

      location.href = `${RECIPES_ROUTE}/${data._id}`;
    } catch (err) {
      alert("Something went wrong");
    }
  };

export const deleteRecipe =
  (id: string | undefined) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/recipes/${id}`, {
        data: { token },
      });

      dispatch(removeRecipe());
      location.href = MY_ACCOUNT_ROUTE;
    } catch {
      alert("Something went wrong");
    }
  };
