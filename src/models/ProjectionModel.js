import { observable, computed } from 'mobx';

export default class ProjectionModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // [[Left, Top], [Right, Bottom]]
  @observable defaultClip = '[[-180,90],[180,-90]]';

  @computed get courseId() {
    return this.rootStore.flags.flags.runtime.SelectedCourse;
  }

  @computed get data() {
    return (this.courseId !== null
      && this.courseId in this.rootStore.data.Courses.data)
      ? this.rootStore.data.Courses.data[this.courseId].config.projection
      : {
        center: [0, 0],
        clip: [[-180, 90], [180, -90]],
        rotate: [0, 0, 0],
        name: 'Undefined',
      };
  }

  @computed get clipEnabled() {
    return JSON.stringify(this.clip) !== this.defaultClip;
  }

  @computed get clip() {
    return this.data.clip;
  }

  @computed get center() {
    return this.data.center;
  }


  inTheBox(x, y) {
    return (!(x < this.clip[0][0] // Top
        || x > this.clip[1][0] // Bottom
        || y < this.clip[1][1] // Right
        || y > this.clip[0][1]) // Left
    );
  }
}
