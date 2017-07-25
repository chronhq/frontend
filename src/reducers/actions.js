import fetch from 'isomorphic-fetch';

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

export function askBackend(resource, data = {}) {
  return {
    type: 'ASK_BACKEND_SAGA',
    resource,
    data
  };
}