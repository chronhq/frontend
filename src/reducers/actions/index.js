export * from './processAndLoadData';
export * from './timelineData';
export * from './year';
export * from './mapView';
export * from './status';
export * from './loadData';

export function changeGrouping(auto, enabled, zoomPoint) {
  return {
    type: 'LAND_OWNERSHIP_COLORS_CHANGE',
    auto,
    enabled,
    zoomPoint
  };
}

export function setProjection({ rotate, name, clip, center }) {
  return {
    type: 'CHANGE_PROJECTION_SAGA',
    name,
    clip,
    center,
    rotate
  };
}

export function setVisibility(data) {
  return { type: 'CHANGE_VISIBILITY', data };
}

export function cleanState() {
  return { type: 'CLEAN_STATE' };
}
