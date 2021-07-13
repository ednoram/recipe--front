import { useState, FC, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";

import {
  addFormStep,
  updateFormStep,
  removeFormStep,
  addFormIngredient,
  updateFormIngredient,
  removeFormIngredient,
} from "@/store/actions";

import styles from "./RecipeForm.module.scss";

interface Props {
  item?: string;
  index?: number;
  editing?: boolean;
  typeIsIngredients: boolean;
  setEditing?: (arg: boolean) => void;
}

const ItemsInput: FC<Props> = ({
  item,
  index,
  editing,
  setEditing,
  typeIsIngredients,
}) => {
  const [inputValue, setInputValue] = useState(item || "");
  const dispatch = useDispatch();

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

  const removeItem = (index: number) => {
    if (confirm("Remove item?")) {
      if (typeIsIngredients) {
        dispatch(removeFormIngredient(index));
      } else {
        dispatch(removeFormStep(index));
      }
    }
  };

  const updateItem = (index: number, item: string) => {
    if (typeIsIngredients) {
      dispatch(updateFormIngredient(index, item));
    } else {
      dispatch(updateFormStep(index, item));
    }

    setEditing && setEditing(false);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (editing && index !== undefined && setEditing) {
        updateItem(index, inputValue);
        setEditing(false);
      } else if (typeIsIngredients && inputValue) {
        addItem();
      }
    }
  };

  const handleSubmitOnClick = editing
    ? () => index !== undefined && updateItem(index, inputValue)
    : addItem;

  return (
    <div className={editing ? styles.form__edit_items_input_div : "flex"}>
      <input
        maxLength={250}
        value={inputValue}
        onKeyDown={handleInputKeyDown}
        className={styles.form__add_input}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={editing ? "Update Item" : "Add item"}
      />
      <div className="flex">
        <button
          type="button"
          name="submit"
          onClick={handleSubmitOnClick}
          className={
            editing ? styles.form__update_button : styles.form__add_button
          }
        >
          {editing ? "Update" : "Add"}
        </button>
        {editing && setEditing && index !== undefined && (
          <>
            <button
              name="remove item"
              onClick={() => removeItem(index)}
              className={styles.form__remove_item_button}
            >
              Remove
            </button>
            <button
              name="cancel"
              onClick={() => setEditing(false)}
              className={styles.form__cancel_editing_button}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsInput;
