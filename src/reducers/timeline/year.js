import factsReducer from './factsTimeline';
import layerReducer from './layerTimeline';

const DEFAULT_YEAR = 1783;
const MAX_YEAR = 2017;

export function resetYear() {
  return {
    type: 'SET_YEAR',
    year: DEFAULT_YEAR
  };
}

const initialState = {
  now: DEFAULT_YEAR,
  max: MAX_YEAR,
  min: DEFAULT_YEAR,
};

const timeline = (state = initialState, action) => {
  switch (action.type) {
    case 'PREV_YEAR':
      return { ...state, now: action.year };
    case 'NEXT_YEAR':
      return { ...state, now: action.year };
    case 'SET_YEAR':
      return { ...state, now: action.year };
    default:
      return state;
  }
};

export default timeline;

export function nextYear() {
  return { type: 'CHANGE_YEAR_SAGA', action: 'NEXT_YEAR' };
}

export function prevYear() {
  return { type: 'CHANGE_YEAR_SAGA', action: 'PREV_YEAR' };
}

export function setYear(year) {
  return { type: 'CHANGE_YEAR_SAGA', action: 'SET_YEAR', year };
}
