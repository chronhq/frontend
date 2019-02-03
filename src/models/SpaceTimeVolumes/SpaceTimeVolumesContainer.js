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

// import MapColors from './MapColors';
import Ap2STV from './Ap2STV';


export default class SpaceTimeVolumeModel {
  @observable ap2stv = Ap2STV;

  @computed get data() {
    return this.rootStore.data.STVs.data;
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

  @computed get wIds() {
    return Object.keys(this.current).map(stv => this.current[stv].wId);
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
    // this.wIdGetter = autorun(() => {
    //   console.log('Autorun for wId', this.wIds.length);
    //   this.rootStore.wikistore.countries.add(this.wIds, true);
    // });

    // when(
    //   () => this.rootStore.data.STVs.status.loaded,
    //   () => this.setup()
    // );
  }
}
