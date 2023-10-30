const initialState = {
  authorizedPerson: null,
  error: null,
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
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authorizedPerson: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        authorizedPerson: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
