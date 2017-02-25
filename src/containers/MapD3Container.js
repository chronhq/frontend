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
    this.props.askBackend('BORDERS');
    this.props.askBackend('BORDERS_TIMELINE');
    this.props.askBackend('FACTS');
    this.props.askBackend('FACTS_TIMELINE');
    this.props.askBackend('PERSONS');
    this.props.askBackend('PERSONS_TIMELINE');
    this.props.askBackend('PERSONS_FACTS');
  }

  render() {
    return (
      <svg className='svgMap'>
        <g className='svgMapTerrain' key='terrain' strokeWidth="0.6" >
          <path d={this.props.terrain.projected} />
        </g>
        { this.props.visibility.borders && <g>
          <path className='svgMapBorders' d={this.props.borders} />
        </g>
         }
        <Locations />
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return { terrain: state.terrain,
    visibility: state.visibility,
    borders: state.timeline.borders.current !== ''
      ? state.borders.projected[state.timeline.borders.current]
      : '',
    territories: state.territories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    askBackend: bindActionCreators(askBackend, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapD3Container);
