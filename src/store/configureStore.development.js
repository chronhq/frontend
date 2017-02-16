import { applyMiddleware, createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';  // eslint-disable-line
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import DevTools from '../DevTools';

import applyProjectionSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [promiseMiddleware(), sagaMiddleware];
const enhancer = compose(
  applyMiddleware(...middleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }
  sagaMiddleware.run(applyProjectionSaga);

  return store;
}
