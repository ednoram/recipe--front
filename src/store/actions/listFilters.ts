import {
  Action,
  SET_PAGE,
  EXPAND_LIST,
  SET_LIST_LIMIT,
  LIST_NEXT_PAGE,
  LIST_PREV_PAGE,
  SET_SEARCH_FILTER,
  SET_MEAL_TYPE_FILTER,
} from "@/store/reducers/listFilters";
import { createAction } from "@/utils";

export const setListPage = (page: number): Action =>
  createAction(SET_PAGE, { page });

export const setSearchFilter = (value: string): Action =>
  createAction(SET_SEARCH_FILTER, {
    searchFilter: value.trim().replace(/\s\s+/g, " ").toLowerCase() || "",
  });

export const setListLimit = (listLimit: number): Action =>
  createAction(SET_LIST_LIMIT, { listLimit });

export const setMealTypeFilter = (value: string): Action =>
  createAction(SET_MEAL_TYPE_FILTER, { mealTypeFilter: value || "" });

export const expandList = (): Action => createAction(EXPAND_LIST, {});

export const changeToNextPage = (): Action => createAction(LIST_NEXT_PAGE, {});

export const changeToPrevPage = (): Action => createAction(LIST_PREV_PAGE, {});
