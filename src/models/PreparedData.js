import { observable, computed } from 'mobx';
import Locations from './DataAdaptation/LocationsModel';
import GenericPointProcessing from './DataAdaptation/GenericPointProcessing';
import Persons from './DataAdaptation/PersonsList';
import Inventions from './DataAdaptation/InventionsList';
import GeoEvents from './DataAdaptation/GeoEventsList';
import Courses from './DataAdaptation/CoursesModel';
import MapPics from './DataAdaptation/MapPicsModel';

export default class FinalDataModel {
  @observable data = {};
  @observable persons;
  @observable inventions;
  @observable geoEventsList;

  @computed get locations() {
    return this.data.cities.locations;
  }

  @computed get clusteredLocations() {
    return this.data.cities.clusteredLocations;
  }

  @computed get toponyms() {
    return Object.values(this.rootStore.data.MapLabels.data).map(cur => ({
      ...cur,
      string: cur.string[this.rootStore.i18n.lng],
    }));
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

    this.data.cities = new Locations(rootStore, 'CityLocs');

    this.data.geoEvents = new GenericPointProcessing(rootStore, 'GeoEvents');

    this.data.courseGeoPoints = new GenericPointProcessing(rootStore, 'CourseGeopoints', 'courseTimelineId', true);

    this.data.courseTraces = new GenericPointProcessing(rootStore, 'CourseTraces', 'courseTimelineId', true);

    this.mapPics = new MapPics(rootStore);
    this.persons = new Persons(rootStore);
    this.inventions = new Inventions(rootStore);
    this.geoEventsList = new GeoEvents(rootStore);
    this.courses = new Courses(rootStore);
  }
}
