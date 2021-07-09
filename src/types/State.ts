import { UserData, Recipe } from "@/types";

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
}

export default State;
