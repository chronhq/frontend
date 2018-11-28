import { IconLayer } from '@deck.gl/layers';
import Textures from './Textures';

function pinsLayer(
  pins, name, zoom, pickable, onHover = () => ''
) {
  const id = `${name}-pins-layer`;
  return new IconLayer({
    id,
    data: pins,
    // visible: this.options.mapDecorations,
    pickable,
    getAngle: 135,
    iconAtlas: Textures.pin.img,
    iconMapping: Textures.pin.map,
    sizeScale: 1.5,
    getSize: () => (zoom * 10),
    getPosition: d => [d.point.x, d.point.y],
    getIcon: d => `pin-${d.pic}`,
    getColor: () => [66, 66, 66],
    updateTriggers: {
      getSize: zoom,
    },
    onHover,
  });
}

export default pinsLayer;
