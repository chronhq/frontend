import { computed } from 'mobx';

export default class CoursesModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get data() {
    return this.rootStore.data.CourseTimelines.data;
  }
}
