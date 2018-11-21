import { observable, computed } from 'mobx';
import Locations from './DataAdaptation/LocationsModel';
import Persons from './DataAdaptation/PersonsList';
import Inventions from './DataAdaptation/InventionsList';
import GeoEvents from './DataAdaptation/GeoEventsList';
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
    const geoPoints = this.rootStore.data.CourseGeopoints.data;
    return this.rootStore.year.tick in geoPoints
      ? geoPoints[this.rootStore.year.tick]
      : [];
  }

  @computed get expeditions() {
    return this.rootStore.year.tick in this.rootStore.data.CourseTraces.data
      ? this.rootStore.data.CourseTraces.data[this.rootStore.year.tick]
      : [];
  }

  @computed get decor() {
    return this.data.decor;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data.decor = new Decor(rootStore);
    this.data.cities = new Locations(rootStore);

    // for svg and json generation
    if (process.env.NODE_ENV !== 'production') {
      this.mapPics = new MapPics(rootStore);
    }
    this.persons = new Persons(rootStore);
    this.inventions = new Inventions(rootStore);
    this.geoEventsList = new GeoEvents(rootStore);
  }
}
