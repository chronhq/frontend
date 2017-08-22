import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  browserHistory
} from 'react-router-dom';
import { ConnectedFlagsProvider, Flag } from 'flag';

import configureStore from './store/configureStore';

// import App from './App';
import AppRouter from './routes';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConnectedFlagsProvider>
        <AppRouter />
      </ConnectedFlagsProvider>
    </Router>
  </Provider>, document.getElementById('root'));
