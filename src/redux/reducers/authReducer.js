const initialState = {
  authorizedPerson: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_USER':
      return {...state, authorizedPerson: action.payload};
    case 'LOGIN_USER':
      return {...state, authorizedPerson: action.payload};
    case 'SET_USER':
      return {...state, authorizedPerson: action.payload};
    case 'LOGOUT_USER':
      return {...state, authorizedPerson: null};
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
