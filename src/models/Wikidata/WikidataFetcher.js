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

import wikidataEntityFactory from './WikidataEntityFactory';

export default class WikidataFetcher {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable cache = {};

  @action saveToCache(data) {
    const entities = Object.keys(data).reduce((p, c) => ({
      ...p,
      [c]: wikidataEntityFactory(data[c], this.rootStore)
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

  getItems(items) {
    // fetch only ids, that are not in cache
    const newIds = items.reduce((prev, cur) => (
      cur in this.cache ? prev : [...prev, cur]), []);

    // empty requests are not allowed
    if (newIds.length < 1) return;
    // Maximum 50 ids per request
    const maxPerRequest = 50;
    const idsPerReq = new Array(Math.ceil(newIds.length / maxPerRequest)).fill(0)
      .map((c, id, arr) => (
        (arr.length - id === 1)
          // Last step, not enough elements in array
          ? newIds.slice(id * maxPerRequest, newIds.length)
          : newIds.slice(id * maxPerRequest, (id + 1) * maxPerRequest)
      ));

    idsPerReq.map(async (ids) => {
      const url = wdk.getEntities({
        ids: ids.map(i => (Number(i) ? `Q${i}` : i)),
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
      return true;
    });
  }

  @computed get languages() {
    return Object.keys(this.rootStore.i18n.languages);
  }
}
