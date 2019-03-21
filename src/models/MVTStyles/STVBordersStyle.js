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
const STVBorders = (now) => {
  const url = 'stv';
  const opacity = 0.75;
  const source = {
    type: 'vector',
    tiles: [`${window.location.origin}/mvt/${url}/{z}/{x}/{y}`]
  };

  const filter = [
    // 'none',
    // ['<', 'start', now],
    // ['>', 'end', now],
    'all',
    ['<=', 'start', now],
    ['>=', 'end', now]
  ];

  const fill = {
    layout: {},
    filter,
    type: 'fill',
    paint: {
      'fill-color': [
        'match',
        ['get', 'color'],
        '1', '#ff6161',
        '2', '#263f66',
        '3', '#f9aa54',
        '4', '#f9ff56',
        '5', '#089195',
        '6', '#669966',
        '7', '#044e7b',
        '8', '#935a41',
        '9', '#80d0dd',
        '10', '#944564',
        '11', '#acb537',
        '12', '#9561ba',
        '13', '#a55f94',
        'rgb(127, 127, 127)' // Disputed
      ],
      'fill-opacity': opacity,
    },
    source: 'stv',
    id: 'stvs',
    'source-layer': 'stv'
  };

  const borders = {
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    filter,
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
    source: 'stv',
    id: 'stv-lines',
    'source-layer': 'stv'
  };
  return {
    sources: { stv: source }, layers: [fill, borders]
  };
};

export default STVBorders;
