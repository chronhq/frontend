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
import { computed, observable } from 'mobx';

export default class CityModel {
  @observable cityId = 1;

  @computed get data() {
    return this.rootStore.data.CityLocs.data[this.cityId];
  }

  @computed get point() {
    return {
      x: this.data.geopoint[0],
      y: this.data.geopoint[1],
    };
  }

  @computed get exists() {
    return this.properties.some(c => c.year < this.now);
  }

  @computed get currentLoc() {
    const answer = { pop: null, props: null };
    if (!this.exists) {
      return answer;
    }
    const getCurrent = (data) => {
      const passed = data.filter(p => p.year <= this.now);
      if (passed.length > 0) {
        const maxYear = Math.max(passed.map(p => p.year));
        return passed.find(p => p.year === maxYear);
      }
      return null;
    };
    try {
      answer.pop = getCurrent(this.population);
      answer.props = getCurrent(this.properties);
      return answer;
    } catch (e) {
      return answer;
    }
  }

  @computed get inTheBox() {
    return this.rootStore.projection.inTheBox(this.point.x, this.point.y);
  }

  @computed get visible() {
    return (this.currentLoc.props !== null && this.inTheBox === true);
  }

  @computed get location() {
    const answer = {
      id: this.data.id,
      ...this.point,
    };
    try {
      answer.name = this.currentLoc.props[this.rootStore.i18n.nameSelector];
      answer.scaleRank = this.currentLoc.props.scalerank;
    } catch (e) {
      console.error('City error', ...this.properties, this, { e });
      answer.name = this.rootStore.i18n.data.unknown.place;
      answer.scaleRank = '2';
    }
    return answer;
  }

  @computed get now() {
    return this.rootStore.year.now;
  }

  @computed get propertiesRaw() {
    return Object.values(this.rootStore.data.CityProperties.data)
      .filter(c => this.data.id === c.cityId);
  }

  @computed get properties() {
    return this.propertiesRaw.map(p => ({
      ...p,
      date: p.year === null
        ? this.rootStore.i18n.data.unknown.year
        : p.year,
      year: p.year !== null
        ? Number(p.year.split('-').shift())
        : 0
    }));
  }

  @computed get population() {
    try {
      return Object.values(this.rootStore.data.CityPops.data)
        .find(c => this.data.id === c.cityId).json;
    } catch (e) {
      // console.log('Error in population', this, e);
      return {};
    }
  }

  constructor(rootStore, cityId) {
    this.rootStore = rootStore;
    this.cityId = cityId;
  }
}
