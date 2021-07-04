import { useRef, FC, Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";

import styles from "./RecipeForm.module.scss";

interface Props {
  type: "ingredients" | "steps";
  stepsState: [string[], Dispatch<SetStateAction<string[]>>];
  ingredientsState: [string[], Dispatch<SetStateAction<string[]>>];
}

const AddItems: FC<Props> = ({ type, stepsState, ingredientsState }) => {
  const [steps, setSteps] = stepsState;
  const [ingredients, setIngredients] = ingredientsState;

  const inputRef = useRef<HTMLInputElement>(null);

  const typeIsIngredients = type === "ingredients";
  const items = typeIsIngredients ? ingredients : steps;

  const handleAddIngredient = () => {
    const refCurrent = inputRef.current;

    if (refCurrent && refCurrent.value) {
      const inputValue = refCurrent.value;
      setIngredients([...ingredients, inputValue]);
      refCurrent.value = "";
    }
  };

  const handleAddStep = () => {
    const refCurrent = inputRef.current;

    if (refCurrent && refCurrent.value) {
      const inputValue = refCurrent.value;
      setSteps([...steps, inputValue]);
      refCurrent.value = "";
    }
  };

  const removeItem = (typeIsIngredients: boolean, index: number) => {
    if (typeIsIngredients) {
      const newIngredients = [
        ...ingredients.slice(0, index),
        ...ingredients.slice(index + 1),
      ];
      setIngredients(newIngredients);
    } else {
      const newSteps = [...steps.slice(0, index), ...steps.slice(index + 1)];
      setSteps(newSteps);
    }
  };

  const handleInputKeyDown = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (typeIsIngredients && inputRef.current) {
        handleAddIngredient();
      } else if (inputRef.current) {
        handleAddStep();
      }
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
      <div className="flex">
        <input
          ref={inputRef}
          maxLength={250}
          placeholder="Add item"
          onKeyDown={handleInputKeyDown}
          className={styles.form__add_input}
        />
        <button
          type="button"
          className={styles.form__add_button}
          onClick={typeIsIngredients ? handleAddIngredient : handleAddStep}
        >
          Add
        </button>
      </div>
      {itemsList}
    </div>
  );
};

export default AddItems;
