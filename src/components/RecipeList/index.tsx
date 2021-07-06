import { FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import StarIcon from "public/star-icon.svg";

import { Recipe } from "@/types";
import { selectUserData } from "@/store/selectors";
import { RECIPE_ROUTE, USER_ROUTE } from "@/constants";
import { createEmptyRecipe, getImageURL, toggleFavorite } from "@/utils";

import styles from "./RecipeList.module.scss";

interface Props {
  recipes: Recipe[];
  favorites?: boolean;
}

const RecipeList: FC<Props> = ({ recipes, favorites }) => {
  const user = useSelector(selectUserData);

  const dispatch = useDispatch();

  const filteredRecipes =
    favorites && user?.favoriteRecipes
      ? user.favoriteRecipes.map(
          (id) => recipes.find(({ _id }) => _id === id) || createEmptyRecipe(id)
        )
      : recipes;

  const sortedRecipes =
    filteredRecipes &&
    filteredRecipes.sort((a, b) =>
      a.updatedAt && b.updatedAt
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : -1
    );

  const getImageDivStyle = (imagePath?: string | null) =>
    imagePath
      ? {
          backgroundSize: "cover",
          backgroundImage: getImageURL(imagePath),
        }
      : {};

  const getStarClassName = (id?: string) =>
    id && user?.favoriteRecipes?.includes(id)
      ? styles.list_item__star_icon_active
      : styles.list_item__star_icon;

  return !sortedRecipes || sortedRecipes.length < 1 ? (
    <p className={styles.nothing_was_found}>Nothing was found</p>
  ) : (
    <ul className={styles.list}>
      {sortedRecipes.map(({ _id, title, mealType, email, imagePath }) => (
        <li key={nanoid()}>
          <div className={styles.list_item}>
            <div>
              <div
                className={styles.list_item__image}
                style={getImageDivStyle(imagePath)}
              >
                {user && (
                  <StarIcon
                    className={getStarClassName(_id)}
                    onClick={() => _id && toggleFavorite(user, _id, dispatch)}
                  />
                )}
              </div>
              <h4 className={styles.list_item__title}>
                {title || "Recipe was not found"}
              </h4>
              <p className={styles.list_item__meal_type}>{mealType}</p>
              <Link href={`${USER_ROUTE}/${email}`}>
                <a className={styles.list_item__user_email}>{email}</a>
              </Link>
            </div>
            {email && (
              <div className="flex_right">
                <Link href={`${RECIPE_ROUTE}/${_id}`}>
                  <a className={styles.list_item__link}>Open→</a>
                </Link>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
