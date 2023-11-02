import * as ActionTypes from '../actionTypes';

const initialState = {
  authorizedPerson: null,
  error: null,
  products: [],
  cart: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.signupUser:
      return {...state, authorizedPerson: action.payload};
    case ActionTypes.loginUser:
      return {...state, authorizedPerson: action.payload};
    case ActionTypes.setUSer:
      return {...state, authorizedPerson: action.payload};
    case ActionTypes.logoutUser:
      return {...state, authorizedPerson: null};
    case ActionTypes.loginSuccess:
      return {
        ...state,
        authorizedPerson: action.payload,
        error: null,
      };
    case ActionTypes.loginFailure:
      return {
        ...state,
        authorizedPerson: null,
        error: action.payload,
      };
    case ActionTypes.fetchProductsSuccess:
      return {...state, products: action.payload};
    case ActionTypes.addToCart:
      return {...state, cart: [...state.cart, action.payload]};
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

    default:
      return state;
  }
};

export default authReducer;
