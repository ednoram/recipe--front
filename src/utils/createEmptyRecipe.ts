import { EmptyRecipe } from "@/types";

const createEmptyRecipe = (_id: string): EmptyRecipe => ({
  _id,
  date: null,
  title: null,
  email: null,
  mealType: null,
  imagePath: null,
});

export default createEmptyRecipe;
