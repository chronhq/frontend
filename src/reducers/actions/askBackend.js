import fetch from 'isomorphic-fetch';

export function askBackend(resource, data = {}) {
  return {
    type: 'ASK_BACKEND_SAGA',
    resource,
    data
  };
}
