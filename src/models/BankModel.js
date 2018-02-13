import { observable, action } from 'mobx';

export default class BankModel {
  @observable roster = [
    'Admin',
    'Borders',
    'Cities',
    'Contours',
    'Courses',
    'Geometries',
    'Inventions',
    'MapLabels',
    'Persons',
    'Properties',
    'Type',
  ];
  @observable data = {};
  @observable status = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data = this.roster.reduce((prev, model) => (
      { ...prev, [model]: {} }
    ), {});
  }

  validateModel(model) {
    if (this.roster.includes(model)) {
      return true;
    }
    console.log('Model not in roster', model);
    return false;
  }

  getLink(model, id = null) {
    if (this.validateModel(model)) {
      return id === null
        ? `/api/${model}`
        : `/api/${model}/${id}`;
    }
    return '';
  }

  @action setError = (model, req, err, idx) => {
    this.status[idx] = { error: err, loading: false, loaded: true };
    console.error('Error in', req, 'method for model', model, err);
  };

  @action saveData(model, req, json, idx) {
    if (req === 'get') {
      const data = json.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {});
      this.data[model] = data;
      this.status[idx] = { error: null, loading: false, loaded: true };
    } else if (req === 'post' || req === 'put') {
      this.data[model][json.id] = json;
      this.status[idx] = {
        error: null, loading: false, loaded: true, id: json.id
      };
    }
  }

  @action processData(model, req, res, idx) {
    if (res.status === 200) {
      res.json().then(json => this.saveData(model, req, json, idx));
    } else {
      res.json().then(json => this.setError(model, req, json, idx));
    }
  }

  @action get(model) {
    const idx = this.status.push({ error: null, loading: true, loaded: false }) - 1;
    const url = this.getLink(model);
    fetch(url)
      .then(res => this.processData(model, 'get', res, idx))
      .catch((e => this.setError(model, 'get', e, idx)));
    return idx;
  }

  @action post(model, data) {
    const idx = this.status.push({ error: null, loading: true, loaded: false }) - 1;
    const url = this.getLink(model);
    fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.rootStore.login.token
        },
        credentials: 'same-origin',
        body: JSON.stringify(data),
      }
    )
      .then(res => this.processData(model, 'post', res, idx))
      .catch((e => this.setError(model, 'post', e, idx)));
    return idx;
  }


  @action put(model, data) {
    const idx = this.status.push({ error: null, loading: true, loaded: false }) - 1;
    const url = this.getLink(model, data.id);
    fetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.rootStore.login.token
        },
        credentials: 'same-origin',
        body: JSON.stringify(data),
      }
    )
      .then(res => this.processData(model, 'put', res, idx))
      .catch((e => this.setError(model, 'put', e, idx)));
    return idx;
  }

  @action downloadModel(model, force = false) {
    console.log('Downloading', model);
    if (Object.keys(this.data[model]).length === 0 || force === true) {
      this.get(model);
    }
  }

  @action resolveDependencies(depend) {
    return depend.map(model => this.downloadModel(model));
  }
}
