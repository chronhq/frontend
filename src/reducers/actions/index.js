export * from './processAndLoadData';
export * from './timelineData';
export * from './year';
export * from './mapView';
export * from './status';

export function askBackend(resource, data = {}) {
  return {
    type: 'ASK_BACKEND_SAGA',
    resource,
    data
  };
}
