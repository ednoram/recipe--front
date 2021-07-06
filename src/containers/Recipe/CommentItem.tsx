import { useState, FC } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import EditIcon from "public/edit-icon.svg";
import DeleteIcon from "public/delete-icon.svg";

import { RecipeComment } from "@/types";
import { USER_ROUTE } from "@/constants";
import { selectUserData } from "@/store/selectors";
import { deleteRecipeComment } from "@/store/actions";

import styles from "./Recipe.module.scss";
import CommentForm from "./CommentForm";

interface Props {
  recipeId: string;
  comment: RecipeComment;
}

const CommentItem: FC<Props> = ({ comment, recipeId }) => {
  const [editing, setEditing] = useState(false);

  const user = useSelector(selectUserData);

  const dispatch = useDispatch();

  const handleDeleteComment = (id: string) => {
    if (confirm("Are you sure you want to delete comment?")) {
      dispatch(deleteRecipeComment(id));
    }
  };

  const toggleEditing = () => setEditing(!editing);

  return editing ? (
    <CommentForm
      editing={editing}
      comment={comment}
      recipeId={recipeId}
      setEditing={setEditing}
    />
  ) : (
    <div>
      <p>
        {comment.message}
        {user?.email === comment.email && (
          <>
            <EditIcon
              onClick={toggleEditing}
              ariaLabel="Open edit comment form"
              className={styles.content__edit_comment_icon}
            />
            <DeleteIcon
              ariaLabel="Delete comment"
              onClick={() => handleDeleteComment(comment._id)}
              className={styles.content__delete_comment_icon}
            />
          </>
        )}
      </p>
      <div className={styles.content__comment_email}>
        <Link href={`${USER_ROUTE}/${comment.email}`}>
          <a className="color-primary">{comment.email}</a>
        </Link>
      </div>
    </div>
  );
};

export default CommentItem;
