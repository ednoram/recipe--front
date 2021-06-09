import { FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Recipe } from "@/types";
import { selectUserData } from "@/store/selectors";

import styles from "./Recipe.module.scss";
import { getImageURL } from "@/utils";

interface Props {
  recipe: Recipe;
}

const RecipePage: FC<Props> = ({ recipe }) => {
  const userData = useSelector(selectUserData);
  const router = useRouter();

  const isOwnRecipe = recipe.email === userData?.email;

  const ingredientsDiv = (
    <div className={styles.content__ingredients}>
      <h3 className={styles.content__heading}>Ingredients</h3>
      <p className="capitalize_first_letter">
        {recipe.ingredients.length > 1
          ? recipe.ingredients.join(", ")
          : "No Ingredients"}
      </p>
    </div>
  );

  const stepsDiv = (
    <div className={styles.content__preparation}>
      <h3 className={styles.content__heading}>Preparation</h3>
      {recipe.steps.length > 1 ? (
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
        <div className={styles.content__top_grid}>
          <div>
            <p>
              By:
              <span className="color-primary"> {recipe.email}</span>
              {isOwnRecipe && " (you)"}
            </p>
            <p className={styles.content__meal_type}>
              Meal type:
              <span className="color-primary"> {recipe.mealType}</span>
            </p>
            <div
              className={styles.content__image}
              style={{ backgroundImage: getImageURL(recipe.imagePath) }}
            />
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
      </div>
    </section>
  );
};

export default RecipePage;
