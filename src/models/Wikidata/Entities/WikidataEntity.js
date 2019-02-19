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
import {
  computed
} from 'mobx';

import { wdProps } from '../WikidataHelper';
import WikidataGenericEntity from './WikidataGenericEntity';

class WikidataEntity extends WikidataGenericEntity {
  getCoordinates = loc => loc.map(i => ((this.cache[i] && this.cache[i].values.coordinateLocation)
    ? this.cache[i].values.coordinateLocation
      .map(l => ({
        y: l[0],
        x: l[1],
        id: this.cache[i].entity.id,
        label: this.cache[i].label,
      }))
    : {}));

  // resolve dependency into whole structures
  getParticipants = p => p.map(i => (this.cache[i]
    ? this.cache[i].label
    : {}));

  @computed get places() {
    return this.getDeepData(
      Object.values(wdProps.places),
      this.getCoordinates
    );
  }

  @computed get genericPlace() {
    const result = {};
    const { publicationPlace, location } = this.places;
    const { coordinateLocation } = this.values;
    if (coordinateLocation !== undefined) result.place = coordinateLocation;
    if (publicationPlace !== undefined) result.place = publicationPlace;
    if (location !== undefined) result.place = location;
    return result;
  }

  @computed get dates() {
    return this.getDeepData(
      Object.values(wdProps.dates),
      dates => dates.map(d => new Date(d))
    );
  }

  @computed get genericDate() {
    const result = {};
    const { publicationDate, pointInTime } = this.dates;
    if (publicationDate !== undefined) result.date = publicationDate;
    if (pointInTime !== undefined) result.date = pointInTime;
    return result;
  }

  @computed get participants() {
    return this.getDeepData(['participant'], this.getParticipants);
  }

  @computed get image() {
    if (this.media.media !== undefined && Object.keys(this.media.media).length > 0) {
      const key = Object.keys(this.media.media)[0];
      return {
        image: {
          ...this.media.media[key],
          title: key
        }
      };
    }
    return {};
  }

  @computed get structure() {
    const flat = {
      ...this.flattenData(this.dates),
      ...this.flattenData(this.places),
      ...this.flattenData(this.genericDate),
      ...this.flattenData(this.genericPlace),
    };

    [...Object.keys(this.dates), 'date'].map((cur) => {
      flat[`${cur}Text`] = flat[cur] !== undefined
        ? this.rootStore.i18n.dateToString(flat[cur])
        : this.rootStore.i18n.data.unknown.year;
      return false;
    });

    return {
      id: this.entity.id,
      type: this.type,
      label: this.label,
      description: this.description,
      ...this.image,
      ...this.participants,
      ...flat,
    };
  }

  constructor(rootStore, type, full, simple) {
    super(rootStore, type, full, simple);
    if (this.type === 'battles' || this.type === 'documents') {
      this.obtainImages(this.values.image, 'media');
    }
  }
}

export default WikidataEntity;
