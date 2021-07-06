import { Recipe } from "@/types";
import { API } from "@/constants";
import { blankRecipe } from "@/utils";
import { SET_RECIPES } from "@/store/reducers/recipes";

interface SetRecipes {
  type: string;
  payload: { recipes: Recipe[] };
}

export const setRecipes = (recipes: Recipe[]): SetRecipes => ({
  type: SET_RECIPES,
  payload: {
    recipes: recipes,
  },
});

export const postRecipe = async (recipe: Recipe): Promise<Recipe> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.post("/api/recipes", { ...recipe, token });
    return data;
  } catch {
    alert("Something went wrong");
    return blankRecipe;
  }
};

export const patchRecipe = async (
  id: string | undefined,
  recipe: Recipe
): Promise<Recipe> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.patch(`/api/recipes/${id}`, {
      ...recipe,
      token,
    });
    return data;
  } catch (err) {
    alert("Something went wrong");
    return blankRecipe;
  }
};

export const deleteRecipe = async (id: string | undefined): Promise<Recipe> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.delete(`/api/recipes/${id}`, {
      data: { token },
    });
    return data;
  } catch {
    alert("Something went wrong");
    return blankRecipe;
  }
};
