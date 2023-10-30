import {call, put, takeLatest} from 'redux-saga/effects';
import {loginUser} from '../../apiServices';
import {setUserAction} from '../actions/authAction';

function* loginUserSaga(action) {
  try {
    const {authorizedPerson, password} = action.payload;
    const user = yield call(loginUser, authorizedPerson, password);
    yield put(setUserAction(user));
  } catch (error) {
    console.log('ERROR LOG IN:', error);
  }
}
// function* signupUserSaga(action) {
//   try {
//     const {authorizedPerson, password} = action.payload;
//     const user = yield call(signupUser, authorizedPerson, password);
//     yield put(setUserAction(user));
//   } catch (error) {
//     console.log('ERROR SIGN UP:', error);
//   }
// }

function* authSagas() {
  yield takeLatest('LOGIN_USER', loginUserSaga);
  // yield takeLatest('SIGNUP_USER', signupUserSaga);
}

export default authSagas;
