import {
  FC,
  useRef,
  useState,
  Dispatch,
  useEffect,
  KeyboardEvent,
  SetStateAction,
} from "react";
import { useDispatch } from "react-redux";

import {
  addFormStep,
  updateFormStep,
  addFormIngredient,
  updateFormIngredient,
} from "@/store/actions";

import styles from "./RecipeForm.module.scss";
import CommentFormButtons from "./CommentFormButtons";

interface Props {
  item?: string;
  index?: number;
  editing?: boolean;
  typeIsIngredients: boolean;
  setEditing?: Dispatch<SetStateAction<boolean>>;
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addItem = (item: string) => {
    if (!inputValue) {
      alert("Input value is empty");
      return;
    }

    if (typeIsIngredients) {
      dispatch(addFormIngredient(item));
    } else {
      dispatch(addFormStep(item));
    }

    setInputValue("");
  };

  const updateItem = (index: number, item: string) => {
    if (!inputValue) {
      alert("Input value is empty");
      return;
    }

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
      } else {
        addItem(inputValue);
      }
    }
  };

  return (
    <div className={editing ? styles.form__edit_items_input_div : "flex"}>
      <input
        ref={inputRef}
        maxLength={250}
        value={inputValue}
        onKeyDown={handleInputKeyDown}
        className={styles.form__add_input}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={editing ? "Update Item" : "Add item"}
      />
      <CommentFormButtons
        index={index}
        editing={editing}
        addItem={addItem}
        setEditing={setEditing}
        inputValue={inputValue}
        updateItem={updateItem}
        typeIsIngredients={typeIsIngredients}
      />
    </div>
  );
};

export default ItemsInput;
