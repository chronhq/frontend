import { computed, observable } from 'mobx';

export default class TraceModel {
  @observable data = {};
  @observable type = '';

  @computed get projection() {
    return this.rootStore.projection;
  }

  @computed get project() {
    return this.projection.project;
  }

  @computed get projected() {
    const points = [];
    this.inTheBox.map((flag, idx) => {
      if (flag) {
        const point = this.point.path[idx];
        points.push(this.project([point[0], point[1]]));
      }
      return false;
    });
    return points;
  }

  // Point will be in viewport area after clipping
  @computed get inTheBox() {
    return this.point.path.path.map(cur =>
      this.projection.inTheBox(cur[0], cur[1]));
  }

  constructor(rootStore, point) {
    this.rootStore = rootStore;
    this.data = point;
  }
}
