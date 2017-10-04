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

// import App from './App';
import AppRouter from './routes';


const store = configureStore();

store.dispatch(loadListOfCourses());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConnectedFlagsProvider>
        <AppRouter />
      </ConnectedFlagsProvider>
    </Router>
  </Provider>, document.getElementById('root'));
