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
import { action, observable, computed } from 'mobx';

class GenericStoreType {
  // For storing unique wikidata_ids
  @observable keys = {};

  @observable dummy = { free: [], pins: [] };

  @observable type = 'undefined'; // battle || document...

  @observable fetched = false;

  @action add(data = [], fetch = true) {
    const res = data.reduce((p, c) => (
      this.keys[c] === undefined
        ? { ...p, [c]: null }
        : p), {});
    const resList = Object.keys(res);

    this.keys = {
      ...this.keys,
      ...res
    };
    if (fetch) {
      if (this.fetched === false) {
        this.fetch();
      } else if (resList.length > 0 && this.fetched === true) {
        this.fetch(resList);
      }
    } else if (resList.length > 0) {
      this.fetched = false;
    }
  }

  @action fetch(upd = null) {
    this.fetched = true;
    const list = upd === null ? this.list : upd;
    this.rootStore.wikidata.getItems(list);
  }

  @computed get list() {
    return Object.keys(this.keys);
  }

  @computed get cache() {
    return this.rootStore.wikidata.cache;
  }

  @computed get now() {
    return this.rootStore.year.now;
  }

  // returns an array of data from cache
  @computed get inCache() {
    return (
      this.list.reduce((prev, cur) => (
        this.cache[cur] !== undefined ? [
          ...prev,
          this.cache[cur].structure
        ] : prev), [])
    );
  }

  @computed get timeline() {
    return this.inCache.reduce((prev, cur) => {
      const event = {
        type: this.type,
        loc: cur.place || {}, // in case if place if undefined
        [this.type]: cur,
      };

      const year = cur.date instanceof Date
        ? cur.date.getUTCFullYear()
        : cur.date;

      const curYear = prev[year] || { free: [], pins: [] };
      const pos = event.loc.x !== undefined ? 'pins' : 'free';

      return {
        ...prev, // years
        [year]: {
          ...curYear, // free || pins
          [pos]: [...curYear[pos], event]
        }
      };
    }, { /* { [year]: { free: [], pins: [] } */ });
  }

  @computed get pins() {
    return this.now in this.timeline
      ? this.timeline[this.now]
      : this.dummy;
  }

  constructor(rootStore, type) {
    this.rootStore = rootStore;
    this.type = type;
  }
}

export default GenericStoreType;
