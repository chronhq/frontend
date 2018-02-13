import { observable, computed, action } from 'mobx';

class FileModel {
  @observable model = '';
  @observable data = {};
  @observable status = { error: false, loading: false, loaded: false };
  // This can be overwritten
  @observable saveDataCb = (json) => {
    console.log('Saving data', this.model);
    const data = {};
    console.time('Map timer');
    json.map((cur) => {
      data[cur.id] = cur;
    });
    this.data = data;
    console.timeEnd('Map timer');
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
    if (id !== null) {
      return `/api/${this.model}/${id}`;
    } else if (params !== null) {
      return `/api/${this.model}?filter=${params}`;
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
    console.log('Complete', this.model);
  }

  @action processData(res) {
    if (res.status === 200) {
      res.json().then(json => this.saveData(json));
    } else {
      res.json().then(json => this.setError(json));
    }
  }

  @action get(params = null, id = null) {
    this.status = { error: null, loading: true, loaded: false };
    const url = this.getLink(params, id);
    console.log('Fetching', url);
    fetch(url)
      .then(res => this.processData(res))
      .catch((e => this.setError(e)));
  }

  @action downloadModel(force = false) {
    console.log('Downloading', this.model);
    if (this.length === 0 || force === true) {
      this.get();
    }
  }
}

export default class DataModel {
  @observable roster = [
    'Admins',
    'Borders',
    'Cities',
    'Contours',
    'Courses',
    'Geometries',
    'Inventions',
    'MapLabels',
    'Persons',
    'Properties',
    'Types',
  ];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.roster.map((model) => {
      this[model] = new FileModel(model);
    });
  }

  @action resolveDependencies(depend) {
    return depend.map(model => this[model].downloadModel());
  }
}
