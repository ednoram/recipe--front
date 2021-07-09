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

export const setSearchFilter = (value: string): Action => ({
  type: SET_SEARCH_FILTER,
  payload: { searchFilter: value.trim().toLowerCase() || "" },
});

export const setMealTypeFilter = (value: string): Action => ({
  type: SET_MEAL_TYPE_FILTER,
  payload: { mealTypeFilter: value || "" },
});

export const setListPage = (page: number): Action => ({
  type: SET_PAGE,
  payload: { page },
});

export const changeToNextPage = (): Action => ({
  type: LIST_NEXT_PAGE,
  payload: {},
});

export const changeToPrevPage = (): Action => ({
  type: LIST_PREV_PAGE,
  payload: {},
});

export const expandList = (): Action => ({
  type: EXPAND_LIST,
  payload: {},
});

export const setListLimit = (listLimit: number): Action => ({
  type: SET_LIST_LIMIT,
  payload: { listLimit },
});
