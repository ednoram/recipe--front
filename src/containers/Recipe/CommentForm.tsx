import { useState, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";

import {
  postRecipeComment,
  patchRecipeComment,
  deleteRecipeComment,
} from "@/store/actions";
import { useIsLoggedIn } from "@/hooks";
import { RecipeComment, Rate } from "@/types";

import RateDiv from "./RateDiv";
import styles from "./Recipe.module.scss";

interface Props {
  recipeId: string;
  editing?: boolean;
  comment?: RecipeComment;
  setEditing?: (arg: boolean) => void;
}

const CommentForm: FC<Props> = ({ recipeId, editing, setEditing, comment }) => {
  const [rate, setRate] = useState<Rate>(comment ? comment.rate : 0);
  const [message, setMessage] = useState(comment ? comment.message : "");

  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  const handleDeleteComment = (id: string) => {
    if (confirm("Are you sure you want to delete comment?")) {
      dispatch(deleteRecipeComment(id));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Log in to post comments.");
      return;
    }

    if (!rate) {
      alert("Rate comment to continue.");
      return;
    }

    if (!message || message.trim().length < 1) {
      alert("Review can not be empty");
      return;
    }

    if (recipeId) {
      if (editing && comment && setEditing) {
        dispatch(patchRecipeComment(comment._id, message.trim(), rate));
        setEditing(false);
      } else {
        dispatch(postRecipeComment(recipeId, message.trim(), rate));
        setMessage("");
      }
    }

    setRate(0);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.content__comments_form}>
      <RateDiv rate={rate} setRate={setRate} />
      <input
        value={message}
        maxLength={1000}
        placeholder="Review"
        className={styles.content__comment_input}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className={styles.content__comment_buttons}>
        <button name="Submit" className={styles.content__comment_submit_button}>
          {editing ? "Update Comment" : "Post Comment"}
        </button>
        {editing && setEditing && comment && (
          <>
            <button
              type="button"
              name="Delete Comment"
              className={styles.content__delete_comment_button}
              onClick={() => handleDeleteComment(comment._id)}
            >
              Delete Comment
            </button>
            <button
              name="Cancel Editing"
              onClick={() => setEditing(false)}
              className={styles.content__comment_cancel_button}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
