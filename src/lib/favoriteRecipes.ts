import { API } from "@/constants";

export const getFavoriteRecipes = async (): Promise<string[]> => {
  try {
    const { data } = await API.get("api/favorite-recipes");

    const favoriteRecipes = data.map(
      ({ recipeId }: { recipeId: string }) => recipeId
    );

    return favoriteRecipes;
  } catch (err) {
    alert("Something went wrong. Could not fetch favorite recipes.");
    return [];
  }
};
