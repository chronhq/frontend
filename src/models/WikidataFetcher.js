/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import {
  observable, action, computed, toJS
} from 'mobx';

import wdk from 'wikidata-sdk';

const parseEntity = (arr, dataType, valueType, getValue = (v => v)) => (
  (arr !== undefined)
    ? arr.reduce((p, c) => {
      try {
        if (c.mainsnak.datatype === dataType
          && c.mainsnak.datavalue.type === valueType) {
          return [
            ...p,
            getValue(c.mainsnak.datavalue.value)
          ];
        }
        console.error('Wikidata type mismatch', dataType, valueType, toJS(c));
        return p;
      } catch (e) {
        console.error('parseEntity failed', dataType, valueType, c, e);
        return p;
      }
    }, [])
    : []
);

const parse = {
  items: arr => parseEntity(arr, 'wikibase-item', 'wikibase-entityid', v => v.id),
  images: arr => parseEntity(arr, 'commonsMedia', 'string'),
  points: arr => parseEntity(arr, 'globe-coordinate', 'globecoordinate'),
  dates: arr => parseEntity(arr, 'time', 'time'),
};


// List of wikidata properties
const wdProps = {
  items: {
    P17: 'country',
    P31: 'instanceOf',
    P276: 'location', // (city, place)
    P710: 'participant',
  },
  images: {
    P18: 'image',
  },
  points: {
    P625: 'coordinateLocation', // coordinate location
  },
  dates: {
    P585: 'pointInTime',
    P571: 'inception',
  },
};

const getWikimediaURI = (name) => {
  // thumbwidth in pixels
  const width = 250;
  const api = 'commons.wikimedia.org/w/api.php';
  const file = encodeURI(name);
  const params = [
    'action=query',
    'prop=imageinfo',
    'iiprop=url',
    'format=json',
    'origin=*', // for Browser request (CORB)
    `titles=File:${file}`,
    `iiurlwidth=${width}`,
  ].join('&');
  return `https://${api}?${params}`;
};

class WikidataEntity {
  @observable entity = {};

  @observable media = [];

  @computed get values() {
    // Extract values from wikidata
    // values: { pointInTime, image, instanceOf ...}
    return Object.keys(wdProps)
      .reduce((values, key) => ({
        ...values,
        ...Object.keys(wdProps[key]).reduce((p, c) => ({
          ...p,
          [wdProps[key][c]]: parse[key](this.entity.claims[c])
        }), {})
      }), []);
  }

  @computed get dependencies() {
    return Object.keys(wdProps.items).reduce((p, c) => ([
      ...p,
      ...this.values[wdProps.items[c]],
    ]), []);
  }

  @computed get images() {
    return this.media
      .map(i => i.query.pages[Object.keys(i.query.pages)].imageinfo[0]);
  }

  @action async obtainImage() {
    if (this.values.image.length < 1) return;
    const results = await Promise.all(
      this.values.image.map(i => fetch(getWikimediaURI(i)))
    );
    this.media = await Promise.all(results.map(r => r.json()));
  }

  constructor(entity) {
    this.entity = entity;
    this.obtainImage();
  }
}

export default class WikidataFetcher {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable cache = {};

  @action saveToCache(data) {
    const entities = Object.keys(data).reduce((p, c) => ({
      ...p,
      [c]: new WikidataEntity(data[c])
    }), {});

    this.cache = {
      ...this.cache,
      ...entities,
    };

    this.fillTheGaps(Object.keys(entities));
  }

  // Parse new data and download missing Q_ids
  fillTheGaps(entities = []) {
    const ids = entities.reduce((prev, id) => ({
      ...prev,
      ...this.cache[id].dependencies.reduce((p, c) => ({ ...p, [c]: true }), {})
    }), {});
    this.getItems(Object.keys(ids));
  }

  async getItems(items) {
    // fetch only ids, that are not in cache
    const ids = items.reduce((prev, cur) => (
      cur in this.cache ? prev : [...prev, cur]), []);

    if (ids.length < 1) return;

    const url = wdk.getEntities({
      ids,
      format: 'json',
      languages: this.languages
    });
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success === 1) {
        this.saveToCache(data.entities);
      } else {
        const err = {
          data,
          message: 'Wikidata request failed',
        };
        throw err;
      }
    } catch (e) {
      console.error('Something went wrong during wikidata fetching', e);
    }
  }

  @computed get languages() {
    return Object.keys(this.rootStore.i18n.languages);
  }
}
