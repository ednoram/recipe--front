import { Recipe } from "@/types";
import { API } from "@/constants";

export const getRecipes = async (): Promise<Array<Recipe>> =>
  await API.get("/api/recipes").then((res) => res.data);

export const getUserRecipes = async (email: string): Promise<Array<Recipe>> =>
  await API.get("api/recipes", { params: { email } }).then((res) => res.data);

export const getRecipeById = async (id: string): Promise<Recipe> =>
  await API.get(`/api/recipes/${id}`).then((res) => res.data);

export const postRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const token = localStorage.getItem("token");
  return await API.post("/api/recipes", { ...recipe, token }).then(
    (res) => res.data
  );
};

export const patchRecipe = (id: string | undefined, recipe: Recipe): void => {
  const token = localStorage.getItem("token");
  API.patch(`/api/recipes/${id}`, { ...recipe, token });
};

export const deleteRecipe = (id: string | undefined): void => {
  const token = localStorage.getItem("token");
  API.delete(`/api/recipes/${id}`, { data: { token } });
};
