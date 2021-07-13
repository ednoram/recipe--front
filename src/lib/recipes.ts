import { Recipe } from "@/types";
import { API } from "@/constants";

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
