
const validateScale = (scale) => {
  const maxScale = 10;
  const minScale = 1;
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
  reset: false,
  rotation: 0
};

const mapView = (state = defaultState, action) => {
  switch (action.type) {
    case 'MAP_VIEW_SCALE_SAGA': {
      return {
        ...state,
        reset: false,
        scale: validateScale(action.scale)
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

export function changeScale(scale = 1) {
  return {
    type: 'MAP_VIEW_SCALE',
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

export default mapView;
