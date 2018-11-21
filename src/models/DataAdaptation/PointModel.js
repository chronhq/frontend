import { observable } from 'mobx';

export default class Point {
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
