import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(promiseMiddleware(), thunkMiddleware());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
