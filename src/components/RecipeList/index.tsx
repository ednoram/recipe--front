import { FC } from "react";
import Link from "next/link";

import type { Recipe } from "@/types";

import styles from "./RecipeList.module.scss";

interface Props {
  recipes: Array<Recipe>;
}

const RecipeList: FC<Props> = ({ recipes }) => {
  return !recipes || recipes.length === 0 ? (
    <p className={styles.nothing_was_found}>Nothing was found</p>
  ) : (
    <ul className={styles.list}>
      {recipes.map(({ _id, title, mealType, userEmail }) => (
        <li key={_id}>
          <div className={styles.list_item}>
            <div>
              <div className={styles.list_item__image} />
              <h4 className={styles.list_item__title}>{title}</h4>
              <p className={styles.list_item__meal_type}>{mealType}</p>
              <p className={styles.list_item__user_email}>{userEmail}</p>
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
