import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/less/bootstrap.less';

import LoadingScreen from './containers/LoadingScreen';
import MapViewport from './containers/MapViewport';
import SidePanel from './components/SidePanel';
import TimePanel from './components/TimePanel';
import MapControls from './components/MapControls';
import MapClickInfo from './components/MapClickInfo';

import DevTools from './DevTools';
import './App.less';

class App extends Component {
  render() {
    return (
      <div>
        { this.props.ready ?
          <div className='content'>
            <SidePanel />
            <TimePanel />
            <MapClickInfo />
            <MapControls />
            <MapViewport />
          </div>
        : <LoadingScreen /> }
        {process.env.NODE_ENV === 'development'
          && <DevTools />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ready: state.status.ready
  };
}
export default connect(mapStateToProps)(App);
