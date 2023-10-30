export const loginUserAction = (authorizedPerson, password) => ({
  type: 'LOGIN_USER',
  payload: {authorizedPerson, password},
});
export const signupUserAction = (authorizedPerson, password) => ({
  type: 'SIGNUP_USER',
  payload: {authorizedPerson, password},
});

export const setUserAction = authorizedPerson => ({
  type: 'SET_USER',
  payload: authorizedPerson,
});
export const logoutUserAction = () => ({
  type: 'LOGOUT_USER',
});
//Firebase login
export const loginRequest = (authorizedPerson, password) => ({
  type: 'LOGIN_REQUEST',
  payload: {authorizedPerson, password},
});

export const loginSuccess = authorizedPerson => ({
  type: 'LOGIN_SUCCESS',
  payload: authorizedPerson,
});

export const loginFailure = error => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});
