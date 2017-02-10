import * as d3 from 'd3';

const defaultProjectionName = 'AlbersUsa';
const defaultState = {
  name: defaultProjectionName,
  path: d3.geoPath().projection(d3.geoAlbersUsa()),
  byName: ['AlbersUsa'],
  byKey: { AlbersUsa: d3.geoAlbersUsa() },
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
