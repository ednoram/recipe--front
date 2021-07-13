import { useState, FC } from "react";
import { nanoid } from "nanoid";

import { Recipe } from "@/types";

import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
  type: "ingredients" | "steps";
}

const ItemsDiv: FC<Props> = ({ recipe, type }) => {
  const [expanded, setExpanded] = useState(false);

  const items = recipe[type];
  const typeIsIngredients = type === "ingredients";
  const listName = typeIsIngredients ? "Ingredients" : "Steps";

  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div className={styles.content__items_div}>
      <h3 className={styles.content__heading}>{listName}</h3>
      {visibleItems.length > 0 ? (
        <ul className={styles.content__items_list}>
          {visibleItems.map((item, index) => (
            <li key={nanoid()}>
              {!typeIsIngredients && (
                <h5 className={styles.content__steps_heading}>
                  Step {index + 1}
                </h5>
              )}
              <p>
                {(typeIsIngredients && "• ") +
                  item[0].toUpperCase() +
                  item.slice(1)}
              </p>
            </li>
          ))}
          {visibleItems.length < items.length && (
            <button
              name="Show all"
              onClick={() => setExpanded(true)}
              className={styles.content__show_all_items}
            >
              Show All
            </button>
          )}
        </ul>
      ) : (
        <p>No {listName}</p>
      )}
    </div>
  );
};

export default ItemsDiv;
