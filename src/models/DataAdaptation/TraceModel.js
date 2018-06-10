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
    this.inTheBox.map((arr, pidx) =>
      arr.map((flag, idx) => {
        if (flag) {
          const point = this.data.path[pidx].path[idx];
          points.push(this.project([point[0], point[1]]));
        }
        return false;
      }));
    return points;
  }

  // @computed get timedTrace() {
  //   let fullPath = 0;
  //   // console.log('timedTrace', this.data);
  //   console.log(this.data.path[0].path);
  //   let dataWithTime = this.data.path[0].path;
  //   // let dataWithTime = this.data.slice(1).map((n,i) => {
  //     // const lastPath = Math.hypot(n[0] - data[i][0], n[1] - data[i][1]);
  //     // fullPath = fullPath + lastPath;
  //     // return n.concat(fullPath/100);
  //   // });
  //   // dataWithTime.unshift(this.data[0].concat(0));
  //   return dataWithTime;
  // }

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
