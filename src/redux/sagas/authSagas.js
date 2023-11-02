import {call, put, takeLatest} from 'redux-saga/effects';
import {loginUser} from '../../apiServices';
import {setUserAction, loginFailure} from '../actions/authAction';
import * as ActionTypes from '../actionTypes';
import axios from 'axios';
function* loginUserAPISaga(action) {
  try {
    const {authorizedPerson, password} = action.payload;
    const user = yield call(loginUser, authorizedPerson, password);
    yield put(setUserAction(user));
  } catch (error) {
    console.log('ERROR LOG IN:', error);
  }
}
function* loginUserSaga(action) {
  try {
    const {email, password} = action.payload;
    const userCredential = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password,
    );
    const user = userCredential.user;
    yield put(loginSuccess(user));
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
function* authSagas() {
  yield takeLatest(ActionTypes.loginUser, loginUserAPISaga);
  yield takeLatest(ActionTypes.loginRequest, loginUserSaga);
  yield takeLatest(ActionTypes.fetchProducts, fetchProducts);
  yield takeLatest(ActionTypes.increaseQuantity, increaseQuantitySaga);
  yield takeLatest(ActionTypes.decreaseQuantity, decreaseQuantitySaga);
}

export default authSagas;
