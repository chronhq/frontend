import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Locations from './Locations';
import { askBackend } from '../reducers/actions';

class MapD3Container extends Component {
  componentDidMount() {
    this.props.askBackend('LOCATIONS');
    this.props.askBackend('LOCATIONS_TIMELINE');
    this.props.askBackend('TERRAIN');
  }

  render() {
    return (
      <svg className='svgMap' transform="scale(2)">
        <g className='svgMapTerrain' key='terrain' strokeWidth="0.6" >
          <path d={this.props.terrain.projected} />
        </g>
        <Locations />
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return { terrain: state.terrain,
    borders: {
      current: state.timeline.borders.current,
      byId: state.borders,
    },
    territories: state.territories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    askBackend: bindActionCreators(askBackend, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapD3Container);
