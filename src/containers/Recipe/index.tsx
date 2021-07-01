import { useMemo, FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Recipe } from "@/types";
import { getImageURL } from "@/utils";
import { selectUserData } from "@/store/selectors";

import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
}

const RecipePage: FC<Props> = ({ recipe }) => {
  const userData = useSelector(selectUserData);
  const router = useRouter();

  const isOwnRecipe = recipe.email === userData?.email;

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

  const ingredientsDiv = (
    <div className={styles.content__ingredients}>
      <h3 className={styles.content__heading}>Ingredients</h3>
      {recipe.ingredients.length > 0 ? (
        <ul className={styles.content__steps_list}>
          {recipe.ingredients.map((ingredient) => (
            <li key={nanoid()}>
              <p className="capitalize_first_letter">{ingredient}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Ingredients</p>
      )}
    </div>
  );

  const stepsDiv = (
    <div className={styles.content__preparation}>
      <h3 className={styles.content__heading}>Preparation</h3>
      {recipe.steps.length > 0 ? (
        <ul className={styles.content__steps_list}>
          {recipe.steps.map((step, index) => (
            <li key={nanoid()}>
              <h5 className={styles.content__step_heading}>Step {index + 1}</h5>
              <p>{step[0].toUpperCase() + step.slice(1)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Steps</p>
      )}
    </div>
  );

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
        {ingredientsDiv}
        {stepsDiv}
      </div>
    </div>
  );

  return (
    <section>
      <div className={`${styles.content} container`}>
        <div>
          <Link href="/">
            <a className="color-primary">← Home</a>
          </Link>
        </div>
        {isOwnRecipe && (
          <Link href={`${router.asPath}/edit`}>
            <a className={styles.content__edit_link}>Edit</a>
          </Link>
        )}
        <h1 className={styles.content__title}>{recipe.title}</h1>
        {grid}
      </div>
    </section>
  );
};

export default RecipePage;
