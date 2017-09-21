
const validateScale = (scale, maxScale, minScale) => {
  if (scale > maxScale) return maxScale;
  if (scale < minScale) return minScale;
  return scale;
};

const validateRotation = (angle) => {
  if (angle === 360 || angle === -360) return 0;
  return angle;
};


const defaultState = {
  scale: 1,
  maxScale: 10,
  minScale: 1,
  mapWidth: 1000,
  mapShift: [0, 0],
  reset: false,
  buttonZoom: false,
  rotation: 0
};

const mapView = (state = defaultState, action) => {
  switch (action.type) {
    case 'DEFAULT_SCALE_CHANGE': {
      return {
        ...state,
        maxScale: action.maxScale,
        minScale: action.minScale,
        mapWidth: action.mapWidth,
        mapShift: action.mapShift,
      };
    }
    case 'MAP_VIEW_SCALE': {
      return {
        ...state,
        reset: false,
        buttonZoom: action.buttonZoom,
        scale: validateScale(action.scale, action.maxScale, action.minScale)
      };
    }
    case 'MAP_VIEW_ROTATION': {
      return {
        ...state,
        reset: false,
        rotation: validateRotation(action.rotation)
      };
    }
    case 'MAP_VIEW_RESET': {
      return {
        ...state,
        reset: true,
        scale: validateScale(action.scale),
        rotation: validateRotation(action.rotation)
      };
    }
    default: {
      return state;
    }
  }
};

export default mapView;
