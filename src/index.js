import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedFlagsProvider, Flag } from 'flag';

import configureStore from './store/configureStore';

import App from './App';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedFlagsProvider>
      <App />
    </ConnectedFlagsProvider>
  </Provider>, document.getElementById('root'));
