import {
  observable, computed, action, when
} from 'mobx';

export default class CourseSideEffects {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rootStore.data.Courses.filter = this.activeCourses;
    this.rootStore.data.Borders.sortId = 'year';
  }

  @observable deps = {
    base: [
      'Admins',
      'CityLocs',
      'CityPops',
      'CityProperties',
      'MapLabels',
      'Persons',
      'Properties',
      'Types',
      'MapDecorations',
      'MapPics',
      'MapColors',
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
    heavy: [
      'Borders',
      'Contours',
      'Geometries',
    ]
  };

  @observable activeCourses = JSON.stringify({ where: { active: true } });

  @computed get courseId() {
    return this.rootStore.flags.flags.runtime.SelectedCourse;
  }

  @computed get listOfDeps() {
    return this.courseId === 0
      ? [...this.deps.base, ...this.deps.world]
      : [...this.deps.base, ...this.deps.course];
  }


  @computed get loadingIsComplete() {
    return this.listOfDeps.every(d => this.rootStore.data[d].status.loaded)
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
      this.rootStore.data.roster.filter(c => c !== 'Courses').map(d => this.rootStore.data[d].wipe());
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
    // this.rootStore.projection.setup(this.courseInfo.config.projection);
  }

  @action configureDataFilters() {
    this.rootStore.data.Borders.filter = this.courseFilter;
    this.rootStore.data.Contours.filter = this.courseFilter;
    this.rootStore.data.CourseTimelines.filter = this.courseFilter;
  }

  @action loadBaseData() {
    this.rootStore.data.resolveDependencies(this.deps.base);
  }

  @action loadContourInfo() {
    const contourFilter = {
      fields: {
        courseId: true,
        id: true,
        name: true,
      }
    };
    this.rootStore.data.ContoursList.get(contourFilter);
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
    const contourList = Object.values(this.rootStore.data.ContoursList.data);
    if (contourList.length > 0) {
    // Download each contour part in separate queries
      contourList.filter(c => this.courseId === c.courseId)
        .map((c) => {
          this.rootStore.data.Contours.get({
            where: {
              or: [{ id: c.id }]
            }
          });
          return '';
        });
    } else {
      this.rootStore.data.Contours.get();
    }
    // Load Course Specific data
    this.rootStore.data.resolveDependencies(this.listOfDeps);

    this.rootStore.borders.loadGeometry();
    // reload all borders
    this.rootStore.data.Borders.get();
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
