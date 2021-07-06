import { useState, FC, FormEvent, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

import { useIsLoggedIn } from "@/hooks";
import { RecipeComment } from "@/types";
import { patchRecipeComment, postRecipeComment } from "@/store/actions";

import styles from "./Recipe.module.scss";

interface Props {
  recipeId: string;
  editing?: boolean;
  comment?: RecipeComment;
  setEditing?: Dispatch<SetStateAction<boolean>>;
}

const CommentForm: FC<Props> = ({ recipeId, editing, setEditing, comment }) => {
  const [message, setMessage] = useState(comment ? comment.message : "");

  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Log in to post comments.");
      return;
    }

    if (message.trim().length < 1) {
      alert("Comment can not be empty");
      return;
    }

    if (recipeId) {
      if (editing && comment && setEditing) {
        dispatch(patchRecipeComment(comment._id, message.trim()));
        setEditing(false);
      } else {
        dispatch(postRecipeComment(recipeId, message.trim()));
        setMessage("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.content__comments_form}>
      <input
        value={message}
        maxLength={1000}
        placeholder="Comment Text"
        className={styles.content__comment_input}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button name="Submit" className={styles.content__comment_submit_button}>
        {editing ? "Update Comment" : "Post Comment"}
      </button>
      {editing && setEditing && (
        <button
          name="Cancel Editing"
          onClick={() => setEditing(false)}
          className={styles.content__comment_cancel_button}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;
