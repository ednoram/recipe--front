import { FC } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { Recipe } from "@/types";
import StarIcon from "@/assets/star-icon.svg";
import { getImageURL, toggleFavorite } from "@/utils";
import { RECIPES_ROUTE, USERS_ROUTE } from "@/constants";
import { selectFavoriteRecipes, selectUserData } from "@/store/selectors";

import styles from "./RecipeList.module.scss";

interface Props {
  recipe: Recipe;
}

const RecipeItem: FC<Props> = ({ recipe }) => {
  const user = useSelector(selectUserData);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  const dispatch = useDispatch();

  const getImageDivStyle = (imagePath?: string | null) =>
    imagePath
      ? {
          backgroundSize: "cover",
          backgroundImage: `url(${getImageURL(imagePath)})`,
        }
      : {};

  const getStarClassName = (id: string) =>
    favoriteRecipes?.includes(id)
      ? styles.list_item__star_icon_active
      : styles.list_item__star_icon;

  const renderFavoriteIcon = (id: string) =>
    user &&
    favoriteRecipes && (
      <StarIcon
        className={getStarClassName(id)}
        onClick={() => toggleFavorite(favoriteRecipes, id, dispatch)}
      />
    );

  const { _id, title, email, mealType, imagePath } = recipe;

  return (
    <div className={styles.list_item}>
      <div>
        <div
          style={getImageDivStyle(imagePath)}
          className={styles.list_item__image}
        >
          {_id && renderFavoriteIcon(_id)}
        </div>
        <p className={styles.list_item__recipe_title}>
          {title || "Recipe was not found"}
        </p>
        <p className={styles.list_item__meal_type}>{mealType}</p>
        <Link href={`${USERS_ROUTE}/${email}`}>
          <a className={styles.list_item__user_email}>{email}</a>
        </Link>
      </div>
      <div className="flex_right">
        <Link href={`${RECIPES_ROUTE}/${_id}`}>
          <a className={styles.list_item__link}>Open →</a>
        </Link>
      </div>
    </div>
  );
};

export default RecipeItem;
