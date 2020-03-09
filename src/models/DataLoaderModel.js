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
  observable, computed, action, toJS
} from 'mobx';


export default class DataLoaderModel {
  @observable model = '';

  @observable data = {};

  @observable status = { error: false, loading: false, loaded: false };

  @observable filter = null;

  @observable sortId = 'id';

  // Use special class instead of pure data
  @observable wrapData = (d) => d;

  // etend this.data or overwrite
  @observable append = false;

  // change cb type
  @observable arrayCb = false;

  @observable flatGenCb = (json) => {
    const data = {};
    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; i += 1) {
        data[json[i][this.sortId]] = this.wrapData(json[i]);
      }
    } else {
      data[json[this.sortId]] = this.wrapData(json);
    }
    this.setData(data);
  }

  @observable arrayGenCb = (json) => {
    const data = {};
    for (let i = 0; i < json.length; i += 1) {
      const cur = json[i];
      if (!(cur[this.sortId] in data)) {
        data[cur[this.sortId]] = [];
      }
      const entry = this.wrapData(cur);
      data[cur[this.sortId]].push(entry);
      return false;
    }
    return this.setData(data);
  }

  @computed get saveDataCb() {
    return this.arrayCb ? this.arrayGenCb : this.flatGenCb;
  }

  @computed get keys() {
    return Object.keys(this.data);
  }

  @computed get length() {
    return this.keys.length;
  }

  constructor(model) {
    this.model = model;
  }

  getLink(params = null, id = null) {
    // if arguments not null ignore global this.filter
    const filter = params || toJS(this.filter);
    if (id !== null) {
      console.log('get', this.model, params, id);
      return `/api/${this.model}/${id}/${filter}`;
    } if (filter !== null) {
      return `/api/${this.model}/${filter}`;
    }
    return `/api/${this.model}/`;
  }

  @action wipe() {
    this.data = {};
    this.status = { error: false, loading: false, loaded: false };
  }

  @action setError = (err) => {
    this.status = { error: err, loading: false, loaded: true };
    console.error('Error in', 'method for model', this.model, err);
  };

  @action saveData(json) {
    this.saveDataCb(json);
    this.status = { error: null, loading: false, loaded: true };
  }

  @action setData(data) {
    this.data = this.append
      ? { ...this.data, ...data }
      : data;
  }

  @action configure(config) {
    Object.keys(config).map((c) => {
      this[c] = config[c];
      return null;
    });
  }

  @action processData(res) {
    if (res.status === 200) {
      res.json().then((json) => this.saveData(json));
    } else {
      this.setError(res);
    }
  }

  @action get(params = null, id = null, keepStatus = false) {
    if (!keepStatus) {
      this.status = { error: null, loading: true, loaded: false };
    }
    const url = this.getLink(params, id);
    fetch(url)
      .then((res) => this.processData(res))
      .catch((res) => this.setError(res));
  }

  @action downloadModel(force = false) {
    if (this.length === 0 || force === true) {
      this.get();
    }
  }
}
