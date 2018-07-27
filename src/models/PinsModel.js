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
    this.selectedFreePin = free;
    this.active = a;
  }

  @action setCountryActive(c) {
    // console.log('Selecting country', c);
    this.countryHover = c;
    this.active = Boolean(c);
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
    return this.rootStore.prepared.geoEvents;
  }

  @computed get geoEventsFeed() {
    return this.rootStore.prepared.geoEventsList.current;
  }

  @computed get geoEventsRawPins() {
    const pins = [];
    const free = [];
    const type = 'geo';
    this.geoEventsFeed.map((gevId) => {
      const geoEvent = this.rootStore.prepared.geoEvents[gevId];
      if (geoEvent.point.x === null || geoEvent.point.y === null) {
        free.push({ type, geoEvent });
      } else {
        const loc = {
          x: geoEvent.point.x,
          y: geoEvent.point.y,
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
    this.geoEventsRawPins.pins.map(combine);
    this.inventionsRawPins.pins.map(combine);
    this.personsRawPins.pins.map(combine);
    return pins;
  }

  @computed get pins() {
    return toJS(Object.keys(this.combineRawPins)
      .map(d => new InteractivePin(toJS(this.combineRawPins[d]), d)));
  }

  @computed get freePins() {
    return [
      ...this.geoEventsRawPins.free,
      ...this.inventionsRawPins.free,
      ...this.personsRawPins.free,
    ].map(p => new InteractivePin([p], getKey(p)));
  }
}
