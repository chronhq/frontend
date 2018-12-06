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

const flags = {
  runtime: {
    SelectedCourse: null,
    alignPanel: 'right',
    feedback: false,
    yearInput: false,
    SidePanelTab: 0,
    SidePanelIsOpen: false,
    TimelineIsMinified: false,
    BioIsOpen: false,
    animation: true,
    cluster: true,
  },
  layer: {
    borders: true,
    labels: true,
    mapDecorations: true,
    cities: true,
    traces: true,
  },
  pins: {
    inventions: true,
    persons: true,
    geoEvents: true,
  },
  zoom: {
    minScale: 1,
    maxScale: 8,
  }
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
    Object.keys(list).map(c => this.set(c, list[c]));
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
  constructor() {
    Object.keys(flags).map((l) => {
      this[l] = new FlagList(flags[l]);
      return null;
    });
  }

  @action set(f) {
    Object.keys(f)
      .map(branch => Object.keys(f[branch])
        .map(flag => this[branch].set(flag, f[branch][flag])));
  }

  print() {
    this.branches.map(b => console.log(b, this[b].list));
  }
}
