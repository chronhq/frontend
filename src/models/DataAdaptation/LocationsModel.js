import { observable, computed } from 'mobx';
import rbush from 'rbush';

import CityModel from './CityModel';

export default class LocationsModel {
  @observable tree = rbush(9, ['.x', '.y', '.x', '.y']);
  @observable clusterization = true;

  @computed get points() {
    const cities = Object.keys(this.rootStore.data.CityLocs.data);
    return cities.map(city => new CityModel(this.rootStore, city));
  }

  @computed get visiblePoints() {
    const places = [];
    Object.keys(this.points).map((cur) => {
      if (this.points[cur].visible) {
        places.push(this.points[cur]);
      }
      return false;
    });
    return places.sort((a, b) => a.location.scaleRank - b.location.scaleRank);
  }

  @computed get locations() {
    const places = [];
    Object.keys(this.visiblePoints).map((cur) => {
      places.push(this.visiblePoints[cur].location);
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

    const places = this.locations;
    places.forEach((p) => {
      p.zoomLevels = [];
    });

    this.tree.clear();
    this.tree.load(places);
    // return places;

    for (let z = 0; z <= 20; z += 1) {
      const radius = ICON_SIZE / 2 / (2 ** z);

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

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
