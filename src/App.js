import React, { Component } from 'react';
import 'bootstrap/less/bootstrap.less';

import { Flag } from 'flag';

import CourseSelection from './containers/CourseSelection';
import UI from './containers/UI';

import DevTools from './DevTools';
import './App.less';

class App extends Component {
  render() {
    return (
      <div>
        <Flag
          name="CourseSelection"
          render={() => <CourseSelection />}
          fallbackRender={() => <UI />}
        />
        <Flag
          name="devTools"
          render={() => <DevTools />}
        />
      </div>
    );
  }
}


export default App;
