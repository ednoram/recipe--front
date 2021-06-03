import { Recipe } from "@/types";
import { API } from "@/constants";

export const getRecipes = async (): Promise<[Recipe]> =>
  await API.get("/api/recipes").then((res) => {
    return res.data;
  });

export const getRecipeById = async (id: string): Promise<Recipe> =>
  await API.get(`/api/recipes/${id}`).then((res) => {
    return res.data;
  });

export const postRecipe = (recipe: Recipe): void => {
  API.post("/api/recipes", {
    token: localStorage.getItem("token"),
    ...recipe,
  });
};

export const putRecipe = (id: string | undefined, recipe: Recipe): void => {
  const token = localStorage.getItem("token");
  API.put(`/api/recipes/${id}`, { ...recipe, token });
};

export const deleteRecipe = (id: string | undefined): void => {
  const token = localStorage.getItem("token");
  API.delete(`/api/recipes/${id}`, { data: { token } });
};
