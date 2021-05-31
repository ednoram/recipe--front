import { FC, Dispatch, SetStateAction } from "react";

import { MealType } from "@/types";

import AddItems from "./AddItems";
import styles from "./RecipeForm.module.scss";

interface Props {
  titleState: [string, Dispatch<SetStateAction<string>>];
  summaryState: [string, Dispatch<SetStateAction<string>>];
  mealTypeState: [string, Dispatch<SetStateAction<MealType>>];
  stepsState: [Array<string>, Dispatch<SetStateAction<Array<string>>>];
  ingredientsState: [Array<string>, Dispatch<SetStateAction<Array<string>>>];
}

const InputsList: FC<Props> = ({
  titleState,
  stepsState,
  summaryState,
  mealTypeState,
  ingredientsState,
}) => {
  const [title, setTitle] = titleState;
  const [steps, setSteps] = stepsState;
  const [summary, setSummary] = summaryState;
  const [mealType, setMealType] = mealTypeState;
  const [ingredients, setIngredients] = ingredientsState;

  const selectMealType = (
    <select
      value={mealType}
      className={styles.form__select_meal_type}
      onChange={(e) => {
        const value = e.target.value;
        setMealType(
          value === "breakfast" ||
            value === "lunch" ||
            value === "dinner" ||
            value === "supper" ||
            value === "snack"
            ? value
            : "any"
        );
      }}
    >
      <option value="any">Any</option>
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="supper">Supper</option>
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
            className={styles.form__title_input}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setSummary(e.target.value)}
          />
        </label>
      </li>
      <li className={styles.form__input_list_li}>
        <label>
          <h5 className="color-primary">Add Ingredient:</h5>
          <AddItems
            type="ingredients"
            stepsState={[steps, setSteps]}
            ingredientsState={[ingredients, setIngredients]}
          />
        </label>
      </li>
      <li className={styles.form__input_list_li}>
        <label>
          <h5 className="color-primary">Add Step:</h5>
          <AddItems
            type="steps"
            stepsState={[steps, setSteps]}
            ingredientsState={[ingredients, setIngredients]}
          />
        </label>
      </li>
    </ul>
  );
};

export default InputsList;
