// export const login = user => {
//   return {
//     type: 'LOGIN',
//     payload: user,
//   };
// };

// export const logout = () => {
//   return {
//     type: 'LOGOUT',
//   };
// };

export const signupUserAction = (authorizedPerson, password) => ({
  type: 'SIGNUP_USER',
  payload: {authorizedPerson, password},
});

export const loginUserAction = (authorizedPerson, password) => ({
  type: 'LOGIN_USER',
  payload: {authorizedPerson, password},
});

export const setUserAction = user => ({
  type: 'SET_USER',
  payload: user,
});
export const logoutUserAction = () => ({
  type: 'LOGOUT_USER',
});
