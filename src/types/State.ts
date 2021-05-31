import type { UserData, Recipe } from "@/types";

interface State {
  user: UserData;
  recipes: {
    recipes: Array<Recipe>;
  };
}

export default State;
