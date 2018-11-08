import { TextLayer } from '@deck.gl/layers';
import chars from './VisibleCharacters';

function cityTextLayer(cities, visible, deck) {
  const { rZoom: z } = deck;
  return new TextLayer({
    id: 'cities-layer',
    data: cities,
    pickable: true,
    visible,
    getText: d => (d.zoomLevels[z] ? d.name : ''),
    getPosition: d => [d.x, d.y],
    getPixelOffset: [0, 10],
    getSize: d => (40 - (1.5 * d.scaleRank)),
    sizeScale: 0.5,
    getTextAnchor: 'middle',
    fontFamily: 'OpenSans-Light',
    characterSet: chars,
    getAlignmentBaseline: 'top',
    updateTriggers: {
      getText: z,
      getSize: z,
    },
  });
}

export default cityTextLayer;
