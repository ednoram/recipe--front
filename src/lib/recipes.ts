import { Recipe } from "@/types";
import { API } from "@/constants";

export const getRecipes = async (): Promise<Recipe[]> =>
  await API.get("/api/recipes").then((res) => res.data);

export const getUserRecipes = async (email: string): Promise<Recipe[]> =>
  await API.get("api/recipes", { params: { email } }).then((res) => res.data);

export const getRecipeById = async (id: string): Promise<Recipe> =>
  await API.get(`/api/recipes/${id}`).then((res) => res.data);
