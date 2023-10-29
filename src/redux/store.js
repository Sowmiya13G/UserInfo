import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {combineReducers} from 'redux';
import authReducer from './reducers/authReducer';
import authSagas from './sagas/authSagas';

const rootReducer = combineReducers({
  user: authReducer,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSagas);

export default store;

// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import authReducer from './reducers/authReducer';
// import thunk from 'redux-thunk';

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
