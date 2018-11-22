import {
  observable, action, computed
} from 'mobx';

import DataLoaderModel from './DataLoaderModel';
import TraceModel from './DataAdaptation/TraceModel';
import PointModel from './DataAdaptation/PointModel';

export default class DataModel {
  @observable activeCourses = JSON.stringify({ where: { active: true } });

  @observable deps = {
    special: [
      'Courses'
    ],
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
      'MapColors',
      'GeomBBoxes',
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
    heavy: [
      'Borders',
    ]
  };

  @computed get roster() {
    return Object.keys(this.deps)
      .reduce((prev, cur) => ([...prev, ...this.deps[cur]]), []);
  }

  constructor() {
    this.roster.map((model) => {
      this[model] = new DataLoaderModel(model);
      return false;
    });

    this.MapPics.filter = JSON.stringify({ where: { type: 'pin' } });
    this.Courses.filter = this.activeCourses;
    this.Borders.sortId = 'year';
    this.CourseTimelines.sortId = 'tick';

    this.CourseGeopoints.configure({
      sortId: 'courseTimelineId',
      append: true,
      arrayCb: true,
      wrapData: d => new PointModel(d),
    });

    this.CourseTraces.configure({
      sortId: 'courseTimelineId',
      append: true,
      arrayCb: true,
      wrapData: d => new TraceModel(d),
    });
  }

  @action resolveDependencies(depend) {
    return depend.map((model) => {
      this[model].downloadModel();
      return false;
    });
  }
}
