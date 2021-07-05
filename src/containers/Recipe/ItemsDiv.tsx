import { FC } from "react";
import { nanoid } from "nanoid";

import { Recipe } from "@/types";

import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
  type: "ingredients" | "steps";
}

const ItemsDiv: FC<Props> = ({ recipe, type }) => {
  const items = recipe[type];
  const typeIsIngredients = type === "ingredients";
  const listName = typeIsIngredients ? "Ingredients" : "Steps";

  return (
    <div className={styles.content__items_div}>
      <h3 className={styles.content__heading}>{listName}</h3>
      {items.length > 0 ? (
        <ul className={styles.content__items_list}>
          {items.map((item, index) => (
            <li key={nanoid()}>
              {!typeIsIngredients && (
                <h5 className={styles.content__steps_heading}>
                  Step {index + 1}
                </h5>
              )}
              <p>{item[0].toUpperCase() + item.slice(1)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No {listName}</p>
      )}
    </div>
  );
};

export default ItemsDiv;
