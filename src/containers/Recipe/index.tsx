import { useMemo, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "public/edit-icon.svg";
import StarIcon from "public/star-icon.svg";

import { Recipe } from "@/types";
import { selectUserData } from "@/store/selectors";
import { DISCOVER_RECIPES_ROUTE } from "@/constants";
import { getImageURL, toggleFavorite } from "@/utils";

import ItemsDiv from "./ItemsDiv";
import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
}

const RecipePage: FC<Props> = ({ recipe }) => {
  const user = useSelector(selectUserData);
  const router = useRouter();
  const dispatch = useDispatch();

  const isOwnRecipe = recipe.email === user?.email;

  const imageDivStyle = useMemo(
    () =>
      recipe.imagePath
        ? {
            backgroundSize: "cover",
            backgroundImage: getImageURL(recipe.imagePath),
          }
        : {},
    [recipe.imagePath]
  );

  const dateString =
    typeof recipe.date === "string"
      ? new Date(recipe.date).toLocaleDateString("en", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })
      : "unknown";

  const getStarClassName = (id?: string) =>
    id && user?.favoriteRecipes?.includes(id)
      ? styles.content__star_icon_active
      : styles.content__star_icon;

  const grid = (
    <div className={styles.content__grid}>
      <div>
        <p>
          By:{" "}
          <Link href={`/user/${recipe.email}`}>
            <a className="color-primary">{recipe.email}</a>
          </Link>
          {isOwnRecipe && " (you)"}
        </p>
        <p className={styles.content__date}>
          Creation Date: <span className="color-primary">{dateString}</span>
        </p>
        <p className={styles.content__meal_type}>
          Meal type:
          <span className="color-primary"> {recipe.mealType}</span>
        </p>
        <div style={imageDivStyle} className={styles.content__image} />
      </div>
      <div>
        <div>
          <h3 className={styles.content__heading}>Summary</h3>
          <p>{recipe.summary || "No Summary"}</p>
        </div>
        <ItemsDiv type="ingredients" recipe={recipe} />
        <ItemsDiv type="steps" recipe={recipe} />
      </div>
    </div>
  );

  return (
    <section>
      <div className={styles.content}>
        <div className="container">
          <div>
            <Link href={DISCOVER_RECIPES_ROUTE}>
              <a className="color-primary">← Discover Recipes</a>
            </Link>
          </div>
          {isOwnRecipe && (
            <Link href={`${router.asPath}/edit`}>
              <a className={styles.content__edit_link}>
                <EditIcon className={styles.content__edit_icon} />
                Edit
              </a>
            </Link>
          )}
          <div className={styles.content__star_and_title}>
            {user && (
              <StarIcon
                className={getStarClassName(recipe._id)}
                onClick={() =>
                  recipe._id && toggleFavorite(user, recipe._id, dispatch)
                }
              />
            )}
            <h1 className={styles.content__title}>{recipe.title}</h1>
          </div>
          {grid}
        </div>
      </div>
    </section>
  );
};

export default RecipePage;
