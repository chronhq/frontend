import { observable, when, computed } from 'mobx';
import Geometry from './GeometryModel';
import { getActualData, getNextData } from '../reducers/actions';

export default class BordersModel {
  @observable geometries = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
    when(
      // Process new geometry, when downloaded
      () => (this.geometryNotEmpty),
      () => {
        console.log('received new geometry, processing');
        this.geometries = this.rootStore.data.Geometries.reduce((prev, geo) => ({
          ...prev,
          [geo.id]: new Geometry(this.rootStore, geo)
        }), this.geometries);
        this.rootStore.data.Geometries = [];
      }
    );
  }
  @computed get geometryNotEmpty() {
    return Object.keys(this.rootStore.bank.data.Geometries).length !== 0;
  }
  @computed get actualData() {
    return getActualData(this.allYears, this.byYear, this.rootStore.year.now);
  }

  @computed get nextData() {
    return getNextData(this.allYears, this.byYear, this.rootStore.year.now);
  }

  @computed get admin() {
    return this.rootStore.data.Admins;
  }

  @computed get type() {
    return this.rootStore.data.Types;
  }

  @computed get properties() {
    return this.rootStore.data.Properties;
    // Colors and ranking is missing here
  }

  @computed get nextGeometries() {
    // type must be geo or props
    const type = 'geo';
    return Object.keys(this.geometries).reduce(
      (prev, cur) => (this.geometries[cur][type] in this.geometries
        ? prev
        : [...prev, { id: this.geometries[cur][type] }])
      , []
    );
  }

  // Borders Timeline
  @computed get byYear() {
    return this.rootStore.data.Borders.reduce((prev, row) => {
      const d = { [row.id]: { geo: row.geo, props: row.props } };
      if (row.year in prev) {
        return { ...prev,
          [row.year]: { ...prev[row.year], ...d }
        };
      }
      return { ...prev, [row.year]: d };
    }, {});
  }

  @computed get allYears() {
    return Object.keys(this.byYear);
  }
}
