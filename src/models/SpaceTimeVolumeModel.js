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
  observable, computed
} from 'mobx';

import MapColors from './MapColors';
import Ap2STV from './Ap2STV';

class STV {
  @observable id;

  @computed get now() {
    return this.rootStore.year.now;
  }

  @computed get visible() {
    return (this.data.start_date <= this.now && this.now <= this.data.end_date);
  }

  @computed get data() {
    return this.rootStore.data.STVs.data[this.id];
  }

  @computed get inUse() {
    return this.data.territory.reduce((p, c) => ({ ...p, [c]: true }));
  }

  @computed get te() {
    // TODO: add conditions for admin_level and relations
    return this.rootStore.data.TEs.data[this.data.entity];
  }

  @computed get values() {
    return {
      title: this.te.admin,
      subTitle: this.te.name,
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
      emblem: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Royal_Coat_of_Arms_of_the_United_Kingdom.svg',
      dataOrigin: ['https://www.wikidata.org/wiki/Q145'],
      sources: [
        'https://en.wikipedia.org/wiki/United_Kingdom',
        'https://www.wikidata.org/wiki/Q145'
      ]
    };
  }

  @computed get color() {
    try {
      const color = this.mapColors[this.te.color].color1;
      return [color[0], color[1], color[2]];
    } catch (e) {
      // console.error('ColorID', this.data.color, 'Props', this.data);
      // Probably colorID === -99 -- Disputed territory
      return [127, 127, 127];
    }
  }

  constructor(rootStore, id, mapColors) {
    this.rootStore = rootStore;
    this.mapColors = mapColors;
    this.id = id;
  }
}

export default class SpaceTimeVolumeModel {
  @observable ap2stv = Ap2STV;

  @observable mapColors = MapColors;

  // @observable data = {};

  @computed get STVs() {
    return this.rootStore.data.STVs.data;
  }

  // @action setup() {
  // console.log('Setup');
  @computed get data() {
    return Object.values(this.STVs).reduce((prev, cur) => ({
      ...prev,
      [cur.id]: new STV(this.rootStore, cur.id, this.mapColors)
    }), {});
    // extendObservable(this.data, data);
  }

  @computed get current() {
    if (this.data === undefined) return {};
    return Object.values(this.data).reduce((prev, cur) => (
      cur.visible
        ? ({ ...prev, [cur.id]: cur })
        : prev), {});
  }

  @computed get active() {
    return Object.keys(this.current).reduce((prev, key) => ({
      ...prev,
      ...this.current[key].inUse
    }), {});
  }

  @computed get blank() {
    return Object.keys(this.ap2stv).reduce((p, c) => (
      this.active[c] !== undefined ? p : [...p, c]), []).map(m => Number(m));
  }

  // // TODO Compute this on backend
  // @computed get ap2stv() {
  //   return Object.keys(this.data).reduce((prev, curId) => {
  //     const { id } = this.data[curId];
  //     const next = this.data[curId].data.territory.reduce((p, c) => ({
  //       ...p,
  //       [c]: prev[c] !== undefined ? [...prev[c], id] : [id]
  //     }), {});
  //     return { ...prev, ...next };
  //   }, {});
  // }

  hovering(id) {
    return this.ap2stv[id].filter(f => this.data[f].visible);
  }

  @computed get overlapping() {
    return Object.keys(this.ap2stv).reduce((p, c) => {
      const hov = this.hovering(c);
      return hov.length > 1 ? [...p, c] : p;
    }, []);
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    // when(
    //   () => this.rootStore.data.STVs.status.loaded,
    //   () => this.setup()
    // );
  }
}
