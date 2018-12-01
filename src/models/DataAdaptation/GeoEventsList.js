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

export default class GeoEventsList {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get data() {
    const data = {};
    Object.values(this.rootStore.data.GeoEvents.data).map((d) => {
      data[d.id] = {
        ...d,
        description: [d.description[this.lng]],
        title: this.rootStore.i18n.data.messages.geoEventTitle
      };
      return null;
    });
    return data;
  }

  @computed get timeline() {
    return Object.keys(this.data).reduce((prev, curId) => {
      const cur = this.data[curId];
      try {
        const year = Number(cur.date.replace(/-.*/g, ''));
        return year in prev
          ? { ...prev, [year]: [...prev[year], cur.id] }
          : { ...prev, [year]: [cur.id] };
      } catch (e) {
        console.error('Processing GeoEventsList', cur);
        return prev;
      }
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

  @computed get currentData() {
    return this.current.map(id => this.data[id]);
  }
}
