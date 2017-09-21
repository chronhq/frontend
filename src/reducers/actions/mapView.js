export function mapViewScale(scale, buttonZoom) {
  return {
    scale,
    buttonZoom,
    type: 'MAP_VIEW_SCALE'
  };
}

export function defaultScaleChange(minScale, maxScale) {
  return {
    minScale,
    maxScale,
    type: 'DEFAULT_SCALE_CHANGE'
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

export function changeScale(scale = 1, buttonZoom) {
  return {
    type: 'MAP_VIEW_SCALE_SAGA',
    buttonZoom,
    scale
  };
}

export function rotateProjection(rotation = 0) {
  return {
    type: 'MAP_VIEW_ROTATION',
    rotation
  };
}

export function resetRotation() {
  return {
    type: 'MAP_VIEW_RESET',
    scale: 1,
    rotation: 0
  };
}
