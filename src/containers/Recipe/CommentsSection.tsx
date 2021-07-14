import { useState, FC } from "react";
import { useSelector } from "react-redux";

import { Recipe, State } from "@/types";
import { selectRecipeComments } from "@/store/selectors";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
}

const CommentsSection: FC<Props> = ({ recipe }) => {
  const [limit, setLimit] = useState(3);

  const comments = useSelector((state: State) => selectRecipeComments(state));

  const visibleComments =
    comments &&
    comments
      .sort((a, b) =>
        b.createdAt && a.createdAt
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : -1
      )
      .slice(0, limit);

  const increaseLimit = () => setLimit(limit + 5);

  const commentsList = (
    <ul className={styles.content__comments_list}>
      {visibleComments.map(
        (comment) =>
          comment && (
            <li key={comment._id}>
              <CommentItem comment={comment} recipeId={String(recipe._id)} />
            </li>
          )
      )}
    </ul>
  );

  return (
    <section className={styles.content__comments_section}>
      <div className="container">
        <h2 className="color-primary">Comments ({comments.length})</h2>
        <CommentForm recipeId={String(recipe._id)} />
        {commentsList}
        {comments.length > 5 && limit < comments.length && (
          <div className="flex_center">
            <button
              name="show more comments"
              onClick={increaseLimit}
              className={styles.content__more_comments_button}
            >
              Show More Comments
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
