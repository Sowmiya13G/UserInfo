import * as ActionTypes from '../actionTypes';

const initialState = {
  authorizedPerson: null,
  user: null,
  error: null,
  profileImage: null,
  document: null,
};

const dataReducer = (state = initialState, action) => {
  console.log('Action received:', action);
  switch (action.type) {
    case ActionTypes.saveProfileData:
      return {
        ...state,
        profileImage: action.payload.profileImage,
        document: action.payload.document,
      };

    case ActionTypes.updateProfileImage:
      return {
        ...state,
        profileImage: action.payload,
      };

    case ActionTypes.removeProfileImage:
      return {
        ...state,
        profileImage: null,
      };
    case ActionTypes.uploadDocument:
      return {
        ...state,
        document: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
