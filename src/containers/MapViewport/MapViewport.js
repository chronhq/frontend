import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Flag } from 'flag';

import { zoom, zoomIdentity } from 'd3-zoom';
import { select, event, mouse } from 'd3-selection';

import Locations from '../Locations';
import Expeditions from '../Expeditions';
import GeoPoints from '../GeoPoints';
import PatternsDefs, { getFillPatternId } from '../../components/SVGPatternsDefs';
import ScaleWidget from './ScaleWidget';
import LoadingWidget from './LoadingWidget';
import { setClickInfo, changeScale } from '../../reducers/actions';

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

const BordersMap = ({
 borders, loaded, visible, setClickInfoCb 
}) => (
  <g className='svgMapBorders'>
    {(visible && loaded === true
      && borders.map(border => (
        <path
          key={`borders_na_${border.id}`}
          d={border.d}
          fill={`url(#${getFillPatternId(border.props)})`}
          onClick={() => setClickInfoCb('border', border.props)}
        />
      )))}
  </g>
);

const SymbolsDefs = ({ symbols }) => ( // MapPics
  <g className="symbolsDefs">
    {symbols.map(mapPic => (
      <symbol id={`mapPic_${mapPic.id}`} key={`mapPic_key_${mapPic.id}`}>
        {mapPic.g.map((g, id) => (
          <path
            key={`mapPic_g_key_${mapPic.id}_${id}`}
            d={g.d}
            style={g.style}
          />))}
      </symbol>
    ))}
  </g>
);

const MapDecorations = ({ decorations }) => (
  <g className="mapDecorations">
    {decorations.map(icon => (<use
      key={`mapPic_key_${icon.id}_${icon.picId}`}
      xlinkHref={`#mapPic_${icon.picId}`}
      transform={`translate(${icon.projected.x},${icon.projected.y}) ${icon.transform}`}
    />))
    }
  </g>
);

const MapLabels = ({ labels }) => (
  <g className="mapLabels">
    {labels.map(text => (
      <text
        key={`mapLabel_key_${text.id}`}
        className={`mapLabels ${text.style}`}
        transform={`translate(${text.projected.x},${text.projected.y})`}
      >
        {text.string}
      </text>))
    }
  </g>
);

class Map extends Component {
  state = {
    defaultZoom: () => {
      const w = window.innerWidth / this.props.mapWidth;
      const h = window.innerHeight / this.props.mapHeight;
      return w > h ? h : w;
    },
    zoomInitSuccess: false,
    widgetTransform: 'translate(0,0)',
    transform: { k: 1, x: 0, y: 0 }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.resize());
    this.resize();
    if (!this.state.zoomInitSuccess) {
      const svg = select(this.svgMap);
      const projection = this.props.projection;
      const that = this;
      svg.on('mousedown.log', function() {
        const mouseXY = mouse(this);
        const coordinates = [
          (mouseXY[0] - that.state.transform.x) / that.state.transform.k,
          (mouseXY[1] - that.state.transform.y) / that.state.transform.k ];
        console.log('Projection calculated', projection.invert(coordinates));
      });
      svg.call(this.zoom);
      svg.call(this.zoom.transform, zoomIdentity
        .scale(this.state.defaultZoom())
        .translate(this.getTransformX(), this.getTransformY()));
        /* eslint-disable react/no-did-mount-set-state */
                this.setState({
                  zoomInitSuccess: true,
                });
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextState = this.state;

    if (Math.round(this.state.transform.k) !== nextProps.scale
    && nextProps.buttonZoom) {
      nextState.transform.k = nextProps.scale;
    }
    if (nextProps.resetFlag === true) {
      nextState.transform.x = this.getTransformX();
      nextState.transform.y = this.getTransformY();
      nextState.transform.k = this.state.defaultZoom();
    }
    this.setState({ ...nextState });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize());
  }

  onZoom = () => {
    if (this.state.transform !== null
    && Math.round(this.state.transform.k) !== Math.round(event.transform.k)) {
      this.props.changeScale(Math.round(event.transform.k), false);
    }
    this.setState({
      transform: event.transform
    });
  }

  getTransformX = () => this.props.mapShift[0] * this.scale;
  getTransformY = () => this.props.mapShift[1] * this.scale;

  get scale() {
    if (this.state.transform) return this.state.transform.k;
    return this.state.defaultZoom();
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

  resize = () => {
    const x = this.width > 768 ? 100 : 60;
    const y = this.width > 768 ? this.height - 100 : this.height - 100;
    this.setState({ widgetTransform: `translate(${x}, ${y})` });
  }

  zoom = zoom()
    .scaleExtent([this.props.minScale, this.props.maxScale])
    .on('zoom', this.onZoom);

  render() {
    return (
      <svg className='svgMap' ref={(r) => { this.svgMap = r; }}>
        <defs>
          <PatternsDefs
            bordersData={this.props.b.properties}
            colorsData={this.props.colorsData}
          />
          <SymbolsDefs symbols={this.props.mapPics} />
        </defs>
        <g transform={this.transform}>
          <TerrainMap
            terrain={this.props.terrain}
          />
          <BordersMap
            visible={this.props.b.visible}
            loaded={this.props.b.loaded}
            borders={this.props.b.borders}
            setClickInfoCb={this.props.setClickInfo}
          />
          {this.props.course !== 0 && (
            <g>
              <MapDecorations decorations={this.props.mapDecorations} />
              <MapLabels labels={this.props.mapLabels} />
              <GeoPoints />
              <Expeditions />
            </g>
          )}
          <Locations />
        </g>
        <g transform={this.state.widgetTransform}>
          <ScaleWidget zoom={this.scale} height={this.height} />
          <LoadingWidget />
        </g>
      </svg>
    );
  }
}

Map.defaultProps = {
  b: {
    bordersData: { features: [] },
    borders: [],
    loaded: false,
    visible: false
  },
  terrain: [],
  terrainData: []
};

function mapStateToProps(state) {
  return {
    projection: state.runtime.projection.project,
    course: state.flags.SelectedCourse,
    terrain: state.data.terrain.projected,
    colorsData: state.runtime.colorsData,
    scale: state.runtime.mapView.scale,
    maxScale: state.runtime.mapView.maxScale,
    minScale: state.runtime.mapView.minScale,
    mapWidth: state.runtime.mapView.mapWidth,
    mapHeight: state.runtime.mapView.mapHeight,
    mapShift: state.runtime.mapView.mapShift,
    resetFlag: state.runtime.mapView.reset,
    rotation: state.runtime.mapView.rotation,
    buttonZoom: state.runtime.mapView.buttonZoom,
    mapPics: Object.values(state.data.mapPics.byId),
    mapDecorations: Object.values(state.data.mapDecorations.byId),
    mapLabels: Object.values(state.data.mapLabels.byId),
    b: {
      visible: state.runtime.visibility.borders,
      loaded: state.data.borders.loaded,
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
