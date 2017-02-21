import fetch from 'isomorphic-fetch';

export function getActualData(years, data, target) {
  const res = Math.max(...years.filter(y => y < target));
  if (isFinite(res)) {
    return data[res];
  }
  return [];
}

export function askBackend(type, data = {}) {
  const uri = type.replace(/_/g, '/');
  const url = process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.APIPORT}/${uri}`
    : `/api/${uri}`;
  const req = {
    method: 'POST',
    mode: 'cors',
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
