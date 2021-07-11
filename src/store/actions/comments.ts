import { API } from "@/constants";
import {
  Action,
  ADD_COMMENT,
  SET_COMMENTS,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
} from "@/store/reducers/comments";
import { createAction } from "@/utils";
import { Dispatch, RecipeComment } from "@/types";

export const setComments = (comments: RecipeComment[]): Action =>
  createAction(SET_COMMENTS, { comments });

const addComment = (comment: RecipeComment) =>
  createAction(ADD_COMMENT, { comment });

const updateComment = (id: string, newComment: RecipeComment) =>
  createAction(UPDATE_COMMENT, { id, comment: newComment });

const removeComment = (id: string) => createAction(REMOVE_COMMENT, { id });

export const postRecipeComment =
  (recipeId: string, message: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/api/comments", {
        token,
        recipeId,
        message,
      });

      dispatch(addComment(data));
    } catch {
      alert("Something went wrong");
    }
  };

export const deleteRecipeComment =
  (id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/comments/${id}`, {
        data: { token },
      });

      dispatch(removeComment(id));
    } catch {
      alert("Something went wrong");
    }
  };

export const patchRecipeComment =
  (id: string, message: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.patch(`/api/comments/${id}`, {
        token,
        message,
      });

      dispatch(updateComment(id, data));
    } catch {
      alert("Something went wrong");
    }
  };
