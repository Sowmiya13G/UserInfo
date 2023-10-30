import {call, put, takeLatest} from 'redux-saga/effects';
import {loginUser} from '../../apiServices';
import {setUserAction, loginFailure} from '../actions/authAction';

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

function* authSagas() {
  yield takeLatest('LOGIN_USER', loginUserAPISaga);
  yield takeLatest('LOGIN_REQUEST', loginUserSaga);
}

export default authSagas;
