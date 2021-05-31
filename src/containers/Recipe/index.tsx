import { FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Recipe } from "@/types";
import { selectUserData } from "@/store/selectors";

import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
}

const RecipePage: FC<Props> = ({ recipe }) => {
  const userData = useSelector(selectUserData);
  const router = useRouter();

  const isOwnRecipe = recipe.userEmail === userData?.email;

  const ingredientsDiv = (
    <div className={styles.container__ingredients}>
      <h3 className={styles.container__heading}>Ingredients</h3>
      <p className="capitalize_first_letter">
        {recipe.ingredients.length > 1
          ? recipe.ingredients.join(", ")
          : "No Ingredients"}
      </p>
    </div>
  );

  const stepsDiv = (
    <div className={styles.container__preparation}>
      <h3 className={styles.container__heading}>Preparation</h3>
      {recipe.steps.length > 1 ? (
        <ul className={styles.container__steps_list}>
          {recipe.steps.map((step, index) => (
            <li key={nanoid()}>
              <h5 className={styles.container__step_heading}>
                Step {index + 1}
              </h5>
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
      <div className={`${styles.container} container`}>
        <div>
          <Link href="/">
            <a className="color-primary">←Home</a>
          </Link>
        </div>
        {isOwnRecipe && (
          <Link href={`${router.asPath}/edit`}>
            <a className={styles.container__edit_link}>Edit</a>
          </Link>
        )}
        <h1 className={styles.container__title}>{recipe.title}</h1>
        <div className={styles.container__top_grid}>
          <div>
            <div className={styles.container__image} />
          </div>
          <div>
            <p>
              By:
              <span className="color-primary"> {recipe.userEmail}</span>
              {isOwnRecipe && " (you)"}
            </p>
            <p className={styles.container__meal_type}>
              Meal type:
              <span className="color-primary"> {recipe.mealType}</span>
            </p>
            <div className={styles.container__summary}>
              <h3 className={styles.container__heading}>Summary</h3>
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
