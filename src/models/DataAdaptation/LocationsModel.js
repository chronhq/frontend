import { computed } from 'mobx';
import { getActualData, getNextData } from './_helper';
import { getTooltipSize } from '../../containers/Locations/LocationDotLabel';
import GenericPointProcessing from './GenericPointProcessing';

export default class LocationsModel extends GenericPointProcessing {
  @computed get byYear() {
    const timeline = Object.keys(this.points).reduce((prev, cur) => {
      const place = this.points[cur].data;
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
      if (this.points[cur].visible) {
        places.push(this.points[cur].location);
      }
      return false;
    });
    // sort by scaleRank
    return places.sort((a, b) => (a.scaleRank - b.scaleRank));
  }

  @computed get scale() {
    return this.rootStore.view.roundScale;
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
}
