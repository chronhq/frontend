import React, { Component } from 'react';
import { Flag } from 'flag';

import RouterMiddleware from './containers/CourseSelection/RouterMiddleware';
import UI from './containers/UI';

import DevTools from './DevTools';
import './App.less';

const App = ({ match }) => (
  <div>
    <Flag
      name="CourseSelection"
      render={() => <RouterMiddleware id={match.params.id} />}
      // render={() => <CourseSelection />}
      fallbackRender={() => <UI />}
    />
    <Flag
      name="devTools"
      render={() => <DevTools />}
    />
  </div>
);

export default App;
