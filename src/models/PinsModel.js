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
    case 'battle': return 32; // SimpleSwords
    case 'document': return 24; // treaty bird
    default: return 31; // SimpleStar
  }
}

function getKey(info) {
  switch (info.type) {
    case 'birth': return `P_${info.person.id}_${info.type}`;
    case 'death': return `P_${info.person.id}_${info.type}`;
    case 'geo': return `P_${info.geoEvent.id}`;
    case 'inv': return `P_${info.invention.id}`;
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

export default class FeedPinsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable pinsOrder = [
    'geoEvents', 'inventions', 'document', 'battle', 'persons'];

  @observable pinned = false;

  @observable active = null;

  @observable selectedFreePin = false;

  @observable pageX = 0;

  @observable pageY = 1;

  @observable countryHover = null;

  @observable clickPosition = { lat: 0, lon: 0 };

  @action setPosition(x, y) {
    this.pageX = x;
    this.pageY = y;
  }

  @action forcePin(a, force) {
    if (force === true) this.pinned = true;
    if (a === null) this.pinned = false;
  }

  @action unpin() {
    if (this.pinned === true) {
      this.pinned = false;
      return true;
    }
    return false;
  }

  @action setActive(a, free = false, force = false) {
    this.forcePin(a, force);
    if (this.pinned === false || force === true) {
      this.countryHover = null;
      this.selectedFreePin = free;
      this.active = a;
    }
  }

  @action setCountryActive(c, force = false) {
    this.forcePin(c, force);
    if (this.pinned === false || force === true) {
      this.countryHover = c;
      this.active = Boolean(c);
    }
  }

  @computed get visibility() {
    return this.rootStore.flags.pins.list;
  }

  @computed get selected() {
    return this.selectedFreePin
      ? this.freePins.find(pin => pin.key === this.active)
      : this.pins.find(pin => pin.key === this.active);
  }

  @computed get personsRawPins() {
    const persons = this.rootStore.prepared.persons.pins;
    const actors = this.rootStore.wikistore.actors.pins;
    return {
      free: [...persons.free, ...actors.free],
      pins: [...persons.pins, ...actors.pins],
    };
  }

  @computed get inventionsRawPins() {
    return this.rootStore.prepared.inventions.pins;
  }

  @computed get geoEventsRawPins() {
    return this.rootStore.prepared.geoEventsList.pins;
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
    return this.getActivePins('free')
      .map(p => new InteractivePin([p], getKey(p)));
  }
}
