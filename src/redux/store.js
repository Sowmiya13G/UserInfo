import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import authSagas from './sagas/authSagas';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: authReducer,
  auth: authReducer,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSagas);

export default store;
