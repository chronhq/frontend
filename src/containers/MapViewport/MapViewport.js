import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as d3 from 'd3';
import { getBordersFromState } from '../../reducers/actions';
import Locations from '../Locations';
import PatternsDefs, { getFillPatternId } from '../../components/SVGPatternsDefs';
import SizeMeter from './SizeMeter';
import LoadingWidget from './LoadingWidget';
import { changeScale } from '../../reducers/runtime/mapView';
import { setClickInfo } from '../../reducers/runtime/status';

import './MapViewport.less';

const TerrainMap = ({ terrain }) => (
  <g className='svgMapTerrain' key='terrain'>
    {Object.keys(terrain).map(continentId => (
      <path
        key={`terrain_${continentId}}`}
        d={terrain[continentId]}
      />
    ))
  }
  </g>
);

const BordersMap = ({ borders, loaded, visible, setClickInfo }) => (
  <g className='svgMapBorders'>
    {(visible && loaded === true
      && borders.map((border) => (
        <path
          key={`borders_na_${border.id}`}
          d={border.d}
          fill={`url(#${getFillPatternId(border.props)})`}
          onClick={() => setClickInfo('border', border.props)}
        />
      )))}
  </g>
);

class Map extends Component {
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
    widgetTransform: 'translate(0,0)',
    transform: { k: 1, x: 0, y: 0 }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.resize());
    this.resize();
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

    if (Math.round(this.state.transform.k) !== nextProps.scale
    && nextProps.buttonZoom ) {
      nextState.transform.k = nextProps.scale;
    }
    if (nextProps.resetFlag === true) {
      nextState.transform.x = 0;
      nextState.transform.y = 0;
      nextState.transform.k = this.state.defaultZoom();
    }
    this.setState({ ...nextState });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize());
  }

  resize = () => {
    const x = this.width > 768 ? 100 : 60;
    const y = this.width > 768 ? this.height - 100 : this.height - 100;
    this.setState({ widgetTransform: `translate(${x}, ${y})` });
  }

  onZoom = () => {
    if (this.state.transform !== null
    && Math.round(this.state.transform.k) !== Math.round(d3.event.transform.k)) {
      this.props.changeScale(Math.round(d3.event.transform.k), false);
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
          bordersData={this.props.b.properties}
          colorsData={this.props.landOwnershipColors}
        />
        <g transform={this.transform}>
          <TerrainMap
            terrain={this.props.terrain}
          />
          <BordersMap
            visible={this.props.b.visible}
            loaded={this.props.b.loaded}
            borders={this.props.b.borders}
            setClickInfo={this.props.setClickInfo}
          />
          <Locations />
        </g>
        <g transform={this.state.widgetTransform}>
          <SizeMeter zoom={this.scale} height={this.height} />
          <LoadingWidget />
        </g>
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return { terrain: state.terrain.projected,
    landOwnershipColors: state.runtime.status.landOwnershipColors,
    scale: state.runtime.mapView.scale,
    resetFlag: state.runtime.mapView.reset,
    rotation: state.runtime.mapView.rotation,
    buttonZoom: state.runtime.mapView.buttonZoom,
    b: {
      visible: state.runtime.visibility.borders,
      loaded: state.borders.loaded,
      borders: state.runtime.bordersData.borders,
      properties: state.runtime.bordersData.properties
    }
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeScale: bindActionCreators(changeScale, dispatch),
    setClickInfo: bindActionCreators(setClickInfo, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
