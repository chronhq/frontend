import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(promiseMiddleware(), sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagas.map(saga => sagaMiddleware.run(saga));
  return store;
}
