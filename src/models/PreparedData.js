import { observable, computed } from 'mobx';
import Locations from './DataAdaptation/LocationsModel';
import GenericPointProcessing from './DataAdaptation/GenericPointProcessing';

export default class FinalDataModel {
  @observable data = {};

  @computed get locations() {
    return this.data.cities.locations;
  }

  @computed get tooltips() {
    return this.data.cities.tooltips;
  }

  @computed get decorations() {
    return this.data.decorations.points;
  }

  @computed get labels() {
    return this.data.labels.points;
  }

  @computed get geoEvents() {
    return this.data.geoEvents.points;
  }

  @computed get geoPoints() {
    return this.rootStore.year.tick in this.data.courseGeoPoints.points
      ? this.data.courseGeoPoints.points[this.rootStore.year.tick]
      : [];
  }

  @computed get expeditions() {
    return this.rootStore.year.tick in this.data.courseTraces.points
      ? this.data.courseTraces.points[this.rootStore.year.tick]
      : [];
  }


  constructor(rootStore) {
    this.rootStore = rootStore;

    this.data.cities = new Locations(rootStore, 'Cities');

    this.data.decorations = new GenericPointProcessing(rootStore, 'MapDecorations');

    this.data.labels = new GenericPointProcessing(rootStore, 'MapLabels');

    this.data.geoEvents = new GenericPointProcessing(rootStore, 'GeoEvents');

    this.data.courseGeoPoints = new GenericPointProcessing(rootStore, 'CourseGeopoints', 'courseTimelineId', true);

    this.data.courseTraces = new GenericPointProcessing(rootStore, 'CourseTraces', 'courseTimelineId', true);

    // this.data.CourseGeopoints.saveDataCb = json => this.saveDataCb('courseGeoPoints', json);
  }
}
