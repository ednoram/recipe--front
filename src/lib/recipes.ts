import axios from "axios";

import { Recipe } from "@/types";
import { API_URL } from "@/constants";

export const getRecipes = async (): Promise<[Recipe]> =>
  await axios.get(`${API_URL}/api/recipes`).then((res) => {
    return res.data;
  });

export const getRecipeById = async (id: string): Promise<Recipe> =>
  await axios.get(`${API_URL}/api/recipes/${id}`).then((res) => {
    return res.data;
  });

export const postRecipe = (recipe: Recipe): void => {
  axios.post(`${API_URL}/api/recipes`, recipe);
};

export const putRecipe = (id: string | undefined, recipe: Recipe): void => {
  const token = localStorage.getItem("token");
  axios.put(`${API_URL}/api/recipes/${id}`, { ...recipe, token });
};

export const deleteRecipe = (id: string | undefined): void => {
  const token = localStorage.getItem("token");
  axios.delete(`${API_URL}/api/recipes/${id}`, { data: { token } });
};
