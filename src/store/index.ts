import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  recipesReducer,
  commentsReducer,
  recipeFormReducer,
  listFiltersReducer,
} from "./reducers";

const reducers = combineReducers({
  user: userReducer,
  recipes: recipesReducer,
  comments: commentsReducer,
  recipeForm: recipeFormReducer,
  listFilters: listFiltersReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
