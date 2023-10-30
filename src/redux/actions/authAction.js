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
export const login = user => {
  return {
    type: 'LOGIN',
    payload: user,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
