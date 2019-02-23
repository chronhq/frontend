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
import { observable, computed } from 'mobx';

export default class ProjectionModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // [[Left, Top], [Right, Bottom]]
  @observable defaultClip = '[[-180,90],[180,-90]]';

  @computed get courseId() {
    return this.rootStore.courseSelection.courseId;
  }

  @computed get data() {
    return this.rootStore.flags.projection.list;
  }

  @computed get clipEnabled() {
    return JSON.stringify(this.clip) !== this.defaultClip;
  }

  @computed get clip() {
    return this.data.clip;
  }

  @computed get center() {
    return this.data.center;
  }
}
