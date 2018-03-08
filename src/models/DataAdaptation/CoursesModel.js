import { observable, computed } from 'mobx';

export default class CoursesModel {
  @observable saveDataCb = (json) => {
    const data = {};
    json.map((cur) => {
      data[cur.tick] = cur;
      return false;
    });
    this.rootStore.data.CourseTimelines.data = data;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rootStore.data.CourseTimelines.saveDataCb = json => this.saveDataCb(json);
  }

  @computed get data() {
    return this.rootStore.data.CourseTimelines.data;
  }
}
