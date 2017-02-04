import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { askBackend } from '../reducers/actions';

class MapD3Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: d3.geoPath().projection(d3.geoAlbersUsa()),
      geoData: [],
    };
  }

  componentWillMount() {
    this.loadRawData();
    this.props.askBackend('LOCATIONS');
  }

  loadRawData() {
    d3.json('static/us.json', (error, usData) => {
      console.log(error);
      console.log('us.json callback');
      this.state.geoData = this.state.path(topojson.feature(usData, usData.objects.states));
      this.forceUpdate();
    });
  }

  render() {
    return (
      <svg className='svgMap'>
        <g strokeWidth="0.6" ><path d={this.state.geoData} /></g>
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return { terrain: state.terrain,
    currentCities: state.timeline.locations.current,
    locations: state.locations,
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
