import { observable, when, computed, action } from 'mobx';
import Geometry from './GeometryModel';
import { getActualData, getNextData } from '../reducers/actions';

const separate = (arr) => {
  // split array of geoIds into multiple arrays with setted max elements
  const maxIdsInReq = 15;
  const count = Math.ceil(arr.length / maxIdsInReq);
  const s = new Array(count).fill(undefined);
  return s.map((cur, idx) => {
    const start = maxIdsInReq * idx;
    const stop = maxIdsInReq * (idx + 1);
    return arr.slice(start, stop);
  });
};
export default class BordersModel {
  @observable geo = {};
  @observable contour = {};
  @observable requested = [];

  @observable saveDataCb = (type, json) => {
    const data = {};
    json.map((cur) => {
      data[cur.id] = new Geometry(this.rootStore, cur);
      return false;
    });
    this[type] = { ...this[type], ...data };
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data = this.rootStore.data;

    this.data.Geometries.saveDataCb = json => this.saveDataCb('geo', json);
    this.data.Contours.saveDataCb = json => this.saveDataCb('contour', json);
  }

  @action wipe() {
    this.geo = {};
    this.contour = {};
    this.requested = [];
  }

  @action loadGeometry() {
    when(
      () => this.data.Borders.length > 0,
      () => {
        const d = this.fetchParams;
        d.map((cur) => {
          this.data.Geometries.get(cur);
          return false;
        });
      }
    );
  }

  @computed get ready() {
    return this.requested.length > 0
      ? this.requested.every(cur => cur.id in this.geo)
      : false;
  }

  @computed get actualData() {
    return getActualData(this.allYears, this.byYear, this.rootStore.year.now);
  }

  @computed get nextData() {
    return getNextData(this.allYears, this.byYear, this.rootStore.year.now);
  }

  @computed get fetchParams() {
    const futureBorders = { ...this.actualData, ...this.nextData };
    const dataToLoad = [];
    Object.keys(futureBorders).map((cur) => {
      if (!(futureBorders[cur].geo in this.geo)) {
        dataToLoad.push({ id: futureBorders[cur].geo });
      }
      return false;
    });
    const arr = separate(dataToLoad);
    this.requested = dataToLoad;
    return arr.map(or => JSON.stringify({ where: { or } }));
  }

  // Borders Timeline
  @computed get byYear() {
    return Object.keys(this.data.Borders.data).reduce((prev, r) => {
      const row = this.data.Borders.data[r];
      const d = { [row.id]: { geo: row.geo, props: row.props } };
      if (row.year in prev) {
        return {
          ...prev,
          [row.year]: { ...prev[row.year], ...d }
        };
      }
      return { ...prev, [row.year]: d };
    }, {});
  }

  @computed get allYears() {
    return Object.keys(this.byYear);
  }

  @computed get bordersProps() {
    return Object.values(this.actualData).map(cur => ({
      ...this.data.Properties.data[cur.props],
      type: this.data.Types.data[this.data.Properties.data[cur.props].type],
      admin: this.data.Admins.data[this.data.Properties.data[cur.props].admin],
    }));
  }

  @computed get bordersPath() {
    return Object.values(this.actualData).map(cur => ({
      id: cur.geo,
      props: cur.props,
      d: this.geo[cur.geo].projected,
    }));
  }
}
