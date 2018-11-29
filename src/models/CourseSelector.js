import { computed, action } from 'mobx';

export default class CourseSideEffects {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  find(name) {
    return Object
      .values(this.rootStore.data.Courses.data)
      .find(cur => cur.url === name);
  }

  @computed get deps() {
    return this.rootStore.data.deps;
  }

  @computed get courseId() {
    return this.rootStore.flags.runtime.get('SelectedCourse');
  }

  @computed get listOfDeps() {
    return this.courseId === 0
      ? [...this.deps.base, ...this.deps.world]
      : [...this.deps.base, ...this.deps.course];
  }


  @computed get loadingIsComplete() {
    return this.listOfDeps.every(d => this.rootStore.data[d].status.loaded);
  }

  @computed get courseFilter() {
    return JSON.stringify({
      where: {
        courseId: this.courseId
      }
    });
  }

  @computed get courseInfo() {
    return this.rootStore.data.Courses.data[this.courseId];
  }

  @action cleanup() {
    this.rootStore.flags.set({
      runtime: {
        SelectedCourse: null,
      }
    });

    const wipe = d => this.rootStore.data[d].wipe();

    // Wipe data except base deps
    this.deps.course.map(wipe);
    this.deps.world.map(wipe);
    this.deps.heavy.map(wipe);
  }

  @action configureDataFilters() {
    this.rootStore.data.Borders.filter = this.courseFilter;
    this.rootStore.data.CourseTimelines.filter = this.courseFilter;
  }

  @action loadBaseData() {
    this.rootStore.data.resolveDependencies(this.deps.base);
  }

  @action loadCourseData() {
    // Load heavy data
    const bordersFilter = {
      where: {
        and: [
          { year: this.rootStore.year.now },
          { courseId: this.courseId }
        ]
      }
    };
    this.rootStore.data.Borders.get(bordersFilter);
    // Load Course Specific data
    this.rootStore.data.resolveDependencies(this.listOfDeps);

    // reload all borders
    this.rootStore.data.Borders.get();
  }

  @action select(id, name) {
    if (id === this.courseId) {
      console.log('Course already selected', id, name);
      return null;
    }
    this.rootStore.flags.set({
      runtime: {
        SelectedCourse: id,
        SelectedCourseName: name,
      }
    });

    this.rootStore.year.setup(this.courseInfo.config.year);
    this.rootStore.flags.set(this.courseInfo.config.settings.flags);

    this.configureDataFilters();
    this.loadCourseData();

    // update viewport position
    this.rootStore.deck.initLatLon();
    return true;
  }
}
