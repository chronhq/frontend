export function mapViewScale(scale, buttonZoom) {
  return {
    scale,
    buttonZoom,
    type: 'MAP_VIEW_SCALE'
  };
}

export function colorsDataAutoToggle(enabled) {
  return {
    type: 'LAND_OWNERSHIP_COLORS_AUTO',
    enabled
  };
}

export function selectLocationSaga(action) {
  return { ...action, type: 'SELECT_LOCATION' };
}
