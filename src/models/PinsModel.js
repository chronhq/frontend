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
  observable, computed, action, toJS
} from 'mobx';

function getIcon(info) {
  switch (info.type) {
    case 'birth': return 26; // Birth
    case 'death': return 28; // Death
    case 'geo': return 30; // SimpleInfoPin
    case 'inv': return 27; // SimpleBulb
    default: return 31; // SimpleStar
  }
}

function getKey(info) {
  switch (info.type) {
    case 'birth': return `P_${info.person.id}_${info.type}`;
    case 'death': return `P_${info.person.id}_${info.type}`;
    case 'geo': return `P_${info.geoEvent.id}`;
    case 'inv': return `P_${info.invention.id}`;
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

export default class FeedPinsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable active = null;

  @observable selectedFreePin = false;

  @observable pageX = 0;

  @observable pageY = 1;

  @observable countryHover = null;

  @action setPosition(x, y) {
    this.pageX = x;
    this.pageY = y;
  }

  @action setActive(a, free = false) {
    this.countryHover = null;
    this.selectedFreePin = free;
    this.active = a;
  }

  @action setCountryActive(c) {
    this.countryHover = c;
    this.active = Boolean(c);
  }

  @computed get visibility() {
    return this.rootStore.flags.pins.list;
  }

  @computed get selected() {
    return this.selectedFreePin
      ? this.freePins.find(pin => pin.key === this.active)
      : this.pins.find(pin => pin.key === this.active);
  }

  @computed get persons() {
    return this.rootStore.data.Persons.data;
  }

  @computed get personsFeed() {
    return this.rootStore.prepared.persons.current;
  }

  @computed get personsRawPins() {
    const pins = [];
    const free = [];
    ['birth', 'death'].map(type => (
      this.personsFeed[type].map((perFact) => {
        const typePlace = `${type}Place`;
        const person = this.persons[perFact.person];
        const locId = person[typePlace];
        if (locId !== 0) {
          const loc = this.rootStore.prepared.data.cities.points[locId].location;
          pins.push({ type, loc, person });
        } else {
          free.push({ type, person });
        }
        return false;
      })
    ));
    return { pins, free };
  }

  @computed get inventions() {
    return this.rootStore.data.Inventions.data;
  }

  @computed get inventionsFeed() {
    return this.rootStore.prepared.inventions.current;
  }

  @computed get inventionsRawPins() {
    const pins = [];
    const free = [];
    const type = 'inv';
    this.inventionsFeed.map((invId) => {
      const invention = this.inventions[invId];
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

  @computed get geoEvents() {
    return this.rootStore.prepared.geoEventsList.currentData;
  }

  @computed get geoEventsRawPins() {
    const pins = [];
    const free = [];
    const type = 'geo';
    this.geoEvents.map((geoEvent) => {
      if (geoEvent.geopoint[0] === null || geoEvent.geopoint[1] === null) {
        free.push({ type, geoEvent });
      } else {
        const loc = {
          x: geoEvent.geopoint[0],
          y: geoEvent.geopoint[1],
        };
        pins.push({ type, geoEvent, loc });
      }
      return false;
    });
    return { pins, free };
  }

  @computed get combineRawPins() {
    const pins = {};
    const getLocKey = loc => `X${loc.x}Y${loc.y}`;
    const combine = (pin) => {
      const locKey = getLocKey(pin.loc);
      if (!(locKey in pins)) pins[locKey] = [];
      pins[locKey].push(pin);
      return false;
    };
    if (this.visibility.geoEvents) {
      this.geoEventsRawPins.pins.map(combine);
    } if (this.visibility.inventions) {
      this.inventionsRawPins.pins.map(combine);
    } if (this.visibility.persons) {
      this.personsRawPins.pins.map(combine);
    }
    return pins;
  }

  @computed get pins() {
    const p = [];
    Object.keys(this.combineRawPins)
      .map((d) => {
        const pin = toJS(this.combineRawPins[d]);
        const inTheBox = this.rootStore
          .projection.inTheBox(pin[0].loc.x, pin[0].loc.y);
        if (inTheBox) {
          p.push(new InteractivePin(pin, d));
        } else {
          console.log('Not In the Box', JSON.stringify(pin), pin[0].loc.x, pin[0].loc.y);
        }
        return false;
      });
    return p;
  }

  @computed get freePins() {
    const pins = [];
    if (this.visibility.geoEvents) {
      pins.push(...this.geoEventsRawPins.free);
    } if (this.visibility.inventions) {
      pins.push(...this.inventionsRawPins.free);
    } if (this.visibility.persons) {
      pins.push(...this.personsRawPins.free);
    }
    return pins.map(p => new InteractivePin([p], getKey(p)));
  }
}
