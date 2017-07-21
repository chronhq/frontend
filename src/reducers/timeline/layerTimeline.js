import { getActualData } from '../actions';

const layerTimeline = (state = { REDUCER_NAME: 'layerName', loaded: false }, action) => {
  switch (action.type) {
    case 'NEXT_YEAR':
      return { ...state,
        current: action.year in state.byYear ?
          state.byYear[action.year] :
          state.current // Zero facts happened in this year
      };
    case 'PREV_YEAR':
    case `${state.REDUCER_NAME}_CURRENT`:
    case 'SET_YEAR':
      return { ...state,
        current: action.year in state.byYear
          ? state.byYear[action.year]
          : getActualData(state.allYears, state.byYear, action.year)
      };
    case `${state.REDUCER_NAME}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${state.REDUCER_NAME}_FULFILLED`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        ...action.payload
      };
    case `${state.REDUCER_NAME}_REJECTED`:
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
