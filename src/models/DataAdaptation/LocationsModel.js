import { computed } from 'mobx';
import { getTooltipSize } from '../../containers/Locations/LocationDotLabel';
import GenericPointProcessing from './GenericPointProcessing';

export default class LocationsModel extends GenericPointProcessing {
  @computed get locations() {
    const places = [];
    Object.keys(this.points).map((cur) => {
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
