import {call, put, takeLatest} from 'redux-saga/effects';
import {loginUser} from '../../apiServices';
import {
  setUserAction,
  loginFailure,
  loginSuccess,
  signupFailure,
  signupSuccess,
  increaseQuantityAction,
  decreaseQuantityAction,
  addToCartAction,
  removeFromCartAction,
  addToWishlistAction,
  removeFromWishlistAction,
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

function* authSagas() {
  yield takeLatest(ActionTypes.loginUser, loginUserAPISaga);
  yield takeLatest(ActionTypes.signupRequest, signupUserSaga);
  yield takeLatest(ActionTypes.loginRequest, loginUserSaga);
  yield takeLatest(ActionTypes.fetchProducts, fetchProducts);
}

export default authSagas;
