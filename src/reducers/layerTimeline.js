import { getActualData } from './actions';

const layerTimeline = (state = { type: 'layerName', loaded: false }, action) => {
  switch (action.type) {
    case 'NEXT_YEAR':
      return { ...state,
        current: action.year in state.byYear ?
          state.byYear[action.year] :
          state.current // Zero facts happened in this year
      };
    case 'SET_YEAR':
      return { ...state,
        current: action.year in state.byYear ? [state.byYear[action.year]] :
        getActualData(state.allYears, state.byYear, action.year)
      };
    case `${state.type}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${state.type}_FULFILLED`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        ...action.payload
      };
    case `${state.type}_REJECTED`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };
    default:
      return state;
  }
};

export default layerTimeline;
