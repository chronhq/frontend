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

export default class AdminModel {
  @observable isOpened = false;

  @observable screenList = ['panel', 'pr', 'te', 'stv', 'sandbox'];

  @observable screens = {};

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
