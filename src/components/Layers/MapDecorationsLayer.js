import { IconLayer } from 'deck.gl';
import Textures from './Textures';

function decorationsLayer(decorations, visible, deck) {
  return new IconLayer({
    id: 'map-decoration-layer',
    data: decorations,
    visible,
    pickable: true,
    iconAtlas: Textures.decoration.img,
    iconMapping: Textures.decoration.map,
    getAngle: d => d.transform.rotate,
    sizeScale: 3,
    getSize: d => (deck.zoom * d.transform.scale),
    getPosition: d => [d.geopoint[0], d.geopoint[1]],
    getIcon: d => `decoration-${d.picId}`,
    getColor: () => [66, 66, 66],
    updateTriggers: {
      getSize: deck.zoom,
    },
    onClick: d => console.log('decor:', d)
  });
}

export default decorationsLayer;
