import {
  observable, computed, action, toJS
} from 'mobx';

class FileModel {
  @observable model = '';

  @observable data = {};

  @observable status = { error: false, loading: false, loaded: false };

  @observable filter = null;

  @observable sortId = 'id';

  // This can be overwritten
  @observable saveDataCb = (json) => {
    const data = {};
    json.map((cur) => {
      data[cur[this.sortId]] = cur;
      return false;
    });
    this.data = data;
  }

  @computed get keys() {
    return Object.keys(this.data);
  }

  @computed get length() {
    return this.keys.length;
  }

  constructor(model) {
    this.model = model;
  }

  getLink(params = null, id = null) {
    // if arguments not null ignore global this.filter
    const filter = (params === null && id === null)
      ? toJS(this.filter)
      : JSON.stringify(params);
    if (id !== null) {
      console.log('get', this.model, params, id);
      return `/api/${this.model}/${id}`;
    } if (filter !== null) {
      return `/api/${this.model}?filter=${filter}`;
    }
    return `/api/${this.model}`;
  }

  @action wipe() {
    this.data = {};
    this.status = { error: false, loading: false, loaded: false };
  }

  @action setError = (err) => {
    this.status = { error: err, loading: false, loaded: true };
    console.error('Error in', 'method for model', this.model, err);
  };

  @action saveData(json) {
    this.saveDataCb(json);
    this.status = { error: null, loading: false, loaded: true };
  }

  @action processData(res) {
    if (res.status === 200) {
      res.json().then(json => this.saveData(json));
    } else {
      this.setError(res);
    }
  }

  @action get(params = null, id = null) {
    this.status = { error: null, loading: true, loaded: false };
    const url = this.getLink(params, id);
    fetch(url)
      .then(res => this.processData(res))
      .catch(res => this.setError(res));
  }

  @action downloadModel(force = false) {
    if (this.length === 0 || force === true) {
      this.get();
    }
  }
}

export default class DataModel {
  @observable roster = [
    'Admins',
    'Borders',
    'CityLocs',
    'CityPops',
    'CityProperties',
    'Contours',
    'Courses',
    'Geometries',
    'Inventions',
    'MapLabels',
    'MapColors',
    'Persons',
    'Properties',
    'Types',
    'MapDecorations',
    'MapPics',
    'GeoEvents',
    'CourseTimelines',
    'CourseTraces',
    'CourseGeopoints',
  ];

  constructor() {
    this.roster.map((model) => {
      this[model] = new FileModel(model);
      return false;
    });
    this.ContoursList = new FileModel('Contours');
  }

  @action resolveDependencies(depend) {
    return depend.map((model) => {
      this[model].downloadModel();
      return false;
    });
  }
}
