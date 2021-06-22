import { FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

import type { Recipe } from "@/types";

import styles from "./RecipeList.module.scss";
import { getImageURL } from "@/utils";

interface Props {
  recipes: Array<Recipe>;
}

const RecipeList: FC<Props> = ({ recipes }) => {
  const sortedRecipes =
    recipes &&
    recipes.sort((a, b) =>
      a.date && b.date
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : -1
    );

  return !sortedRecipes || sortedRecipes.length === 0 ? (
    <p className={styles.nothing_was_found}>Nothing was found</p>
  ) : (
    <ul className={styles.list}>
      {sortedRecipes.map(({ _id, title, mealType, email, imagePath }) => (
        <li key={nanoid()}>
          <div className={styles.list_item}>
            <div>
              <div
                className={styles.list_item__image}
                style={
                  imagePath
                    ? {
                        backgroundSize: "cover",
                        backgroundImage: getImageURL(imagePath),
                      }
                    : {}
                }
              />
              <h4 className={styles.list_item__title}>{title}</h4>
              <p className={styles.list_item__meal_type}>{mealType}</p>
              <Link href={`/user/${email}`}>
                <a className={styles.list_item__user_email}>{email}</a>
              </Link>
            </div>
            <div className="flex_right">
              <Link href={`/recipe/${_id}`}>
                <a className={styles.list_item__link}>Open→</a>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
