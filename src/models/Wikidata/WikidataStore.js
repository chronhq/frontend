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

class WikidataStore {
  @observable battles = [];

  @observable actors = [];

  @observable documents = [];

  @action fetchAll() {
    this.rootStore.wikidata.getItems([
      ...this.battles, ...this.actors, ...this.documents
    ]);
  }

  @action addData(type, data, fetch = true) {
    this[type] = [...this[type], ...data];
    if (fetch) this.fetchAll();
  }

  @computed get now() {
    return this.rootStore.year.now;
  }

  @computed get cache() {
    return this.rootStore.wikidata.cache;
  }

  // returns an array of data which are present in cache
  getFromCache = arr => (
    arr.reduce((prev, cur) => (
      this.cache[cur] !== undefined ? [
        ...prev,
        this.cache[cur].structure
      ] : prev), [])
  )

  @computed get battlesInCache() {
    return this.getFromCache(this.battles);
  }

  @computed get actorsInCache() {
    return this.getFromCache(this.actors);
  }

  @computed get documentsInCache() {
    return this.getFromCache(this.documents);
  }

  @computed get battlePins() {
    // free battle pins (withour location) are not supported, yet
    return this.battlesInCache.reduce((prev, cur) => {
      if (cur.pointInTime !== undefined
        && cur.pointInTime.getUTCFullYear() === this.now
        && cur.place instanceof Array) {
        const [y, x] = cur.place;
        return [
          ...prev,
          {
            loc: { x, y },
            type: 'battle',
            battle: cur,
          }
        ];
      }
      return prev;
    }, []);
  }

  @computed get documentPins() {
    return this.documentsInCache.reduce((prev, cur) => {
      if (cur.place instanceof Array) {
        const [y, x] = cur.place;
        return [
          ...prev,
          {
            loc: { x, y },
            type: 'document',
            document: cur,
          }
        ];
      }
      return prev;
    }, []);
  }

  addBattles = (data, fetch) => this.addData('battles', data, fetch)

  addActors = (data, fetch) => this.addData('actors', data, fetch)

  addDocuments = (data, fetch) => this.addData('documents', data, fetch)

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.addBattles(['Q1025134', 'Q898338', 'Q2234632', 'Q10671369',
      'Q4871992', 'Q4872085', 'Q2564536', 'Q6539', 'Q1527921'], false);

    const birth = ['Q61987', 'Q1069841', 'Q1585', 'Q161145', 'Q8814'];
    const death = ['Q729541', 'Q496775', 'Q473506', 'Q315819', 'Q860155'];
    this.addActors([...death, ...birth], false);

    this.addDocuments(['Q169759'], false);

    this.fetchAll();
  }
}

export default WikidataStore;
