import {
  ADD_RECIPE,
  SET_RECIPES,
  UPDATE_RECIPE,
  REMOVE_RECIPE,
} from "@/store/reducers/recipes";
import { createAction } from "@/utils";
import { Dispatch, Recipe } from "@/types";
import { API, MY_ACCOUNT_ROUTE, RECIPES_ROUTE } from "@/constants";
import { getTokenCookie } from "@/lib";

interface Action {
  type: string;
}

export const addRecipe = (): Action => createAction(ADD_RECIPE, {});
export const setRecipes = (): Action => createAction(SET_RECIPES, {});
export const updateRecipe = (): Action => createAction(UPDATE_RECIPE, {});
export const removeRecipe = (): Action => createAction(REMOVE_RECIPE, {});

export const postRecipe =
  (
    recipe: Recipe,
    setLoading: {
      (loading: boolean): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = getTokenCookie();
      const { data } = await API.post("/api/recipes", { ...recipe, token });

      dispatch(addRecipe());

      setLoading(false);
      location.href = `${RECIPES_ROUTE}/${data._id}`;
    } catch {
      alert("Something went wrong");
    }
  };

export const patchRecipe =
  (
    id: string | undefined,
    recipe: Recipe,
    setLoading: {
      (loading: boolean): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = getTokenCookie();
      const { data } = await API.patch(`/api/recipes/${id}`, {
        ...recipe,
        token,
      });

      dispatch(updateRecipe());

      setLoading(false);
      location.href = `${RECIPES_ROUTE}/${data._id}`;
    } catch (err) {
      alert("Something went wrong");
    }
  };

export const deleteRecipe =
  (
    id: string | undefined,
    setLoading: {
      (loading: boolean): void;
    }
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setLoading(true);

      const token = getTokenCookie();
      await API.delete(`/api/recipes/${id}`, { data: { token } });

      dispatch(removeRecipe());

      setLoading(false);
      location.href = MY_ACCOUNT_ROUTE;
    } catch {
      alert("Something went wrong");
    }
  };
