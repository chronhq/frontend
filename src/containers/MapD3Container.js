import React, { Component } from 'react';
import d3 from 'd3';
import * as topojson from 'topojson-client';


export default class MapD3Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: d3.geo.path().projection(d3.geo.albersUsa()),
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
      <div id="datamap-container"><svg className='svgMap'><g><path d={this.state.geoData} /></g></svg></div>
    );
  }
}
