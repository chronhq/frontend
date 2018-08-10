import { computed, observable, action } from 'mobx';

class TraceModel {
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

  constructor(rootStore, point) {
    this.rootStore = rootStore;
    this.data = point;
  }
}

export default class Expeditions {
  @computed get data() {
    return this.rootStore.data;
  }

  @observable key = 'courseTimelineId'

  @observable points = {}

  @observable arrayTraceCb(json) {
    const data = {};
    json.map((cur) => {
      if (!(cur[this.key] in data)) {
        data[cur[this.key]] = [];
      }
      const point = new TraceModel(this.rootStore, cur);
      data[cur[this.key]].push(point);
      return false;
    }, {});
    this.points = { ...this.points, ...data };
  }

  @action wipe() {
    this.points = {};
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    try {
      this.data.CourseTraces.saveDataCb = json => this.arrayTraceCb(json);
    } catch (e) {
      console.error('Error in GPP ', 'CourseTraces');
      console.error(e);
    }
  }
}
