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
  date?: string;
  email?: string;
  steps: string[];
  summary?: string;
  imagePath?: string;
  mealType: MealType;
  ingredients: string[];
}

export default Recipe;
