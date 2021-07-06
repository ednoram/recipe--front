import { FC } from "react";
import { useSelector } from "react-redux";

import { Recipe } from "@/types";
import { selectRecipeComments } from "@/store/selectors";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import styles from "./Recipe.module.scss";

interface Props {
  recipe: Recipe;
}

const CommentsSection: FC<Props> = ({ recipe }) => {
  const comments = useSelector(selectRecipeComments);

  const commentsList = (
    <ul className={styles.content__comments_list}>
      {comments.map((comment) => (
        <li key={comment._id}>
          <CommentItem comment={comment} recipeId={String(recipe._id)} />
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.content__comments_section}>
      <div className="container">
        <h2 className="color-primary">Comments ({comments.length})</h2>
        <CommentForm recipeId={String(recipe._id)} />
        {commentsList}
      </div>
    </section>
  );
};

export default CommentsSection;
