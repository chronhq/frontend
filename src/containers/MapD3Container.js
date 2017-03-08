import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Locations from './Locations';
import PatternsDefs, { getPatternId } from '../components/SVGPatternsDefs';

import './MapD3Container.less';

const TerrainMap = ({ terrain, terrainData }) => (
  <g className='svgMapTerrain' key='terrain'>
    {Object.keys(terrain).map(
    continent => (
      terrain[continent].map((border, borderId) => (
        <path
          key={`terrain_${continent}_${terrainData[continent].features[borderId].properties.name}`}
          d={border}
        />
      ))
    ))
  }
  </g>
);

const BordersMap = ({ borders, bordersData, loaded, visible }) => (
  <g className='svgMapBorders'>
    {(visible && loaded === true
      && Array.isArray(borders))
      && bordersData.features.map((border, borderId) => (
        <path // There is no uniq key in properties
          key={`borders_na_${border.properties.name.replace(/\s/g, '_')}_${borderId}`}
          d={borders[borderId]}
          fill={`url(#${getPatternId(border)})`}
        />
      ))}
  </g>
);

class MapD3Container extends Component {
  defaultProps = {
    b: {
      bordersData: { features: [] },
      borders: [],
      loaded: false,
      visible: false
    },
    terrain: [],
    terrainData: []
  }
  state = {
    zoomInitted: false,
    transform: null
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
        <PatternsDefs
          bordersData={this.props.b.bordersData}
          color={this.props.color}
        />
        <g transform={this.transform}>
          <TerrainMap
            terrain={this.props.terrain}
            terrainData={this.props.terrainData}
          />
          <BordersMap
            visible={this.props.b.visible}
            loaded={this.props.b.loaded}
            borders={this.props.b.borders}
            bordersData={this.props.b.bordersData}
          />
          <Locations />
        </g>
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return { terrain: state.terrain.projected,
    terrainData: state.terrain.byContinent,
    color: state.projection.color,
    b: {
      visible: state.visibility.borders,
      loaded: state.borders.loaded,
      borders: state.timeline.borders.current !== ''
        ? state.borders.projected[state.timeline.borders.current]
        : [],
      bordersData: state.timeline.borders.current !== ''
        ? state.borders.byYear[state.timeline.borders.current]
        : { features: [] }
    },
    territories: state.territories
  };
}

export default connect(mapStateToProps)(MapD3Container);
