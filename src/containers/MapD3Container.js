import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';


export default class MapD3Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: d3.geoPath().projection(d3.geoAlbersUsa()),
      geoData: [],
    };
  }

  componentWillMount() {
    this.loadRawData();
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
