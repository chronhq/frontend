import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import App from './App';
// import NotFound from './'

const AppRouter = () => (
  <div>
    <Switch>
      <Route exact path='/' render={() => <App />} />
      {/* <Route path='/course1' component={} /> */}
      {/* <Route render={NotFound} /> */}
    </Switch>
  </div>
);

export default AppRouter;
