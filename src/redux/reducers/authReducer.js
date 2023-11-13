import * as ActionTypes from '../actionTypes';

const initialState = {
  authorizedPerson: null,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  console.log('Action received:', action);
  switch (action.type) {
    case ActionTypes.signupUser:
      return {...state, authorizedPerson: action.payload};
    case ActionTypes.loginUser:
      return {...state, authorizedPerson: action.payload};
    case ActionTypes.setUSer:
      return {...state, authorizedPerson: action.payload};
    case ActionTypes.logoutUser:
      return {...state, authorizedPerson: null};
    //Firebase signup
    case ActionTypes.signupSuccess:
      return {...state, user: action.payload, error: null};
    case ActionTypes.signupFailure:
      return {...state, user: null, error: action.payload};
    //Firebase login
    case ActionTypes.loginSuccess:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case ActionTypes.loginFailure:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case ActionTypes.saveProfileData:
      return {
        ...state,
        profileImage: action.payload.profileImage,
        document: action.payload.document,
      };
    default:
      return state;
  }
};

export default authReducer;
