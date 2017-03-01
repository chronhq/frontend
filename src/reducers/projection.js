import * as d3 from 'd3';

const defaultProjectionName = 'ConicEqualArea';
const projectionByName = {
  Mercator: d3.geoMercator(),
  Equirectangular: d3.geoEquirectangular(),
  ConicEqualArea: d3.geoConicEqualArea()
};
const combineKeys = (prev, cur) => [...prev, { value: cur, label: cur }];

const projectionOptions = Object.keys(projectionByName).reduce(combineKeys, []);

// Rotation https://en.wikipedia.org/wiki/Aircraft_principal_axes
// https://github.com/d3/d3-geo/blob/master/README.md#projection_rotate

const defaultState = {
  name: defaultProjectionName,
  project: d3.geoEquirectangular(),
  path: d3.geoPath().projection(d3.geoEquirectangular()),
  options: projectionOptions,
  byName: projectionByName,
  scale: 150,
  rotate: [0, 0, 0]
};

const projection = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_PROJECTION': {
      const scale = 'scale' in action ? action.scale : state.scale;
      const rotate = 'rotate' in action ? action.rotate : state.rotate;
      const project = state.byName[action.name].scale(scale).rotate(rotate);
      return {
        ...state,
        scale,
        rotate,
        name: action.name,
        project,
        path: d3.geoPath().projection(project)
      };
    }
    default:
      return state;
  }
};
export function setProjection(scale, rotate, name = defaultProjectionName) {
  return {
    type: 'CHANGE_PROJECTION',
    name,
    rotate,
    scale
  };
}
export default projection;
