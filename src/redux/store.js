import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productsReducer';
import dataReducer from './reducers/dataReducer';
import authSagas from './sagas/authSagas';

const rootReducer = combineReducers({
  user: authReducer,
  auth: authReducer,
  products: productReducer,
  cart: productReducer,
  wishlist: productReducer,
  profileImage: dataReducer,
  document: dataReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(authSagas);

export {store};
