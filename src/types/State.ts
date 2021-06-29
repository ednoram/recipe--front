import { UserData, Recipe } from "@/types";

interface State {
  user: UserData;
  recipes: {
    recipes: Recipe[];
  };
}

export default State;
