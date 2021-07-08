import { RecipeComment, State } from "@/types";

export const selectRecipeComments = (
  state: State,
  recipeId: string
): RecipeComment[] =>
  state.comments.comments.filter((comment) => comment.recipeId === recipeId);
