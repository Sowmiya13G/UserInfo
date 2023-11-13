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

//Firebse Sign-up
export const signupRequest = (email, password) => ({
  type: ActionTypes.signupRequest,
  payload: {email, password},
});

export const signupSuccess = user => ({
  type: ActionTypes.signupSuccess,
  payload: user,
});

export const signupFailure = error => ({
  type: ActionTypes.signupFailure,
  payload: error,
});
//Firebase login
export const loginRequest = (email, password) => ({
  type: ActionTypes.loginRequest,
  payload: {email, password},
});

export const loginSuccess = user => ({
  type: ActionTypes.loginSuccess,
  payload: user,
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

export const addToWishlist = productId => ({
  type: ActionTypes.addToWishlist,
  payload: productId,
});

export const removeFromWishlist = productId => ({
  type: ActionTypes.removeFromWishlist,
  payload: productId,
});

//PROFILE SCREEN
export const setProfileImage = image => ({
  type: ActionTypes.updateProfileImage,
  payload: image,
});
export const updateProfileImageAction = profileImage => ({
  type: ActionTypes.updateProfileImage,
  payload: profileImage,
});
export const removeProfileImageAction = () => ({
  type: ActionTypes.removeProfileImage,
});
export const selectDocumentAction = document => ({
  type: ActionTypes.uploadDocument,
  payload: document,
});

export const downloadDocumentAction = documentUri => ({
  type: ActionTypes.downloadDocument,
  payload: documentUri,
});
export const saveProfileDataAction = (imageUri, documentUri) => ({
  type: ActionTypes.saveProfileData,
  payload: {imageUri, documentUri},
});
