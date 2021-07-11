import { MealType } from "@/types";

interface Recipe {
  _id?: string;
  title: string;
  email?: string;
  steps: string[];
  summary?: string;
  mealType: MealType;
  imagePath?: string;
  ingredients: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default Recipe;
