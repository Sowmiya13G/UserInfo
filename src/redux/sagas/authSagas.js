import {call, put, takeLatest} from 'redux-saga/effects';
import {loginUser} from '../../apiServices';
import {
  setUserAction,
  loginFailure,
  loginSuccess,
  updateProfileImageAction,
  removeProfileImageAction,
  selectDocumentAction,
  signupFailure,
} from '../actions/authAction';
import * as ActionTypes from '../actionTypes';
import axios from 'axios';
import {auth} from '../../database/firebaseConfig';

function* loginUserAPISaga(action) {
  try {
    const {authorizedPerson, password} = action.payload;
    const user = yield call(loginUser, authorizedPerson, password);
    yield put(setUserAction(user));
  } catch (error) {
    console.log('ERROR LOG IN:', error);
  }
}

function* signupUserSaga(action) {
  try {
    const {email, password} = action.payload;
    yield call(() => auth.createUserWithEmailPassword(email, password));
    yield put(signupSuccess());
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}

function* loginUserSaga(action) {
  try {
    const {email, password} = action.payload;
    const userCredential = yield call(() =>
      auth.signInWithEmailAndPassword(email, password),
    );
    yield put(loginSuccess(userCredential.user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* fetchProducts() {
  try {
    const response = yield axios.get('https://fakestoreapi.com/products');
    yield put({type: ActionTypes.fetchProductsSuccess, payload: response.data});
  } catch (error) {
    yield put({type: ActionTypes.fetchProductsFailure, error});
  }
}

function* increaseQuantitySaga(action) {
  try {
    yield put(ActionTypes.increaseQuantity(action.payload));
  } catch (error) {
    console.log('ERROR:', error);
  }
}

function* decreaseQuantitySaga(action) {
  try {
    yield put(ActionTypes.decreaseQuantity(action.payload));
  } catch (error) {
    console.log('ERROR:', error);
  }
}

function* addToWishlistSaga(action) {
  try {
    yield put({type: ActionTypes.addToWishlist, payload: action.payload});
  } catch (error) {
    console.log('ERROR:', error);
  }
}

function* removeFromWishlistSaga(action) {
  try {
    yield put({type: ActionTypes.removeFromWishlist, payload: action.payload});
  } catch (error) {
    console.log('ERROR:', error);
  }
}

function* updateProfileImageSaga(action) {
  try {
    yield put(updateProfileImageAction(action.payload));
    console.log('success');
  } catch (error) {
    console.error('Error updating profile image:', error);
  }
}

function* removeProfileImageSaga() {
  try {
    yield put(removeProfileImageAction());
  } catch (error) {
    console.error('Error removing profile image:', error);
  }
}
function* selectDocumentSaga(action) {
  try {
    yield put(selectDocumentAction(action.payload));
  } catch (error) {
    console.log('Error picking document', error);
  }
}
function* authSagas() {
  yield takeLatest(ActionTypes.loginUser, loginUserAPISaga);
  yield takeLatest(ActionTypes.signupRequest, signupUserSaga);
  yield takeLatest(ActionTypes.loginRequest, loginUserSaga);
  yield takeLatest(ActionTypes.fetchProducts, fetchProducts);
  yield takeLatest(ActionTypes.increaseQuantity, increaseQuantitySaga);
  yield takeLatest(ActionTypes.decreaseQuantity, decreaseQuantitySaga);
  yield takeLatest(ActionTypes.addToWishlist, addToWishlistSaga);
  yield takeLatest(ActionTypes.removeFromWishlist, removeFromWishlistSaga);
  yield takeLatest(ActionTypes.updateProfileImage, updateProfileImageSaga);
  yield takeLatest(ActionTypes.removeProfileImage, removeProfileImageSaga);
  yield takeLatest(ActionTypes.uploadDocument, selectDocumentSaga);
}

export default authSagas;
