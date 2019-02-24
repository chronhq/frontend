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
  computed, observable
} from 'mobx';

export default class AtomicBordersModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data = this.rootStore.data;
  }

  @observable layerName = 'ap';

  @observable mapsOpacity = 0.75;

  @observable debug = false;

  @computed get fallback() {
    return this.debug
      // bright green for debug purposes
      ? 'rgb(0, 255, 0)'
      // transparent fallback color
      : 'hsla(0, 14%, 87%, 0)';
  }

  @computed get paint() {
    return {
      'fill-opacity': this.mapsOpacity,
      'fill-outline-color': this.debug ? 'rgb(30, 30, 200)' : this.fallback,
      'fill-color': ['match', ['get', 'id'], ...this.fill, this.fallback],
    };
  }

  @computed get STVs() {
    return this.rootStore.spaceTimeVolume;
  }

  @computed get fill() {
    const res = Object.values(this.STVs.current).reduce((prev, stv) => (
      [...prev, stv.data.territory, stv.color]
    ), []);
    return res;
  }

  @computed get source() {
    return {
      type: 'vector',
      tiles: [`${window.location.origin}/mvt/${this.layerName}/{z}/{x}/{y}`]
    };
  }

  @computed get styleInfo() {
    const layer = {
      layout: {},
      type: 'fill',
      source: this.layerName,
      id: this.layerName,
      paint: this.paint,
      'source-layer': this.layerName
    };
    return {
      sources: { [this.layerName]: this.source }, layers: [layer]
    };
  }
}
