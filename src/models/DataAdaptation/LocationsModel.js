import { observable, computed } from 'mobx';
import { WebMercatorViewport } from 'deck.gl';
import rbush from 'rbush';

import { getTooltipSize } from '../../containers/Locations/LocationDotLabel';
import GenericPointProcessing from './GenericPointProcessing';

export default class LocationsModel extends GenericPointProcessing {
  @observable tree = rbush(9, ['.x', '.y', '.x', '.y']);
  @observable clusterization = true;

  @computed get locations() {
    const places = [];
    Object.keys(this.points).map((cur) => {
      places.push(this.points[cur].location);
      return false;
    });
    return places;
  }

  getIconName = (size) => {
    if (size === 0) {
      return '';
    }
    if (size < 10) {
      return `marker-${size}`;
    }
    if (size < 100) {
      return `marker-${Math.floor(size / 10)}0`;
    }
    return 'marker-100';
  }

  getIconSize = () => {
    // return Math.min(100, size) / 100 * 0.5 + 0.5;
    return 30;
  }

  @computed get clusteredLocations() {
    const ICON_SIZE = 64;
    //   ...this.rootStore.deck.viewport,
    //   zoom: 0
    // });

    const places = [];
    Object.keys(this.points).map((cur) => {
      places.push(this.points[cur].location);
      return false;
    });
    places.forEach((p) => {
      p.zoomLevels = [];
    });

    this.tree.clear();
    this.tree.load(places);
    // return places;

    for (let z = 0; z <= 20; z++) {
      const radius = ICON_SIZE / 2 / Math.pow(2, z);

      places.forEach((p) => {
        if (p.zoomLevels[z] === undefined) {
          // this point does not belong to a cluster
          const { x, y } = p;

          // find all points within radius that do not belong to a cluster
          const neighbors = this.tree
            .search({
              minX: x - radius,
              minY: y - radius,
              maxX: x + radius,
              maxY: y + radius
            })
            .filter(neighbor => neighbor.zoomLevels[z] === undefined);

          // only show the center point at this zoom level
          neighbors.forEach((neighbor) => {
            if (neighbor === p) {
              p.zoomLevels[z] = {
                icon: this.getIconName(neighbors.length),
                size: this.getIconSize(neighbors.length),
                points: neighbors
              };
            } else {
              neighbor.zoomLevels[z] = null;
            }
          });
        }
      });
    }
    return places;
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
