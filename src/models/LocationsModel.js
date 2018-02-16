import { observable, computed } from 'mobx';
import { getActualData, getNextData } from '../reducers/actions';
import Point from './PointModel';
import { getTooltipSize } from '../containers/Locations/LocationDotLabel';

export default class LocationsModel {
  @observable cities = {};

  @observable saveDataCb = (type, json) => {
    const data = {};
    console.time(`SAVING ${type}`);
    json.map((cur) => {
      data[cur.id] = new Point(this.rootStore, cur, type);
      return false;
    });
    this[type] = { ...this[type], ...data };
    console.timeEnd(`SAVING ${type}`);
  }

  @computed get byYear() {
    const timeline = Object.keys(this.cities).reduce((prev, cur) => {
      const place = this.cities[cur].data;
      place.founded = place.founded === null ? '0000' : place.founded;
      if ('founded' in place && place.founded !== '' && place.founded !== null) {
        const year = Number(place.founded.split('-').shift());
        if (!(year in prev)) {
          return { ...prev, [year]: [place.id] };
        }
        return { ...prev, [year]: [...prev[year], place.id] };
      }
      return { ...prev };
    }, {});
    const accumulated = {};
    Object.keys(timeline).reduce((prevYear, curYear) => {
      accumulated[curYear] = [...prevYear, ...timeline[curYear]];
      return accumulated[curYear];
    }, []);
    return accumulated;
  }

  @computed get allYears() {
    return Object.keys(this.byYear);
  }

  @computed get actualData() {
    return getActualData(this.allYears, this.byYear, this.rootStore.year.now);
  }

  @computed get nextData() {
    return getNextData(this.allYears, this.byYear, this.rootStore.year.now);
  }

  @computed get locations() {
    const places = [];
    this.actualData.map((cur) => {
      if (this.cities[cur].visible) {
        places.push(this.cities[cur].location);
      }
      return false;
    });
    // sort by scaleRank
    return places.sort((a, b) => (a.scaleRank - b.scaleRank));
  }

  @computed get scale() {
    return Math.round(this.rootStore.flags.flags.view.scale);
  }

  @computed get tooltips() {
    if (this.rootStore.flags.flags.visibility.tooltips) {
      const tooltips = []; // array of added text rectangles
      return this.locations.map((loc) => {
        const size = getTooltipSize(loc, this.scale);
        const noOverlap = s => ( // returns false is collision detected
          (s.top > size.bottom || s.bottom < size.top
            || s.left > size.right || s.right < size.left)
        );
        const placeIsFree = tooltips.every(noOverlap);
        if (placeIsFree === true) {
          tooltips.push(size);
          return true;
        }
        return false;
      });
    }
    return this.locations.map(() => false);
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data = rootStore.data;
    this.data.Cities.saveDataCb = json => this.saveDataCb('cities', json);
  }
}
