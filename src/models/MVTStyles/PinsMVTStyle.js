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
import { typesMapping } from '../Wikidata/WikidataHelper';

const filter = (now, next, wIds) => (wIds === null
  ? [['>=', 'date', now], ['<=', 'date', next]]
  : [['in', 'wikidata_id', ...wIds]]
);

const getLayer = (now, next, id, wIds = null) => ({
  id,
  layout: {
    'icon-image': `pin-${typesMapping[id].pic}`,
    'icon-rotate': -135,
    'icon-size': 1,
    'icon-anchor': 'top-left',
  },
  minzoom: 1,
  filter: [
    'all',
    ...filter(now, next, wIds),
    ['==', 'event_type', typesMapping[id].id]
  ],
  type: 'symbol',
  source: 'events',
  'source-layer': 'events'
});

const pins = (now, next, flags, courseId, wIds = null) => {
  if (courseId < 0) return { sources: {}, layers: [] };
  const url = courseId > 0
    ? `narratives/${courseId}`
    : 'cached-data';
  const source = {
    type: 'vector',
    tiles: [`${window.location.origin}/api/mvt/${url}/{z}/{x}/{y}`]
  };
  const layers = [];

  if (flags.persons === true) {
    layers.push(getLayer(now, next, 'birth', wIds));
    layers.push(getLayer(now, next, 'death', wIds));
  }
  if (flags.battle === true) layers.push(getLayer(now, next, 'battle', wIds));
  if (flags.document === true) layers.push(getLayer(now, next, 'document', wIds));


  return {
    sources: { events: source }, layers
  };
};

export default pins;
