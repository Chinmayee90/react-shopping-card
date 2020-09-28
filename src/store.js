import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducers } from "./reducers/productReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//we neeed middleware because we are sending async data , to handle such request
const store = createStore(
  combineReducers({
    products: productsReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
