import { API } from "@/constants";
import { Recipe, RecipeComment } from "@/types";

export const getRecipes = async (): Promise<Recipe[]> => {
  const { data } = await API.get("/api/recipes");
  return data;
};

export const getUserRecipes = async (email: string): Promise<Recipe[]> => {
  const { data } = await API.get("api/recipes", { params: { email } });
  return data;
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const { data } = await API.get(`/api/recipes/${id}`);
  return data;
};

export const getRecipeComments = async (
  id: string
): Promise<RecipeComment[]> => {
  const { data } = await API.get(`api/comments?${id}`);
  return data;
};
