import { Dispatch, UserData } from "@/types";
import { addFavoriteRecipe, removeFavoriteRecipe } from "@/store/actions";

const toggleFavorite = (
  user: UserData,
  id: string,
  dispatch: Dispatch
): void => {
  if (user?.favoriteRecipes?.includes(id)) {
    dispatch(removeFavoriteRecipe(id));
  } else {
    dispatch(addFavoriteRecipe(id));
  }
};

export default toggleFavorite;
