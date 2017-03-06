import fetch from 'isomorphic-fetch';
import axios from 'axios';

export function getActualData(years, data, target) {
  const res = Math.max(...years.filter(y => y < target));
  if (isFinite(res)) {
    return data[res];
  }
  return [];
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
