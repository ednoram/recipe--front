import { RecipeComment } from "@/types";
import { blankRecipeComment } from "@/utils";

export const ADD_COMMENT = "ADD_COMMENT";
export const SET_COMMENTS = "SET_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

interface State {
  comments: RecipeComment[];
}

interface Payload {
  id: string;
  comment: RecipeComment;
  comments: RecipeComment[];
}

const commentsReducer = (
  state: State = { comments: [] },
  { type, payload }: { type: string; payload: Payload }
): State => {
  const commentIndex = state.comments.indexOf(
    state.comments.find((x) => x._id === payload.id) || blankRecipeComment
  );

  switch (type) {
    case SET_COMMENTS:
      return { comments: payload.comments };
    case ADD_COMMENT:
      return { comments: [...state.comments, payload.comment] };
    case REMOVE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, commentIndex),
          ...state.comments.slice(commentIndex + 1),
        ],
      };
    case UPDATE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, commentIndex),
          payload.comment,
          ...state.comments.slice(commentIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export default commentsReducer;
