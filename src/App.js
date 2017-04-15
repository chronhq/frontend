import React, { Component } from 'react';
import { connect } from 'react-redux';
import { YMInitializer } from 'react-yandex-metrika';
import 'bootstrap/less/bootstrap.less';

import LoadingScreen from './containers/LoadingScreen';
import MapViewport from './containers/MapViewport';
import SidePanel from './components/SidePanel';
import TimePanel from './components/TimePanel';
import Navigation from './components/Navigation';

import DevTools from './DevTools';
import './App.less';

class App extends Component {
  render() {
    return (
      <div>
        { this.props.ready ?
          <div className='content'>
            {process.env.NODE_ENV === 'production' && <YMInitializer accounts={[42866674]} options={{ defer: true }} />}
            <SidePanel />
            <TimePanel />
            <Navigation />
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
