import { computed, observable } from 'mobx';

class Point {

  @observable pic;

  @observable point;

  constructor(point) {
    this.point = {
      x: point.geopoint[0],
      y: point.geopoint[1],
    };
    this.pic = point.pic;
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
      const point = new Point(cur);
      data[cur[this.key]].push(point);
      return false;
    }, {});
    this.points = { ...this.points, ...data };
  }

  @computed get tick() {
    return this.rootStore.year.tick;
  }

  @computed get current() {
    const arr = [];
    if (this.tick in this.points) {
      Object.values(this.points[this.tick]).map((p) => {
        if (this.rootStore.projection
          .inTheBox(p.point.x, p.point.y)) arr.push(p);
        return null;
      });
    }
    return arr;
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
