import { FC, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFormTitle,
  selectFormSummary,
  selectFormMealType,
} from "@/store/selectors";
import { setFormMealType, setFormSummary, setFormTitle } from "@/store/actions";

import AddItems from "./AddItems";
import styles from "./RecipeForm.module.scss";

const InputsList: FC = () => {
  const title = useSelector(selectFormTitle);
  const summary = useSelector(selectFormSummary);
  const mealType = useSelector(selectFormMealType);

  const dispatch = useDispatch();

  const disableEnterKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const selectMealType = (
    <select
      value={mealType}
      className={styles.form__select_meal_type}
      onChange={(e) => {
        const value = e.target.value;
        dispatch(
          setFormMealType(
            value === "breakfast" ||
              value === "lunch" ||
              value === "dinner" ||
              value === "dessert" ||
              value === "snack"
              ? value
              : "any"
          )
        );
      }}
    >
      <option value="any">Any</option>
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="dessert">Dessert</option>
      <option value="snack">Snack</option>
    </select>
  );

  return (
    <ul>
      <li>
        <label>
          <h5 className="color-primary">Title:</h5>
          <input
            value={title}
            maxLength={40}
            placeholder="Title of recipe"
            onKeyPress={disableEnterKeySubmit}
            className={styles.form__title_input}
            onChange={(e) => dispatch(setFormTitle(e.target.value))}
          />
        </label>
      </li>
      <li className={styles.form__input_list_li}>
        <h5 className="color-primary">Meal Type:</h5>
        {selectMealType}
      </li>
      <li className={styles.form__input_list_li}>
        <label>
          <h5 className="color-primary">Summary:</h5>
          <textarea
            value={summary}
            maxLength={250}
            placeholder="Summary of recipe"
            className={styles.form__summary_textarea}
            onChange={(e) => dispatch(setFormSummary(e.target.value))}
          />
        </label>
      </li>
      <li className={styles.form__input_list_li}>
        <label>
          <h5 className="color-primary">Add Ingredient:</h5>
          <AddItems type="ingredients" />
        </label>
      </li>
      <li className={styles.form__input_list_li}>
        <label>
          <h5 className="color-primary">Add Step:</h5>
          <AddItems type="steps" />
        </label>
      </li>
    </ul>
  );
};

export default InputsList;
