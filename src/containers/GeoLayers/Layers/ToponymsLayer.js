import { TextLayer } from 'deck.gl';
import chars from './VisibleCharacters';

export default function toponyms(labels, visible) {
  const tops = [];
  Object.keys(labels).map(l => (
    tops.push(new TextLayer(
      {
        id: `label-layer-${l}`,
        data: labels[l],
        pickable: false,
        visible,
        getText: d => d.string,
        getPosition: d => [d.geopoint[0], d.geopoint[1]],
        getSize: d => d.style.size,
        getColor: d => d.style.color,
        sizeScale: 1,
        getTextAnchor: 'start',
        fontFamily: l,
        characterSet: chars,
        getAlignmentBaseline: 'top'
      }
    ))
  ));
  return tops;
}
