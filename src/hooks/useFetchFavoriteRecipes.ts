import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavoriteRecipes } from "@/lib";
import { selectUserData } from "@/store/selectors";
import { setFavoriteRecipes } from "@/store/actions";

const useFetchFavoriteRecipes = (): void => {
  const user = useSelector(selectUserData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const fetchFavoriteRecipes = async () => {
        const favoriteRecipes = await getFavoriteRecipes();
        dispatch(setFavoriteRecipes(favoriteRecipes));
      };

      fetchFavoriteRecipes();
    }
  }, [user]);
};

export default useFetchFavoriteRecipes;
