import { useMemo, FC, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "public/edit-icon.svg";
import StarIcon from "public/star-icon.svg";

import { RECIPES_ROUTE } from "@/constants";
import { setComments } from "@/store/actions";
import { Recipe, RecipeComment } from "@/types";
import { useFetchFavoriteRecipes } from "@/hooks";
import { getImageURL, toggleFavorite } from "@/utils";
import { selectFavoriteRecipes, selectUserData } from "@/store/selectors";

import ItemsDiv from "./ItemsDiv";
import styles from "./Recipe.module.scss";
import CommentsSection from "./CommentsSection";

interface Props {
  recipe: Recipe;
  recipeComments: RecipeComment[];
}

const RecipePage: FC<Props> = ({ recipe, recipeComments }) => {
  const user = useSelector(selectUserData);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  const router = useRouter();
  const dispatch = useDispatch();

  useFetchFavoriteRecipes();

  useEffect(() => {
    dispatch(setComments(recipeComments));
  }, []);

  const isOwnRecipe = recipe.email === user?.email;

  const getDateString = (date: Date) =>
    new Date(date).toLocaleDateString("en", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });

  const imageDivStyle = useMemo(
    () =>
      recipe.imagePath
        ? {
            backgroundSize: "cover",
            backgroundImage: `url(${getImageURL(recipe.imagePath)})`,
          }
        : {},
    [recipe.imagePath]
  );

  const createdAtString = recipe.createdAt
    ? getDateString(recipe.createdAt)
    : "unknown";

  const updatedAtString = recipe.updatedAt
    ? getDateString(recipe.updatedAt)
    : "unknown";

  const getStarClassName = (id?: string) =>
    id && favoriteRecipes?.includes(id)
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
        <p className={styles.content__date_p}>
          Created At: <span className="color-primary">{createdAtString}</span>
        </p>
        <p className={styles.content__date_p}>
          Updated At: <span className="color-primary">{updatedAtString}</span>
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
    <main className={styles.content}>
      <section>
        <div className="container">
          <div>
            <Link href={RECIPES_ROUTE}>
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
          <div
            className={
              user ? styles.content__title_grid : styles.content__title_div
            }
          >
            {user && (
              <StarIcon
                className={getStarClassName(recipe._id)}
                onClick={() =>
                  recipe._id &&
                  toggleFavorite(favoriteRecipes, recipe._id, dispatch)
                }
              />
            )}
            <h1 className={styles.content__title}>{recipe.title}</h1>
          </div>
          {grid}
        </div>
      </section>
      <CommentsSection recipe={recipe} />
    </main>
  );
};

export default RecipePage;
