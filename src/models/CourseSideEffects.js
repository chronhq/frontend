import { observable, computed, action, when } from 'mobx';

export default class CourseSideEffects {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rootStore.data.Courses.filter = this.activeCourses;
  }

  @observable deps = {
    base: [
      'Admins',
      'Borders',
      'Cities',
      'CityLocs',
      'CityPops',
      'CityProperties',
      'Contours',
      'Geometries',
      'MapLabels',
      'Persons',
      'Properties',
      'Types',
      'MapDecorations',
      'MapPics',
    ],
    course: [
      'CourseTimelines',
      'CourseTraces',
      'CourseGeopoints',
    ],
    world: [
      'Inventions',
      'GeoEvents',
    ],
  };

  @observable activeCourses = JSON.stringify({ where: { active: true } });

  @computed get courseId() {
    return this.rootStore.flags.flags.runtime.SelectedCourse;
  }

  @computed get depend() {
    return this.courseId === 0
      ? [...this.deps.base, ...this.deps.world]
      : [...this.deps.base, ...this.deps.course];
  }

  @computed get listOfDeps() {
    return this.depend.filter(c => (
      c !== 'Geometries'));
  }

  @computed get loadingIsComplete() {
    return this.listOfDeps.every(d =>
      this.rootStore.data[d].status.loaded)
      && this.rootStore.borders.ready;
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

  @action toggleCourseSelection(toggle) {
    // toggle === true - courseSelection enabled
    this.rootStore.flags.set({
      runtime: {
        Ready: !toggle,
        CourseSelection: toggle,
      }
    });

    if (toggle === true) {
      // Wipe data except courses list
      this.rootStore.data.roster.filter(c => c !== 'Courses').map(d =>
        this.rootStore.data[d].wipe());
      // Wipe geometry
      this.rootStore.borders.wipe();
    }
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
    this.rootStore.projection.setup(this.courseInfo.config.projection);
  }

  @action configureDataFilters() {
    this.rootStore.data.Borders.filter = this.courseFilter;
    this.rootStore.data.Contours.filter = this.courseFilter;
    this.rootStore.data.CourseTimelines.filter = this.courseFilter;
  }

  @action loadCourseData() {
    this.rootStore.borders.loadGeometry();
    this.rootStore.data.resolveDependencies(this.listOfDeps);
  }

  find(name) {
    return Object.values(this.rootStore.data.Courses.data).find(cur => cur.url === name);
  }

  @action select(id, name) {
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

    // Close course selection screen after loading is complete
    when(
      () => this.loadingIsComplete,
      () => this.toggleCourseSelection(false)
    );
  }
}
