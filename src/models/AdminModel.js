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
import { action, observable, computed } from 'mobx';

const genDate = () => (new Date(+(new Date()) - Math.floor(Math.random() * 10000000000000)));

const getSTVS = () => {
  const count = 10;
  const dates = new Array(count * 2).fill(0).map(genDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const data = new Array(count).fill(0).map((v, i) => {
    const status = Boolean(Math.round(Math.random()));
    const end = dates[i * 2];
    const start = dates[i * 2 + 1];
    const stars = Math.round(Math.random() * 5);
    return {
      status, start, end, stars, key: `stv-${i}`, id: i
    };
  });
  return data;
};

class FormModel {
  @observable selected = undefined;

  @observable edit = false;

  @observable data = {};

  @observable status = {};

  @action select(id, edit = false) {
    if (id !== this.selected) {
      this.data = {};
      this.selected = id;
      this.edit = edit;
    } else if (id === this.selected && !edit) {
      this.selected = undefined;
    } else {
      this.edit = !this.edit;
    }
  }
}
export default class AdminModel {
  @observable isOpened = false;

  @observable screenList = ['panel', 'te', 'narrative', 'sandbox'];

  @observable forms = ['te', 'pr', 'stv']
    .reduce((prev, cur) => ({ ...prev, [cur]: new FormModel() }), {});

  @observable screens = {};

  @observable stvs = getSTVS();

  @computed get screen() {
    return Object.keys(this.screens).find(s => this.screens[s] === true);
  }

  @action toggle() {
    this.isOpened = !this.isOpened;
  }

  @action changeScreen(screen = {}) {
    this.screens = {
      ...this.screenList.reduce((p, n) => ({ ...p, [n]: false }), {}),
      ...screen
    };
  }

  @action nextScreen(screen) {
    if (this.screens[screen] === undefined) {
      console.trace('Unknown admin screen', screen, this.screenList);
    }
    this.changeScreen({ [screen]: true });
  }

  constructor() {
    this.changeScreen({ [this.screenList[0]]: true });
  }
}
