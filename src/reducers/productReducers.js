const { FETCH_PRODUCTS } = require("../types");

//current state , and action
export const productsReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload };
    default:
      return state; //return current state
  }
};

//now store the current data in the store
