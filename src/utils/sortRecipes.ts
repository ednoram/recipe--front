import { Recipe } from "@/types";

const sortRecipes = (recipes: Recipe[]): Recipe[] =>
  recipes.sort((a, b) =>
    a.updatedAt && b.updatedAt
      ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      : -1
  );

export default sortRecipes;
