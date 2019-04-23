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
import {
  computed, observable, action, runInAction
} from 'mobx';
import * as queries from './Queries';
import { headers, buildURL } from './RequestBuilder';

class WikidataItem {
  @observable id;

  errors = {};

  @observable data = {};

  @observable media = {};

  @observable queries = [];

  @observable saveEffects = {};

  constructor(id, rootStore) {
    this.id = id;
    this.rootStore = rootStore;
    this.queries.map((q, i) => (
      setTimeout(
        () => this.loadData(queries[q], q),
        Math.random() * 30 * i
      )
    ));
  }

  dateFromLiteral = (o) => {
    if (!o) return null;
    if (o.datatype === 'http://www.w3.org/2001/XMLSchema#dateTime' && o.type === 'literal') {
      return new Date(o.value);
    }
    console.error('Failed to parse date', o);
    return null;
  }

  labelAndURI = (o, key) => {
    const res = {};
    if (o[key]) {
      if (o[key].type === 'uri') {
        res.uri = o[key].value;
      }
      if (o[key].datatype === 'http://www.w3.org/2001/XMLSchema#decimal') {
        res[key] = Number(o[key].value);
      }
    }
    if (o[`${key}Label`] && o[`${key}Label`].type === 'literal') {
      res.label = o[`${key}Label`].value;
    }
    return res;
  }

  dateToString = (date) => {
    if (date instanceof Date) {
      return date.toLocaleString(window.navigator.language || 'en-US', {
        month: 'short', year: 'numeric', day: '2-digit', timeZone: 'UTC'
      });
    }
    return undefined;
  }

  @action async loadData(data, path) {
    const url = buildURL(this.qId, data);
    try {
      const res = await fetch(url, headers);
      const json = await res.json();
      runInAction(() => {
        this.data[path] = json.results.bindings;
        if (this.saveEffects[path]) {
          this.saveEffects[path]();
        }
      });
    } catch (e) {
      if (this.errors[path] === undefined) this.errors[path] = 0;
      this.errors[path] += 1;
      if (this.errors[path] > 3) {
        console.error('Error while fetching', this.qId, path);
        console.error(e);
      } else {
        setTimeout(() => this.loadData(data, path), 350 + (Math.random() * 500));
      }
    }
  }

  @computed get qId() {
    return `Q${this.id}`;
  }

  @computed get dataOrigin() {
    return [`https://www.wikidata.org/wiki/${this.qId}`];
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get now() {
    return this.rootStore.year.now;
  }

  @computed get item() {
    if (this.data.event === undefined || !this.data.event.length) return {};
    const raw = this.data.event[0];
    const event = this.labelAndURI(raw, 'item');

    const date = this.dateToString(this.dateFromLiteral(raw.date));
    const location = this.labelAndURI(raw, 'location');
    const effect = this.labelAndURI(raw, 'effect');
    const cause = this.labelAndURI(raw, 'cause');
    const description = raw.itemDescription ? raw.itemDescription.value : undefined;
    const image = raw.image ? raw.image.value : undefined;
    return {
      ...raw,
      id: this.id,
      ...event,
      description,
      image,
      date,
      location,
      effect,
      cause,
    };
  }
}

class WikidataBattleItem extends WikidataItem {
  @observable queries = ['event', 'battle'];
}

class WikidataTreatyItem extends WikidataItem {
  @observable queries = ['event', 'treaty'];
}

export {
  WikidataBattleItem,
  WikidataTreatyItem,
};

export default WikidataItem;
