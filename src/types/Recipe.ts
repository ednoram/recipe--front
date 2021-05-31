export type MealType =
  | "any"
  | "snack"
  | "lunch"
  | "dinner"
  | "supper"
  | "breakfast";

interface Recipe {
  _id?: string;
  title: string;
  summary?: string;
  userEmail: string;
  mealType: MealType;
  steps: Array<string>;
  ingredients: Array<string>;
}

export default Recipe;
