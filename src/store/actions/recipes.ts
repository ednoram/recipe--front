import { API } from "@/constants";
import { Recipe, RecipeAction } from "@/types";
import { SET_RECIPES } from "@/store/reducers/recipes";

export const setRecipes = (recipes: Recipe[]): RecipeAction => ({
  type: SET_RECIPES,
  payload: {
    recipes: recipes,
  },
});

export const postRecipe = async (
  recipe: Recipe
): Promise<Recipe | undefined> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.post("/api/recipes", { ...recipe, token });
    return data;
  } catch (err) {
    alert("Something went wrong");
  }
};

export const patchRecipe = async (
  id: string | undefined,
  recipe: Recipe
): Promise<Recipe | undefined> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.patch(`/api/recipes/${id}`, {
      ...recipe,
      token,
    });
    return data;
  } catch (err) {
    alert("Something went wrong");
  }
};

export const deleteRecipe = async (
  id: string | undefined
): Promise<Recipe | undefined> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.delete(`/api/recipes/${id}`, {
      data: { token },
    });
    return data;
  } catch (err) {
    alert("Something went wrong");
  }
};
