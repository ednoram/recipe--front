import { FC } from "react";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

import { selectFormIngredients, selectFormSteps } from "@/store/selectors";

import Item from "./Item";
import ItemsInput from "./ItemsInput";
import styles from "./RecipeForm.module.scss";

interface Props {
  type: "ingredients" | "steps";
}

const AddItems: FC<Props> = ({ type }) => {
  const steps = useSelector(selectFormSteps);
  const ingredients = useSelector(selectFormIngredients);

  const typeIsIngredients = type === "ingredients";
  const items = typeIsIngredients ? ingredients : steps;

  const itemsList = (
    <ul>
      {items.map((item, index) => (
        <Item
          item={item}
          index={index}
          key={nanoid()}
          typeIsIngredients={typeIsIngredients}
        />
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
