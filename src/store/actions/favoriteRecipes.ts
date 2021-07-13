import { API } from "@/constants";
import { Dispatch } from "@/types";
import { createAction } from "@/utils";
import {
  Action,
  ADD_FAVORITE_RECIPE,
  SET_FAVORITE_RECIPES,
  REMOVE_FAVORITE_RECIPE,
} from "@/store/reducers/favoriteRecipes";

export const setFavoriteRecipes = (recipeIds: string[]): Action =>
  createAction(SET_FAVORITE_RECIPES, { recipeIds });

const addFavRecipe = (recipeId: string) =>
  createAction(ADD_FAVORITE_RECIPE, { recipeId });

const removeFavRecipe = (recipeId: string) =>
  createAction(REMOVE_FAVORITE_RECIPE, { recipeId });

export const addFavoriteRecipe =
  (recipeId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(addFavRecipe(recipeId));
      await API.post("/api/favorite-recipes", {
        recipeId,
      });
    } catch {
      alert("Something went wrong");
    }
  };

export const removeFavoriteRecipe =
  (recipeId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(removeFavRecipe(recipeId));
      await API.delete(`/api/favorite-recipes/${recipeId}`);
    } catch {
      alert("Something went wrong");
    }
  };