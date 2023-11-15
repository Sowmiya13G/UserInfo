import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Reducers
import authReducer from './reducers/authReducer';
import authSagas from './sagas/authSagas';

const rootReducer = combineReducers({
  user: authReducer,
  auth: authReducer,
  products: authReducer,
  cart: authReducer,
  wishlist: authReducer,
  profileImage: authReducer,
  document: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'data', 'products'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(authSagas);

export {store, persistor};
