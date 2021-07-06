import { API } from "@/constants";
import {
  ADD_COMMENT,
  SET_COMMENTS,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
} from "@/store/reducers/comments";
import { Dispatch, RecipeComment } from "@/types";

interface Action {
  type: string;
  payload: {
    comment?: RecipeComment;
    comments?: RecipeComment[];
  };
}

export const setComments = (comments: RecipeComment[]): Action => ({
  type: SET_COMMENTS,
  payload: {
    comments: comments,
  },
});

const addComment = (comment: RecipeComment): Action => ({
  type: ADD_COMMENT,
  payload: {
    comment: comment,
  },
});

const updateComment = (id: string, newComment: RecipeComment) => ({
  type: UPDATE_COMMENT,
  payload: {
    id,
    comment: newComment,
  },
});

const removeComment = (id: string) => ({
  type: REMOVE_COMMENT,
  payload: {
    id,
  },
});

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
