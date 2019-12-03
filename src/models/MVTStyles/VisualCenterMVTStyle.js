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

const VisualCenter = (now) => {
  const filter = [
    'all',
    ['<=', 'start_date', now],
    ['>=', 'end_date', now]
  ];

  const labels = {
    id: 'visual_center',
    type: 'symbol',
    filter,
    source: 'visual_center',
    maxzoom: 8,
    'source-layer': 'visual_center',
    layout: {
      'text-field': '{label}',
      'text-max-width': 5,
      'text-size': 14
    },
    paint: {
      'text-color': '#000',
      'text-halo-width': 1,
      'text-halo-color': 'rgba(255,255,255,0.7)'
    }
  };

  return [labels];
};

export default VisualCenter;
