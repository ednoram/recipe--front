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
}

export default State;
