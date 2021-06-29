import { FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import StarIcon from "public/star-icon.svg";

import { Recipe } from "@/types";
import { getImageURL } from "@/utils";
import { selectUserData } from "@/store/selectors";
import { addFavoriteRecipe, removeFavoriteRecipe } from "@/store/actions";

import styles from "./RecipeList.module.scss";

interface Props {
  recipes: Recipe[];
  favorites?: boolean;
}

const RecipeList: FC<Props> = ({ recipes, favorites }) => {
  const user = useSelector(selectUserData);

  const dispatch = useDispatch();

  const filteredRecipes = favorites
    ? recipes.filter(({ _id }) => _id && user?.favoriteRecipes?.includes(_id))
    : recipes;

  const sortedRecipes =
    filteredRecipes &&
    filteredRecipes.sort((a, b) =>
      a.date && b.date
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : -1
    );

  const toggleFavorite = (id: string) =>
    user?.favoriteRecipes?.includes(id)
      ? dispatch(removeFavoriteRecipe(id))
      : dispatch(addFavoriteRecipe(id));

  return !sortedRecipes || sortedRecipes.length === 0 ? (
    <p className={styles.nothing_was_found}>Nothing was found</p>
  ) : (
    <ul className={styles.list}>
      {sortedRecipes.map(({ _id, title, mealType, email, imagePath }) => (
        <li key={nanoid()}>
          <div className={styles.list_item}>
            <div>
              <div
                className={styles.list_item__image}
                style={
                  imagePath
                    ? {
                        backgroundSize: "cover",
                        backgroundImage: getImageURL(imagePath),
                      }
                    : {}
                }
              >
                {user && (
                  <div onClick={() => _id && toggleFavorite(_id)}>
                    <StarIcon
                      className={
                        _id && user?.favoriteRecipes?.includes(_id)
                          ? styles.list_item__star_icon_active
                          : styles.list_item__star_icon
                      }
                    />
                  </div>
                )}
              </div>
              <h4 className={styles.list_item__title}>{title}</h4>
              <p className={styles.list_item__meal_type}>{mealType}</p>
              <Link href={`/user/${email}`}>
                <a className={styles.list_item__user_email}>{email}</a>
              </Link>
            </div>
            <div className="flex_right">
              <Link href={`/recipe/${_id}`}>
                <a className={styles.list_item__link}>Open→</a>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
