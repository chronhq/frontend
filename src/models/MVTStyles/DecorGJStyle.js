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
const decor = (lng) => {
  const text = lng === 'ru' ? '{name-ru}' : '{name-en}';
  const layer = {
    type: 'symbol',
    layout: {
      'icon-image': 'decoration-{img}',
      'icon-size': 1.28,
      'text-field': text,
      'text-offset': [
        0.5,
        -1
      ],
      'text-max-width': 15,
      'text-size': 16
    },
    paint: {
      'text-color': '#80CDDD',
      'text-halo-width': 1.5,
      'text-halo-color': 'rgba(255,255,255,0.7)'
    },
    minzoom: 0,
    maxzoom: 4,
    source: 'decor',
    id: 'decor',
  };
  return [layer];
};

export default decor;
