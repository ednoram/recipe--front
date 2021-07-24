import { FC, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

import { removeFormStep, removeFormIngredient } from "@/store/actions";

import styles from "./RecipeForm.module.scss";

interface Props {
  index?: number;
  editing?: boolean;
  inputValue: string;
  typeIsIngredients: boolean;
  addItem: (item: string) => void;
  setEditing?: Dispatch<SetStateAction<boolean>>;
  updateItem: (index: number, item: string) => void;
}

const CommentFormButtons: FC<Props> = ({
  index,
  addItem,
  editing,
  setEditing,
  inputValue,
  updateItem,
  typeIsIngredients,
}) => {
  const dispatch = useDispatch();

  const removeItem = (index: number) => {
    if (confirm("Remove item?")) {
      if (typeIsIngredients) {
        dispatch(removeFormIngredient(index));
      } else {
        dispatch(removeFormStep(index));
      }
    }
  };

  const handleSubmitClick = editing
    ? () => index !== undefined && updateItem(index, inputValue)
    : () => addItem(inputValue);

  const removeCancelButtons = editing && setEditing && index !== undefined && (
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
  );

  return (
    <div className="flex">
      <button
        type="button"
        name="add or update item"
        onClick={() => handleSubmitClick()}
        className={
          editing ? styles.form__update_button : styles.form__add_button
        }
      >
        {editing ? "Update" : "Add"}
      </button>
      {removeCancelButtons}
    </div>
  );
};

export default CommentFormButtons;
