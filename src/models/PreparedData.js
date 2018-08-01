import { observable, computed } from 'mobx';
import Locations from './DataAdaptation/LocationsModel';
// import GenericPointProcessing from './DataAdaptation/GenericPointProcessing';
import CourseGeopoints from './DataAdaptation/CourseGeopoint';
import Expeditions from './DataAdaptation/ExpeditionsModel';
import Persons from './DataAdaptation/PersonsList';
import Inventions from './DataAdaptation/InventionsList';
import GeoEvents from './DataAdaptation/GeoEventsList';
import Courses from './DataAdaptation/CoursesModel';
import MapPics from './DataAdaptation/MapPicsModel';
import Decor from './DataAdaptation/Decor';

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

  @computed get decor() {
    return this.data.decor;
  }


  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data.decor = new Decor(rootStore);
    this.data.cities = new Locations(rootStore);

    this.data.courseTraces = new Expeditions(rootStore);
    this.data.courseGeoPoints = new CourseGeopoints(rootStore);
    this.mapPics = new MapPics(rootStore);
    this.persons = new Persons(rootStore);
    this.inventions = new Inventions(rootStore);
    this.geoEventsList = new GeoEvents(rootStore);
    this.courses = new Courses(rootStore);
  }
}
