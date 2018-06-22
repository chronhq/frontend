import { GeoJsonLayer } from 'deck.gl';

const opColor = (f, op) => (f.color || f.feature.color).concat(op);

const rgbColor = (pid, pData) => {
  const props = pData[pid];
  const hex = props.color || '#d34df0';
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [13, 244, 61]; // #0df43d
};

function getBorders(borders, pData) {
  return borders.map(cur => ({
    geometry: cur.geo.geometry,
    color: rgbColor(cur.props, pData),
    id: cur.id,
    props: cur.props,
  }));
}

function bordersLayer(borders, pData, visible) {
  const data = getBorders(borders, pData);
  return new GeoJsonLayer({
    id: 'borders-layer',
    data,
    visible,
    filled: true,
    pickable: true,
    wireframe: false,
    width: 0.1,
    lineWidthMinPixels: 0.5,
    getLineColor: f => opColor(f, 255),
    getFillColor: f => opColor(f, 208),
    stroked: true,
    extruded: false,
    lineJointRounded: true
  });
}

export default bordersLayer;
