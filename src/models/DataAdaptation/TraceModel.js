import { computed, observable } from 'mobx';

export default class TraceModel {
  @observable data = {};

  @computed get timedTraces() {
    let fullPath = 0;
    const dataWithTime = this.data.path[0].path.slice(1).map((n, i) => {
      const lastPath = Math.hypot(
        n[0] - this.data.path[0].path[i][0],
        n[1] - this.data.path[0].path[i][1]
      );
      fullPath += lastPath;
      return [...n, (fullPath / 100)];
    });
    return [[...this.data.path[0].path[0], 0], ...dataWithTime];
  }

  constructor(data) {
    this.data = data;
  }
}
