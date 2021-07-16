import { useMemo, FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { Recipe } from "@/types";
import { getImageURL } from "@/utils";
import { selectRecipeComments } from "@/store/selectors";

import ItemsDiv from "./ItemsDiv";
import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
  isOwnRecipe: boolean;
}

const Grid: FC<Props> = ({ recipe, isOwnRecipe }) => {
  const comments = useSelector(selectRecipeComments);

  const rates = comments.map((comment) => comment.rate);

  const averageRating =
    rates.reduce((acc, rate) => acc + rate, 0) / rates.length;

  const roundedAverageRating = Math.round(averageRating * 2) / 2;

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

  const getDateString = (date: Date) =>
    new Date(date).toLocaleDateString("en", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });

  const createdAtString = recipe.createdAt
    ? getDateString(recipe.createdAt)
    : "unknown";

  const updatedAtString = recipe.updatedAt
    ? getDateString(recipe.updatedAt)
    : "unknown";

  return (
    <div className={styles.content__grid}>
      <div className={styles.content__grid_info_div}>
        <p>
          Rating:{" "}
          <span className="color-primary">
            {roundedAverageRating
              ? `${roundedAverageRating} stars (${rates.length} rates)`
              : "No rates"}
          </span>
        </p>
        <p>
          By:{" "}
          <Link href={`/user/${recipe.email}`}>
            <a className="color-primary">{recipe.email}</a>
          </Link>
          <span className="color-primary">{isOwnRecipe && " (you)"}</span>
        </p>
        <p>
          Created At: <span className="color-primary">{createdAtString}</span>
        </p>
        <p>
          Updated At: <span className="color-primary">{updatedAtString}</span>
        </p>
        <div style={imageDivStyle} className={styles.content__image} />
      </div>
      <div>
        <div>
          <h3 className={styles.content__heading}>Meal Type</h3>
          <p className="capitalize"> {recipe.mealType}</p>
        </div>
        <div className={styles.content__summary_div}>
          <h3 className={styles.content__heading}>Summary</h3>
          <p>{recipe.summary || "No Summary"}</p>
        </div>
        <ItemsDiv type="ingredients" recipe={recipe} />
        <ItemsDiv type="steps" recipe={recipe} />
      </div>
    </div>
  );
};

export default Grid;
