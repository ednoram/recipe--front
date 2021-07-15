import { useState, FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { RecipeComment } from "@/types";
import { USERS_ROUTE } from "@/constants";
import EditIcon from "@/assets/edit-icon.svg";
import { selectUserData } from "@/store/selectors";

import RateDiv from "./RateDiv";
import CommentForm from "./CommentForm";
import styles from "./Recipe.module.scss";

interface Props {
  recipeId: string;
  comment: RecipeComment;
}

const CommentItem: FC<Props> = ({ comment, recipeId }) => {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const user = useSelector(selectUserData);

  const toggleEditing = () => setEditing(!editing);

  const dateString = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "unknown";

  const commentIsLong = comment.message.length > 250;

  return editing ? (
    <CommentForm
      editing={editing}
      comment={comment}
      recipeId={recipeId}
      setEditing={setEditing}
    />
  ) : (
    <div>
      <RateDiv rate={comment.rate} />
      <p>
        {commentIsLong && !expanded
          ? comment.message.slice(0, 250) + "..."
          : comment.message}
        {commentIsLong && !expanded && (
          <button
            name="Read more"
            onClick={() => setExpanded(true)}
            className={styles.content__comment_read_more}
          >
            Read More
          </button>
        )}
      </p>
      {user?.email === comment.email && (
        <button
          name="Edit Comment"
          onClick={toggleEditing}
          className={styles.content__edit_comment_button}
        >
          <EditIcon className={styles.content__edit_comment_icon} />
          Edit Comment
        </button>
      )}
      <p className={styles.content__comment_date}>{dateString}</p>
      <div className={styles.content__comment_email}>
        <Link href={`${USERS_ROUTE}/${comment.email}`}>
          <a className="color-primary">{comment.email}</a>
        </Link>
      </div>
    </div>
  );
};

export default CommentItem;
