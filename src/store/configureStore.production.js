import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(promiseMiddleware());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
