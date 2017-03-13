import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as d3 from 'd3';
import Locations from './Locations';
import PatternsDefs, { getPatternId } from '../components/SVGPatternsDefs';
import SizeMeter from '../components/SizeMeter';
import { changeScale } from '../reducers/mapView';

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
    defaultZoom: () => window.innerWidth / 1000,
    zoomInitted: false,
    transform: { k: 1, x: 0, y: 0 }
  }

  componentDidMount() {
    if (!this.state.zoomInitted) {
      const svg = d3.select(this.svgMap);
      svg.call(this.zoom);
      svg.call(this.zoom.transform, d3.zoomIdentity.scale(this.state.defaultZoom()));
      this.setState({
        zoomInitted: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextState = this.state;

    if (Math.round(this.state.transform.k) !== nextProps.scale) {
      nextState.transform.k = nextProps.scale;
    }
    if (nextProps.resetFlag === true) {
      nextState.transform.x = 0;
      nextState.transform.y = 0;
      nextState.transform.k = this.state.defaultZoom();
    }
    this.setState({ ...nextState });
  }

  onZoom = () => {
    if (this.state.transform !== null
    && Math.round(this.state.transform.k) !== Math.round(d3.event.transform.k)) {
      this.props.changeScale(Math.round(d3.event.transform.k));
    }
    this.setState({
      transform: d3.event.transform
    });
  }

  zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on('zoom', this.onZoom);

  get scale() {
    if (this.state.transform) return this.state.transform.k;
    return 1;
  }

  get height() {
    if (typeof this.svgMap !== 'undefined' && this.svgMap !== null
      && 'clientHeight' in this.svgMap) {
      return this.svgMap.clientHeight;
    }
    return 0;
  }

  get width() {
    if (typeof this.svgMap !== 'undefined' && this.svgMap !== null
      && 'clientWidth' in this.svgMap) {
      return this.svgMap.clientWidth;
    }
    return 0;
  }

  get rotation() {
    // Do not try to rotate relying on transform x and y
    const y = (this.height / 2); // + this.state.transform.y || 0;
    const x = (this.width / 2); // + this.state.transform.x || 0;
    console.log(`${this.props.rotation} ${x} ${y}`);
    return `${this.props.rotation} ${x} ${y}`;
  }

  get transform() {
    if (this.state.transform) {
      const { x, y, k } = this.state.transform;
      return `translate(${x}, ${y}) scale(${k}) rotate(${this.rotation})`;
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
        <SizeMeter zoom={this.scale} height={this.height} />
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return { terrain: state.terrain.projected,
    terrainData: state.terrain.byContinent,
    color: state.projection.color,
    scale: state.mapView.scale,
    resetFlag: state.mapView.reset,
    rotation: state.mapView.rotation,
    b: {
      visible: state.visibility.borders,
      loaded: state.borders.loaded,
      borders: state.timeline.borders.current !== ''
        ? state.borders.projected[state.timeline.borders.current]
        : [],
      bordersData: state.timeline.borders.current !== ''
        ? state.borders.byYear[state.timeline.borders.current]
        : { features: [] }
    }
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeScale: bindActionCreators(changeScale, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapD3Container);
