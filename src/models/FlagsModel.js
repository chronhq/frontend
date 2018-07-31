import { observable, action } from 'mobx';

const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

function mergeFlags(source, target) {
  const flags = { ...source, ...target };
  const deep = Object.keys(flags).reduce((prev, flag) => (
    (isObject(flags[flag] && source[flag] && target[flag]))
      ? { ...prev, [flag]: mergeFlags(source[flag], target[flag]) }
      : prev), {});
  return { ...flags, ...deep };
}

function findFlag(source, target) {
  return target.split('.').reduce((prev, cur) => (
    isObject(prev) ? prev[cur] : false
  ), source);
}

export default class FlagsModel {
  @observable flags = {
    runtime: {
      CourseSelection: true,
      Ready: false,
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
    UI: {
      MapViewport: true,
    },
    visibility: {
      borders: 1,
      locations: 1,
      tooltips: 1,
      scale: 5,
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
    }
  };

  @action set(f) {
    this.flags = mergeFlags(this.flags, f);
  }

  get(f) {
    return findFlag(this.flags, f);
  }

  print() {
    console.log(JSON.parse(JSON.stringify(this.flags)));
  }
}
