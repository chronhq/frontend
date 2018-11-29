import { observable, action, computed } from 'mobx';

const flags = {
  runtime: {
    SelectedCourse: null,
    alignPanel: 'right',
    feedback: false,
    yearInput: false,
    SidePanelTab: 0,
    SidePanelIsOpen: false,
    TimelineIsMinified: false,
    BioIsOpen: false,
    animation: true,
    cluster: true,
  },
  layer: {
    borders: 1,
    labels: 1,
    mapDecorations: 1,
    cities: 1,
    traces: 1,
  },
  pins: {
    inventions: 1,
    persons: 1,
    geoEvents: 1,
  },
  zoom: {
    minScale: 1,
    maxScale: 8,
  }
};

class Flag {
  @observable value;

  constructor(flag) {
    this.value = flag;
  }
}

class FlagList {
  @observable flags = [];

  @action set(flag, value) {
    if (typeof this[flag] !== 'undefined') {
      this[flag].value = value;
    } else {
      this.flags = [...this.flags, flag];
      this[flag] = new Flag(value);
    }
  }

  @computed get list() {
    return this.flags.reduce((prev, cur) => ({
      ...prev,
      [cur]: this[cur].value,
    }), {});
  }

  update(list) {
    Object.keys(list).map(c => this.set(c, list[c]));
  }

  get(flag) {
    return (typeof this[flag] !== 'undefined')
      ? this[flag].value
      : undefined;
  }

  toggle(flag) {
    if (typeof this[flag] !== 'undefined') {
      this.set(flag, !this[flag].value);
    }
  }

  constructor(list) {
    this.update(list);
  }
}

export default class FlagsModel {
  constructor() {
    Object.keys(flags).map((l) => {
      this[l] = new FlagList(flags[l]);
      return null;
    });
  }

  @action set(f) {
    Object.keys(f)
      .map(branch => Object.keys(f[branch])
        .map(flag => this[branch].set(flag, f[branch][flag])));
  }

  print() {
    this.branches.map(b => console.log(b, this[b].list));
  }
}
