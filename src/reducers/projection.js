import * as d3 from 'd3';

const defaultProjectionName = 'ConicEqualArea';
const projectionByName = { AlbersUsa: d3.geoAlbersUsa(), ConicEqualArea: d3.geoConicEqualArea() };
const defaultState = {
  name: defaultProjectionName,
  project: d3.geoConicEqualArea(),
  path: d3.geoPath().projection(d3.geoConicEqualArea()),
  byName: ['AlbersUsa', 'ConicEqualArea'],
  byKey: projectionByName,
  scale: 300,
  rotate: [90, 0, 0]
};

const projection = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_PROJECTION': {
      const scale = 'scale' in action ? action.scale : state.scale;
      const rotate = 'rotate' in action ? action.rotate : state.rotate;
      const project = state.byKey[action.name].scale(scale).rotate(rotate);
      return {
        ...state,
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
  }
}
export default projection;
