import { MealType } from "@/types";

interface Recipe {
  _id?: string;
  title: string;
  email?: string;
  steps: string[];
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
  mealType: MealType;
  imagePath?: string;
  ingredients: string[];
}

export default Recipe;
