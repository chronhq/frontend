import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  browserHistory
} from 'react-router-dom';
import { ConnectedFlagsProvider } from 'flag';
import { loadListOfCourses } from './reducers/actions';
import configureStore from './store/configureStore';
import { YMInitializer } from 'react-yandex-metrika';

//import external styles
import 'font-awesome/less/font-awesome.less';
import 'bootstrap/less/bootstrap.less';

import AppRouter from './routes';

// Yandex Metrika id
const YmId = (process.env.NODE_ENV === 'production') ? [42857239, 42866674] : [42866674];
// ym.init([42857239]); <- Alice id
// ym.init([42866674]); <- Padavan id

const store = configureStore();

store.dispatch(loadListOfCourses());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConnectedFlagsProvider>
        <YMInitializer
          accounts={YmId}
          options={{ defer: true }}
          version="2"
          options={{
            clickmap: true,
            trackLinks: true,
            // accurateTrackBounce: true,
            // webvisor: true,
            // trackHash: true,
          }}
        >
          <AppRouter />
        </YMInitializer>
      </ConnectedFlagsProvider>
    </Router>
  </Provider>, document.getElementById('root'));
