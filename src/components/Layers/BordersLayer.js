import { GeoJsonLayer } from 'deck.gl';

function bordersLayer(data, visible, hoverCb) {
  return new GeoJsonLayer({
    id: 'borders-layer',
    data,
    visible,
    filled: true,
    pickable: true,
    wireframe: false,
    width: 0.1,
    lineWidthMinPixels: 0.5,
    getLineColor: () => [128, 128, 128],
    getFillColor: f => (f.color || f.feature.color),
    stroked: true,
    extruded: false,
    lineJointRounded: true,
    onHover: hoverCb,
  });
}

export default bordersLayer;
