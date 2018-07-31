import { observable, computed } from 'mobx';
import rbush from 'rbush';

import CityModel from './CityModel';

export default class LocationsModel {
  @observable tree = rbush(9, ['.x', '.y', '.x', '.y']);

  @observable clusterization = true;

  @computed get points() {
    const cities = Object.keys(this.rootStore.data.CityLocs.data);
    return cities.reduce((prev, city) => ({
      ...prev,
      [city]: new CityModel(this.rootStore, city)
    }), {});
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
    const ICON_SIZE = 26;

    const places = this.locations;
    places.forEach((p) => {
      p.zoomLevels = [];
      p.disabledBy = [];
      p.neighbors = [];
    });

    const zoomLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

    this.tree.clear();
    this.tree.load(places);

    zoomLevels.forEach((z) => {
      const width = ICON_SIZE / 2 / (2 ** z);
      const height = 15;

      places.forEach((p) => {
        if (p.zoomLevels[z] === undefined) {
          // this point does not belong to a cluster
          const { x, y } = p;

          // find all points within width that do not belong to a cluster
          const neighbors = this.tree
            .search({
              minX: x - width,
              minY: y - height,
              maxX: x + width,
              maxY: y + height
            })
            .filter(neighbor => neighbor.zoomLevels[z] === undefined);
          const iconPrefix = neighbors.length > 1 ? 'cluster' : 'city';
          neighbors.forEach((neighbor) => {
            if (neighbor === p) {
              neighbor.zoomLevels[z] = {
                icon: `${iconPrefix}-${p.scaleRank}`,
                size: 10,
                // size: this.getIconSize(neighbors.length),
                // points: neighbors
              };
              neighbor.neighbors[z] = this.tree
                .search({
                  minX: x - width,
                  minY: y - height,
                  maxX: x + width,
                  maxY: y + height
                });
            } else {
              neighbor.zoomLevels[z] = null;
              neighbor.disabledBy[z] = p;
            }
          }); // neighbors
        }
      }); // places
    }); // zoom
    return places;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
