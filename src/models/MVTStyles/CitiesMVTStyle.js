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
const citiesStyle = (now) => {
  const url = 'cities';
  const source = {
    type: 'vector',
    tiles: [`${window.location.origin}/api/mvt/${url}/{z}/{x}/{y}`]
  };

  // this one will not work because of 'dissolution_date' null value
  // const filter = [
  //   'all',
  //   ['<=', 'inception_date', now],
  //   ['>=', 'dissolution_date', now]
  // ];

  const filter = [
    'none',
    ['>', 'inception_date', now],
    ['<', 'dissolution_date', now]
  ];

  const layer = {
    layout: {},
    minzoom: 3,
    filter,
    type: 'circle',
    paint: {
      'circle-radius': 2,
      'circle-color': 'rgba(238,78,139, 0.4)',
      'circle-stroke-color': 'rgba(238,78,139, 1)',
      'circle-stroke-width': 1
    },
    source: 'cities',
    id: 'dots',
    'source-layer': 'cities'
  };

  const labels = {
    id: 'labels',
    type: 'symbol',
    filter,
    source: 'cities',
    minzoom: 3,
    'source-layer': 'cities',
    layout: {
      'text-field': '{label}',
      'text-offset': [
        0,
        0.6
      ],
      'text-max-width': 5,
      'text-size': 12
    },
    paint: {
      'text-color': '#000',
      'text-halo-width': 1.5,
      'text-halo-color': 'rgba(255,255,255,0.7)'
    }
  };
  return {
    sources: { cities: source }, layers: [layer, labels]
  };
};

export default citiesStyle;
