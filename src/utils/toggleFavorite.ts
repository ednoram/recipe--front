import { Dispatch } from "@/types";
import { addFavoriteRecipe, removeFavoriteRecipe } from "@/store/actions";

const toggleFavorite = (
  favoriteRecipes: string[],
  id: string,
  dispatch: Dispatch
): void => {
  if (favoriteRecipes.includes(id)) {
    dispatch(removeFavoriteRecipe(id));
  } else {
    dispatch(addFavoriteRecipe(id));
  }
};

export default toggleFavorite;
