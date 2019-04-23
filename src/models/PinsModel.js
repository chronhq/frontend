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
  observable, computed, action
} from 'mobx';

import { typesMapping } from './Wikidata/WikidataHelper';

const typesStub = Object.keys(typesMapping).reduce((p, c) => ({
  ...p,
  [typesMapping[c].id]: []
}), {});

// function getIcon(info) {
//   const v = typesMapping[info.type].pic;
//   return v === undefined ? 31 : v;
// }

const getFreeEvents = (p, c) => ({
  ...p,
  [c.event_type]: [...p[c.event_type], c.wikidata_id]
});

const pinToGeoPointRaw = (info = [], loc, img) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [loc.x, loc.y]
  },
  properties: { info, img }
});

// const pinToGeoPoint = info => pinToGeoPointRaw(info, info[0].loc, getIcon(info[0]));

export default class PinsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // @observable pinsOrder = ['document', 'battle', 'persons'];

  // dummy pins - layer without tooltip
  // [{ pic: 26, point: { x: 33.044167, y: 34.674722 } }]
  @observable dummyPins = [];

  @action addDummyPins(points, keep = true) {
    this.dummyPins = keep
      ? observable([...this.dummyPins, points])
      : observable(points);
  }

  @action wipeDummyPins() {
    this.addDummyPins([], false);
  }

  @computed get dummyPinsGJ() {
    const features = this.dummyPins
      .map(d => pinToGeoPointRaw([], d.loc, d.img));
    return {
      type: 'FeatureCollection',
      features
    };
  }

  @computed get narrationEvents() {
    const { tick } = this.rootStore.year;
    const narrations = this.rootStore.data.narrations.data;
    return (narrations[tick] !== undefined && Array.isArray(narrations[tick].attached_events))
      ? narrations[tick].attached_events
      : [];
  }

  @computed get narrationFree() {
    const { courseId } = this.rootStore.courseSelection;
    if (courseId > 0) {
      const events = this.narrationEvents.filter(a => a.location === null);
      return events.reduce(getFreeEvents, { ...typesStub });
    } if (courseId === 0 && this.rootStore.data.cachedData.status.loaded) {
      return Object.values(this.rootStore.data.cachedData.data)
        .reduce(getFreeEvents, { ...typesStub });
    }
    return typesStub;
  }

  @computed get freePins() {
    return Object.keys(typesMapping).reduce((prev, type) => {
      const pins = this.narrationFree[typesMapping[type].id].map(wId => (
        {
          key: wId,
          type,
          pic: typesMapping[type].pic,
          [type]: this.rootStore.wikidata.cache[wId]
            ? this.rootStore.wikidata.cache[wId].item
            : { info: [] }
        }
      )).filter(f => (f !== undefined && f !== null));
      return [...prev, ...pins];
    }, []);
  }
}
