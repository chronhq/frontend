/*
 * Chron.
 * Copyright (c) 2020 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import mapColors from './colors.json';

const colors = Object.keys(mapColors)
  .reduce((prev, cur) => ({ ...prev, [mapColors[cur]]: cur }), {});

const border = (id, paint = {}) => ({
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
  },
  type: 'line',
  paint: {
    'line-color': 'rgb(255,255,255)',
    'line-width': {
      base: 0.5,
      stops: [
        [3, 0.8],
        [20, 2]
      ]
    },
    ...paint,
  },
  source: 'adminUploadGJ',
  id: `adminUploadGJ-${id}`,
});

const STVGJStyle = (enabled, color) => (enabled ? [
  {
    layout: {},
    type: 'fill',
    paint: {
      'fill-color': colors[color],
      'fill-opacity': 0.75,
    },
    source: 'adminUploadGJ',
    id: 'adminUploadGJ',
  },
  border('lines'),
  border('lines2', {
    'line-color': 'rgb(30,30,30)',
    'line-dasharray': [2, 3],
  })
] : []);

export default STVGJStyle;
