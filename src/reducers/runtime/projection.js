import {
  defaultProjectionName,
  defaultProjectFn,
  defaultPathFn,
  getGeoPath,
  projectionByName
} from '../../../shared/projections';

const combineKeys = (prev, cur) => [...prev, { value: cur, label: cur }];
const projectionOptions = Object.keys(projectionByName).reduce(combineKeys, []);

// Rotation https://en.wikipedia.org/wiki/Aircraft_principal_axes
// https://github.com/d3/d3-geo/blob/master/README.md#projection_rotate

const defaultState = {
  name: defaultProjectionName,
  project: defaultProjectFn,
  path: defaultPathFn,
  options: projectionOptions,
  byName: projectionByName,
  rotate: [0, 0, 0]
};

const projection = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_PROJECTION': {
      const rotate = 'rotate' in action ? action.rotate : state.rotate;
      const project = state.byName[action.name].rotate(rotate);
      return {
        ...state,
        rotate,
        name: action.name,
        project,
        path: getGeoPath(project)
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
    type: 'CHANGE_PROJECTION_SAGA',
    name,
    rotate
  };
}

export default projection;
