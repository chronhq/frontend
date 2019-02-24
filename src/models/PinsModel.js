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
  observable, computed, action
} from 'mobx';

import { typesMapping } from './Wikidata/WikidataHelper';

const typesStub = Object.keys(typesMapping).reduce((p, c) => ({
  ...p,
  [typesMapping[c].id]: []
}), {});

const getFreeEvents = (p, c) => ({
  ...p,
  [c.event_type]: [...p[c.event_type], `Q${c.wikidata_id}`]
});

function getIcon(info) {
  const v = typesMapping[info.type].pic;
  return v === undefined ? 31 : v;
}

function getKey(info) {
  switch (info.type) {
    case 'birth': return `P_${info.person.id}_${info.type}`;
    case 'death': return `P_${info.person.id}_${info.type}`;
    case 'battle': return `P_${info.battle.id}`;
    case 'document': return `P_${info.document.id}`;
    default: return 'P_default';
  }
}

class InteractivePin {
  constructor(info, key) {
    this.key = key;
    this.info = info;
    this.point = this.info[0].loc;
    this.pic = getIcon(this.info[0]);
  }
}


const pinToGeoPointRaw = (info = [], loc, img) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [loc.x, loc.y]
  },
  properties: { info, img }
});

const pinToGeoPoint = info => pinToGeoPointRaw(info, info[0].loc, getIcon(info[0]));

export default class PinsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable pinsOrder = ['document', 'battle', 'persons'];

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

  @computed get visibility() {
    return this.rootStore.flags.pins.list;
  }

  @computed get personsRawPins() {
    return this.rootStore.wikistore.actors.pins;
  }

  @computed get battleRawPins() {
    return this.rootStore.wikistore.battles.pins;
  }

  @computed get documentRawPins() {
    return this.rootStore.wikistore.documents.pins;
  }

  getActivePins = type => (
    this.pinsOrder.reduce((prev, flag) => {
      const rawPins = `${flag}RawPins`;
      if (this[rawPins] === undefined) return prev;
      return this.visibility[flag]
        ? [...prev, ...this[`${flag}RawPins`][type]]
        : prev;
    }, [])
  )

  // Group pins by location
  // Allow only one pin per location as a separate icon
  @computed get combineRawPins() {
    const pins = {};
    const getLocKey = loc => `X${loc.x}Y${loc.y}`;
    // allow only one icon per location
    const combine = (pin) => {
      const locKey = getLocKey(pin.loc);
      if (!(locKey in pins)) pins[locKey] = [];
      pins[locKey].push(pin);
      return false;
    };
    // This is the pins order. Top level pin icons would be selected first
    this.getActivePins('pins').map(combine);

    return pins;
  }

  @computed get pins() {
    const features = Object.keys(this.combineRawPins)
      .map(d => pinToGeoPoint(this.combineRawPins[d]));
    return {
      type: 'FeatureCollection',
      features
    };
  }

  @computed get narrationFree() {
    const { courseId } = this.rootStore.courseSelection;
    if (courseId > 0) {
      const { tick } = this.rootStore.year;
      const narrations = this.rootStore.data.narrations.data;
      if (narrations[tick] !== undefined && Array.isArray(narrations[tick].attached_events)) {
        const events = narrations[tick].attached_events.filter(a => a.location === null);
        return events.reduce(getFreeEvents, { ...typesStub });
      }
    } if (courseId === 0 && this.rootStore.data.cachedData.status.loaded) {
      return Object.values(this.rootStore.data.cachedData.data)
        .reduce(getFreeEvents, { ...typesStub });
    }
    return typesStub;
  }

  @computed get narrationFreeDeps() {
    return Object.keys(typesStub).reduce((p, c) => ([...p, ...this.narrationFree[c]]), []);
  }

  @computed get narrationFreePins() {
    return Object.keys(typesMapping).reduce((prev, k) => {
      const layer = typesMapping[k].store;
      const pins = this.narrationFree[typesMapping[k].id].map(w => (
        this.rootStore.wikistore[layer].getEventFromWid(k, w)
      )).filter(f => (f !== undefined && f !== null));
      return [...prev, ...pins];
    }, []);
  }

  @computed get freePins() {
    const buildPin = p => new InteractivePin([p], getKey(p));
    const active = this.getActivePins('free').map(buildPin);
    const narrative = this.narrationFreePins.map(buildPin);
    return [
      ...active,
      ...narrative,
    ];
  }
}
