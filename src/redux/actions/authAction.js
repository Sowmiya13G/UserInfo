import * as ActionTypes from '../actionTypes';

export const loginUserAction = (authorizedPerson, password) => ({
  type: ActionTypes.loginUser,
  payload: {authorizedPerson, password},
});
export const signupUserAction = (authorizedPerson, password) => ({
  type: ActionTypes.signupUser,
  payload: {authorizedPerson, password},
});

export const setUserAction = authorizedPerson => ({
  type: ActionTypes.setUSer,
  payload: authorizedPerson,
});
export const logoutUserAction = () => ({
  type: ActionTypes.logoutUser,
});
//Firebase login
export const loginRequest = (authorizedPerson, password) => ({
  type: ActionTypes.loginRequest,
  payload: {authorizedPerson, password},
});

export const loginSuccess = authorizedPerson => ({
  type: ActionTypes.loginSuccess,
  payload: authorizedPerson,
});

export const loginFailure = error => ({
  type: ActionTypes.loginFailure,
  payload: error,
});
// Products Action

export const fetchProducts = () => ({
  type: ActionTypes.fetchProducts,
});

export const addToCart = product => ({
  type: ActionTypes.addToCart,
  payload: {...product, quantity: 1},
});

export const removeFromCart = product => ({
  type: ActionTypes.removeFromCart,
  payload: product,
});

export const clearCart = () => ({
  type: ActionTypes.clearCart,
});

// Product Quantity

export const increaseQuantityAction = product => ({
  type: ActionTypes.increaseQuantity,
  payload: product,
});

export const decreaseQuantityAction = product => ({
  type: ActionTypes.decreaseQuantity,
  payload: product,
});
