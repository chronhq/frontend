/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { TextLayer } from '@deck.gl/layers';
import chars from './VisibleCharacters';

export default function toponyms(labels, visible, zoom) {
  const tops = [];
  Object.keys(labels).map(l => (
    tops.push(new TextLayer(
      {
        id: `label-layer-${l}`,
        data: labels[l],
        pickable: false,
        visible,
        getText: d => (d.zoomLevels[zoom] === true ? d.string : ''),
        getPosition: d => [d.geopoint[0], d.geopoint[1]],
        getSize: d => d.style.size,
        getColor: d => d.style.color,
        sizeScale: 1,
        getTextAnchor: 'start',
        fontFamily: l,
        characterSet: chars,
        getAlignmentBaseline: 'top',
        updateTriggers: {
          getText: zoom,
        },
      }
    ))
  ));
  return tops;
}
