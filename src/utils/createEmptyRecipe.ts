import { Recipe } from "@/types";

const createEmptyRecipe = (_id: string): Recipe => ({
  _id,
  title: "",
  email: "",
  steps: [],
  imageUrl: "",
  mealType: "any",
  ingredients: [],
});

export default createEmptyRecipe;
