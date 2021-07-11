import { FC } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import StarIcon from "public/star-icon.svg";

import { Recipe } from "@/types";
import { selectUserData } from "@/store/selectors";
import { RECIPES_ROUTE, USERS_ROUTE } from "@/constants";
import { getImageURL, sortRecipes, toggleFavorite } from "@/utils";

import styles from "./RecipeList.module.scss";

interface Props {
  recipes: Recipe[];
}

const RecipeList: FC<Props> = ({ recipes }) => {
  const user = useSelector(selectUserData);

  const dispatch = useDispatch();

  const sortedRecipes = sortRecipes(recipes);

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
        <li key={_id}>
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
              <h4 className={styles.list_item__recipe_title}>
                {title || "Recipe was not found"}
              </h4>
              <p className={styles.list_item__meal_type}>{mealType}</p>
              <Link href={`${USERS_ROUTE}/${email}`}>
                <a className={styles.list_item__user_email}>{email}</a>
              </Link>
            </div>
            {email && (
              <div className="flex_right">
                <Link href={`${RECIPES_ROUTE}/${_id}`}>
                  <a className={styles.list_item__link}>Open →</a>
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
