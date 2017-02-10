import fetch from 'isomorphic-fetch';

export function getActualData(years, data, target) {
  const res = Math.max(...years.filter(y => y < target));
  console.log(target);
  console.log(res);
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
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  return {
    type,
    payload: new Promise((resolve) => {
      fetch(url, req).then((response) => {
        console.log('Response from fetch');
        console.log(response);
        resolve(response.json());
      });
    })
  };
}
