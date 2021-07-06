import { Recipe } from "@/types";

const blankRecipe: Recipe = {
  _id: "",
  title: "",
  email: "",
  steps: [],
  imagePath: "",
  mealType: "any",
  ingredients: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default blankRecipe;
