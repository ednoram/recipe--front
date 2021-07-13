import { UserData, Recipe } from "@/types";
import MealType from "./MealType";

import RecipeComment from "./RecipeComment";

interface State {
  user: UserData;
  recipes: {
    recipes: Recipe[];
  };
  comments: {
    comments: RecipeComment[];
  };
  listFilters: {
    listLimit: number;
    listOffset: number;
    searchFilter: string;
    mealTypeFilter: string;
  };
  recipeForm: {
    title: string;
    steps: string[];
    summary: string;
    mealType: MealType;
    image: File | null;
    ingredients: string[];
  };
  favoriteRecipes: {
    recipeIds: string[];
  };
}

export default State;
