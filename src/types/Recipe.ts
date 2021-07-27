import { MealType } from "@/types";

interface Recipe {
  _id?: string;
  title: string;
  email?: string;
  steps: string[];
  summary?: string;
  imageId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  imageUrl?: string;
  mealType: MealType;
  ingredients: string[];
}

export default Recipe;
