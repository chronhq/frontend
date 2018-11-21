import {
  computed, action, when
} from 'mobx';

export default class CourseSideEffects {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get deps() {
    return this.rootStore.data.deps;
  }


  @computed get courseId() {
    return this.rootStore.flags.flags.runtime.SelectedCourse;
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

  @action enableCourseSelection() {
    this.rootStore.flags.set({
      runtime: {
        CourseSelection: true,
        SelectedCourse: null,
        Setup: true,
        Ready: false
      }
    });

    const wipe = d => this.rootStore.data[d].wipe();

    // Wipe data except base deps
    this.deps.course.map(wipe);
    this.deps.world.map(wipe);
    this.deps.heavy.map(wipe);
  }

  @action toggleCourseSelection(toggle) {
    // toggle === true - courseSelection enabled
    this.rootStore.flags.set({
      runtime: {
        Ready: !toggle,
        CourseSelection: toggle,
      }
    });
  }

  @action configureCourseUI() {
    const uiSettings = this.courseInfo.config.settings;
    const zoom = 'zoom' in this.courseInfo.config.settings
      ? this.courseInfo.config.settings.zoom
      : this.courseInfo.config.settings.flags.zoom;
    this.rootStore.flags.set({
      ...uiSettings.flags,
      zoom
    });
  }

  @action configureCourseEnv() {
    this.rootStore.year.setup(this.courseInfo.config.year);
    // this.rootStore.projection.setup(this.courseInfo.config.projection);
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

  find(name) {
    return Object.values(this.rootStore.data.Courses.data).find(cur => cur.url === name);
  }

  /* eslint-disable consistent-return */
  @action select(id, name) {
    if (id === this.rootStore.flags.flags.runtime.SelectedCourse) {
      console.log('Course already selected', id, name);
      return null;
    }
    this.rootStore.flags.set({
      runtime: {
        SelectedCourse: id,
        SelectedCourseName: name,
      }
    });

    this.configureCourseEnv();
    this.configureDataFilters();
    this.configureCourseUI();
    this.loadCourseData();

    // update viewport position
    this.rootStore.deck.initLatLon();

    this.rootStore.flags.set({
      runtime: {
        Setup: false,
      }
    });

    // Close course selection screen after loading is complete
    when(
      () => this.loadingIsComplete,
      () => this.toggleCourseSelection(false)
    );
  }
}
