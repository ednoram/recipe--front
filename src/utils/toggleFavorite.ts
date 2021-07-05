import { Dispatch, UserData } from "@/types";
import { addFavoriteRecipe, removeFavoriteRecipe } from "@/store/actions";

const toggleFavorite = (user: UserData, id: string, dispatch: Dispatch): void =>
  user?.favoriteRecipes?.includes(id)
    ? dispatch(removeFavoriteRecipe(id))
    : dispatch(addFavoriteRecipe(id));

export default toggleFavorite;
