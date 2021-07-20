import { MealType } from "@/types";

export const ADD_FORM_STEP = "ADD_FORM_STEP";
export const SET_FORM_IMAGE = "SET_FORM_IMAGE";
export const SET_FORM_TITLE = "SET_FORM_TITLE";
export const SET_FORM_STEPS = "SET_FORM_STEPS";
export const UPDATE_FORM_STEP = "UPDATE_FORM_STEP";
export const SET_FORM_SUMMARY = "SET_FORM_SUMMARY";
export const REMOVE_FORM_STEP = "REMOVE_FORM_STEP";
export const CLEAR_RECIPE_FORM = "CLEAR_RECIPE_FORM";
export const SET_FORM_MEAL_TYPE = "SET_FORM_MEAL_TYPE";
export const ADD_FORM_INGREDIENT = "ADD_FORM_INGREDIENT";
export const SET_FORM_INGREDIENTS = "SET_FORM_INGREDIENTS";
export const REMOVE_FORM_INGREDIENT = "REMOVE_FORM_INGREDIENT";
export const UPDATE_FORM_INGREDIENT = "UPDATE_FORM_INGREDIENT";

interface State {
  title: string;
  steps: string[];
  summary: string;
  mealType: MealType;
  image: File | null;
  ingredients: string[];
}

export interface Action {
  type: string;
  payload: {
    step?: string;
    title?: string;
    index?: number;
    steps?: string[];
    summary?: string;
    mealType?: MealType;
    image?: File | null;
    ingredient?: string;
    ingredients?: string[];
  };
}

const INITIAL_STATE: State = {
  title: "",
  steps: [],
  image: null,
  summary: "",
  mealType: "any",
  ingredients: [],
};

const listFiltersReducer = (
  state: State = INITIAL_STATE,
  { type, payload }: Action
): State => {
  switch (type) {
    case CLEAR_RECIPE_FORM:
      return INITIAL_STATE;
    case SET_FORM_TITLE:
      return payload.title !== undefined
        ? { ...state, title: payload.title }
        : state;
    case SET_FORM_SUMMARY:
      return payload.summary !== undefined
        ? { ...state, summary: payload.summary }
        : state;
    case SET_FORM_IMAGE:
      return payload.image ? { ...state, image: payload.image } : state;
    case SET_FORM_MEAL_TYPE:
      return payload.mealType
        ? { ...state, mealType: payload.mealType }
        : state;
    case SET_FORM_STEPS:
      return payload.steps ? { ...state, steps: payload.steps } : state;
    case SET_FORM_INGREDIENTS:
      return payload.ingredients
        ? { ...state, ingredients: payload.ingredients }
        : state;
    case ADD_FORM_STEP:
      return payload.step
        ? { ...state, steps: [...state.steps, payload.step] }
        : state;
    case ADD_FORM_INGREDIENT:
      return payload.ingredient
        ? { ...state, ingredients: [...state.ingredients, payload.ingredient] }
        : state;
    case REMOVE_FORM_STEP:
      return payload.index !== undefined
        ? {
            ...state,
            steps: [
              ...state.steps.slice(0, payload.index),
              ...state.steps.slice(payload.index + 1),
            ],
          }
        : state;
    case REMOVE_FORM_INGREDIENT:
      return payload.index !== undefined
        ? {
            ...state,
            ingredients: [
              ...state.ingredients.slice(0, payload.index),
              ...state.ingredients.slice(payload.index + 1),
            ],
          }
        : state;
    case UPDATE_FORM_STEP:
      return payload.index !== undefined && payload.step
        ? {
            ...state,
            steps: [
              ...state.steps.slice(0, payload.index),
              payload.step,
              ...state.steps.slice(payload.index + 1),
            ],
          }
        : state;
    case UPDATE_FORM_INGREDIENT:
      return payload.index !== undefined && payload.ingredient
        ? {
            ...state,
            ingredients: [
              ...state.ingredients.slice(0, payload.index),
              payload.ingredient,
              ...state.ingredients.slice(payload.index + 1),
            ],
          }
        : state;
    default:
      return state;
  }
};

export default listFiltersReducer;
