import * as d3 from 'd3';
import { askBackend, getColorFn } from './actions';

const defaultProjectionName = 'Equirectangular';
const projectionByName = {
  Mercator: d3.geoMercator(),
  Equirectangular: d3.geoEquirectangular(),
  ConicEqualArea: d3.geoConicEqualArea()
};
const combineKeys = (prev, cur) => [...prev, { value: cur, label: cur }];
const projectionOptions = Object.keys(projectionByName).reduce(combineKeys, []);

// Rotation https://en.wikipedia.org/wiki/Aircraft_principal_axes
// https://github.com/d3/d3-geo/blob/master/README.md#projection_rotate

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
  name: defaultProjectionName,
  project: d3.geoEquirectangular(),
  path: d3.geoPath().projection(d3.geoEquirectangular()),
  options: projectionOptions,
  byName: projectionByName,
  color: getColorFn(),
  rotate: [0, 0, 0],
  scale: 1,
  rotation: 0
};

const projection = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_PROJECTION_SAGA': {
      const rotate = 'rotate' in action ? action.rotate : state.rotate;
      const project = state.byName[action.name].rotate(rotate);
      return {
        ...state,
        rotate,
        name: action.name,
        project,
        path: d3.geoPath().projection(project)
      };
    }
    case 'CHANGE_PROJECTION_SCALE_SAGA': {
      return {
        ...state,
        scale: validateScale(action.scale)
      };
    }
    case 'CHANGE_PROJECTION_ROTATION': {
      return {
        ...state,
        rotation: validateRotation(action.rotation)
      };
    }
    case 'CHANGE_PROJECTION_RESET_ROTATION': {
      return {
        ...state,
        scale: validateScale(action.scale),
        rotation: validateRotation(action.rotation)
      };
    }
    case 'CHANGE_PROJECTION_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'CHANGE_PROJECTION_FULFILLED':
      return {
        ...state,
        loading: false,
        sync: true,
        error: false,
        ...action.payload
      };
    case 'CHANGE_PROJECTION_REJECTED':
      return {
        ...state,
        loading: false,
        sync: false,
        error: true,
      };
    default:
      return state;
  }
};
export function setProjection(rotate, name = defaultProjectionName) {
  // askBackend('CHANGE_PROJECTION', { name, rotate });
  return {
    type: 'CHANGE_PROJECTION',
    name,
    rotate
  };
}

export function changeScale(scale = 1) {
  return {
    type: 'CHANGE_PROJECTION_SCALE',
    scale
  };
}

export function rotateProjection(rotation = 0) {
  return {
    type: 'CHANGE_PROJECTION_ROTATION',
    rotation
  };
}

export function resetRotation() {
  return {
    type: 'CHANGE_PROJECTION_RESET_ROTATION',
    scale: 1,
    rotation: 0
  };
}

export default projection;
