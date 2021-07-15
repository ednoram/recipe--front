import { useRef, FC, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import {
  setListLimit,
  setSearchFilter,
  setMealTypeFilter,
} from "@/store/actions";
import { Recipe } from "@/types";
import { debounce } from "@/utils";
import { Dropdown } from "@/components";
import { MEAL_TYPES } from "@/constants";
import CloseIcon from "@/assets/close-icon.svg";

import styles from "./DiscoverRecipes.module.scss";

interface Props {
  searchResults: Recipe[];
}

const ListFilters: FC<Props> = ({ searchResults }) => {
  const dispatch = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const listLimitOptions = ["8", "16", "32"];
  const minimumLimit = Math.min(...listLimitOptions.map((x) => Number(x)));

  const clearSearchFilter = () => {
    dispatch(setSearchFilter(""));

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const handleSelectMealType = (mealType: string) => {
    dispatch(setMealTypeFilter(mealType));
  };

  const handleSelectLimit = (limit: string) => {
    dispatch(setListLimit(Number(limit)));
  };

  const handleSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchFilter(e.target.value));
  }, 500);

  const limitDropdown = (
    <div
      className={`${styles.content__dropdown_filter} ${styles.content__limit_dropdown}`}
    >
      <p className="color-primary">Items per page: </p>
      <Dropdown options={listLimitOptions} selectFunc={handleSelectLimit} />
    </div>
  );

  const clearInputIcon = (
    <CloseIcon
      aria-label="Clear input"
      onClick={clearSearchFilter}
      className={styles.content__clear_input_icon}
    />
  );

  const searchbox = (
    <div className={styles.content__searchbox}>
      <input
        maxLength={40}
        ref={searchInputRef}
        onChange={handleSearchChange}
        placeholder="Search by recipe title"
      />
      {searchInputRef.current?.value && clearInputIcon}
    </div>
  );

  return (
    <div className={styles.content__list_filters}>
      <div className={styles.content__list_filters_left}>
        {searchbox}
        <div className={styles.content__dropdown_filter}>
          <p className="color-primary">Meal Type: </p>
          <Dropdown options={MEAL_TYPES} selectFunc={handleSelectMealType} />
        </div>
      </div>
      {searchResults.length > minimumLimit && limitDropdown}
    </div>
  );
};

export default ListFilters;
