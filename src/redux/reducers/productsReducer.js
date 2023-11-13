import * as ActionTypes from '../actionTypes';

const initialState = {
  error: null,
  products: [],
  cart: [],
  wishlist: [],
};

const productReducer = (state = initialState, action) => {
  console.log('Action received:', action);
  switch (action.type) {
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

    case ActionTypes.addToWishlist:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case ActionTypes.removeFromWishlist:
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload),
      };

    default:
      return state;
  }
};

export default productReducer;
