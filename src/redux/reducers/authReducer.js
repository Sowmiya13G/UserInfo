const initialState = {
  authorizedPerson: null,
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
    default:
      return state;
  }
};

export default authReducer;
