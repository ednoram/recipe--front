import { createStore, combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer } from "./reducers";

const reducers = combineReducers({
  state: reducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
