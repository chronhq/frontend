import {
  observable, when, computed, action
} from 'mobx';
import { getActualData } from './DataAdaptation/_helper';

const separate = (arr) => {
  // split array of geoIds into multiple arrays with max elements
  const maxIdsInReq = 15;
  const count = Math.ceil(arr.length / maxIdsInReq);
  const s = new Array(count).fill(undefined);
  return s.map((cur, idx) => {
    const start = maxIdsInReq * idx;
    const stop = maxIdsInReq * (idx + 1);
    return arr.slice(start, stop);
  });
};

class GeometryModel {
  geometry = {};

  constructor(data) {
    this.geometry = data.geometry;
  }
}
export default class BordersModel {
  @observable geo = {};

  @observable contour = {};

  @observable saveDataCb = (type, json) => {
    json.map((cur) => {
      // data[cur.id] = new GeometryModel(cur);
      this[type][cur.id] = new GeometryModel(cur);
      return false;
    });
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
    const dataToLoad = [];
    this.actualData.map((cur) => {
      if (!(cur.geo in this.geo)) {
        dataToLoad.push({ id: cur.geo });
      }
      return false;
    });
    return dataToLoad.length === 0;
  }

  @computed get actualData() {
    const data = getActualData(
      this.allYears,
      this.byYear,
      this.rootStore.year.now
    );
    if (Array.isArray(data)) {
      return data;
    }
    return data.geoProps;
  }

  @computed get fetchParams() {
    const futureBorders = this.actualData;
    const dataToLoad = [];
    Object.keys(futureBorders).map((cur) => {
      if (!(futureBorders[cur].geo in this.geo)) {
        dataToLoad.push({ id: futureBorders[cur].geo });
      }
      return false;
    });
    const arr = separate(dataToLoad);
    return arr.map(or => ({ where: { or } }));
  }

  // Borders Timeline
  @computed get byYear() {
    return this.rootStore.data.Borders.data;
  }

  @computed get allYears() {
    return Object.keys(this.byYear);
  }

  @computed get bordersProps() {
    return this.actualData.map(cur => ({
      ...this.data.Properties.data[cur.props],
      type: this.data.Types.data[this.data.Properties.data[cur.props].type],
      admin: this.data.Admins.data[this.data.Properties.data[cur.props].admin],
    }));
  }

  @computed get bordersPath() {
    const borders = [];
    this.actualData.map((cur) => {
      if (cur.geo in this.geo) {
        borders.push({
          id: cur.geo,
          props: cur.props,
          geo: this.geo[cur.geo],
        });
      }
      return false;
    });
    return borders;
  }

  @computed get loadingStatus() {
    switch (this.rootStore.i18n.lng) {
      case 'en': return this.ready ? 'Loading complete' : 'Loading...';
      default: return this.ready ? 'Карты загружены' : 'Загружаем карты';
    }
  }
}
