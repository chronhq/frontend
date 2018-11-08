import { IconLayer } from '@deck.gl/layers';
import Textures from './Textures';

function oceanDecorationLayer(oceans, visible, deck) {
  return new IconLayer({
    id: 'map-oceans-layer',
    data: oceans,
    visible,
    pickable: true,
    iconAtlas: Textures.ocean.img,
    iconMapping: Textures.ocean.map,
    getAngle: 0,
    sizeScale: 3,
    getSize: d => (deck.zoom * d.size),
    getPosition: d => [d.geopoint[0], d.geopoint[1]],
    getIcon: d => `ocean-${d.picId}`,
    updateTriggers: {
      getSize: deck.zoom,
    },
    onClick: d => console.log('ocean:', d)
  });
}

export default oceanDecorationLayer;
