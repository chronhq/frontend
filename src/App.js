import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingScreen from './containers/LoadingScreen';
import MapD3Container from './containers/MapD3Container';
import SidePanel from './components/SidePanel';
import TimePanel from './components/TimePanel';

import DevTools from './DevTools';

class App extends Component {
  render() {
    return (
      <div>
        { this.props.ready ?
          <div className='content'>
            <SidePanel />
            <TimePanel />
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
