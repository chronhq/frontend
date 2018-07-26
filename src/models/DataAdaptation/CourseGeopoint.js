import { computed, observable } from 'mobx';

class Point {
  @observable data = {};

  @computed get point() {
    return {
      x: this.data.geopoint[0],
      y: this.data.geopoint[1],
    };
  }

  // Point will be in viewport area after clipping
  @computed get inTheBox() {
    return this.projection.inTheBox(this.point.x, this.point.y);
  }

  constructor(rootStore, point) {
    this.rootStore = rootStore;
    this.data = point;
  }
}

export default class CourseGeopoints {
  @computed get data() {
    return this.rootStore.data;
  }

  @observable key = 'courseTimelineId'

  @observable points = {}

  @observable arrayGenCb(json) {
    const data = {};
    json.map((cur) => {
      if (!(cur[this.key] in data)) {
        data[cur[this.key]] = [];
      }
      const point = new Point(this.rootStore, cur);
      data[cur[this.key]].push(point);
      return false;
    }, {});
    this.points = { ...this.points, ...data };
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    try {
      this.data.CourseGeopoints.saveDataCb = json => this.arrayGenCb(json);
    } catch (e) {
      console.error('Error in GPP ', 'CourseGeopoints');
      console.error(e);
    }
  }
}
