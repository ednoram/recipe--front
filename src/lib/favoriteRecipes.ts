import { API } from "@/constants";
import { getTokenCookie } from "@/lib";

export const getFavoriteRecipes = async (): Promise<string[]> => {
  try {
    const token = getTokenCookie();
    const { data } = await API.get(`api/favorite-recipes?token=${token}`);

    const favoriteRecipes = data.map(
      ({ recipeId }: { recipeId: string }) => recipeId
    );

    return favoriteRecipes;
  } catch (err) {
    alert("Something went wrong. Could not fetch favorite recipes.");
    return [];
  }
};
