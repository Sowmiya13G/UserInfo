import {call, put, takeLatest} from 'redux-saga/effects';
import {signupUser, loginUser} from '../../apiServices';
import {setUserAction} from '../actions/userActions';

function* signupUserSaga(action) {
  try {
    const {authorizedPerson, password} = action.payload;
    const user = yield call(signupUser, authorizedPerson, password);
    yield put(setUserAction(user));
  } catch (error) {
    console.log(error);
  }
}

function* loginUserSaga(action) {
  try {
    const {authorizedPerson, password} = action.payload;
    const user = yield call(loginUser, authorizedPerson, password);
    yield put(setUserAction(user));
  } catch (error) {
    console.log(error);
  }
}

function* authSagas() {
  yield takeLatest('SIGNUP_USER', signupUserSaga);
  yield takeLatest('LOGIN_USER', loginUserSaga);
}

export default authSagas;
