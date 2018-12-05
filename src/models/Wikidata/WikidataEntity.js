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
  @observable entity = {};

  @observable full = {};

  @observable media = [];

  @computed get values() {
    // Extract values from wikidata
    // values: { pointInTime, image, instanceOf ...}
    return Object.keys(wdProps)
      .reduce((values, key) => ({
        ...values,
        ...Object.keys(wdProps[key]).reduce((p, c) => (this.entity.claims[c] !== undefined ? {
          ...p,
          [wdProps[key][c]]: this.entity.claims[c]
        } : p), {})
      }), []);
  }

  @computed get dependencies() {
    // return 'Q1';
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
    return this.entity.labels[this.lng]
      ? this.entity.labels[this.lng] : '';
  }

  @computed get description() {
    return this.entity.descriptions[this.lng]
      ? this.entity.descriptions[this.lng] : '';
  }

  @computed get cache() {
    return this.rootStore.wikidata.cache;
  }

  getCoordinates = loc => loc.map(i => (this.rootStore.wikidata.cache[i]
    ? this.rootStore.wikidata.cache[i].values.coordinateLocation
    : null));

  getParticipants = p => p.map(i => (this.rootStore.wikidata.cache[i]
    ? this.rootStore.wikidata.cache[i].structure
    : null));

  @computed get structure() {
    const result = {};

    Object.values(wdProps.places).map((place) => {
      if (this.values[place] !== undefined) {
        result[place] = this.getCoordinates(this.values[place]);
      }
      return false;
    });

    Object.values(wdProps.dates).map((date) => {
      if (this.values[date] !== undefined) {
        result[date] = this.values[date].map(d => new Date(d));
      }
      return false;
    });

    if (this.values.participant !== undefined) {
      result.participant = this.getParticipants(this.values.participant);
    }

    return {
      type: this.type,
      label: this.label,
      description: this.description,
      images: this.images,
      ...result
    };
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
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
