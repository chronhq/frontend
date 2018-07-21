import { TextLayer } from 'deck.gl';
import chars from './VisibleCharacters';

export default function toponyms(labels, visible) {
  return new TextLayer({
    id: 'label-layer',
    data: labels,
    pickable: false,
    visible,
    getText: d => d.string,
    getPosition: d => [d.geopoint[0], d.geopoint[1]],
    getSize: 12,
    sizeScale: 1,
    getTextAnchor: 'middle',
    fontFamily: 'OpenSans-Light',
    characterSet: chars,
    getAlignmentBaseline: 'center'
  });
}
