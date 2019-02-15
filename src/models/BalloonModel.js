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
import { observable, computed, action } from 'mobx';

export default class BalloonModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable pinned = false;

  @observable active = null;

  @observable selectedFreePin = false;

  @observable pageX = 0;

  @observable pageY = 1;

  @observable countryHover = null;

  @observable clickPositionRaw = { lat: 0, lon: 0 };

  // pins from mvt cached-data events
  @observable mvtpins = [];

  @action setPosition(x, y) {
    this.pageX = x;
    this.pageY = y;
  }

  @action setClickPosition(clickPosition) {
    this.clickPosition = clickPosition;
  }

  @action forcePin(a, force) {
    if (force === true) this.pinned = true;
    if (a === null) this.pinned = false;
  }

  @action unpin() {
    if (this.pinned === true) {
      this.pinned = false;
      return true;
    }
    return false;
  }

  @action setActive(a, free = false, force = false) {
    this.forcePin(a, force);
    if (this.pinned === false || force === true) {
      this.countryHover = null;
      this.selectedFreePin = free;
      this.active = a;
    }
  }

  @action setCountryActive(c, force = false) {
    this.forcePin(c, force);
    if (this.pinned === false || force === true) {
      this.countryHover = c;
      this.active = Boolean(c);
    }
  }

  @computed get clickPosition() {
    const pos = this.clickPositionRaw;
    return {
      lat: Math.round(pos.lat * 1000000) / 1000000,
      lng: Math.round(pos.lng * 1000000) / 1000000,
    };
  }

  @computed get pins() {
    return this.rootStore.pins.pins;
  }

  @computed get freePins() {
    return this.rootStore.pins.freePins;
  }

  set clickPosition(clickPosition) {
    this.clickPositionRaw = clickPosition;
  }

  @computed get selected() {
    return this.selectedFreePin
      ? this.freePins.find(pin => pin.key === this.active)
      : this.pins.find(pin => pin.key === this.active);
  }
}
