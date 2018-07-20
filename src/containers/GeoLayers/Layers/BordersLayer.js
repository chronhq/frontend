import { GeoJsonLayer } from 'deck.gl';

function getBorders(borders, properties, colors) {
  return borders.map((cur) => {
    const colorId = properties[cur.props].color;
    try {
      const color = colors[colorId].color1;
      // console.log('Trying to get color', colorId, cur);
      // console.log(color, colorId, colors[colorId]);
      return {
        geometry: cur.geo.geometry,
        color: [color[0], color[1], color[2]],
        id: cur.id,
        props: cur.props,
      };
    } catch (e) {
      // console.error('ColorID', colorId, 'Border ID', cur.id);
      // Probably colorID === -99 -- Disputed territory
      return {
        geometry: cur.geo.geometry,
        color: [13, 244, 61],
        id: cur.id,
        props: cur.props,
      };
    }
    });
}

function bordersLayer(borders, properties, colors, visible, showInfo) {
  const data = getBorders(borders, properties, colors);
  return new GeoJsonLayer({
    id: 'borders-layer',
    data,
    visible,
    filled: true,
    pickable: true,
    wireframe: false,
    width: 0.1,
    lineWidthMinPixels: 0.5,
    getLineColor: f => (f.color || f.feature.color),
    getFillColor: f => (f.color || f.feature.color),
    stroked: true,
    extruded: false,
    lineJointRounded: true,
    onClick: (f) => showInfo(f),
  });
}

export default bordersLayer;
