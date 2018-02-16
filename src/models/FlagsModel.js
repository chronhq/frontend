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
    view: {
      scale: 1
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
