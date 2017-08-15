export * from './processAndLoadData';
export * from './timelineData';
export * from './year';
export * from './mapView';
export * from './status';

export function askBackend(resource, data = {}) {
  // deprecated
  return {
    type: 'ASK_BACKEND_SAGA_DEPRECATED',
    resource,
    data
  };
}

export function loadData(fetchList = []) {
  return {
    type: 'LOAD_DATA_SAGA',
    fetchList
  };
}

export function changeGrouping(auto, enabled, zoomPoint) {
  return {
    type: 'LAND_OWNERSHIP_COLORS_CHANGE',
    auto,
    enabled,
    zoomPoint
  };
}

export function setProjection(rotate, name = defaultProjectionName) {
  return {
    type: 'CHANGE_PROJECTION_SAGA',
    name,
    rotate
  };
}

export function setVisibility(data) {
  return { type: 'CHANGE_VISIBILITY', data };
}
