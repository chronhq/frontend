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
  @observable form = {};
  @observable requested = [];

  @observable saveDataCb = (type, json) => {
    console.log('received new', type, 'processing');
    const data = {};
    console.time('Map timer');
    json.map((cur) => {
      data[cur.id] = new Geometry(this.rootStore, cur);
    });
    this[type] = { ...this[type], ...data };
    console.timeEnd('Map timer');
  }
  constructor(rootStore) {
    this.rootStore = rootStore;

    this.geometry.saveDataCb = json => this.saveDataCb('geo', json);
    this.contour.saveDataCb = json => this.saveDataCb('form', json);
  }
  @action loadBorders() {
    this.borders.wipe();
    const courseId = this.rootStore.flags.flags.runtime.SelectedCourse;
    const where = JSON.stringify({
      where: { courseId }
    }, null, 0);
    this.borders.get(where);
  }

  @action loadGeometry() {
    when(
      () => this.borders.length > 0,
      () => {
        const d = this.fetchParams;
        console.log('Fetch params result', d);
        d.map((cur) => {
          this.geometry.get(cur);
          // const link = this.geometry.getLink(cur);
          // console.log('Load Geometry:', link);
        });
      }
    );
  }
  @computed get ready() {
    return this.requested.length > 0
      ? this.requested.every(cur => cur.id in this.geo)
      : false;
  }
  @computed get geometryNotEmpty() {
    return this.geometry.length !== 0;
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
    Object.keys(futureBorders).map(
      (cur) => {
        if (!(futureBorders[cur].geo in this.geo)) {
          dataToLoad.push({ id: futureBorders[cur].geo });
        }
      });
    const arr = separate(dataToLoad);
    this.requested = dataToLoad;
    return arr.map(or => JSON.stringify({ where: { or } }));
  }
  @computed get admin() {
    return this.rootStore.data.Admins;
  }

  @computed get type() {
    return this.rootStore.data.Types;
  }

  @computed get geometry() {
    return this.rootStore.data.Geometries;
  }

  @computed get borders() {
    return this.rootStore.data.Borders;
  }

  @computed get contour() {
    return this.rootStore.data.Contours;
  }

  @computed get properties() {
    return this.rootStore.data.Properties;
    // Colors and ranking is missing here
  }

  // @computed get nextGeometries() {
  //   // type must be geo or props
  //   const type = 'geo';
  //   return Object.keys(this.geometries).reduce(
  //     (prev, cur) => (this.geometries[cur][type] in this.geometries
  //       ? prev
  //       : [...prev, { id: this.geometries[cur][type] }])
  //     , []
  //   );
  // }

  // Borders Timeline
  @computed get byYear() {
    console.log('Computing byYear', this.borders.length);
    return Object.keys(this.borders.data).reduce((prev, r) => {
      const row = this.borders.data[r];
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
}
