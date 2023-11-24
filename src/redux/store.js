import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Reducers
import authReducer from './reducers/authReducer';
import authSagas from './sagas/authSagas';
import medReducer from './reducers/medReducer';
const rootReducer = combineReducers({
  // user: authReducer,
  auth: authReducer,
  products: authReducer,
  cart: authReducer,
  wishlist: authReducer,
  profileImage: authReducer,
  document: authReducer,
  user: medReducer,
  smokeOrTobacco: medReducer,
  selectType: medReducer,
  frequency: medReducer,
  healthCondition: medReducer,
  sinceHowLong: medReducer,
  medicationStatus: medReducer,
  medicationDetails: medReducer,
  bloodSugarControl: medReducer,
  selectedUnit: medReducer,
  multiChoiceOptions: medReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'user',
    'auth',
    'data',
    'products',
    'wishlist',
    'profileImage',
    'document',
    'cart',
    'selectedUnit',
    'multiChoiceOptions',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(authSagas);

export {store, persistor};
