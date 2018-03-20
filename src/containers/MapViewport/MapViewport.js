import React from 'react';
import { observer, inject } from 'mobx-react';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select, event, mouse } from 'd3-selection';

import Elements from './Elements';
import Widgets from './Widgets';
import Defs from './Defs';

import './MapViewport.less';

@inject('store')
@observer
class Map extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
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

  resize = () => {
    this.props.store.view.setSize(this.width, this.height);
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
        <Defs />
        <Elements />
        <Widgets />
      </svg>
    );
  }
}

export default Map;
