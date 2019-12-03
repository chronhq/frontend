/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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

const filter = (course, tick, layer) => ([
  'all',
  ['==', 'layer', layer],
  ['==', 'order', tick],
  ['==', 'narrative_id', course],
]);

const pins = (course, tick) => ({
  id: 'symbols-pins',
  filter: filter(course, tick, 'pin'),
  layout: {
    'icon-image': 'pin-narration',
    'icon-rotate': -135,
    'icon-size': 1,
    'icon-anchor': 'top-left',
  },
  type: 'symbol',
  source: 'symbols',
  'source-layer': 'symbols'
});

const lineDash = (course, tick) => ({
  id: 'symbols-lines',
  filter: filter(course, tick, 'line-dasharray'),
  // layout: {
  //   'icon-image': 'pin-{pic}',
  //   'icon-rotate': -135,
  //   'icon-size': 1,
  //   'icon-anchor': 'top-left',
  // },
  paint: {
    'line-color': 'rgb(127, 127, 127)',
    // 'line-dasharray': 1,
  },
  type: 'line',
  source: 'symbols',
  'source-layer': 'symbols'
});

const Symbols = (course, tick) => ([pins(course, tick), lineDash(course, tick)]);

export default Symbols;
