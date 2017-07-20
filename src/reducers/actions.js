import fetch from 'isomorphic-fetch';
import * as d3 from 'd3';

export function getColorFn() {
  const colors = {
    1: '#ffffcc',
    2: '#edf8e9',
    3: '#bae4b3',
    4: '#006d2c',
    5: '#bdd7e7',
    6: '#111111',
    7: '#6baed6',
    8: '#08519c',
    9: '#fbb4b9',
    10: '#9e9ac8',
    11: '#8c96c6',
    12: '#41ab5d',
    13: '#fcae91',
    14: '#111111',
    15: '#fb6a4a',
    16: '#111111',
    17: '#756bb1',
    18: '#d7b5d8',
    19: '#d7b5d8',
    20: '#253494',
    21: '#fe9929',
    22: '#993404'
  };
  return num => colors[num];
  // return d3.scaleOrdinal(d3.schemeCategory20c);
}

export function getActualData(years, data, target) {
  const res = Math.max(...years.filter(y => y <= target));
  if (isFinite(res)) {
    return data[res];
  }
  return [];
}

export function getNextData(years, data, target) {
  const res = Math.min(...years.filter(y => y > target));
  if (isFinite(res)) {
    return data[res];
  }
  return [];
}

export function getBordersFromState(state) {
  const current = state.timeline.borders.current;
  // we are operating only with projected borders
  const borders = state.borders.projected;
  const properties = state.properties;
  if (current) {
    return Object.keys(current).reduce((prev, curId) => {
      const cur = current[curId];
      const curProps = properties.data.properties[cur.props];
      const filledProps = {
        ...curProps,
        type: properties.type.type[curProps.type],
        admin: properties.admin.admin[curProps.admin],
      };
      return {
        borders: [
          ...prev.borders, {
            id: [cur.geo],
            props: [cur.props],
            d: borders[cur.geo]
          }
        ],
        properties: [...prev.properties, filledProps]
      };
    }, {
      borders: [],
      properties: []
    });
  }
  return {
    borders: [],
    properties: []
  };
}

export function askBackend(resource, data = {}) {
  return {
    type: 'ASK_BACKEND',
    resource,
    data
  };
}