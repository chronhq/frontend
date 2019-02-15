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
    // Deprecated pin types
    // case 'geo': return 30; // SimpleInfoPin
    // case 'inv': return 27; // SimpleBulb
    case 'battle': return 32; // SimpleSwords
    case 'document': return 24; // treaty bird
    default: return 31; // SimpleStar
  }
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

export default class PinsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable pinsOrder = ['document', 'battle', 'persons'];

  // dummy pins are sorced directly from deck.gl layer and do not have tooltip
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
    const p = [];
    Object.keys(this.combineRawPins)
      .map((d) => {
        const pin = toJS(this.combineRawPins[d]);
        p.push(new InteractivePin(pin, d));
        return false;
      });
    return p;
  }

  @computed get freePins() {
    return this.getActivePins('free')
      .map(p => new InteractivePin([p], getKey(p)));
  }
}
