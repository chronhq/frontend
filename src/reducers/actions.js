import fetch from 'isomorphic-fetch';
import * as d3 from 'd3';

export function getColorFn() {
  return d3.scaleOrdinal(d3.schemeCategory20c);
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
          ...prev.borders, { id: [cur.geo], props: [cur.props], d: borders[cur.geo] }
        ],
        properties: [...prev.properties, filledProps]
      };
    },
    { borders: [], properties: [] });
  }
  return { borders: [], properties: [] };
}

export function askBackend(type, data = {}) {
  const uri = type.replace(/_/g, '/');
  const url = `/api/${uri}`;
  const req = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };
  return {
    type,
    payload: new Promise((resolve) => {
      fetch(url, req).then((response) => {
        resolve(response.json());
      });
    })
  };
}
