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
import { computed } from 'mobx';

export default class InventionsList {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get data() {
    return this.rootStore.data.Inventions.data;
  }

  @computed get timeline() {
    return Object.keys(this.data).reduce((prev, curId) => {
      const cur = this.data[curId];
      return cur.inventDate in prev
        ? { ...prev, [cur.inventDate]: [...prev[cur.inventDate], cur.id] }
        : { ...prev, [cur.inventDate]: [cur.id] };
    }, {});
  }

  @computed get year() {
    return this.rootStore.year.now;
  }

  @computed get current() {
    return (this.year in this.timeline)
      ? this.timeline[this.year]
      : [];
  }

  @computed get pins() {
    const pins = [];
    const free = [];
    const type = 'inv';
    this.current.map((invId) => {
      const invention = this.data[invId];
      const locId = invention.inventPlace;
      if (locId !== 0) {
        const loc = this.rootStore.prepared.data.cities.points[locId].location;
        pins.push({ type, loc, invention });
      } else {
        free.push({ type, invention });
      }
      return false;
    });
    return { pins, free };
  }
}
