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
  observable, action, computed
} from 'mobx';

import {
  wdProps, getWikimediaURI
} from '../WikidataHelper';

class WikidataGenericEntity {
  // simplified entity
  @observable entity = {};

  @observable full = {};

  // For wikimedia data
  @observable media = {};

  @observable type = 'misc';

  @computed get cache() {
    return this.rootStore.wikidata.cache;
  }

  @computed get now() {
    return this.rootStore.year.now;
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get fallback() {
    return this.rootStore.i18n.fallback;
  }

  // if possible select primary language otherwise fallback to default lng
  getLngString = obj => ((obj[this.lng] || '') || (obj[this.fallback] || ''));

  @computed get values() {
    // Extract values from wikidata into human readable naming
    // values: { pointInTime, image, instanceOf ...}
    return Object.keys(wdProps)
      .reduce((values, key) => ({
        ...values,
        ...Object.keys(wdProps[key])
          .reduce((p, c) => (
            this.entity.claims[c] !== undefined ? {
              ...p,
              [wdProps[key][c]]: this.entity.claims[c]
            } : p), {})
      }), []);
  }

  @computed get dependencies() {
    // returns an array of 'core' dependencies, all places and instances
    return ['items', 'places'].reduce((prev, key) => ([
      ...prev,
      ...Object.values(wdProps[key]).reduce((p, c) => (
        this.values[c] !== undefined ? [
          ...p,
          ...this.values[c],
        ] : p), [])
    ]), []);
  }

  @computed get label() {
    return this.getLngString(this.entity.labels);
  }

  @computed get description() {
    return this.getLngString(this.entity.descriptions);
  }

  getDeepData = (props, deepCb) => (
    props.reduce((prev, prop) => (
      this.values[prop] !== undefined
        ? {
          ...prev,
          [prop]: deepCb(this.values[prop])
        }
        : prev), {})
  )

  flattenData = values => (
    Object.keys(values).reduce((prev, d) => {
      // handle coordinate location which are structured as
      // locations: [[coordinateLocation], [coordinateLocation]]
      const [flat] = values[d][0] instanceof Array
        ? values[d][0] : values[d];
      return { ...prev, [d]: flat };
    }, {})
  )

  @action async obtainImages(images, key = 'media') {
    if (images === undefined) return;
    if (images.length === 0) return;
    try {
      const results = await fetch(getWikimediaURI(images));
      const res = await results.json();
      const imgData = Object.values(res.query.pages).reduce((prev, cur) => {
        const fileName = cur.title.replace('File:', '');
        const info = cur.imageinfo[0];
        return {
          ...prev, [fileName]: info
        };
      }, {});
      this.media = observable({
        ...this.media,
        [key]: imgData
      });
    } catch (e) {
      console.error('Obtain images failed', this);
      console.error('Input', images, key);
      console.error(e);
    }
  }

  constructor(rootStore, type, full, simple) {
    this.rootStore = rootStore;
    this.full = full;
    this.entity = simple;
    this.type = type;
  }
}

export default WikidataGenericEntity;
