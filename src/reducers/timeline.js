import factsReducer from './factsTimeline';
import layerReducer from './layerTimeline';

const DEFAULT_YEAR = 1730;
const MAX_YEAR = 2017;

export function resetYear() {
  return {
    type: 'SET_YEAR',
    year: DEFAULT_YEAR
  };
}

const initialState = {
  intervalId: 0,
  interval: 500,
  now: DEFAULT_YEAR,
  max: MAX_YEAR,
  min: DEFAULT_YEAR,
  facts: { type: 'FACTS_TIMELINE', current: [], byYear: {},  loaded: false },
  locations: { type: 'LOCATIONS_TIMELINE', loaded: false },
  borders: { type: 'BORDERS_TIMELINE', current: '', byYear: {}, loaded: false },
};

const timeline = (state = initialState, action) => {
  let act = action;
  switch (action.type) {
    case 'SET_INTERVAL':
      return { ...state, intervalId: action.id };
    case 'NEXT_YEAR':
      act = { ...action, year: state.now + 1 };
      // falls through
    case 'SET_YEAR':
      act = state.min < act.year && act.year < state.max ?
        act : { ...act, type: 'SET_YEAR', year: state.min };
      return { ...state,
        facts: factsReducer(state.facts, act),
        locations: layerReducer(state.locations, act),
        borders: layerReducer(state.borders, act),
        now: act.year };
    case 'LOCATIONS_TIMELINE_PENDING':
    case 'LOCATIONS_TIMELINE_FULFILLED':
    case 'LOCATIONS_TIMELINE_REJECTED':
    case 'LOCATIONS_TIMELINE_CURRENT':
      return { ...state,
        locations: layerReducer(state.locations, act)
      };
    case 'BORDERS_TIMELINE_PENDING':
    case 'BORDERS_TIMELINE_FULFILLED':
    case 'BORDERS_TIMELINE_REJECTED':
    case 'BORDERS_TIMELINE_CURRENT':
      return { ...state,
        borders: layerReducer(state.borders, act)
      };
    default:
      return state;
  }
};

export default timeline;

export function nextYear() {
  return { type: 'NEXT_YEAR' };
}

export function setYear(year) {
  return { type: 'SET_YEAR', year };
}

export function saveIntervalId(id) {
  return {
    type: 'SET_INTERVAL',
    id
  };
}
