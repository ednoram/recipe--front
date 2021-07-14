import { API } from "@/constants";
import { RecipeComment } from "@/types";

export const getRecipeComments = async (
  id: string
): Promise<RecipeComment[]> => {
  const { data } = await API.get(`/api/comments/${id}`);
  return data;
};
