import { PathLayer } from '@deck.gl/layers';
import { toJS } from 'mobx';

import { TripsLayer } from '@deck.gl/experimental-layers';

function expeditionsLayer(traces, visible, animation, time) {
  return (new PathLayer({
    id: 'static-traces-layer',
    data: traces,
    visible: visible && !animation,
    getPath: d => toJS(d.data.path[0].path),
    getColor: () => [65, 140, 171],
    getWidth: () => 5,
    rounded: true,
    widthScale: 3,
    widthMinPixels: 2,
    getDashArray: () => [10, 10],
    // onClick: d => console.log(d.data.id),
  }),
  new TripsLayer({
    id: 'animated-trace-layer',
    data: traces,
    visible: visible && animation,
    getPath: d => toJS(d.timedTraces),
    getColor: () => [65, 140, 171],
    opacity: 1,
    strokeWidth: 10,
    trailLength: 180,
    currentTime: time
  }));
}

export default expeditionsLayer;
