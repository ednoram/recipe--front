import { useEffect, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite } from "@/utils";
import { RECIPES_ROUTE } from "@/constants";
import EditIcon from "@/assets/edit-icon.svg";
import StarIcon from "@/assets/star-icon.svg";
import { setComments } from "@/store/actions";
import { Recipe, RecipeComment } from "@/types";
import { useFetchFavoriteRecipes } from "@/hooks";
import { selectUserData, selectFavoriteRecipes } from "@/store/selectors";

import Grid from "./Grid";
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

  const getStarClassName = (id?: string) =>
    id && favoriteRecipes?.includes(id)
      ? styles.content__star_icon_active
      : styles.content__star_icon;

  const titleDiv = (
    <div
      className={user ? styles.content__title_grid : styles.content__title_div}
    >
      {user && (
        <StarIcon
          className={getStarClassName(recipe._id)}
          onClick={() =>
            recipe._id && toggleFavorite(favoriteRecipes, recipe._id, dispatch)
          }
        />
      )}
      <h1 className={styles.content__title}>{recipe.title}</h1>
    </div>
  );

  const topPart = (
    <div>
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
      {titleDiv}
    </div>
  );

  return (
    <main className={styles.content}>
      <section>
        <div className="container">
          {topPart}
          <Grid recipe={recipe} isOwnRecipe={isOwnRecipe} />
        </div>
      </section>
      <CommentsSection recipe={recipe} />
    </main>
  );
};

export default RecipePage;
