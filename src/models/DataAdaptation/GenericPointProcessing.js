import { observable, computed } from 'mobx';
import Point from './PointModel';
import TraceModel from './TraceModel';

export default class GenericPointProcessing {
  @observable saveDataCb = (json) => {
    const data = {};
    json.map((cur) => {
      data[cur[this.key]] = new Point(this.rootStore, cur, this.type);
      return false;
    });
    this[this.type] = { ...this[this.type], ...data };
  }

  @observable arrayGenCb(json) {
    const data = {};
    json.map((cur) => {
      if (!(cur[this.key] in data)) {
        data[cur[this.key]] = [];
      }
      const point = new Point(this.rootStore, cur, this.type);
      data[cur[this.key]].push(point);
      return false;
    }, {});
    this[this.type] = { ...this[this.type], ...data };
  }

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
    this[this.type] = { ...this[this.type], ...data };
  }


  @computed get data() {
    return this.rootStore.data;
  }

  @computed get points() {
    return this[this.type];
  }

  @computed get cbName() {
    if (this.type === 'CourseTraces') return 'arrayTraceCb';
    return this.arrFlag ? 'arrayGenCb' : 'saveDataCb';
  }

  constructor(rootStore, type, key = 'id', arrFlag) {
    this.rootStore = rootStore;

    this.type = type;
    this.key = key;
    this.arrFlag = arrFlag;
    this[type] = observable({});

    try {
      this.data[type].saveDataCb = json => this[this.cbName](json);
    } catch (e) {
      console.error('Error in GPP ', type);
      console.error(e);
    }
  }
}
