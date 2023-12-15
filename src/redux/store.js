import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Reducers
import authReducer from './reducers/authReducer';
import authSagas from './sagas/authSagas';
import medReducer from './reducers/medReducer';
const rootReducer = combineReducers({
  user: authReducer,
  auth: authReducer,
  med: medReducer,
  products: authReducer,
  cart: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'user',
    'auth',
    'textInputValue',
    'data',
    'products',
    'cart',
    'wishlist',
    'profileImage',
    'document',
    'selectedUnit',
    'multiChoiceOptions',
    'med',
    'bloodSugarControl',
    'medicationDetails',
    'medicationStatus',
    'sinceHowLong',
    'healthCondition',
    'frequency',
    'selectType',
    'smokeOrTobacco',
    'textInputFrequency',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(authSagas);

export {store, persistor};
