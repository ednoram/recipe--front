import { State } from "@/types";

export const selectSearchFilter = (state: State): string =>
  state.listFilters.searchFilter;

export const selectMealTypeFilter = (state: State): string =>
  state.listFilters.mealTypeFilter;

export const selectListOffset = (state: State): number =>
  state.listFilters.listOffset;

export const selectListLimit = (state: State): number =>
  state.listFilters.listLimit;
