import { observable, computed } from 'mobx';

class InteractivePin {
  @observable info = [];
  @observable key;

  @computed get point() {
    return this.info[0].loc;
  }

  @computed get pic() {
    switch(this.info[0].type) {
      case 'birth': return 25; // starpin
      case 'death': return 25;
      case 'geo': return 23; // infopin
      case 'inv': return 24; // bulbpin
      default: return 23;
    }
  }

  constructor(info, key) {
    this.key = key;
    this.info = info;
  }
}

export default class FeedPinsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
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
          free.push ({ type, person });
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
        pins.push({ type, loc, invention })
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
          x: geoEvent.projected[0],
          y: geoEvent.projected[1],
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
    }
    this.geoEventsRawPins.pins.map(combine);
    this.inventionsRawPins.pins.map(combine);
    this.personsRawPins.pins.map(combine);
    return pins;
  }

  @computed get pins() {
    return Object.keys(this.combineRawPins).map(d =>
      new InteractivePin(this.combineRawPins[d], d));
  }

}