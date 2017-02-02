import { applyMiddleware, createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';  // eslint-disable-line
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';
import DevTools from '../DevTools';

const enhancer = compose(
  applyMiddleware(promiseMiddleware()),
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

  return store;
}
