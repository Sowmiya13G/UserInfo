// // authReducer.js

// const initialState = {
//   user: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         ...state,
//         user: {
//           ...state.user,
//           email: action.payload.email,
//         },
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.payload};
    case 'LOGOUT_USER':
      return {...state, user: null};
    default:
      return state;
  }
};

export default authReducer;
