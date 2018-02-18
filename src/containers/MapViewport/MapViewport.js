import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select, event, mouse } from 'd3-selection';

import Locations from '../Locations';
// import Expeditions from '../Expeditions';
// import GeoPoints from '../GeoPoints';
import { PatternsDefs, MapPicsDefs } from '../../components/SVGPatternsDefs';
import ScaleWidget from './ScaleWidget';
// import LoadingWidget from './LoadingWidget';
import { Borders, Contour } from './Elements';
// import { setClickInfo, changeScale } from '../../reducers/actions';

import './MapViewport.less';

@inject('store')
@observer
class Map extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.resize());
    this.resize();
    if (!this.zoomInitSuccess) {
      const svg = select(this.svgMap);
      const { projection } = this.props.store.projection;
      const that = this;
      /* eslint-disable func-names */
      svg.on('mousedown.log', function () {
        const mouseXY = mouse(this);
        const coordinates = [
          (mouseXY[0] - that.props.store.view.transform.x) / that.props.store.view.transform.k,
          (mouseXY[1] - that.props.store.view.transform.y) / that.props.store.view.transform.k];
        console.log('Click on map coordinates', projection.invert(coordinates));
      });
      svg.call(this.zoom);
      svg.call(
        this.zoom.transform,
        zoomIdentity
          .scale(this.props.store.view.defaultZoom)
          .translate(
            this.props.store.view.transformX,
            this.props.store.view.transformY
          )
      );

      this.zoomInitSuccess = true;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize());
  }

  onZoom = () => {
    this.props.store.view.transform = event.transform;
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

  // get rotation() {
  //   // Do not try to rotate relying on transform x and y
  //   const y = (this.height / 2); // + this.state.transform.y || 0;
  //   const x = (this.width / 2); // + this.state.transform.x || 0;
  //   return `${this.props.rotation} ${x} ${y}`;
  // }


  @observable zoomInitSuccess = false;

  resize = () => {
    this.props.store.view.width = this.width;
    this.props.store.view.height = this.height;
  }

  zoom = zoom()
    .scaleExtent([
      this.props.store.flags.flags.zoom.minScale,
      this.props.store.flags.flags.zoom.maxScale
    ])
    .on('zoom', this.onZoom);

  render() {
    return (
      <svg className='svgMap' ref={(r) => { this.svgMap = r; }}>
        <defs>
          <PatternsDefs
            bordersColors={this.props.store.colors.colors}
          />
          <MapPicsDefs symbols={this.props.store.data.MapPics.data} />
        </defs>
        <g transform={this.props.store.view.svgTransform}>
          <Contour />
          <Borders />
          {/* this.props.course !== 0 && (
            <g>
              <MapDecorations decorations={this.props.mapDecorations} />
              <MapLabels labels={this.props.mapLabels} />
              <GeoPoints />
              <Expeditions />
            </g>
          ) */}
          <Locations />
        </g>
        <g transform={this.props.store.view.widgetTransform}>
          <ScaleWidget zoom={this.props.store.view.preciseScale} height={this.height} />
          {/*
          <LoadingWidget />
        */}
        </g>
      </svg>
    );
  }
}

// Map.defaultProps = {
//   b: {
//     bordersData: { features: [] },
//     borders: [],
//     loaded: false,
//     visible: false
//   },
//   terrain: [],
//   terrainData: []
// };

// function mapStateToProps(state) {
//   return {
//     projection: state.runtime.projection.project,
//     course: state.flags.SelectedCourse,
//     terrain: state.data.terrain.projected,
//     colorsData: state.runtime.colorsData,
//     scale: state.runtime.mapView.scale,
//     maxScale: state.runtime.mapView.maxScale,
//     minScale: state.runtime.mapView.minScale,
//     mapWidth: state.runtime.mapView.mapWidth,
//     mapHeight: state.runtime.mapView.mapHeight,
//     mapShift: state.runtime.mapView.mapShift,
//     resetFlag: state.runtime.mapView.reset,
//     rotation: state.runtime.mapView.rotation,
//     buttonZoom: state.runtime.mapView.buttonZoom,
//     mapPics: Object.values(state.data.mapPics.byId),
//     mapDecorations: Object.values(state.data.mapDecorations.byId),
//     mapLabels: Object.values(state.data.mapLabels.byId),
//     b: {
//       visible: state.runtime.visibility.borders,
//       loaded: state.data.borders.loaded,
//       borders: state.runtime.bordersData.borders,
//       properties: state.runtime.bordersData.properties
//     }
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     changeScale: bindActionCreators(changeScale, dispatch),
//     setClickInfo: bindActionCreators(setClickInfo, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Map);
export default Map;
