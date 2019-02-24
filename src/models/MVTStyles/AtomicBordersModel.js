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

  @computed get STVs() {
    return this.rootStore.spaceTimeVolume;
  }

  @computed get fill() {
    console.time('StyleFeatures');
    const res = Object.values(this.STVs.current).reduce((prev, stv) => (
      [...prev, stv.data.territory, `rgb(${stv.color})`]
    ), []);
    console.timeEnd('StyleFeatures');
    return res;
  }

  @computed get styleInfo() {
    const name = this.layerName;

    const mapsOpacity = 0.75;

    const source = {
      type: 'vector',
      tiles: [`${window.location.origin}/mvt/${name}/{z}/{x}/{y}`]
    };

    // transparent fallback color
    const fallback = 'hsla(0, 14%, 87%, 0)';
    // bright green for debug purposes
    // const fallback = 'rgb(0, 255, 0)';

    const layer = {
      layout: {},
      type: 'fill',
      source: name,
      id: name,
      paint: {
        'fill-opacity': mapsOpacity,
        'fill-color': ['match', ['get', 'id'], ...this.fill, fallback],
        'fill-outline-color': fallback,
        // 'fill-outline-color': 'rgb(30, 30, 200)',
      },
      'source-layer': name
    };
    return {
      sources: { [name]: source }, layers: [layer]
    };
  }
}
