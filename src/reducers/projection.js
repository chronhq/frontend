import * as d3 from 'd3';

const defaultProjectionName = 'ConicEqualArea';
const projectionByName = { AlbersUsa: d3.geoAlbersUsa(), ConicEqualArea: d3.geoConicEqualArea() };
const defaultState = {
  name: defaultProjectionName,
  path: d3.geoPath().projection(d3.geoConicEqualArea()),
  byName: ['AlbersUsa', 'ConicEqualArea'],
  byKey: projectionByName,
};

const projection = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_PROJECTION':
      return {
        ...state,
        name: action.name,
        path: d3.geoPath().projection(state.byKey[action.name])
      };
    default:
      return state;
  }
};
export default projection;
