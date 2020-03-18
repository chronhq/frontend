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

const STVBorders = (now, ids = undefined) => {
  const source = ids ? 'stv_admin' : 'stv';
  const opacity = {
    min: 0.75,
    max: 0.25
  };

  // Filter benchmark:
  // None: ['none', ['>', 'start_date', now], ['<', 'end_date', now]]
  // Max:  508.68505859375 ; Min:  53.138916015625 ; Avg: 164.41848609561012
  // All: ['all', ['<=', 'start_date', now], ['>=', 'end_date', now]]
  // Max:  567.376953125 ; Min:  44.275146484375 ; Avg: 153.68534226190476
  const filter = ids
    ? ['all', ['in', 'id', ...ids]]
    : [
      'all',
      ['<=', 'start_date', now],
      ['>=', 'end_date', now]
    ];

  const fill = {
    layout: {},
    filter,
    type: 'fill',
    paint: {
      'fill-color': { type: 'identity', property: 'color' },
      'fill-opacity': {
        base: opacity.min,
        stops: [
          [0, opacity.min],
          [8, opacity.max],
          [20, opacity.max]
        ]
      },
    },
    source,
    id: 'stvs',
    'source-layer': source
  };

  const borders = {
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    filter,
    // Using visibility key will result with mapbox diff error
    // Full style reloaded would be invoked.
    // Do not set visibility flag,
    type: 'line',
    paint: {
      'line-color': 'rgb(127, 127, 127)',
      'line-width': {
        base: 0.5,
        stops: [
          [3, 0.8],
          [20, 2]
        ]
      },
    },
    source,
    id: 'stv-lines',
    'source-layer': source
  };
  return [fill, borders];
};

export default STVBorders;
