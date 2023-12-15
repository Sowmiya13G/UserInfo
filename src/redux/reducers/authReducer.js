import * as ActionTypes from '../actionTypes';
const initialState = {
  authorizedPerson: null,
  user: null,
  error: null,
  profileImage: null,
  document: null,
  products: [],
  cart: [],
  wishlist: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //AP login
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
    //profileScreen
    case ActionTypes.saveProfileData:
      return {
        ...state,
        profileImage: action.payload.profileImage,
        document: action.payload.document,
      };
    case ActionTypes.clearUserData:
      return {
        ...initialState,
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
    //Products
    case ActionTypes.fetchProductsSuccess:
      return {...state, products: action.payload};
    //Cart
    case ActionTypes.addToCart:
      const existingProductIndex = state.cart.findIndex(
        item => item.id === action.payload.id,
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        return {...state, cart: updatedCart};
      } else {
        return {...state, cart: [action.payload, ...state.cart]};
      }

    case ActionTypes.removeFromCart:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.id),
      };
    case ActionTypes.clearCart:
      return {...state, cart: []};

    case ActionTypes.increaseQuantity: {
      const {id} = action.payload;
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === id ? {...item, quantity: item.quantity + 1} : item,
        ),
      };
    }

    case ActionTypes.decreaseQuantity: {
      const {id} = action.payload;
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 0 ? item.quantity - 1 : 0,
              }
            : item,
        ),
      };
    }
    //Wishlist
    case ActionTypes.addToWishlist:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case ActionTypes.removeFromWishlist:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default authReducer;

// case ActionTypes.addToCart:
// ToastAndroid.show(`${action.payload}`, ToastAndroid.SHORT);
// const dataCart = state.cart || [];
// console.log('dataCart', dataCart);
// const existingProductIndex = dataCart.findIndex(
//   item => item.id === action.payload.id,
// );
// if (existingProductIndex !== -1) {
//   const updatedCart = [...state.cart];
//   updatedCart[existingProductIndex] = {
//     ...updatedCart[existingProductIndex],
//     quantity: updatedCart[existingProductIndex].quantity + 1,
//   };
//   return {...state, cart: updatedCart};
// } else {
//   return {...state, cart: [action.payload, ...state.cart]};
// }

// case ActionTypes.addToCart:
//   return {...state, cart: [action.payload, ...state.cart]};
