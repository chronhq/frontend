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
import { observable, action, computed } from 'mobx';
import axios from 'axios';

const flags = {
  runtime: {
    SelectedCourse: null,
  },
  layer: {
    borders: true,
    labels: true,
    mapDecorations: true,
    cities: true,
  },
  pins: {
    persons: true,
    battle: true,
    document: true,
  },
  deck: {
    minZoom: 1,
    maxZoom: 8,
    center: [2, 50],
  },
};

class Flag {
  @observable value;

  constructor(flag) {
    this.value = flag;
  }
}

class FlagList {
  @observable flags = [];

  @action set(flag, value) {
    if (typeof this[flag] !== 'undefined') {
      this[flag].value = value;
    } else {
      this.flags = [...this.flags, flag];
      this[flag] = new Flag(value);
    }
  }

  @computed get list() {
    return this.flags.reduce((prev, cur) => ({
      ...prev,
      [cur]: this[cur].value,
    }), {});
  }

  update(list) {
    Object.keys(list).map((c) => this.set(c, list[c]));
  }

  get(flag) {
    return (typeof this[flag] !== 'undefined')
      ? this[flag].value
      : undefined;
  }

  toggle(flag) {
    if (typeof this[flag] !== 'undefined') {
      this.set(flag, !this[flag].value);
    }
  }

  constructor(list) {
    this.update(list);
  }
}

export default class FlagsModel {
  @observable defaultFlags = flags;

  @observable disabledFeatures = {
    map: false,
    login: false,
  };


  @action async getDisabledFeatures() {
    const { data } = await axios({ url: '/disabled-config.json', method: 'GET' });
    this.disabledFeatures = data;
  }

  constructor() {
    Object.keys(this.defaultFlags).map((l) => {
      this[l] = new FlagList(this.defaultFlags[l]);
      return null;
    });

    this.getDisabledFeatures();
  }

  @action set(f) {
    Object.keys(f)
      .map((branch) => Object.keys(f[branch])
        .map((flag) => this[branch].set(flag, f[branch][flag])));
  }

  print() {
    this.branches.map((b) => console.log(b, this[b].list));
  }
}
