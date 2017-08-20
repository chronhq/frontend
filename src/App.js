import React, { Component } from 'react';
import 'bootstrap/less/bootstrap.less';

import { Flag } from 'flag';

import CourseSelection from './containers/CourseSelection';
import MapViewport from './containers/MapViewport';
import UI from './components/SidePanel';
// import TimePanel from './components/TimePanel';
import MapControls from './components/MapControls';
import MapClickInfo from './components/MapClickInfo';

import DevTools from './DevTools';
import './App.less';

class App extends Component {
  render() {
    return (
      <div>
        <Flag
          name="CourseSelection"
          render={() => <CourseSelection />}
          fallbackRender={() => (
            <div className='content'>
              <UI />
              <MapClickInfo />
              <MapControls />
              <MapViewport />
            </div>
          )}
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