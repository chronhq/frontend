import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/less/bootstrap.less';

import LoadingScreen from './containers/LoadingScreen';
import MapD3Container from './containers/MapD3Container';
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
            <SidePanel />
            <TimePanel />
            <Navigation />
            <MapD3Container />
          </div>
        : <LoadingScreen /> }
        <DevTools />
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
