import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import {
  userReducer,
  recipesReducer,
  commentsReducer,
  recipeFormReducer,
  listFiltersReducer,
  favoriteRecipesReducer,
} from "./reducers";

const reducers = combineReducers({
  user: userReducer,
  recipes: recipesReducer,
  comments: commentsReducer,
  recipeForm: recipeFormReducer,
  listFilters: listFiltersReducer,
  favoriteRecipes: favoriteRecipesReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducers, middleware);

export default store;
