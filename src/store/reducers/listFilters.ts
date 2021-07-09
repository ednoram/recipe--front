export const SET_PAGE = "SET_PAGE";
export const EXPAND_LIST = "EXPAND_LIST";
export const SET_LIST_LIMIT = "SET_LIST_LIMIT";
export const LIST_NEXT_PAGE = "LIST_NEXT_PAGE";
export const LIST_PREV_PAGE = "LIST_PREV_PAGE";
export const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
export const SET_MEAL_TYPE_FILTER = "SET_MEAL_TYPE_FILTER";

interface State {
  listLimit: number;
  listOffset: number;
  searchFilter: string;
  mealTypeFilter: string;
}

export interface Action {
  type: string;
  payload: {
    page?: number;
    listLimit?: number;
    listOffset?: number;
    searchFilter?: string;
    mealTypeFilter?: string;
  };
}

const INITIAL_STATE: State = {
  listLimit: 8,
  listOffset: 0,
  searchFilter: "",
  mealTypeFilter: "any",
};

const listFiltersReducer = (
  state: State = INITIAL_STATE,
  { type, payload }: Action
): State => {
  switch (type) {
    case SET_SEARCH_FILTER:
      return {
        ...state,
        listOffset: 0,
        searchFilter: payload.searchFilter || "",
        listLimit: state.listLimit > 32 ? 16 : state.listLimit,
      };
    case SET_MEAL_TYPE_FILTER:
      return {
        ...state,
        listOffset: 0,
        listLimit: state.listLimit > 32 ? 16 : state.listLimit,
        mealTypeFilter: payload.mealTypeFilter || state.mealTypeFilter,
      };
    case SET_PAGE:
      return payload.page
        ? {
            ...state,
            listOffset: state.listLimit * (payload.page - 1),
          }
        : state;
    case LIST_NEXT_PAGE:
      return { ...state, listOffset: state.listOffset + state.listLimit };
    case LIST_PREV_PAGE:
      return {
        ...state,
        listOffset: Math.max(0, state.listOffset - state.listLimit),
      };
    case SET_LIST_LIMIT:
      return {
        ...state,
        listOffset: 0,
        listLimit: payload.listLimit || state.listLimit,
      };
    case EXPAND_LIST:
      return {
        ...state,
        listLimit: state.listLimit + 8,
      };
    default:
      return state;
  }
};

export default listFiltersReducer;
