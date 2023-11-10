import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import authSagas from './sagas/authSagas';

const rootReducer = combineReducers({
  user: authReducer,
  auth: authReducer,
  products: authReducer,
  cart: authReducer,
  wishlist: authReducer,
  profileImage: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(authSagas);

export {store};
