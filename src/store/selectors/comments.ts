import { RecipeComment, State } from "@/types";

export const selectRecipeComments = (state: State): RecipeComment[] =>
  state.comments.comments;
