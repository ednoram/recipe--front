import { FC } from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import {
  setListPage,
  changeToNextPage,
  changeToPrevPage,
} from "@/store/actions";
import { Recipe } from "@/types";
import { selectListLimit, selectListOffset } from "@/store/selectors";

import styles from "./DiscoverRecipes.module.scss";

interface Props {
  recipes: Recipe[];
}

const Pagination: FC<Props> = ({ recipes }) => {
  const listLimit = useSelector(selectListLimit);
  const listOffset = useSelector(selectListOffset);

  const dispatch = useDispatch();

  const currentPage = listOffset / listLimit + 1;
  const lastPage = Math.ceil(recipes.length / listLimit);

  const allButtonNames: string[] = Array.from({ length: lastPage }, (_, i) =>
    String(i + 1)
  );

  const buttonNames: string[] = allButtonNames
    .slice(-3)
    .includes(String(currentPage))
    ? allButtonNames.slice(-5)
    : allButtonNames.slice(
        Math.max(0, currentPage - 3),
        Math.max(currentPage + 2, 5)
      );

  const getButtonClassName = (name: string) =>
    `${styles.content__pagination_button} ${
      Number(name) === currentPage
        ? styles.content__pagination_button_active
        : ""
    }`;

  const handlePrevClick = () => {
    dispatch(changeToPrevPage());
  };

  const handleNextClick = () => {
    dispatch(changeToNextPage());
  };

  return (
    <div className={styles.content__pagination}>
      <ul className={styles.content__pagination_buttons}>
        <li>
          <button
            name="previous page"
            onClick={handlePrevClick}
            disabled={listOffset === undefined || listOffset <= 0}
            className={styles.content__pagination_arrow_button}
          >
            ← Prev
          </button>
        </li>
        {buttonNames.map((name) => (
          <li key={nanoid()}>
            <button
              name="pagination button"
              className={getButtonClassName(name)}
              onClick={() => dispatch(setListPage(Number(name)))}
            >
              {name}
            </button>
          </li>
        ))}
        <li>
          <button
            name="next page"
            onClick={handleNextClick}
            disabled={lastPage === undefined || currentPage >= lastPage}
            className={styles.content__pagination_arrow_button}
          >
            Next →
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
