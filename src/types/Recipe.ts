import { MealTypeType } from "@/types";

interface Recipe {
  _id?: string;
  title: string;
  email?: string;
  steps: string[];
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
  imagePath?: string;
  ingredients: string[];
  mealType: MealTypeType;
}

export default Recipe;
