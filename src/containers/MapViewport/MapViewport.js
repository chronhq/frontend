import React from 'react';
import { observer, inject } from 'mobx-react';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select, event, mouse } from 'd3-selection';

import { PatternsDefs, MapPicsDefs } from '../../components/SVGPatternsDefs';
import ScaleWidget from './ScaleWidget';
import LoadingWidget from './LoadingWidget';
import Elements from './Elements';

import './MapViewport.less';

@inject('store')
@observer
class Map extends React.Component {
  componentDidMount() {
    // window.addEventListener('resize', () => this.resize());
    // this.resize();
    const svg = select(this.svgMap);
    const { projection } = this.props.store.projection;
    const that = this;
    /* eslint-disable func-names */
    svg.on('mousedown.log', function () {
      const mouseXY = mouse(this);
      const coordinates = [
        (mouseXY[0] - that.props.store.view.transform.x) / that.props.store.view.transform.k,
        (mouseXY[1] - that.props.store.view.transform.y) / that.props.store.view.transform.k];
      console.info('Click on map coordinates', projection.invert(coordinates));
    });
    svg.call(this.zoom);
    svg.call(
      this.zoom.transform,
      zoomIdentity
        .scale(this.props.store.view.defaultZoom)
        .translate(
          this.props.store.projection.mapDimensions.mapShift[0],
          this.props.store.projection.mapDimensions.mapShift[1]
        )
    );
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', () => this.resize());
  // }

  onZoom = () => {
    this.props.store.view.transform = event.transform;
  }

  // @computed get height() {
  //   if (typeof this.svgMap !== 'undefined' && this.svgMap !== null
  //     && 'clientHeight' in this.svgMap) {
  //     return this.svgMap.clientHeight;
  //   }
  //   return 0;
  // }

  // @computed get width() {
  //   if (typeof this.svgMap !== 'undefined' && this.svgMap !== null
  //     && 'clientWidth' in this.svgMap) {
  //     return this.svgMap.clientWidth;
  //   }
  //   return 0;
  // }

  // get rotation() {
  //   // Do not try to rotate relying on transform x and y
  //   const y = (this.height / 2); // + this.state.transform.y || 0;
  //   const x = (this.width / 2); // + this.state.transform.x || 0;
  //   return `${this.props.rotation} ${x} ${y}`;
  // }

  // @action resize() {
  //   this.props.store.view.width = this.width;
  //   this.props.store.view.height = this.height;
  // }


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
          <Elements />
        </g>
        <g transform={this.props.store.view.widgetTransform}>
          <ScaleWidget view={this.props.store.view} />
          <LoadingWidget borders={this.props.store.borders} />
        </g>
      </svg>
    );
  }
}

export default Map;
