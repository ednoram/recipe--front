import { useRef, FC, Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";

import styles from "./RecipeForm.module.scss";

interface Props {
  type: "ingredients" | "steps";
  stepsState: [Array<string>, Dispatch<SetStateAction<Array<string>>>];
  ingredientsState: [Array<string>, Dispatch<SetStateAction<Array<string>>>];
}

const AddItems: FC<Props> = ({ type, stepsState, ingredientsState }) => {
  const [steps, setSteps] = stepsState;
  const [ingredients, setIngredients] = ingredientsState;

  const stepsInputRef = useRef<HTMLInputElement>(null);
  const ingredientsInputRef = useRef<HTMLInputElement>(null);

  const items = type === "ingredients" ? ingredients : steps;

  const handleAddIngredient = () => {
    if (ingredientsInputRef.current && ingredientsInputRef.current.value) {
      const inputValue = ingredientsInputRef.current.value;
      setIngredients([...ingredients, inputValue]);
      ingredientsInputRef.current.value = "";
    }
  };

  const handleAddStep = () => {
    if (stepsInputRef.current && stepsInputRef.current.value) {
      const inputValue = stepsInputRef.current.value;
      setSteps([...steps, inputValue]);
      stepsInputRef.current.value = "";
    }
  };

  const removeItem = (type: "ingredients" | "steps", index: number) => {
    if (type === "ingredients") {
      setIngredients([
        ...ingredients.slice(0, index),
        ...ingredients.slice(index + 1),
      ]);
    } else {
      setSteps([...steps.slice(0, index), ...steps.slice(index + 1)]);
    }
  };

  const handleInputKeyDown = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "ingredients" && ingredientsInputRef.current) {
        handleAddIngredient();
      } else if (type === "steps" && stepsInputRef.current) {
        handleAddStep();
      }
    }
  };

  return (
    <div className={styles.form__add_items}>
      <div className="flex">
        <input
          maxLength={250}
          placeholder="Add item"
          onKeyDown={handleInputKeyDown}
          className={styles.form__add_input}
          ref={type === "ingredients" ? ingredientsInputRef : stepsInputRef}
        />
        <button
          type="button"
          className={styles.form__add_button}
          onClick={type === "ingredients" ? handleAddIngredient : handleAddStep}
        >
          Add
        </button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={nanoid()} className={`${styles.form__add_item_item} flex`}>
            <p>
              {type === "steps"
                ? index + 1 + ". "
                : "" + item[0].toUpperCase() + item.slice(1)}
            </p>
            <button
              type="button"
              onClick={() => removeItem(type, index)}
              className={styles.form__remove_item_button}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddItems;
