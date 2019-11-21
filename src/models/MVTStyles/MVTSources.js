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
import OceanDecor from './OceanDecor';

const vector = (url, api = 'api/mvt') => ({
  type: 'vector',
  tiles: [`${window.location.origin}/${api}/${url}/{z}/{x}/{y}`]
});

const geojson = (data) => ({ type: 'geojson', data });

const sources = (legacyPins) => ({
  stv: vector('stv', 'mvt'),
  events: vector('cached-data'),
  cities: vector('cities'),
  visual_center: vector('cities'),
  narratives: vector('narratives'),
  symbols: vector('narratives'),
  decor: geojson(OceanDecor),
  ...Object.keys(legacyPins)
    .reduce((prev, cur) => ({ ...prev, [cur]: geojson(legacyPins[cur]) }), {})
});

export default sources;
