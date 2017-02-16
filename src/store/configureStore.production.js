import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

import applyProjectionSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(promiseMiddleware(), sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(applyProjectionSaga);
  return store;
}
