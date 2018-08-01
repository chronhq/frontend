import { IconLayer } from 'deck.gl';

function pinsLayer(
  pinsAtlas, pinsMapping, pins, id, zoom, pickable, onHover = () => ''
) {
  return new IconLayer({
    id,
    data: pins,
    // visible: this.options.mapDecorations,
    pickable,
    getAngle: 135,
    iconAtlas: pinsAtlas,
    iconMapping: pinsMapping,
    sizeScale: 3,
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
