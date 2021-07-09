import { FC } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { expandList } from "@/store/actions";
import {
  selectRecipes,
  selectListLimit,
  selectListOffset,
  selectSearchFilter,
  selectMealTypeFilter,
} from "@/store/selectors";
import { RecipeList } from "@/components";

import Pagination from "./Pagination";
import ListFilters from "./ListFilters";
import styles from "./DiscoverRecipes.module.scss";

const DiscoverRecipes: FC = () => {
  const recipes = useSelector(selectRecipes);
  const listLimit = useSelector(selectListLimit);
  const listOffset = useSelector(selectListOffset);
  const searchFilter = useSelector(selectSearchFilter);
  const mealTypeFilter = useSelector(selectMealTypeFilter);

  const dispatch = useDispatch();

  const typeFilterResults =
    mealTypeFilter && mealTypeFilter !== "any"
      ? recipes.filter((recipe) => recipe.mealType === mealTypeFilter)
      : recipes;

  const searchResults = searchFilter
    ? typeFilterResults.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchFilter)
      )
    : typeFilterResults;

  const sortedRecipes = searchResults.sort((a, b) =>
    a.updatedAt && b.updatedAt
      ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      : 0
  );

  const visibleRecipes = sortedRecipes.slice(
    listOffset,
    listOffset + listLimit
  );

  const showMoreButton = (
    <button
      name="Show more"
      onClick={() => dispatch(expandList())}
      className={styles.content__show_more_button}
    >
      Show More
    </button>
  );

  const pageControls = (
    <>
      <Pagination recipes={sortedRecipes} />
      {showMoreButton}
    </>
  );

  return (
    <main>
      <section className={styles.content}>
        <div className="container">
          <Link href="/">
            <a className="color-primary">← Home</a>
          </Link>
          <h1 className={styles.content__title}>Discover Recipes</h1>
          <div className={styles.content__list}>
            <ListFilters searchResults={searchResults} />
            <RecipeList recipes={visibleRecipes} />
            {searchResults.length > listLimit && pageControls}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiscoverRecipes;
