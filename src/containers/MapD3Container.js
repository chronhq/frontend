import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Locations from './Locations';
import { askBackend } from '../reducers/actions';

import './MapD3Container.less';

class MapD3Container extends Component {
  state = {
    zoomInitted: false,
    transform: null
  }
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
  componentDidUpdate() {
    if (!this.state.zoomInitted) {
      const svg = d3.select(this.svgMap);

      svg.call(this.zoom);

      this.setState({
        zoomInitted: true
      });
    }
  }

  onZoom = () => {
    this.setState({
      transform: d3.event.transform
    });
  }

  zoom = d3.zoom()
    .scaleExtent([0.5, 10])
    .on('zoom', this.onZoom);

  get transform() {
    if (this.state.transform) {
      const { x, y, k } = this.state.transform;
      return `translate(${x}, ${y}) scale(${k})`;
    }
    return null;
  }

  render() {
    return (
      <svg className='svgMap' ref={(r) => { this.svgMap = r; }}>
        <g transform={this.transform}>
          <g className='svgMapTerrain' key='terrain'>
            {Object.keys(this.props.terrain).map(
              continent => (
                this.props.terrain[continent].map((border, borderId) => (
                  <path
                    key={`terrain_${continent}_${this.props.terrainData[continent].features[borderId].properties.name}`}
                    d={border}
// fill={this.color(this.props.terrainData[continent].features[borderId].properties.mapcolor13)}
                  />
                ))
              ))
            }
          </g>
          { (this.props.visibility.borders
            && this.props.bordersLoaded === true)
            && <g className='svgMapBorders'>
              {Array.isArray(this.props.borders) && this.props.borders.map((border, borderId) => (
                <path
                  key={`borders_na_${borderId}_${this.props
                    .bordersData.features[borderId].properties.name}`}
                  d={border}
                  fill={this.props
                    .color(this.props
                      .bordersData.features[borderId]
                        .properties.mapcolor13)}
                />
              ))
            }
            </g>
          }
          <Locations />
        </g>
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return { terrain: state.terrain.projected,
    terrainData: state.terrain.byContinent,
    visibility: state.visibility,
    color: state.projection.color,
    bordersLoaded: state.borders.loaded,
    borders: state.timeline.borders.current !== ''
      ? state.borders.projected[state.timeline.borders.current]
      : [],
    bordersData: state.timeline.borders.current !== ''
      ? state.borders.byYear[state.timeline.borders.current]
      : [],
    territories: state.territories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    askBackend: bindActionCreators(askBackend, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapD3Container);
