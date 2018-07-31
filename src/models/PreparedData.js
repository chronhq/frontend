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

  @computed get mapLabels() {
    const pics = {};
    const toponyms = {};
    Object.values(this.mapLabelsRaw).map((cur) => {
      if (cur.style.pic === true) {
        // mimic map decorations
        const pic = {
          courseId: cur.courseId,
          picId: cur.string[this.rootStore.i18n.lng],
          geopoint: cur.geopoint,
          transform: { scale: cur.style.size, rotate: 0 },
        };
        pics[cur.id] = pic;
      } else {
        console.log('else toponym', cur);
        const label = {
          ...cur,
          string: cur.string[this.rootStore.i18n.lng],
        };
        toponyms[label.style.font] = label.style.font in toponyms
          ? [
            ...toponyms[label.style.font],
            label,
          ] : [label];
      }
      return null;
    });
    return { toponyms, pics };
  }

  @computed get mapLabelsPics() {
    return this.mapLabels.pics;
  }

  @computed get toponymsRaw() {
    return this.mapLabels.toponyms;
  }

  @computed get toponyms() {
    const available = {};
    Object.keys(this.toponymsRaw).map((f) => {
      if (f in this.rootStore.view.fonts) {
        available[f] = this.toponymsRaw[f];
      }
      return null;
    });
    return available;
  }

  @computed get mapLabelsRaw() {
    return Object.values(this.rootStore.data.MapLabels.data)
      .filter(c => c.courseId === this.rootStore.flags.flags.runtime.SelectedCourse);
  }

  @computed get geoEvents() {
    return {};
    // return this.data.geoEvents.points;
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

    // this.data.geoEvents = new GenericPointProcessing(rootStore, 'GeoEvents');

    this.data.courseTraces = new Expeditions(rootStore);
    this.data.courseGeoPoints = new CourseGeopoints(rootStore);
    this.mapPics = new MapPics(rootStore);
    this.persons = new Persons(rootStore);
    this.inventions = new Inventions(rootStore);
    this.geoEventsList = new GeoEvents(rootStore);
    this.courses = new Courses(rootStore);
  }
}
