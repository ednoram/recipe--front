import { useState, FC, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";

import styles from "./RecipeForm.module.scss";
import { addFormIngredient, addFormStep } from "@/store/actions";

interface Props {
  typeIsIngredients: boolean;
}

const ItemsInput: FC<Props> = ({ typeIsIngredients }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (typeIsIngredients && inputValue) {
        addItem();
      }
    }
  };

  const addItem = () => {
    if (inputValue) {
      if (typeIsIngredients) {
        dispatch(addFormIngredient(inputValue));
      } else {
        dispatch(addFormStep(inputValue));
      }

      setInputValue("");
    }
  };

  return (
    <div className="flex">
      <input
        maxLength={250}
        value={inputValue}
        placeholder="Add item"
        onKeyDown={handleInputKeyDown}
        className={styles.form__add_input}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="button"
        onClick={addItem}
        className={styles.form__add_button}
      >
        Add
      </button>
    </div>
  );
};

export default ItemsInput;
