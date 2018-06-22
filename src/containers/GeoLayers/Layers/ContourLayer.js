import { GeoJsonLayer } from 'deck.gl';

function contourLayer(terrain) {
  return new GeoJsonLayer({
    id: 'land-contour',
    data: terrain,
    visible: true,
    filled: true,
    pickable: true,
    wireframe: true,
    width: 0.1,
    lineWidthMinPixels: 0.5,
    getLineColor: () => [128, 128, 128],
    getFillColor: () => [234, 234, 234],
    stroked: true,
    extruded: false
  });
}

export default contourLayer;
