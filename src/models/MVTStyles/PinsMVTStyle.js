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

const types = {
  battle: { id: 178561, pic: 32, color: 'rgba(255,0,100, 1)' },
  document: { id: 131569, pic: 24, color: 'rgba(100,255,0, 1)' },
  birth: { id: 569, pic: 26, color: 'rgba(0,100,255, 1)' },
  death: { id: 570, pic: 28, color: 'rgba(100,0,255, 1)' },
};

const getLayer = (now, id) => ({
  id,
  layout: {},
  minzoom: 1,
  filter: [
    'all',
    ['==', 'year', now],
    ['==', 'event_type', types[id].id]
  ],
  type: 'circle',
  paint: {
    'circle-radius': 6,
    'circle-color': types[id].color,
    'circle-stroke-color': 'rgba(238,78,139, 1)',
    'circle-stroke-width': 1
  },
  source: 'events',
  'source-layer': 'events'
});

const pins = (now, flags) => {
  const url = 'cached-data';
  const source = {
    type: 'vector',
    tiles: [`${window.location.origin}/api/mvt/${url}/{z}/{x}/{y}`]
  };
  const layers = [];

  if (flags.persons === true) {
    layers.push(getLayer(now, 'birth'));
    layers.push(getLayer(now, 'death'));
  }
  if (flags.battle === true) layers.push(getLayer(now, 'battle'));
  if (flags.document === true) layers.push(getLayer(now, 'document'));


  return {
    sources: { events: source }, layers
  };
};

export default pins;
