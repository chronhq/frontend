import { computed, observable } from 'mobx';

export default class TraceModel {
  @observable data = {};
  @observable type = '';

  @computed get timedTraces() {
    let fullPath = 0;
    const dataWithTime = this.data.path[0].path.slice(1).map((n, i) => {
      const lastPath = Math.hypot(
        n[0] - this.data.path[0].path[i][0],
        n[1] - this.data.path[0].path[i][1]
      );
      fullPath += lastPath;
      return [...n, (fullPath)];
    });
    return [[...this.data.path[0].path[0], 0], ...dataWithTime];
  }

  // Point will be in viewport area after clipping
  @computed get inTheBox() {
    return this.data.path.map(cur =>
      cur.path.map(point =>
        this.projection.inTheBox(point[0], point[1])));
  }

  constructor(rootStore, point) {
    this.rootStore = rootStore;
    this.data = point;
  }
}
