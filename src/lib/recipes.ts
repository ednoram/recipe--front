import { Recipe } from "@/types";
import { API } from "@/constants";

export const getRecipes = async (): Promise<Recipe[]> =>
  await API.get("/api/recipes").then((res) => res.data);

export const getUserRecipes = async (email: string): Promise<Recipe[]> =>
  await API.get("api/recipes", { params: { email } }).then((res) => res.data);

export const getRecipeById = async (id: string): Promise<Recipe> =>
  await API.get(`/api/recipes/${id}`).then((res) => res.data);

export const postRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const token = localStorage.getItem("token");
  return await API.post("/api/recipes", { ...recipe, token }).then(
    (res) => res.data
  );
};

export const patchRecipe = async (
  id: string | undefined,
  recipe: Recipe
): Promise<Recipe> => {
  const token = localStorage.getItem("token");
  return await API.patch(`/api/recipes/${id}`, { ...recipe, token }).then(
    (res) => res.data
  );
};

export const deleteRecipe = async (id: string | undefined): Promise<Recipe> => {
  const token = localStorage.getItem("token");
  return await API.delete(`/api/recipes/${id}`, { data: { token } }).then(
    (res) => res.data
  );
};
