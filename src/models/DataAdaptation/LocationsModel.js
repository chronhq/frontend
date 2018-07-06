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

  @computed get clusteredLocations() {
    const ICON_SIZE = 32;
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

          const iconPrefix = neighbors.length > 1 ? 'cluster' : 'city';
          // only show the center point at this zoom level
          neighbors.forEach((neighbor) => {
            if (neighbor === p) {
              p.zoomLevels[z] = {
                // icon: this.getIconName(neighbors.length),
                icon: `${iconPrefix}-${p.scaleRank}`,
                size: 10,
                // size: this.getIconSize(neighbors.length),
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
