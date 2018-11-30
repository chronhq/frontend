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
    fontFamily: 'Open Sans Light, sans-serif',
    fontWeight: 300,
    characterSet: chars,
    getAlignmentBaseline: 'top',
    updateTriggers: {
      getText: z,
      getSize: z,
    },
  });
}

export default cityTextLayer;
