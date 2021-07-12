import { FC } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import { selectFormIngredients, selectFormSteps } from "@/store/selectors";

import ItemsInput from "./ItemsInput";
import styles from "./RecipeForm.module.scss";
import { removeFormIngredient, removeFormStep } from "@/store/actions";

interface Props {
  type: "ingredients" | "steps";
}

const AddItems: FC<Props> = ({ type }) => {
  const steps = useSelector(selectFormSteps);
  const ingredients = useSelector(selectFormIngredients);

  const dispatch = useDispatch();

  const typeIsIngredients = type === "ingredients";
  const items = typeIsIngredients ? ingredients : steps;

  const removeItem = (typeIsIngredients: boolean, index: number) => {
    if (typeIsIngredients) {
      dispatch(removeFormIngredient(index));
    } else {
      dispatch(removeFormStep(index));
    }
  };

  const itemsList = (
    <ul>
      {items.map((item, index) => (
        <li key={nanoid()} className={`${styles.form__add_item_item} flex`}>
          <p>
            {typeIsIngredients
              ? item[0].toUpperCase() + item.slice(1)
              : index + 1 + ". " + item[0].toUpperCase() + item.slice(1)}
          </p>
          <button
            type="button"
            name="Remove Item"
            onClick={() => removeItem(typeIsIngredients, index)}
            className={styles.form__remove_item_button}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.form__add_items}>
      <ItemsInput typeIsIngredients={typeIsIngredients} />
      {itemsList}
    </div>
  );
};

export default AddItems;
