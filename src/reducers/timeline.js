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
  facts: { REDUCER_NAME: 'FACTS_TIMELINE', current: [], byYear: {}, loaded: false },
  locations: { REDUCER_NAME: 'LOCATIONS_TIMELINE', loaded: false },
  borders: { REDUCER_NAME: 'BORDERS_TIMELINE', current: '', byYear: {}, loaded: false },
  persons: { REDUCER_NAME: 'PERSONS_TIMELINE', current: [], byYear: {}, loaded: false }
};

const setNewYearState = (state, action) => {
  const act = state.min < action.year && action.year < state.max
    ? action
    : { ...action, type: 'SET_YEAR', year: state.min };
  return { ...state,
    facts: factsReducer(state.facts, act),
    locations: layerReducer(state.locations, act),
    borders: layerReducer(state.borders, act),
    persons: layerReducer(state.persons, act),
    now: act.year
  };
};

const timeline = (state = initialState, action) => {
  switch (action.type) {
    case 'PREV_YEAR':
      return setNewYearState(state, { ...action, year: state.now - 1 });
    case 'NEXT_YEAR':
      return setNewYearState(state, { ...action, year: state.now + 1 });
    case 'SET_YEAR':
      return setNewYearState(state, action);
    case 'LOCATIONS_TIMELINE_PENDING':
    case 'LOCATIONS_TIMELINE_FULFILLED':
    case 'LOCATIONS_TIMELINE_REJECTED':
    case 'LOCATIONS_TIMELINE_CURRENT':
      return { ...state,
        locations: layerReducer(state.locations, action)
      };
    case 'BORDERS_TIMELINE_PENDING':
    case 'BORDERS_TIMELINE_FULFILLED':
    case 'BORDERS_TIMELINE_REJECTED':
    case 'BORDERS_TIMELINE_CURRENT':
      return { ...state,
        borders: layerReducer(state.borders, action)
      };
    case 'FACTS_TIMELINE_PENDING':
    case 'FACTS_TIMELINE_FULFILLED':
    case 'FACTS_TIMELINE_REJECTED':
    case 'FACTS_TIMELINE_CURRENT':
      return { ...state,
        facts: factsReducer(state.facts, action)
      };
    case 'PERSONS_TIMELINE_PENDING':
    case 'PERSONS_TIMELINE_FULFILLED':
    case 'PERSONS_TIMELINE_REJECTED':
    case 'PERSONS_TIMELINE_CURRENT':
      return { ...state,
        persons: layerReducer(state.persons, action)
      };
    default:
      return state;
  }
};

export default timeline;

export function nextYear() {
  return { type: 'NEXT_YEAR' };
}

export function prevYear() {
  return { type: 'PREV_YEAR' };
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
