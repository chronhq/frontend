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

import wdk from 'wikidata-sdk';
import {
  wdProps, wdTypesMap, getWikimediaURI
} from './WikidataHelper';

class WikidataEntity {
  // simplified entity
  @observable entity = {};

  @observable full = {};

  // Response from wikimedia
  @observable media = [];

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

  @computed get images() {
    return this.media
      .map(i => i.query.pages[Object.keys(i.query.pages)].imageinfo[0]);
  }

  @computed get type() {
    return this.values.instanceOf
      .reduce((prev, cur) => (wdTypesMap[cur] || prev), 'misc');
  }

  @computed get label() {
    return this.getLngString(this.entity.labels);
  }

  @computed get description() {
    return this.getLngString(this.entity.descriptions);
  }

  @computed get cache() {
    return this.rootStore.wikidata.cache;
  }

  // if possible select primary language othewise fallback to default lng
  getLngString = obj => ((obj[this.lng] || '') || (obj[this.fallback] || ''));

  // grab point location from dependency
  getCoordinates = loc => loc.map(i => (this.rootStore.wikidata.cache[i]
    ? this.rootStore.wikidata.cache[i].values.coordinateLocation
    : null));

  // resolve dependency into whole structures
  getParticipants = p => p.map(i => (this.rootStore.wikidata.cache[i]
    ? this.rootStore.wikidata.cache[i].structure
    : null));

  getDeepData = (props, deepCb) => {
    return props.reduce((prev, prop) => (
      this.values[prop] !== undefined
        ? {
          ...prev,
          [prop]: deepCb(this.values[prop])
        }
        : prev), {});
  }

  flattenData = values => (
    Object.keys(values).reduce((prev, d) => {
      // handle coordinate location which are structured as
      // locations: [[coordinateLocation], [coordinateLocation]]
      const [flat] = values[d][0] instanceof Array
        ? values[d][0] : values[d];
      return { ...prev, [d]: flat };
    }, {})
  )

  @computed get places() {
    return this.getDeepData(
      Object.values(wdProps.places),
      this.getCoordinates
    );
  }

  @computed get dates() {
    return this.getDeepData(
      Object.values(wdProps.dates),
      dates => dates.map(d => new Date(d))
    );
  }

  @computed get participants() {
    return this.getDeepData(['participant'], this.getParticipants);
  }

  @computed get structure() {
    const image = this.images.length > 0
      ? { image: this.images[0] } : {};

    const flat = {
      ...this.flattenData(this.dates),
      ...this.flattenData(this.places),
      ...image,
    };

    return {
      id: this.entity.id,
      type: this.type,
      label: this.label,
      description: this.description,
      ...this.participants,
      ...flat,
      deep: {
        images: this.images,
        ...this.places,
        ...this.dates,
      },
    };
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get fallback() {
    return this.rootStore.i18n.fallback;
  }

  @action async obtainImage() {
    if (this.values.image === undefined) return;
    const results = await Promise.all(
      this.values.image.map(i => fetch(getWikimediaURI(i)))
    );
    this.media = await Promise.all(results.map(r => r.json()));
  }

  constructor(entity, rootStore) {
    this.rootStore = rootStore;
    this.full = entity;
    this.entity = wdk.simplify.entity(entity);
    this.obtainImage();
  }
}

export default WikidataEntity;
